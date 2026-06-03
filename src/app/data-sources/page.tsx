import { AppShell } from "@/components/app-shell";
import { ComplianceBanner } from "@/components/compliance-banner";
import { PageHeader } from "@/components/page-header";
import { PrimaryCTA } from "@/components/primary-cta";
import { RecordsView } from "@/components/records-view";
import { SectionCard } from "@/components/section-card";
import { StatusChip } from "@/components/status-chip";

const sources = [
  { name: "Merchant customer CSV", type: "CSV upload", risk: "medium", consent_default: "needs review", allowed_use: "Profile matching", last_import: "Not imported" },
  { name: "Payment provider export", type: "Payment data", risk: "high", consent_default: "transactional", allowed_use: "Attribution + buyer segmentation", last_import: "Not imported" },
  { name: "Meta ad history", type: "Ad platform export", risk: "low", consent_default: "aggregate", allowed_use: "Campaign learning", last_import: "Not imported" },
  { name: "Unknown legacy leads", type: "Legacy database", risk: "blocked", consent_default: "unknown", allowed_use: "Quarantine / repermission only", last_import: "Blocked" },
];

export default function DataSourcesPage() {
  return (
    <AppShell><div className="space-y-6">
      <PageHeader title="Data Sources" eyebrow="Source trust" description="Register where first-party data came from, who owns it, how risky it is, and which uses are allowed before activation." action={<PrimaryCTA>Add Data Source</PrimaryCTA>} />
      <ComplianceBanner title="Unknown source blocks activation." message="Sources without trust, owner, consent defaults, and allowed uses are quarantined until reviewed." />
      <div className="flex flex-wrap gap-2"><StatusChip value="Total 4" /><StatusChip value="Active 2" tone="success" /><StatusChip value="Needs Review 1" tone="warning" /><StatusChip value="Quarantined 1" tone="danger" /></div>
      <SectionCard title="Source registry" description="Mobile uses cards; desktop uses a clean table with the same guarded state."><RecordsView rows={sources} titleKey="name" subtitleKey="type" /></SectionCard>
      <SectionCard title="Add / edit source sheet" description="Form fields for source type, owner, risk, consent default, allowed uses, allowed destinations, and notes are staged here as an operator-safe UI stub.">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{["Source type", "Owner", "Risk level", "Consent default", "Allowed uses", "Allowed destinations", "Notes"].map((field) => <div key={field} className="min-h-12 rounded-2xl border border-white/[0.08] bg-[#0D0D0D] px-4 py-3 text-sm text-white/62">{field}</div>)}</div>
      </SectionCard>
    </div></AppShell>
  );
}
