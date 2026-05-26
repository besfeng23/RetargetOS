import { EmptyState } from "./empty-state";

export function ModulePage({
  title,
  eyebrow = "Phase 1 foundation",
  description,
  children,
}: {
  title: string;
  eyebrow?: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-500">{eyebrow}</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">{title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">{description}</p>
      </section>
      {children ?? <EmptyState title="Foundation placeholder" message="This module is present in navigation and ready for the next implementation slice." />}
    </div>
  );
}
