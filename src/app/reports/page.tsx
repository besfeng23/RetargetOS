import { AppShell } from "@/components/app-shell";
import { MetricCard } from "@/components/metric-card";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";

export default function ReportsPage() {
  return <AppShell><div className="space-y-6"><PageHeader title="Reports" eyebrow="Profit-first reporting" description="Revenue, net profit, CAC, CPA, ROAS, LTV, refunds, and audience quality without vanity claims or fake production data." /><section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><MetricCard title="Revenue" value="₱0" status="ledger" /><MetricCard title="Net profit" value="₱0" status="calculated" /><MetricCard title="Refund rate" value="0%" status="payment truth" /><MetricCard title="Audience quality" value="review" status="guarded" /></section><SectionCard title="Reporting foundation" description="Reports remain grounded in payments, costs, refunds, chargebacks, consent-safe eligibility, and approved campaign records." ><div className="rounded-[22px] border border-white/[0.08] bg-[#0D0D0D] p-5 text-sm leading-6 text-white/58">No live ad-platform performance is claimed until real approved connectors exist.</div></SectionCard></div></AppShell>;
}
