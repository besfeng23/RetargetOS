import { ApiEndpointPanel } from "@/components/api-endpoint-panel";
import { AppShell } from "@/components/app-shell";
import { ModulePage } from "@/components/module-page";
import { OpsTable } from "@/components/ops-table";
import { consentRows, endpointActions } from "@/lib/mock-data";

const suppressionRules = [
  "Global opt-out blocks all activation.",
  "Email unsubscribe blocks email campaigns and can block matching where required.",
  "Custom audience opt-out blocks Meta, TikTok, Google, X, and lookalike seeds.",
  "Refund, dispute, and chargeback exclusions protect margin.",
  "Deleted or deletion-requested profiles must not be used for marketing.",
];

export default function ConsentSuppressionPage() {
  return (
    <AppShell>
      <ModulePage
        title="Consent & Suppression"
        eyebrow="5 / 12 · Activation gatekeeper"
        description="This page protects the product. Unknown consent blocks activation. Suppression overrides consent, audience rules, AI recommendations, and profit potential."
      >
        <OpsTable rows={consentRows} />

        <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-2xl border border-red-500/20 bg-red-950/20 p-5">
            <p className="text-sm font-semibold text-red-100">Suppression override</p>
            <p className="mt-2 text-sm leading-6 text-red-100/80">A suppressed profile must be excluded from audience sync, campaign launch, AI activation recommendations, email/SMS campaigns, affiliate targeting, marketplace retargeting, and lookalike seed creation.</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
            <p className="text-sm font-semibold text-white">Suppression types to support</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {suppressionRules.map((rule) => (
                <div key={rule} className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-sm text-slate-300">{rule}</div>
              ))}
            </div>
          </div>
        </section>

        <ApiEndpointPanel actions={endpointActions.consent} />
      </ModulePage>
    </AppShell>
  );
}
