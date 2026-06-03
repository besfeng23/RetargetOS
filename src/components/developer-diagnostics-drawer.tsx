"use client";

import { useState } from "react";
import { Bug, X } from "lucide-react";
import { retargetosFunctions } from "@/lib/retargetos-config";

export function DeveloperDiagnosticsDrawer() {
  const [open, setOpen] = useState(false);
  const entries = Object.entries(retargetosFunctions);
  return (
    <>
      <button onClick={() => setOpen(true)} className="fixed bottom-24 right-4 z-30 hidden min-h-11 items-center gap-2 rounded-full border border-white/10 bg-[#0D0D0D] px-4 text-xs text-white/60 shadow-2xl lg:inline-flex" aria-label="Open diagnostics"><Bug className="h-4 w-4" />Diagnostics</button>
      {open ? (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="absolute bottom-0 right-0 top-0 w-full max-w-xl overflow-y-auto border-l border-white/[0.08] bg-black p-5 premium-scrollbar sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xl font-semibold text-white/95">Developer diagnostics</p>
                <p className="mt-2 text-sm leading-6 text-white/55">Server function wiring is intentionally outside the operator flow. JWT-authenticated server writes only; no service-role keys or secrets are shown.</p>
              </div>
              <button onClick={() => setOpen(false)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06]"><X className="h-5 w-5" /></button>
            </div>
            <div className="mt-6 space-y-3">
              {entries.map(([key, value]) => (
                <div key={key} className="rounded-2xl border border-white/[0.08] bg-[#070707] p-4">
                  <p className="text-sm font-medium text-white/82">{key}</p>
                  <p className="mt-2 break-all text-xs leading-5 text-white/42">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
