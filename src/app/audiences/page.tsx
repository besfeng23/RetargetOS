import { AppShell } from "@/components/app-shell";
import { ModulePage } from "@/components/module-page";
import { RiskBadge } from "@/components/risk-badge";

export default function AudiencesPage() {
  return (
    <AppShell>
      <ModulePage title="Audiences" description="Audience previews must show total, eligible, excluded, suppressed, missing-consent, destination eligibility, and risk before any sync.">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
          <div className="grid gap-4 text-sm text-slate-300 md:grid-cols-6">
            <div><p className="text-slate-500">Audience</p><p className="font-medium text-white">30-day hot leads</p></div>
            <div><p className="text-slate-500">Total</p><p>2,430</p></div>
            <div><p className="text-slate-500">Eligible</p><p>1,710</p></div>
            <div><p className="text-slate-500">Suppressed</p><p>196</p></div>
            <div><p className="text-slate-500">Missing consent</p><p>388</p></div>
            <div><p className="text-slate-500">Risk</p><RiskBadge value="medium" /></div>
          </div>
        </div>
      </ModulePage>
    </AppShell>
  );
}
