import { AppShell } from "@/components/app-shell";
import { ActionCard } from "@/components/action-card";
import { PageHeader } from "@/components/page-header";
import { PrimaryCTA } from "@/components/primary-cta";
import { SectionCard } from "@/components/section-card";

const products = [
  { title: "Glow Starter Kit", description: "Price ₱0 · Cost pending · Gross margin pending · Inventory review · Refund rate pending", status: "low risk" },
  { title: "Comeback Bundle", description: "Price ₱0 · Cost pending · Margin needs validation · Inventory review · Refund rate pending", status: "medium risk" },
  { title: "Premium Consultation", description: "Price ₱0 · Cost pending · High-touch capacity · Refund risk review", status: "review" },
];

export default function ProductsPage() {
  return <AppShell><div className="space-y-6"><PageHeader title="Products" eyebrow="Economics" description="Product cards focus on price, cost, gross margin, inventory, refund rate, and risk before campaigns are prepared." action={<PrimaryCTA>Add Product</PrimaryCTA>} /><SectionCard title="Product economics"><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{products.map((p)=><ActionCard key={p.title} {...p} />)}</div></SectionCard></div></AppShell>;
}
