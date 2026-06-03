import { ApiEndpointPanel } from "@/components/api-endpoint-panel";
import { AppShell } from "@/components/app-shell";
import { ModulePage } from "@/components/module-page";
import { OpsTable } from "@/components/ops-table";
import { audienceRows, endpointActions } from "@/lib/mock-data";

const presets = [
  "7-day abandoned checkout",
  "30-day hot leads",
  "14-day product viewers",
  "Existing buyers suppression",
  "High-LTV buyers",
  "Needs repermission",
];

export default function AudiencesPage() {
  return (
    <AppShell>
      <ModulePage
        title="Audiences"
        eyebrow="6 / 12 · Consent-safe segments"
        description="Build audiences from clean, consent-safe, suppression-safe profiles. Always show usable count, not vanity total size."
      >
        <OpsTable rows={audienceRows} />

        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
          <p className="text-sm font-semibold text-white">MVP audience presets</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {presets.map((preset) => (
              <div key={preset} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                <p className="text-sm font-medium text-slate-200">{preset}</p>
                <p className="mt-2 text-xs text-slate-500">Requires consent, suppression, identifier, and destination eligibility checks.</p>
              </div>
            ))}
          </div>
        </div>

        <ApiEndpointPanel actions={endpointActions.audiences} />
      </ModulePage>
    </AppShell>
  );
}
