import { ApiEndpointPanel } from "@/components/api-endpoint-panel";
import { AppShell } from "@/components/app-shell";
import { ModulePage } from "@/components/module-page";
import { OpsTable } from "@/components/ops-table";
import { dataSourceRows, endpointActions } from "@/lib/mock-data";

export default function DataSourcesPage() {
  return (
    <AppShell>
      <ModulePage
        title="Data Sources"
        eyebrow="2 / 12 · Source registry"
        description="Register every source before import. Source, owner, risk, allowed use, and consent assumptions must be explicit because unknown source blocks activation."
      >
        <OpsTable rows={dataSourceRows} />

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
            <p className="font-semibold text-white">Required fields</p>
            <p className="mt-2 text-sm text-slate-400">Name, source type, category, owner, system, risk level, contains PII, consent default, allowed use, allowed destinations.</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
            <p className="font-semibold text-white">Blocked sources</p>
            <p className="mt-2 text-sm text-slate-400">Purchased, scraped, unknown, minors, sensitive category, or unproven data must be quarantined or deleted.</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
            <p className="font-semibold text-white">Activation rule</p>
            <p className="mt-2 text-sm text-slate-400">A source does not become usable just because it exists. Consent and suppression still decide activation.</p>
          </div>
        </div>

        <ApiEndpointPanel actions={endpointActions.dataSources} />
      </ModulePage>
    </AppShell>
  );
}
