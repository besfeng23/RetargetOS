import { AppShell } from "@/components/app-shell";
import { ComplianceBanner } from "@/components/compliance-banner";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatusChip } from "@/components/status-chip";

export default function SettingsPage() {
  return <AppShell><div className="space-y-6"><PageHeader title="Settings" eyebrow="Governance" description="Workspace controls for permissions, connector modes, approval rules, audit policy, diagnostics, and consent/suppression defaults." /><ComplianceBanner /><SectionCard title="Governance defaults"><div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">{["Unknown consent blocks activation", "Unknown source quarantines data", "Suppression overrides all rules", "Mock sync labels required"].map((rule)=><div key={rule} className="rounded-2xl border border-white/[0.08] bg-[#0D0D0D] p-4 text-sm text-white/72">{rule}</div>)}</div></SectionCard><SectionCard title="Diagnostics"><div className="flex flex-wrap gap-2"><StatusChip value="Available from floating desktop drawer" /><StatusChip value="No secrets shown" tone="success" /><StatusChip value="JWT server writes" tone="warning" /></div></SectionCard></div></AppShell>;
}
