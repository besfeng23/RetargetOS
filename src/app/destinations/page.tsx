import { AppShell } from "@/components/app-shell";
import { ModulePage } from "@/components/module-page";

export default function DestinationsPage() {
  return (
    <AppShell>
      <ModulePage title="Destinations" description="Mock connector cards only. No live platform sync, tokens, OAuth, audience upload, or external API calls exist in Phase 1.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {["Meta", "TikTok", "Google", "X"].map((name) => (
            <div key={name} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
              <p className="font-semibold text-white">{name}</p>
              <p className="mt-2 text-sm text-slate-400">Mock connector only. No live platform sync occurred.</p>
            </div>
          ))}
        </div>
      </ModulePage>
    </AppShell>
  );
}
