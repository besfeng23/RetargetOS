export const dynamic = "force-dynamic";

import { AppShell } from "@/components/app-shell";
import { ActionCard } from "@/components/action-card";
import { ComplianceBanner } from "@/components/compliance-banner";
import { MetricCard } from "@/components/metric-card";
import { PageHeader } from "@/components/page-header";
import { ReadinessChecklist } from "@/components/readiness-checklist";
import { SectionCard } from "@/components/section-card";
import { StatusChip } from "@/components/status-chip";
import { fetchDashboardMetrics } from "@/lib/supabase/queries";

export default async function DashboardPage() {
  const metrics = await fetchDashboardMetrics();

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader title="Growth Command" eyebrow="Dashboard" description="Live Supabase KPIs for revenue truth, consent-safe reach, activation blockers, and the next approval-gated move." />
        <ComplianceBanner title="Dashboard uses aggregate Supabase queries." message="Counts come from campaigns, events, audiences, consent rules, and import jobs. No static KPI rows are rendered." />
        {metrics.error ? <div className="rounded-[22px] border border-red-300/25 bg-red-500/[0.08] p-4 text-sm leading-6 text-red-100">Supabase error: {metrics.error}</div> : null}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <MetricCard title="Active campaigns" value={String(metrics.activeCampaigns)} note="Count of approved, ready, or active campaigns." status="live" />
          <MetricCard title="Conversion events" value={String(metrics.conversionEvents)} note="Purchase, Lead, and InitiateCheckout events." status="events" />
          <MetricCard title="Audience size" value={String(metrics.audienceSize)} note="Sum of eligible_count from paginated audience aggregates." status="guarded" />
          <MetricCard title="Suppression count" value={String(metrics.suppressionCount)} note="Active, revoked, or suppressed consent rules." status="dominant rule" />
          <MetricCard title="Import queue" value={String(metrics.queuedImports)} note="Draft, mapping, review, and processing import jobs." status="queue" />
        </section>
        <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <SectionCard title="Needs attention" description="Activation stays blocked until live data satisfies these operational gates.">
            <div className="grid gap-3 sm:grid-cols-2">
              <ActionCard title="Suppression rules" description="Suppressed and revoked records are excluded from every audience and destination workflow." status={metrics.suppressionCount > 0 ? "review" : "clear"} />
              <ActionCard title="Import queue" description="Unmapped, failed, or review-state batches should be resolved before activation." status={metrics.queuedImports > 0 ? "pending" : "clear"} />
              <ActionCard title="Conversion coverage" description="Purchase and opt-out facts drive payment truth, eligibility, and suppression reporting." status={metrics.conversionEvents > 0 ? "live" : "waiting"} />
              <ActionCard title="Campaign approvals" description="Campaign records remain approval-gated before spend or connector execution." status={metrics.activeCampaigns > 0 ? "ready" : "draft"} />
            </div>
          </SectionCard>
          <SectionCard title="Best next move" description="AI can draft recommendations, but execution stays blocked unless approved backend support exists.">
            <ActionCard title="Prepare highest-fit recovery flow" meta="Approval required" status="draft only" description="Use the live audience, suppression, event, and campaign records to prepare a recovery campaign for human review.">
              <div className="flex flex-wrap gap-2"><StatusChip value="No auto-publish" tone="warning" /><StatusChip value="No budget change" tone="danger" /><StatusChip value="Human approval required" tone="warning" /></div>
            </ActionCard>
          </SectionCard>
        </section>
        <SectionCard title="Campaign and audience health" description="Readiness is intentionally conservative. Suppression and unknown consent remain hard blockers.">
          <ReadinessChecklist items={[{ label: "Audience validation uses live audience rows", state: metrics.audienceSize > 0 ? "passed" : "warning" }, { label: "Consent and suppression gates enforced by RLS-backed tables", state: "passed" }, { label: "Import queue reviewed before activation", state: metrics.queuedImports > 0 ? "warning" : "passed" }, { label: "Creative approval is explicit before deployment", state: "passed" }]} />
        </SectionCard>
      </div>
    </AppShell>
  );
}
