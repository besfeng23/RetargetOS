import type * as React from "react";
import { StatusChip } from "./status-chip";

export function PageHeader({ title, description, eyebrow, action }: { title: string; description?: string; eyebrow?: string; action?: React.ReactNode }) {
  return (
    <header className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div className="min-w-0">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <StatusChip value="Operator workspace" tone="neutral" />
          <StatusChip value="Mock connectors only" tone="warning" />
          {eyebrow ? <StatusChip value={eyebrow} tone="info" /> : null}
        </div>
        <h1 className="text-[32px] font-semibold tracking-[-0.05em] text-white/95 sm:text-4xl lg:text-[42px]">{title}</h1>
        {description ? <p className="mt-3 max-w-3xl text-[15px] leading-7 text-white/60">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  );
}
