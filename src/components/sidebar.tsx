import Link from "next/link";
import { navGroups } from "@/lib/constants";

export function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-72 border-r border-slate-800 bg-slate-950/90 p-5 lg:block">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">RetargetOS</p>
        <h1 className="mt-2 text-xl font-semibold text-white">Growth Command</h1>
      </div>
      <nav className="space-y-6">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-500">{group.label}</p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-300 hover:bg-slate-900 hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                    {item.title}
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
