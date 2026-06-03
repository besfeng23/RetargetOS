import { StatusChip } from "./status-chip";

export function MetricCard({ title, value, note, status }: { title: string; value: string; note?: string; status?: string }) {
  return (
    <div className="rounded-[24px] border border-white/[0.08] bg-[#0D0D0D] p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-white/58">{title}</p>
        {status ? <StatusChip value={status} /> : null}
      </div>
      <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white/95">{value}</p>
      {note ? <p className="mt-2 text-xs leading-5 text-white/45">{note}</p> : null}
    </div>
  );
}
