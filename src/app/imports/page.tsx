import { AppShell } from "@/components/app-shell";
import { ModulePage } from "@/components/module-page";

export default function ImportsPage() {
  return (
    <AppShell>
      <ModulePage title="Imports" description="Import flow: upload, preview, map, validate, detect PII, dedupe, classify source, assign consent, confirm, and audit." />
    </AppShell>
  );
}
