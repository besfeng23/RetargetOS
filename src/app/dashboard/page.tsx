import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/card";
import { ModulePage } from "@/components/module-page";

export default function DashboardPage() {
  return (
    <AppShell>
      <ModulePage title="Dashboard" description="Phase 1 command view for data health, money metrics, and connector status.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <Card title="Revenue" metric="₱0" note="Demo only" />
          <Card title="Net Profit" metric="₱0" note="Demo only" />
          <Card title="Ad Spend" metric="₱0" note="Demo only" />
          <Card title="Consent-safe Profiles" metric="2,430" note="Mock" />
          <Card title="Suppressed Profiles" metric="412" note="Excluded" />
          <Card title="Quarantined Records" metric="86" note="Blocked" />
        </div>
      </ModulePage>
    </AppShell>
  );
}
