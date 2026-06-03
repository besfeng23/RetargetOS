import type * as React from "react";
import { clsx } from "clsx";

export function SectionCard({ title, description, children, className }: { title?: string; description?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={clsx("rounded-[26px] border border-white/[0.08] bg-[#070707] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:p-6", className)}>
      {title ? <h2 className="text-xl font-semibold tracking-[-0.025em] text-white/95">{title}</h2> : null}
      {description ? <p className="mt-2 text-sm leading-6 text-white/55">{description}</p> : null}
      <div className={title || description ? "mt-5" : undefined}>{children}</div>
    </section>
  );
}
