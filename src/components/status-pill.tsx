export function StatusPill({ value }: { value: string }) {
  const normalized = value.toLowerCase();
  const className = normalized.includes("blocked") || normalized.includes("suppressed") || normalized.includes("high")
    ? "border-red-500/30 bg-red-500/10 text-red-200"
    : normalized.includes("medium") || normalized.includes("review") || normalized.includes("draft")
      ? "border-amber-500/30 bg-amber-500/10 text-amber-200"
      : normalized.includes("unknown")
        ? "border-slate-600 bg-slate-800/70 text-slate-300"
        : "border-emerald-500/30 bg-emerald-500/10 text-emerald-200";

  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${className}`}>
      {value}
    </span>
  );
}
