import { AppShell } from "@/components/app-shell";
import { ActionCard } from "@/components/action-card";
import { ComplianceBanner } from "@/components/compliance-banner";
import { PageHeader } from "@/components/page-header";
import { PrimaryCTA } from "@/components/primary-cta";
import { SectionCard } from "@/components/section-card";
import { StatusChip } from "@/components/status-chip";

const flow = ["Product/Offer", "Audience", "Platform", "Objective", "Creative Angle", "Generate Variants", "Compliance Review", "Human Approval"];
const assets = [
  { title: "Checkout recovery proof card", meta: "Meta · hot funnel · proof angle", status: "draft", description: "Premium static concept with compliance notes and human approval required before use." },
  { title: "UGC problem/solution script", meta: "TikTok · warm funnel · demonstration", status: "review", description: "Draft-only script variant; no publishing or spend action is available." },
  { title: "Repermission value note", meta: "Email · repermission · trust angle", status: "high risk", description: "Requires lawful basis and suppression-safe recipient rules before any activation." },
];

export default function CreativeStudioPage() {
  return <AppShell><div className="space-y-6"><PageHeader title="Creative Studio" eyebrow="Draft engine" description="A premium creative command surface for assets, angles, stages, approval, and compliance risk — not a generic caption generator." action={<PrimaryCTA>Generate Draft Variants</PrimaryCTA>} /><ComplianceBanner title="Draft-only creative workflow." message="AI can recommend and draft variants, but cannot publish, launch, change budgets, upload audiences, or bypass compliance review." /><SectionCard className="bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.10),transparent_35%),#070707]" title="Creative approval flow"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{flow.map((step, i)=><div key={step} className="rounded-[24px] border border-white/[0.08] bg-black/55 p-5"><p className="text-xs text-white/36">{String(i+1).padStart(2,"0")}</p><p className="mt-3 text-base font-medium text-white/86">{step}</p></div>)}</div></SectionCard><SectionCard title="Asset previews"><div className="grid gap-4 md:grid-cols-3">{assets.map((asset)=><ActionCard key={asset.title} {...asset}><div className="aspect-[4/5] rounded-[24px] border border-white/[0.08] bg-gradient-to-br from-white/[0.10] via-white/[0.03] to-black p-4"><StatusChip value="visual draft" tone="neutral" /></div></ActionCard>)}</div></SectionCard></div></AppShell>;
}
