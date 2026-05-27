import { AppShell } from "@/components/app-shell";
import { ModulePage } from "@/components/module-page";

export default function ProductsPage() {
  return (
    <AppShell>
      <ModulePage title="Products" description="Product catalog foundation for price, cost, margin, inventory, media, and profit-based offer matching." />
    </AppShell>
  );
}
