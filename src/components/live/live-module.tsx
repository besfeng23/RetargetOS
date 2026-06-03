"use client";

import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { ActionCard } from "@/components/action-card";
import { EmptyState } from "@/components/empty-state";
import { RecordsView } from "@/components/records-view";
import { SectionCard } from "@/components/section-card";
import { StatusChip } from "@/components/status-chip";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { moduleConfigs, type LiveRow, type ModuleConfig, type ModuleKey } from "@/lib/supabase/modules";

type FormValues = Record<string, string>;

export function LiveModule({ moduleKey, initialRows, initialError, totalCount }: { moduleKey: ModuleKey; initialRows: LiveRow[]; initialError?: string; totalCount: number }) {
  const config: ModuleConfig = moduleConfigs[moduleKey];
  const router = useRouter();
  const [rows, setRows] = useState<LiveRow[]>(initialRows);
  const [error, setError] = useState(initialError ?? "");
  const [editing, setEditing] = useState<LiveRow | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isReloading, setIsReloading] = useState(false);

  const supabaseState = useMemo(() => {
    try {
      return { client: createSupabaseBrowserClient(), error: "" };
    } catch (clientError) {
      return { client: null, error: clientError instanceof Error ? clientError.message : "Supabase client is not configured." };
    }
  }, []);
  const supabase = supabaseState.client;

  const defaultValues = useMemo(() => Object.fromEntries(config.fields.map((field) => [field.name, field.type === "number" ? "0" : field.options?.[0] ?? ""])), [config.fields]);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({ defaultValues });

  const reloadRows = useCallback(async () => {
    if (!supabase) return;
    setIsReloading(true);
    const { data, error: fetchError } = await supabase
      .from(config.table)
      .select(config.columns.join(","))
      .order(config.orderBy ?? "created_at", { ascending: false })
      .range(0, 24);
    setIsReloading(false);

    if (fetchError) {
      setError(fetchError.message);
      return;
    }

    setError("");
    setRows(normalizeRows((data ?? []) as unknown as Array<Record<string, unknown>>));
  }, [config.columns, config.orderBy, config.table, supabase]);

  useEffect(() => {
    if (!supabase || !config.realtime) return;

    const channel = supabase
      .channel(`${config.table}-live-records`)
      .on("postgres_changes", { event: "*", schema: "public", table: config.table }, () => {
        void reloadRows();
      })
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [config.realtime, config.table, reloadRows, supabase]);

  function startEdit(row: LiveRow) {
    setEditing(row);
    reset(Object.fromEntries(config.fields.map((field) => [field.name, row[field.name] ?? defaultValues[field.name] ?? ""])));
  }

  function cancelEdit() {
    setEditing(null);
    reset(defaultValues);
  }

  async function onSubmit(values: FormValues) {
    if (!supabase) return;
    const parsed = config.schema.safeParse(values) as z.SafeParseReturnType<FormValues, Record<string, string>>;
    if (!parsed.success) {
      setError(parsed.error.issues.map((issue) => issue.message).join(" "));
      return;
    }

    const payload = { ...parsed.data };
    if (config.table === "creatives" && !editing) {
      payload.approval_state = "draft";
    }

    const optimisticId = editing?.id ?? `pending-${crypto.randomUUID()}`;
    const optimisticRow = normalizeRow({ id: optimisticId, ...payload, created_at: editing?.created_at ?? new Date().toISOString() });
    setRows((current) => editing ? current.map((row) => row.id === editing.id ? optimisticRow : row) : [optimisticRow, ...current]);

    const query = editing?.id
      ? supabase.from(config.table).update(payload).eq("id", editing.id).select(config.columns.join(",")).single()
      : supabase.from(config.table).insert(payload).select(config.columns.join(",")).single();

    const { data, error: mutationError } = await query;
    if (mutationError) {
      setError(mutationError.message);
      await reloadRows();
      return;
    }

    setError("");
    const saved = normalizeRow((data ?? optimisticRow) as unknown as Record<string, unknown>);
    setRows((current) => editing ? current.map((row) => row.id === saved.id ? saved : row) : [saved, ...current.filter((row) => row.id !== optimisticId)]);
    cancelEdit();
  }

  async function deleteRow(row: LiveRow) {
    if (!supabase || !row.id) return;
    const previous = rows;
    setRows((current) => current.filter((candidate) => candidate.id !== row.id));
    const { error: deleteError } = await supabase.from(config.table).delete().eq("id", row.id);
    if (deleteError) {
      setRows(previous);
      setError(deleteError.message);
    }
  }

  async function approveCreative(row: LiveRow) {
    if (!supabase || !row.id) return;
    const { data, error: approveError } = await supabase
      .from("creatives")
      .update({ approval_state: "approved" })
      .eq("id", row.id)
      .select(config.columns.join(","))
      .single();

    if (approveError) {
      setError(approveError.message);
      return;
    }

    setRows((current) => current.map((candidate) => candidate.id === row.id ? normalizeRow(data as unknown as Record<string, unknown>) : candidate));
  }

  function fallbackRefresh() {
    startTransition(() => router.refresh());
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <StatusChip value={`${totalCount || rows.length} live rows`} tone="success" />
        <StatusChip value="Supabase realtime enabled" tone="success" />
        <button onClick={reloadRows} className="rounded-full border border-white/[0.12] px-3 py-1 text-xs text-white/70 hover:bg-white/[0.06]" type="button">{isReloading ? "Retrying…" : "Retry fetch"}</button>
        <button onClick={fallbackRefresh} className="rounded-full border border-white/[0.12] px-3 py-1 text-xs text-white/70 hover:bg-white/[0.06]" type="button">{isPending ? "Refreshing…" : "Server refresh fallback"}</button>
      </div>

      {(error || supabaseState.error) ? <div className="rounded-[22px] border border-red-300/25 bg-red-500/[0.08] p-4 text-sm leading-6 text-red-100">Supabase error: {error || supabaseState.error}</div> : null}

      <SectionCard title={config.formTitle} description="Validated form writes directly to Supabase using insert/update and refreshes local state optimistically.">
        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
          {config.fields.map((field) => (
            <label key={field.name} className={field.type === "textarea" ? "md:col-span-2" : undefined}>
              <span className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-white/42">{field.label}</span>
              {field.type === "select" ? (
                <select {...register(field.name)} className="min-h-12 w-full rounded-2xl border border-white/[0.08] bg-[#0D0D0D] px-4 text-sm text-white outline-none">
                  {field.options?.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              ) : field.type === "textarea" ? (
                <textarea {...register(field.name)} className="min-h-28 w-full rounded-2xl border border-white/[0.08] bg-[#0D0D0D] px-4 py-3 text-sm text-white outline-none" placeholder={field.placeholder} />
              ) : (
                <input {...register(field.name)} type={field.type ?? "text"} className="min-h-12 w-full rounded-2xl border border-white/[0.08] bg-[#0D0D0D] px-4 text-sm text-white outline-none" placeholder={field.placeholder} />
              )}
              {errors[field.name]?.message ? <span className="mt-1 block text-xs text-red-200">{String(errors[field.name]?.message)}</span> : null}
            </label>
          ))}
          <div className="flex flex-wrap gap-3 md:col-span-2">
            <button disabled={isSubmitting} className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black disabled:opacity-60" type="submit">{editing ? "Update record" : config.createLabel}</button>
            {editing ? <button className="rounded-full border border-white/[0.14] px-5 py-3 text-sm text-white/74" onClick={cancelEdit} type="button">Cancel edit</button> : null}
          </div>
        </form>
      </SectionCard>

      <SectionCard title="Live records" description="Server-fetched paginated rows hydrate the table, then realtime/manual sync keeps it current.">
        {rows.length ? <RecordsView rows={rows} titleKey={config.titleKey} subtitleKey={config.subtitleKey} /> : <EmptyState title={config.emptyTitle} message={config.emptyMessage} />}
      </SectionCard>

      {rows.length ? (
        <SectionCard title="Row actions" description="Edit, delete, and module-specific actions are Supabase mutations with optimistic UI feedback.">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {rows.slice(0, 9).map((row) => (
              <ActionCard key={row.id ?? row[config.titleKey]} title={row[config.titleKey] || "Untitled record"} status={row.status ?? row.approval_state ?? row.risk} description={row[config.subtitleKey ?? config.titleKey] || `Live ${config.table} row`}>
                <div className="flex flex-wrap gap-2">
                  <button className="rounded-full border border-white/[0.14] px-3 py-2 text-xs text-white/75" onClick={() => startEdit(row)} type="button">Edit</button>
                  <button className="rounded-full border border-red-300/30 px-3 py-2 text-xs text-red-100" onClick={() => deleteRow(row)} type="button">Delete</button>
                  {config.table === "creatives" && row.approval_state === "draft" ? <button className="rounded-full border border-emerald-300/30 px-3 py-2 text-xs text-emerald-100" onClick={() => approveCreative(row)} type="button">Approve</button> : null}
                </div>
              </ActionCard>
            ))}
          </div>
        </SectionCard>
      ) : null}
    </div>
  );
}

function normalizeRows(rows: Array<Record<string, unknown>>): LiveRow[] {
  return rows.map(normalizeRow);
}

function normalizeRow(row: Record<string, unknown>): LiveRow {
  return Object.fromEntries(Object.entries(row).map(([key, value]) => [key, formatValue(value)])) as LiveRow;
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "number") return Number.isInteger(value) ? String(value) : value.toFixed(2);
  if (typeof value === "boolean") return value ? "true" : "false";
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) return new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}
