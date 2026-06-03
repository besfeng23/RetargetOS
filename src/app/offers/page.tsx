import { ApiEndpointPanel } from "@/components/api-endpoint-panel";
import { AppShell } from "@/components/app-shell";
import { ModulePage } from "@/components/module-page";
import { OpsTable } from "@/components/ops-table";
import { endpointActions, productOfferRows } from "@/lib/mock-data";

export default function OffersPage() {
  return (
    <AppShell>
      <ModulePage
        title="Offers"
        eyebrow="8 / 12 · Offer economics"
        description="Offer library foundation for products, bundles, merchant campaigns, affiliate offers, payout, approval rate, refund risk, and audience fit. High payout does not equal good profit."
      >
        <OpsTable rows={productOfferRows} />

        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
          <p className="text-sm font-semibold text-white">Offer score inputs</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {[
              "Audience fit",
              "Gross margin / payout",
              "Conversion rate",
              "Approval rate",
              "Refund risk",
              "Compliance risk",
              "Landing page quality",
              "Payout delay",
            ].map((item) => (
              <div key={item} className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-sm text-slate-300">{item}</div>
            ))}
          </div>
        </div>

        <ApiEndpointPanel actions={endpointActions.createRecord} />
      </ModulePage>
    </AppShell>
  );
}
