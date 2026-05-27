import { AppShell } from "@/components/app-shell";
import { ModulePage } from "@/components/module-page";

export default function AiCopilotPage() {
  return (
    <AppShell>
      <ModulePage title="AI Copilot" description="Recommendation and draft mode only. The AI cannot sync audiences, spend money, publish campaigns, change budgets, or remove suppression in Phase 1." />
    </AppShell>
  );
}
