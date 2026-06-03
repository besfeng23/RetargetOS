import { AppShell } from "@/components/app-shell";
import { ComplianceBanner } from "@/components/compliance-banner";
import { MetricCard } from "@/components/metric-card";
import { PageHeader } from "@/components/page-header";
import { PrimaryCTA } from "@/components/primary-cta";
import { ReadinessChecklist } from "@/components/readiness-checklist";
import { RecordsView } from "@/components/records-view";
import { SectionCard } from "@/components/section-card";

const batches = [
  { batch: "batch_demo_customers", status: "mapping required", total_rows: "0", accepted: "0", duplicates: "0", missing_consent: "0", suppressed: "0", quarantined: "pending" },
  { batch: "batch_old_leads", status: "needs review", total_rows: "0", accepted: "0", duplicates: "0", missing_consent: "0", suppressed: "0", quarantined: "high risk" },
];
const steps = ["Select source", "Upload/register file", "Map fields", "Consent/risk review", "Quarantine preview", "Confirm import"];

export default function ImportsPage() {
  return <AppShell><div className="space-y-6"><PageHeader title="Imports" eyebrow="Guided workflow" description="Import work is staged, reviewed, and quarantined before profiles can influence activation." action={<PrimaryCTA>Start Import</PrimaryCTA>} /><ComplianceBanner title="Safe stub: no real CSV processing is added in this UI pass." message="Import states are operator previews unless existing backend support processes a batch server-side." /><SectionCard title="Import wizard"><div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">{steps.map((step, i) => <div key={step} className="rounded-[22px] border border-white/[0.08] bg-[#0D0D0D] p-4"><p className="text-xs text-white/40">Step {i + 1}</p><p className="mt-2 text-sm font-medium text-white/82">{step}</p></div>)}</div></SectionCard><section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[{title:"Total rows",value:"0"},{title:"Accepted",value:"0"},{title:"Invalid identifiers",value:"0"},{title:"Quarantined",value:"0",status:"review"}].map((m)=><MetricCard key={m.title} note="Awaiting reviewed import batch." {...m}/>)}</section><SectionCard title="Batch preview"><RecordsView rows={batches} titleKey="batch" subtitleKey="status" /></SectionCard><SectionCard title="Activation checks"><ReadinessChecklist items={[{ label: "Source selected and trusted", state: "warning" }, { label: "Fields mapped without raw PII exposure", state: "passed" }, { label: "Missing consent quarantined", state: "passed" }, { label: "Suppressed records excluded", state: "passed" }]} /></SectionCard></div></AppShell>;
}
