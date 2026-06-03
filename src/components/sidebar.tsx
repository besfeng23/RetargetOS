"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { navGroups } from "@/lib/constants";

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden min-h-screen w-72 shrink-0 border-r border-white/[0.08] bg-black px-4 py-6 lg:block">
      <div className="mb-8 rounded-[24px] border border-white/[0.08] bg-[#070707] p-5">
        <p className="text-sm font-semibold text-white/90">RetargetOS</p>
        <p className="mt-2 text-xs leading-5 text-white/45">First-party data activation, monetization, and approval-gated growth command.</p>
      </div>
      <nav className="space-y-7">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="mb-2 px-3 text-xs font-medium text-white/36">{group.label}</p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href || (pathname === "/" && item.href === "/dashboard");
                return (
                  <Link key={item.href} href={item.href} className={clsx("flex min-h-11 items-center gap-3 rounded-2xl px-3 text-sm transition", active ? "border border-white/12 bg-white/[0.08] text-white" : "text-white/56 hover:bg-white/[0.05] hover:text-white/86")}>
                    <Icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
