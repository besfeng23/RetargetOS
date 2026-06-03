import type * as React from "react";
import { EmptyState } from "./empty-state";
import { PageHeader } from "./page-header";
import { SectionCard } from "./section-card";

export function ModulePage({ title, eyebrow = "Command center", description, children }: { title: string; eyebrow?: string; description: string; children?: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <PageHeader title={title} eyebrow={eyebrow} description={description} />
      <SectionCard>{children ?? <EmptyState title="Premium module shell" message="This route is preserved and styled for RetargetOS governance and reporting workflows." />}</SectionCard>
    </div>
  );
}
