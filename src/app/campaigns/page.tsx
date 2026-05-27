import { AppShell } from "@/components/app-shell";
import { ModulePage } from "@/components/module-page";

export default function CampaignsPage() {
  return (
    <AppShell>
      <ModulePage title="Campaigns" description="Campaign drafts, review states, tracking setup, and approval gates. Launching and budget changes are disabled in Phase 1." />
    </AppShell>
  );
}
