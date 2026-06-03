import { AppShell } from "@/components/app-shell";
import { ActionCard } from "@/components/action-card";
import { ComplianceBanner } from "@/components/compliance-banner";
import { PageHeader } from "@/components/page-header";
import { RecordsView } from "@/components/records-view";
import { SectionCard } from "@/components/section-card";

const recommendations = [
  { recommendation: "Draft 7-day abandoned checkout recovery", expected_impact: "medium", reason: "Checkout intent is high once consent/source gates pass", risk: "medium", confidence: "72%", approval_required: "yes" },
  { recommendation: "Quarantine unknown legacy source", expected_impact: "risk reduction", reason: "Unknown source blocks activation", risk: "high", confidence: "91%", approval_required: "admin" },
  { recommendation: "Create repermission task", expected_impact: "consent recovery", reason: "Unknown consent cannot be activated", risk: "medium", confidence: "68%", approval_required: "yes" },
  { recommendation: "Increase budget", expected_impact: "unknown", reason: "Spend action is blocked by default", risk: "blocked", confidence: "n/a", approval_required: "manual only" },
];
const blocked = ["Spend money", "Upload audiences", "Publish campaigns", "Launch ads", "Change budgets", "Remove suppression"];

export default function AiCopilotPage() {
  return <AppShell><div className="space-y-6"><PageHeader title="AI Copilot" eyebrow="Controlled recommendations" description="AI recommends what to launch, stop, fix, or scale. It can draft and create tasks, but it cannot execute spend, sync, publish, launch, budget, or suppression changes." /><ComplianceBanner title="AI actions are recommendation and draft-only." message="Approval UI can record intent, but execution remains blocked unless approved live backend support exists." /><SectionCard title="Recommendation feed"><RecordsView rows={recommendations} titleKey="recommendation" subtitleKey="reason" /></SectionCard><SectionCard title="Available actions"><div className="grid gap-4 md:grid-cols-4">{["Inspect", "Approve draft", "Reject", "Create task"].map((action)=><ActionCard key={action} title={action} status="approval UI" description="Records review intent only; no spend, sync, publish, or launch happens." />)}</div></SectionCard><SectionCard title="Blocked actions" className="border-red-300/20 bg-red-500/[0.04]"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{blocked.map((action)=><div key={action} className="rounded-2xl border border-red-300/20 bg-red-400/10 p-4 text-sm text-red-50/82">{action}</div>)}</div></SectionCard></div></AppShell>;
}
