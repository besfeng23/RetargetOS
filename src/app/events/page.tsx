import { ApiEndpointPanel } from "@/components/api-endpoint-panel";
import { AppShell } from "@/components/app-shell";
import { ModulePage } from "@/components/module-page";
import { OpsTable } from "@/components/ops-table";
import { endpointActions, eventRows } from "@/lib/mock-data";

const trackingChecks = [
  "Unique event_id / deduplication key",
  "UTM source, medium, campaign, content, term",
  "Click IDs: fbclid, gclid, ttclid, xclid",
  "Profile or anonymous ID",
  "Consent snapshot",
  "Value and currency for money events",
  "Refund and chargeback events",
  "Server-side forwarding disabled until allowed",
];

export default function EventsPage() {
  return (
    <AppShell>
      <ModulePage
        title="Events"
        eyebrow="11 / 12 · Attribution layer"
        description="Events prove what people did, where they came from, what they clicked, what they bought, and whether revenue is real. Payment truth beats vanity attribution."
      >
        <OpsTable rows={eventRows} />

        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
          <p className="text-sm font-semibold text-white">Event quality checklist</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {trackingChecks.map((check) => (
              <div key={check} className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-sm text-slate-300">
                {check}
              </div>
            ))}
          </div>
        </div>

        <ApiEndpointPanel actions={endpointActions.events} />
      </ModulePage>
    </AppShell>
  );
}
