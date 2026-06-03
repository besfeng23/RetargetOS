import { Check, CircleAlert, LockKeyhole } from "lucide-react";

export function ReadinessChecklist({ items }: { items: Array<{ label: string; state: "passed" | "warning" | "blocked" }> }) {
  return (
    <div className="space-y-3">
      {items.map((item) => {
        const Icon = item.state === "passed" ? Check : item.state === "warning" ? CircleAlert : LockKeyhole;
        const color = item.state === "passed" ? "text-emerald-200 bg-emerald-400/10 border-emerald-400/20" : item.state === "warning" ? "text-amber-100 bg-amber-300/10 border-amber-300/20" : "text-red-100 bg-red-400/10 border-red-300/20";
        return (
          <div key={item.label} className="flex min-h-12 items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#0D0D0D] px-4 py-3">
            <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full border ${color}`}><Icon className="h-4 w-4" /></span>
            <span className="text-sm text-white/76">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}
