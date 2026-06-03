import { AppShell } from "@/components/app-shell";
import { ActionCard } from "@/components/action-card";
import { ComplianceBanner } from "@/components/compliance-banner";
import { PageHeader } from "@/components/page-header";
import { PrimaryCTA } from "@/components/primary-cta";
import { ReadinessChecklist } from "@/components/readiness-checklist";
import { RecordsView } from "@/components/records-view";
import { SectionCard } from "@/components/section-card";

const campaigns = [
  { campaign: "Abandoned Checkout Recovery", platform: "Meta + TikTok mock", audience: "7-day abandoned checkout", offer: "Comeback bundle", creative: "proof card", budget: "₱0", status: "draft", approval_state: "required", readiness_score: "62" },
  { campaign: "Lapsed Buyer Winback", platform: "Email / Meta mock", audience: "existing buyers", offer: "repermission incentive", creative: "value note", budget: "₱0", status: "prepare", approval_state: "required", readiness_score: "48" },
];

export default function CampaignsPage() {
  return <AppShell><div className="space-y-6"><PageHeader title="Campaigns" eyebrow="Launch control" description="Campaigns are prepared and approval-gated. No launch button implies real ad launching without live connector support." action={<PrimaryCTA>Request Approval</PrimaryCTA>} /><ComplianceBanner title="No real launch action is available." message="Use Prepare or Request Approval. AI and operators cannot spend, publish, upload audiences, or change budgets without approved live connector support." /><SectionCard title="Campaign drafts"><RecordsView rows={campaigns} titleKey="campaign" subtitleKey="platform" /></SectionCard><SectionCard title="Launch gate checklist"><ReadinessChecklist items={[{ label: "Audience validated", state: "warning" }, { label: "Consent passed", state: "passed" }, { label: "Suppression applied", state: "passed" }, { label: "Tracking ready", state: "warning" }, { label: "Creative approved", state: "warning" }, { label: "Human approval recorded", state: "blocked" }]} /></SectionCard><SectionCard title="Operator actions"><div className="grid gap-4 md:grid-cols-3"><ActionCard title="Prepare" status="allowed" description="Prepare a campaign draft and keep all sync/spend actions disabled." /><ActionCard title="Request approval" status="approval required" description="Ask a human approver to review readiness, compliance, creative, and spend intent." /><ActionCard title="Launch" status="blocked" description="Hidden from the product flow until real connector support and approval records exist." /></div></SectionCard></div></AppShell>;
}
