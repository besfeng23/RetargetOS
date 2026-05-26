type Risk = "low" | "medium" | "high" | "blocked" | "quarantined" | string;

const styles: Record<string, string> = {
  low: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
  medium: "border-amber-500/30 bg-amber-500/10 text-amber-200",
  high: "border-orange-500/30 bg-orange-500/10 text-orange-200",
  blocked: "border-red-500/30 bg-red-500/10 text-red-200",
  quarantined: "border-slate-500/30 bg-slate-500/10 text-slate-200",
};

export function RiskBadge({ value }: { value: Risk }) {
  const key = String(value).toLowerCase();
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${styles[key] ?? styles.quarantined}`}>
      {String(value).replaceAll("_", " ")}
    </span>
  );
}
