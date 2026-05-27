import { AppShell } from "@/components/app-shell";
import { ModulePage } from "@/components/module-page";

export default function EventsPage() {
  return (
    <AppShell>
      <ModulePage title="Events" description="Event collection and attribution foundation. Server-side forwarding is disabled until consent, suppression, validation, and queues are implemented." />
    </AppShell>
  );
}
