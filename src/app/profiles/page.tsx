import { AppShell } from "@/components/app-shell";
import { ModulePage } from "@/components/module-page";

export default function ProfilesPage() {
  return (
    <AppShell>
      <ModulePage title="Profiles" description="Deduplicated customer and lead records with masked display only." />
    </AppShell>
  );
}
