import { AppShell } from "@/components/app-shell";
import { ActionCard } from "@/components/action-card";
import { ComplianceBanner } from "@/components/compliance-banner";
import { MetricCard } from "@/components/metric-card";
import { PageHeader } from "@/components/page-header";
import { ReadinessChecklist } from "@/components/readiness-checklist";
import { SectionCard } from "@/components/section-card";
import { StatusChip } from "@/components/status-chip";

const metrics = [
  { title: "Revenue", value: "₱0", note: "Payment ledger baseline; no demo revenue is claimed.", status: "payment truth" },
  { title: "Net Profit", value: "₱0", note: "Revenue less costs, refunds, fees, and approved spend.", status: "calculated" },
  { title: "Consent-safe Profiles", value: "0", note: "Unknown consent blocks activation.", status: "guarded" },
  { title: "Launch-ready Audiences", value: "0", note: "Requires consent, source trust, suppression, and approval gates.", status: "draft" },
];

const attention = [
  { title: "Missing consent", description: "Profiles with unknown consent are blocked until repermission or lawful basis is recorded.", status: "blocked" },
  { title: "Suppressed records", description: "Suppressed profiles stay excluded from every audience and destination workflow.", status: "dominant rule" },
  { title: "Failed imports", description: "Invalid identifiers and unmapped fields stay in quarantine preview.", status: "review" },
  { title: "Tracking gaps", description: "Purchase, Refund, Chargeback, and OptOut events are required for payment truth.", status: "warning" },
];

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader title="Growth Command" eyebrow="Dashboard" description="What matters now: revenue truth, consent-safe reach, activation blockers, and the next approval-gated move." />
        <ComplianceBanner />
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{metrics.map((metric) => <MetricCard key={metric.title} {...metric} />)}</section>
        <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <SectionCard title="Needs attention" description="Activation stays blocked until these operational issues are resolved.">
            <div className="grid gap-3 sm:grid-cols-2">{attention.map((item) => <ActionCard key={item.title} {...item} />)}</div>
          </SectionCard>
          <SectionCard title="Best next move" description="AI can draft recommendations, but cannot spend, sync, publish, or change suppression without human approval.">
            <ActionCard title="Prepare abandoned checkout recovery" meta="Approval required" status="draft only" description="Build a 7-day abandoned checkout audience, exclude suppressed profiles, verify consent/source trust, and draft creative variants for review.">
              <div className="flex flex-wrap gap-2"><StatusChip value="No live sync" tone="warning" /><StatusChip value="No budget change" tone="danger" /><StatusChip value="Human approval required" tone="warning" /></div>
            </ActionCard>
          </SectionCard>
        </section>
        <SectionCard title="Campaign and audience health" description="Readiness is intentionally conservative. Suppression and unknown consent remain hard blockers.">
          <ReadinessChecklist items={[{ label: "Audience validation pending", state: "warning" }, { label: "Consent gate enforced", state: "passed" }, { label: "Suppression override enforced", state: "passed" }, { label: "Mock connectors only — no live platform upload occurred", state: "blocked" }]} />
        </SectionCard>
      </div>
    </AppShell>
  );
}
