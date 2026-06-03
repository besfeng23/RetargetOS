import { AppShell } from "@/components/app-shell";
import { ComplianceBanner } from "@/components/compliance-banner";
import { PageHeader } from "@/components/page-header";
import { LiveModule } from "@/components/live/live-module";
import { fetchModuleRows } from "@/lib/supabase/queries";
import { moduleConfigs, type ModuleKey } from "@/lib/supabase/modules";

export async function LiveModulePage({ moduleKey }: { moduleKey: ModuleKey }) {
  const config = moduleConfigs[moduleKey];
  const result = await fetchModuleRows(config);

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader title={config.title} eyebrow={config.eyebrow} description={config.description} />
        <ComplianceBanner title="Live Supabase module" message={`Rows are read from public.${config.table}; mutations write through the Supabase JS client and RLS controls access.`} />
        <LiveModule moduleKey={moduleKey} initialRows={result.rows} initialError={result.error} totalCount={result.count} />
      </div>
    </AppShell>
  );
}
