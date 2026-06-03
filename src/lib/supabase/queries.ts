import { createSupabaseServerClient } from "./server";
import type { LiveRow, ModuleConfig } from "./modules";

const PAGE_SIZE = 25;

export type LiveFetchResult = {
  rows: LiveRow[];
  count: number;
  error?: string;
};

export async function fetchModuleRows(config: ModuleConfig, page = 0): Promise<LiveFetchResult> {
  try {
    const supabase = await createSupabaseServerClient();
    const from = page * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    const orderBy = config.orderBy ?? "created_at";

    const { data, count, error } = await supabase
      .from(config.table)
      .select(config.columns.join(","), { count: "exact" })
      .order(orderBy, { ascending: false })
      .range(from, to);

    if (error) {
      return { rows: [], count: 0, error: error.message };
    }

    return { rows: normalizeRows((data ?? []) as unknown as Array<Record<string, unknown>>), count: count ?? 0 };
  } catch (error) {
    return { rows: [], count: 0, error: error instanceof Error ? error.message : "Unable to fetch Supabase data." };
  }
}

export type DashboardMetrics = {
  activeCampaigns: number;
  conversionEvents: number;
  audienceSize: number;
  suppressionCount: number;
  queuedImports: number;
  error?: string;
};

export async function fetchDashboardMetrics(): Promise<DashboardMetrics> {
  try {
    const supabase = await createSupabaseServerClient();
    const [campaigns, conversions, audiences, suppressions, imports] = await Promise.all([
      supabase.from("campaigns").select("id", { count: "exact", head: true }).in("status", ["ready", "active", "approved"]),
      supabase.from("events").select("id", { count: "exact", head: true }).in("event_type", ["Purchase", "Lead", "InitiateCheckout"]),
      supabase.from("audiences").select("eligible_count").limit(100),
      supabase.from("consent_rules").select("id", { count: "exact", head: true }).in("status", ["suppressed", "revoked", "active"]),
      supabase.from("import_jobs").select("id", { count: "exact", head: true }).in("status", ["draft", "mapping_required", "needs_review", "processing"]),
    ]);

    const firstError = [campaigns.error, conversions.error, audiences.error, suppressions.error, imports.error].find(Boolean);
    if (firstError) {
      return { activeCampaigns: 0, conversionEvents: 0, audienceSize: 0, suppressionCount: 0, queuedImports: 0, error: firstError.message };
    }

    const audienceSize = (audiences.data ?? []).reduce((sum, row) => sum + Number(row.eligible_count ?? 0), 0);

    return {
      activeCampaigns: campaigns.count ?? 0,
      conversionEvents: conversions.count ?? 0,
      audienceSize,
      suppressionCount: suppressions.count ?? 0,
      queuedImports: imports.count ?? 0,
    };
  } catch (error) {
    return { activeCampaigns: 0, conversionEvents: 0, audienceSize: 0, suppressionCount: 0, queuedImports: 0, error: error instanceof Error ? error.message : "Unable to fetch dashboard metrics." };
  }
}

function normalizeRows(rows: Array<Record<string, unknown>>): LiveRow[] {
  return rows.map((row) => Object.fromEntries(Object.entries(row).map(([key, value]) => [key, formatValue(value)])) as LiveRow);
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "number") return Number.isInteger(value) ? String(value) : value.toFixed(2);
  if (typeof value === "boolean") return value ? "true" : "false";
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) return new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}
