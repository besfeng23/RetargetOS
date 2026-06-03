import { AppShell } from "@/components/app-shell";
import { MetricCard } from "@/components/metric-card";
import { PageHeader } from "@/components/page-header";
import { RecordsView } from "@/components/records-view";
import { SectionCard } from "@/components/section-card";

const events = [
  { event_type: "PageView", source: "web pixel", quality: "needs click id", use: "retargeting seed", pii: "masked" },
  { event_type: "ViewContent", source: "web pixel", quality: "medium", use: "product intent", pii: "masked" },
  { event_type: "Lead", source: "form", quality: "consent required", use: "lead scoring", pii: "masked" },
  { event_type: "InitiateCheckout", source: "checkout", quality: "high", use: "abandoned checkout", pii: "masked" },
  { event_type: "Purchase", source: "payment webhook", quality: "highest", use: "payment truth", pii: "masked" },
  { event_type: "Refund", source: "payment ledger", quality: "highest", use: "net profit", pii: "masked" },
  { event_type: "Chargeback", source: "payment ledger", quality: "system critical", use: "suppression", pii: "masked" },
  { event_type: "OptOut", source: "preference center", quality: "system critical", use: "suppression", pii: "masked" },
];

export default function EventsPage() {
  return <AppShell><div className="space-y-6"><PageHeader title="Events" eyebrow="Attribution health" description="Events show what happened, which critical signals are missing, and whether revenue is supported by payment truth rather than vanity attribution." /><section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><MetricCard title="Event health score" value="72" status="review" note="Improves when critical payment and opt-out events are complete." /><MetricCard title="Missing critical events" value="2" status="warning" note="Review Refund and Chargeback coverage." /><MetricCard title="Duplicate rate" value="0%" status="ready" note="Awaiting real event volume." /><MetricCard title="Payment truth" value="required" status="guarded" note="Purchase, Refund, and Chargeback drive net profit." /></section><SectionCard title="Event stream"><RecordsView rows={events} titleKey="event_type" subtitleKey="source" /></SectionCard><SectionCard title="Top event types" description="PageView, ViewContent, Lead, InitiateCheckout, Purchase, Refund, Chargeback, and OptOut are tracked as activation and suppression inputs." ><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{events.map((e)=><div key={e.event_type} className="rounded-2xl border border-white/[0.08] bg-[#0D0D0D] p-4 text-sm text-white/72">{e.event_type}</div>)}</div></SectionCard></div></AppShell>;
}
