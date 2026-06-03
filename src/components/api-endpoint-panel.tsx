import { retargetosFunctions } from "@/lib/retargetos-config";
import type { ActionEndpoint } from "@/lib/live-types";

export function ApiEndpointPanel({ actions }: { actions: ActionEndpoint[] }) {
  return (
    <div className="rounded-[24px] border border-white/[0.08] bg-[#070707] p-5">
      <p className="text-sm font-semibold text-white/90">Developer diagnostics</p>
      <p className="mt-1 text-sm text-white/50">Server function wiring only. Operators see this inside diagnostics, not primary workflows.</p>
      <div className="mt-4 space-y-3">
        {actions.map((action) => (
          <div key={`${action.endpoint}-${action.label}`} className="rounded-2xl border border-white/[0.08] bg-[#0D0D0D] p-4">
            <p className="text-sm font-medium text-white/84">{action.method} · {action.label}</p>
            <p className="mt-2 break-all text-xs text-white/42">{retargetosFunctions[action.endpoint]}</p>
            <p className="mt-2 text-sm text-white/55">{action.purpose}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
