import { AppShell } from "@/components/app-shell";
import { ActionCard } from "@/components/action-card";
import { ComplianceBanner } from "@/components/compliance-banner";
import { MetricCard } from "@/components/metric-card";
import { PageHeader } from "@/components/page-header";
import { PrimaryCTA } from "@/components/primary-cta";
import { RecordsView } from "@/components/records-view";
import { SectionCard } from "@/components/section-card";

const presets = ["7-day abandoned checkout", "30-day hot leads", "14-day product viewers", "existing buyers", "high-LTV buyers", "needs repermission"];
const audiences = [
  { audience: "7-day abandoned checkout", total: "0", eligible: "0", missing_consent: "0", suppressed: "0", invalid_identifiers: "0", restricted_source: "0", status: "draft" },
  { audience: "Needs repermission", total: "0", eligible: "0", missing_consent: "0", suppressed: "0", invalid_identifiers: "0", restricted_source: "0", status: "review" },
];
const flow = ["Choose preset", "Define rules", "Define exclusions", "Preview eligibility", "Destination fit", "Save draft"];

export default function AudiencesPage() {
  return <AppShell><div className="space-y-6"><PageHeader title="Audiences" eyebrow="Consent-safe builder" description="Build profit-focused segments that respect source trust, consent, identifier quality, and suppression before destination fit." action={<PrimaryCTA>Save Draft</PrimaryCTA>} /><ComplianceBanner /><SectionCard title="Builder flow"><div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">{flow.map((step)=><div key={step} className="rounded-[22px] border border-white/[0.08] bg-[#0D0D0D] p-4 text-sm text-white/76">{step}</div>)}</div></SectionCard><SectionCard title="Presets"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{presets.map((preset)=><ActionCard key={preset} title={preset} status="draft" description="Preset is a starting point only; eligibility preview must pass before activation." />)}</div></SectionCard><section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">{["total","eligible","missing consent","suppressed","invalid identifiers","restricted source"].map((x)=><MetricCard key={x} title={x} value="0" status={x.includes("suppressed")||x.includes("missing")||x.includes("restricted")?"blocker":"preview"} />)}</section><SectionCard title="Eligibility preview"><RecordsView rows={audiences} titleKey="audience" subtitleKey="status" /></SectionCard></div></AppShell>;
}
