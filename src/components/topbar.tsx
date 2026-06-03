export function Topbar() {
  return (
    <header className="flex min-h-16 flex-col justify-center gap-3 border-b border-slate-800 bg-slate-950/70 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">RetargetOS MVP command shell</p>
        <p className="text-sm text-slate-300">Connected to Neuro Supabase · JWT/RLS required · live data guarded by approval gates</p>
      </div>
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-200">Server-side writes</span>
        <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-amber-200">No live ad sync</span>
      </div>
    </header>
  );
}
