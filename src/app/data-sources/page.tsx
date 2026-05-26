import { AppShell } from "@/components/app-shell";
import { ModulePage } from "@/components/module-page";
import { RiskBadge } from "@/components/risk-badge";

export default function DataSourcesPage() {
  return (
    <AppShell>
      <ModulePage title="Data Sources" description="Source registry for ownership, risk, allowed use, and import readiness.">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-white">Demo customer CSV</p>
              <p className="text-sm text-slate-400">CSV upload · mock source · consent review required</p>
            </div>
            <RiskBadge value="medium" />
          </div>
        </div>
      </ModulePage>
    </AppShell>
  );
}
