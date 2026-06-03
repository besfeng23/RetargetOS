import type * as React from "react";
import { StatusChip } from "./status-chip";

export function ActionCard({ title, description, meta, status, children }: { title: string; description: string; meta?: string; status?: string; children?: React.ReactNode }) {
  return (
    <article className="rounded-[24px] border border-white/[0.08] bg-[#0D0D0D] p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          {meta ? <p className="text-xs text-white/42">{meta}</p> : null}
          <h3 className="mt-1 text-lg font-semibold tracking-[-0.02em] text-white/92">{title}</h3>
        </div>
        {status ? <StatusChip value={status} /> : null}
      </div>
      <p className="mt-3 text-sm leading-6 text-white/58">{description}</p>
      {children ? <div className="mt-4">{children}</div> : null}
    </article>
  );
}
