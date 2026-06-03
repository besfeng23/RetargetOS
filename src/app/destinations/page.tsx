import { ApiEndpointPanel } from "@/components/api-endpoint-panel";
import { AppShell } from "@/components/app-shell";
import { ModulePage } from "@/components/module-page";
import { OpsTable } from "@/components/ops-table";
import { destinationRows, endpointActions } from "@/lib/mock-data";

export default function DestinationsPage() {
  return (
    <AppShell>
      <ModulePage
        title="Destinations / Mock Sync"
        eyebrow="7 / 12 · Connector hub"
        description="Destination cards are mock-mode only until official API credentials, permission review, audience validation, suppression sync, and approval workflows are complete."
      >
        <OpsTable rows={destinationRows} />

        <div className="rounded-2xl border border-amber-500/20 bg-amber-950/20 p-5">
          <p className="text-sm font-semibold text-amber-100">Mock sync warning</p>
          <p className="mt-2 text-sm leading-6 text-amber-100/80">A mock sync job proves the workflow only. It does not upload records to Meta, TikTok, Google, X, Shopee, Lazada, affiliate networks, or payment providers.</p>
        </div>

        <ApiEndpointPanel actions={endpointActions.destinations} />
      </ModulePage>
    </AppShell>
  );
}
