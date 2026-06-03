import { ApiEndpointPanel } from "@/components/api-endpoint-panel";
import { AppShell } from "@/components/app-shell";
import { ModulePage } from "@/components/module-page";
import { OpsTable } from "@/components/ops-table";
import { creativeRows, endpointActions } from "@/lib/mock-data";

const creativeFlow = [
  "Select product / offer",
  "Select consent-safe audience",
  "Select platform and funnel stage",
  "Choose creative angle",
  "Generate draft variants",
  "Run claim and compliance review",
  "Approve before campaign use",
  "Track performance and clone winners",
];

export default function CreativeStudioPage() {
  return (
    <AppShell>
      <ModulePage
        title="Creative Studio"
        eyebrow="9 / 12 · Draft-only creative engine"
        description="Creative Studio turns products, offers, audiences, objections, platform format, and prior performance into draft content. It is not a generic caption generator."
      >
        <OpsTable rows={creativeRows} />

        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
          <p className="text-sm font-semibold text-white">Creative generation flow</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {creativeFlow.map((step, index) => (
              <div key={step} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                <p className="text-xs text-slate-500">Step {index + 1}</p>
                <p className="mt-2 text-sm font-medium text-slate-200">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <ApiEndpointPanel actions={endpointActions.createRecord} />
      </ModulePage>
    </AppShell>
  );
}
