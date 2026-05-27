export function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950/70 px-6">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Phase 1 foundation</p>
        <p className="text-sm text-slate-300">Mock-only command center</p>
      </div>
      <div className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">
        Live connectors disabled
      </div>
    </header>
  );
}
