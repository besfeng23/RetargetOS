import { AppShell } from "@/components/app-shell";
import { ModulePage } from "@/components/module-page";

export default function SettingsPage() {
  return (
    <AppShell>
      <ModulePage title="Settings" description="Workspace controls for permissions, connector modes, approval rules, audit policy, and governance defaults." />
    </AppShell>
  );
}
