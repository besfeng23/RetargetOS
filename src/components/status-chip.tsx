import { clsx } from "clsx";

type Tone = "success" | "warning" | "danger" | "neutral" | "info";

function toneFor(value: string): Tone {
  const normalized = value.toLowerCase();
  if (normalized.includes("not suppressed") || normalized.includes("not_suppressed")) return "success";
  if (["suppressed", "blocked", "revoked", "denied", "chargeback", "failed", "quarantined"].some((word) => normalized.includes(word))) return "danger";
  if (["unknown", "review", "draft", "pending", "missing", "approval", "medium"].some((word) => normalized.includes(word))) return "warning";
  if (["read", "masked", "safe", "ready", "granted", "active", "passed", "low"].some((word) => normalized.includes(word))) return "success";
  if (["info", "sandbox"].some((word) => normalized.includes(word))) return "info";
  return "neutral";
}

const toneClass: Record<Tone, string> = {
  success: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  warning: "border-amber-300/20 bg-amber-300/10 text-amber-100",
  danger: "border-red-300/25 bg-red-400/10 text-red-100",
  neutral: "border-white/10 bg-white/[0.06] text-white/70",
  info: "border-cyan-300/20 bg-cyan-300/10 text-cyan-100",
};

export function StatusChip({ value, tone }: { value: string; tone?: Tone }) {
  return <span className={clsx("inline-flex min-h-8 items-center rounded-full border px-3 py-1 text-xs font-medium", toneClass[tone ?? toneFor(value)])}>{value}</span>;
}

export function RiskChip({ value }: { value: string }) {
  return <StatusChip value={value} tone={value.toLowerCase().includes("low") ? "success" : value.toLowerCase().includes("medium") ? "warning" : "danger"} />;
}
