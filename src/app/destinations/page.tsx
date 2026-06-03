import { AppShell } from "@/components/app-shell";
import { ActionCard } from "@/components/action-card";
import { ComplianceBanner } from "@/components/compliance-banner";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatusChip } from "@/components/status-chip";

const destinations = ["Meta", "TikTok", "Google", "X", "Payment provider"];

export default function DestinationsPage() {
  return <AppShell><div className="space-y-6"><PageHeader title="Destinations" eyebrow="Mock sync hub" description="Connector readiness is visible without implying live ad-platform uploads. Every connector remains mock or approval-gated." /><ComplianceBanner title="Mock connector only. No live platform sync occurred." message="Destination cards can draft sync jobs and show blockers; they do not upload audiences to live platforms." /><SectionCard title="Connector hub"><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{destinations.map((name)=><ActionCard key={name} title={name} meta="Destination" status="mock" description="Supported actions: readiness review, draft mapping, mock sync job, audit note."><div className="grid gap-2 text-sm text-white/58"><span>Last sync: never</span><span>Readiness blockers: consent preview, suppression exclusions, human approval</span><StatusChip value="Mock connector only. No live platform sync occurred." tone="warning" /></div></ActionCard>)}</div></SectionCard></div></AppShell>;
}
