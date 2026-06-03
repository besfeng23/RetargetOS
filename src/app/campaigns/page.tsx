import { ApiEndpointPanel } from "@/components/api-endpoint-panel";
import { AppShell } from "@/components/app-shell";
import { ModulePage } from "@/components/module-page";
import { OpsTable } from "@/components/ops-table";
import { campaignRows, endpointActions } from "@/lib/mock-data";

const launchGates = [
  "Audience validation complete",
  "Consent check passed",
  "Suppression exclusions applied",
  "Tracking links / UTMs generated",
  "Budget confirmed",
  "Creative approved",
  "Human approval recorded",
];

export default function CampaignsPage() {
  return (
    <AppShell>
      <ModulePage
        title="Campaigns"
        eyebrow="10 / 12 · Approval-gated drafts"
        description="Campaigns are draft-first. Launching, budget changes, audience sync, and publishing stay disabled until approval and real connector modes exist."
      >
        <OpsTable rows={campaignRows} />

        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
          <p className="text-sm font-semibold text-white">Launch gates</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {launchGates.map((gate) => (
              <div key={gate} className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-sm text-slate-300">{gate}</div>
            ))}
          </div>
        </div>

        <ApiEndpointPanel actions={endpointActions.createRecord} />
      </ModulePage>
    </AppShell>
  );
}
