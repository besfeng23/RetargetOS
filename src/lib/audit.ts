export type AuditAction =
  | "data_import"
  | "consent_change"
  | "suppression_change"
  | "audience_preview"
  | "mock_sync_job"
  | "ai_recommendation_generated";

export function maskForAudit(value: string) {
  if (!value) return "";
  if (value.length <= 6) return "***";
  return `${value.slice(0, 2)}***${value.slice(-2)}`;
}

export function createAuditMetadata(input: Record<string, unknown>) {
  return {
    ...input,
    note: "Phase 1 audit metadata. Do not include raw personal data or secrets.",
  };
}
