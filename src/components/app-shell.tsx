import type * as React from "react";
import { DeveloperDiagnosticsDrawer } from "./developer-diagnostics-drawer";
import { MobileNav } from "./mobile-nav";
import { Sidebar } from "./sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <MobileNav />
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <main className="mx-auto w-full max-w-[1500px] px-4 pb-28 pt-5 sm:px-6 lg:px-8 lg:py-8">{children}</main>
        </div>
      </div>
      <DeveloperDiagnosticsDrawer />
    </div>
  );
}
