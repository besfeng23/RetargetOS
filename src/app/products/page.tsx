import { ApiEndpointPanel } from "@/components/api-endpoint-panel";
import { AppShell } from "@/components/app-shell";
import { ModulePage } from "@/components/module-page";
import { OpsTable } from "@/components/ops-table";
import { endpointActions, productOfferRows } from "@/lib/mock-data";

export default function ProductsPage() {
  return (
    <AppShell>
      <ModulePage
        title="Products"
        eyebrow="8 / 12 · Product economics"
        description="Product catalog foundation for price, cost, margin, inventory, media, marketplace links, and profit-based offer matching. Products must be tied to profit, not just catalog display."
      >
        <OpsTable rows={productOfferRows.filter((row) => row.type === "product")} />

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
            <p className="font-semibold text-white">Required economics</p>
            <p className="mt-2 text-sm text-slate-400">Price, cost, gross margin, inventory status, refund rate, shipping/payment cost, and net profit impact.</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
            <p className="font-semibold text-white">Activation fit</p>
            <p className="mt-2 text-sm text-slate-400">Connect products to product viewers, add-to-cart users, buyers, repeat buyers, lapsed buyers, and marketplace activity.</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
            <p className="font-semibold text-white">Inventory guardrail</p>
            <p className="mt-2 text-sm text-slate-400">Do not scale campaigns into low stock, bad margin, high return risk, or unclear fulfillment capacity.</p>
          </div>
        </div>

        <ApiEndpointPanel actions={endpointActions.createRecord} />
      </ModulePage>
    </AppShell>
  );
}
