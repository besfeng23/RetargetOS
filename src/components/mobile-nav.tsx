"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";
import { mobileMoreRoutes, mobilePrimaryRoutes } from "@/lib/constants";

export function MobileMoreSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black lg:hidden">
      <div className="flex min-h-screen flex-col p-4 pb-28">
        <div className="flex min-h-14 items-center justify-between">
          <div>
            <p className="text-lg font-semibold text-white/95">More</p>
            <p className="text-xs text-white/45">Operator modules and governance</p>
          </div>
          <button onClick={onClose} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white" aria-label="Close menu"><X className="h-5 w-5" /></button>
        </div>
        <div className="mt-6 grid gap-3 overflow-y-auto premium-scrollbar">
          {mobileMoreRoutes.map((item) => {
            const Icon = item.icon;
            return <Link onClick={onClose} key={item.href} href={item.href} className="flex min-h-14 items-center gap-4 rounded-[22px] border border-white/[0.08] bg-[#070707] px-4 text-white/82"><Icon className="h-5 w-5 text-white/48" />{item.title}</Link>;
          })}
        </div>
      </div>
    </div>
  );
}

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <>
      <MobileMoreSheet open={open} onClose={() => setOpen(false)} />
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.08] bg-black/92 px-2 pb-[max(env(safe-area-inset-bottom),8px)] pt-2 backdrop-blur-xl lg:hidden">
        <div className="mx-auto grid max-w-lg grid-cols-5 gap-1">
          {mobilePrimaryRoutes.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || (pathname === "/" && item.href === "/dashboard");
            return <Link key={item.href} href={item.href} className={clsx("flex min-h-14 flex-col items-center justify-center rounded-2xl text-[11px]", active ? "bg-white/[0.09] text-white" : "text-white/46")}><Icon className="mb-1 h-5 w-5" />{item.title}</Link>;
          })}
          <button onClick={() => setOpen(true)} className="flex min-h-14 flex-col items-center justify-center rounded-2xl text-[11px] text-white/46"><Menu className="mb-1 h-5 w-5" />More</button>
        </div>
      </nav>
    </>
  );
}
