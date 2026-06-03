import { ApiEndpointPanel } from "@/components/api-endpoint-panel";
import { AppShell } from "@/components/app-shell";
import { ModulePage } from "@/components/module-page";
import { OpsTable } from "@/components/ops-table";
import { endpointActions, importRows } from "@/lib/mock-data";

const steps = [
  "Upload or register source file",
  "Preview rows and detect PII",
  "Map fields to RetargetOS schema",
  "Validate email, phone, source, and consent",
  "Deduplicate and classify risk",
  "Quarantine unsafe rows",
  "Confirm import and write audit log",
];

export default function ImportsPage() {
  return (
    <AppShell>
      <ModulePage
        title="Imports"
        eyebrow="3 / 12 · Controlled ingestion"
        description="CSV and historical data must pass mapping, validation, consent defaults, quarantine rules, and audit logging before it can create profiles or audiences."
      >
        <OpsTable rows={importRows} />

        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
          <p className="text-sm font-semibold text-white">Import workflow</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                <p className="text-xs text-slate-500">Step {index + 1}</p>
                <p className="mt-2 text-sm font-medium text-slate-200">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <ApiEndpointPanel actions={endpointActions.imports} />
      </ModulePage>
    </AppShell>
  );
}
