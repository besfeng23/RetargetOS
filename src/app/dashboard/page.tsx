import { ApiEndpointPanel } from "@/components/api-endpoint-panel";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/card";
import { ModulePage } from "@/components/module-page";
import { OpsTable } from "@/components/ops-table";
import { dashboardMetrics, endpointActions, audienceRows, campaignRows } from "@/lib/mock-data";
import { nonNegotiableRules } from "@/lib/retargetos-config";

export default function DashboardPage() {
  return (
    <AppShell>
      <ModulePage
        title="Dashboard"
        eyebrow="1 / 12 · Revenue command"
        description="Money, data health, consent safety, audience readiness, and next action. This page is wired to the RetargetOS dashboard Edge Function and must never become a vanity dashboard."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {dashboardMetrics.map((metric) => (
            <Card key={metric.title} title={metric.title} metric={metric.metric} note={metric.note} />
          ))}
        </div>

        <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Best immediate opportunity</h2>
              <p className="mt-1 text-sm text-slate-400">Launch only after consent, suppression, destination eligibility, tracking, and approval checks pass.</p>
            </div>
            <OpsTable rows={audienceRows.slice(0, 3)} />
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
            <p className="text-sm font-semibold text-white">Operating rules</p>
            <div className="mt-4 space-y-3">
              {nonNegotiableRules.map((rule) => (
                <div key={rule} className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-sm text-slate-300">
                  {rule}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Campaign draft queue</h2>
          <OpsTable rows={campaignRows} />
        </section>

        <ApiEndpointPanel actions={endpointActions.dashboard} />
      </ModulePage>
    </AppShell>
  );
}
