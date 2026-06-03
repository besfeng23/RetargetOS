import { AppShell } from "@/components/app-shell";
import { ActionCard } from "@/components/action-card";
import { PageHeader } from "@/components/page-header";
import { PrimaryCTA } from "@/components/primary-cta";
import { SectionCard } from "@/components/section-card";

const offers = [
  { title: "Comeback bundle margin offer", description: "Type: merchant bundle · Payout/margin pending · Conversion rate unknown · Refund risk medium · Audience fit: lapsed buyers", status: "review" },
  { title: "Repermission incentive", description: "Type: consent recovery · Margin controlled · Restrictions: lawful contact only · Audience fit: needs repermission", status: "guarded" },
  { title: "Affiliate finance lead", description: "Type: affiliate · Payout based · Conversion rate unknown · Refund/compliance risk high · Audience fit restricted", status: "high risk" },
];

export default function OffersPage() {
  return <AppShell><div className="space-y-6"><PageHeader title="Offers" eyebrow="Commercial matching" description="Match offers to eligible audiences with payout, margin, conversion, refund risk, restrictions, and fit visible up front." action={<PrimaryCTA>Add Offer</PrimaryCTA>} /><SectionCard title="Offer library"><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{offers.map((offer)=><ActionCard key={offer.title} {...offer} />)}</div></SectionCard></div></AppShell>;
}
