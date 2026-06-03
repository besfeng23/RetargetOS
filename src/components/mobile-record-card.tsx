import { StatusChip } from "./status-chip";

function isChip(label: string) {
  return ["risk", "status", "consent", "suppression", "mode", "approval", "quality", "quarantine", "readiness"].some((word) => label.toLowerCase().includes(word));
}

export function MobileRecordCard({ title, subtitle, fields }: { title: string; subtitle?: string; fields: Array<{ label: string; value: string }> }) {
  return (
    <article className="rounded-[24px] border border-white/[0.08] bg-[#0D0D0D] p-5 md:hidden">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-white/92">{title}</h3>
        {subtitle ? <p className="mt-1 text-sm text-white/50">{subtitle}</p> : null}
      </div>
      <div className="space-y-3">
        {fields.map((field) => (
          <div key={field.label} className="flex items-center justify-between gap-4 border-t border-white/[0.06] pt-3">
            <span className="text-xs text-white/42">{field.label}</span>
            <span className="text-right text-sm text-white/76">{isChip(field.label) ? <StatusChip value={field.value} /> : field.value}</span>
          </div>
        ))}
      </div>
    </article>
  );
}
