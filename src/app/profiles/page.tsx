import { ApiEndpointPanel } from "@/components/api-endpoint-panel";
import { AppShell } from "@/components/app-shell";
import { ModulePage } from "@/components/module-page";
import { OpsTable } from "@/components/ops-table";
import { endpointActions, profileRows } from "@/lib/mock-data";

export default function ProfilesPage() {
  return (
    <AppShell>
      <ModulePage
        title="Profiles"
        eyebrow="4 / 12 · Masked identity graph"
        description="Deduplicated customers, leads, buyers, and anonymous-to-known profiles. Raw PII stays out of the UI; this page shows only operational state, lifecycle, consent, suppression, and risk."
      >
        <OpsTable rows={profileRows} />

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
            <p className="font-semibold text-white">Identity keys</p>
            <p className="mt-2 text-sm text-slate-400">Email hash, phone hash, payment customer ID, marketplace buyer ID, device/cookie hash, and click IDs. IP alone never merges a profile.</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
            <p className="font-semibold text-white">Lifecycle state</p>
            <p className="mt-2 text-sm text-slate-400">Lead, warm lead, hot lead, buyer, repeat buyer, VIP, inactive, churn risk, or suppressed.</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
            <p className="font-semibold text-white">PII rule</p>
            <p className="mt-2 text-sm text-slate-400">Only masked identifiers should appear here. Revealing raw PII requires permission and audit logging.</p>
          </div>
        </div>

        <ApiEndpointPanel actions={endpointActions.profiles} />
      </ModulePage>
    </AppShell>
  );
}
