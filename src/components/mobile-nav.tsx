import Link from "next/link";
import { moduleRoutes } from "@/lib/constants";

export function MobileNav() {
  return (
    <div className="border-b border-slate-800 bg-slate-950 p-3 lg:hidden">
      <div className="mb-3">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-500">RetargetOS</p>
        <p className="text-sm font-semibold text-white">MVP Flow</p>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {moduleRoutes.map((item) => (
          <Link key={item.href} href={item.href} className="shrink-0 rounded-full border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-slate-300">
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
