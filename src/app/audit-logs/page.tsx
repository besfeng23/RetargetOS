import { AppShell } from "@/components/app-shell";
import { ModulePage } from "@/components/module-page";

export default function AuditLogsPage() {
  return (
    <AppShell>
      <ModulePage title="Audit Logs" description="Sensitive actions must be recorded, including imports, consent changes, suppression changes, audience previews, mock sync jobs, and AI recommendations." />
    </AppShell>
  );
}
