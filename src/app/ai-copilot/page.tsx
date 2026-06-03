import { ApiEndpointPanel } from "@/components/api-endpoint-panel";
import { AppShell } from "@/components/app-shell";
import { ModulePage } from "@/components/module-page";
import { OpsTable } from "@/components/ops-table";
import { aiRows, endpointActions } from "@/lib/mock-data";

const modes = [
  "Read-only Analyst",
  "Recommendation Mode",
  "Draft Builder Mode",
  "Approval Mode",
  "Guarded Autopilot later only",
];

const blockedActions = [
  "Upload dirty or unclear data",
  "Ignore opt-outs or suppression",
  "Spend money without approval",
  "Publish campaigns without approval",
  "Expose raw PII or tokens",
  "Pretend mock sync is live sync",
];

export default function AiCopilotPage() {
  return (
    <AppShell>
      <ModulePage
        title="AI Copilot"
        eyebrow="12 / 12 · Controlled intelligence"
        description="The AI Copilot recommends what to launch, stop, fix, or scale, but it cannot upload audiences, publish content, spend money, change budgets, or remove suppression without approval."
      >
        <OpsTable rows={aiRows} />

        <section className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
            <p className="text-sm font-semibold text-white">Allowed modes</p>
            <div className="mt-4 space-y-3">
              {modes.map((mode) => (
                <div key={mode} className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-sm text-slate-300">{mode}</div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-red-500/20 bg-red-950/20 p-5">
            <p className="text-sm font-semibold text-red-100">Blocked by default</p>
            <div className="mt-4 space-y-3">
              {blockedActions.map((action) => (
                <div key={action} className="rounded-xl border border-red-500/20 bg-red-950/30 p-3 text-sm text-red-100/80">{action}</div>
              ))}
            </div>
          </div>
        </section>

        <ApiEndpointPanel actions={endpointActions.createRecord} />
      </ModulePage>
    </AppShell>
  );
}
