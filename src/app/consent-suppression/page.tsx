import { AppShell } from "@/components/app-shell";
import { ModulePage } from "@/components/module-page";

export default function ConsentSuppressionPage() {
  return (
    <AppShell>
      <ModulePage title="Consent & Suppression" description="Governance page for consent status, opt-outs, exclusions, and activation blocking rules." />
    </AppShell>
  );
}
