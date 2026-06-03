import { retargetosFunctions } from "@/lib/retargetos-config";
import type { ActionEndpoint } from "@/lib/mock-data";

export function ApiEndpointPanel({ actions }: { actions: ActionEndpoint[] }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-white">Server function wiring</p>
          <p className="mt-1 text-sm text-slate-400">Use JWT-authenticated Supabase Edge Functions. Do not write sensitive tables directly from the client.</p>
        </div>
        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">JWT required</span>
      </div>
      <div className="mt-4 space-y-3">
        {actions.map((action) => (
          <div key={`${action.endpoint}-${action.label}`} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-slate-800 px-2 py-1 text-xs font-semibold text-slate-300">{action.method}</span>
              <p className="font-medium text-white">{action.label}</p>
            </div>
            <p className="mt-2 text-xs text-slate-500">{retargetosFunctions[action.endpoint]}</p>
            <p className="mt-2 text-sm text-slate-400">{action.purpose}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
