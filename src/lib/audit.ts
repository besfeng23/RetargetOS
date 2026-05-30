import { getPrisma } from "@/lib/prisma";

export type AuditAction =
  | "data_import"
  | "consent_change"
  | "suppression_change"
  | "audience_preview"
  | "mock_sync_job"
  | "ai_recommendation_generated"
  | "data_source_created"
  | "data_source_updated"
  | "data_source_status_changed"
  | "data_source_deleted";

const blockedKeyParts = ["credential", "auth", "pass", "api", "contact", "mobile"];

export function maskForAudit(value: string) {
  if (!value) return "";
  if (value.length <= 6) return "***";
  return `${value.slice(0, 2)}***${value.slice(-2)}`;
}

export function sanitizeAuditMetadata(input: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(input).filter(([key, value]) => {
      const lowerKey = key.toLowerCase();
      if (blockedKeyParts.some((part) => lowerKey.includes(part))) return false;
      return typeof value !== "function";
    })
  );
}

export function createAuditMetadata(input: Record<string, unknown>) {
  return {
    ...sanitizeAuditMetadata(input),
    note: "Phase 1 audit metadata. Do not include private identifiers or credentials.",
  };
}

export async function createAuditLog({
  workspaceId,
  actorUserId,
  action,
  entityType,
  entityId,
  metadataJson,
}: {
  workspaceId: string;
  actorUserId?: string | null;
  action: AuditAction;
  entityType: string;
  entityId?: string | null;
  metadataJson?: Record<string, unknown>;
}) {
  const prisma = (await getPrisma()) as {
    auditLog: {
      create: (args: unknown) => Promise<unknown>;
    };
  };

  return prisma.auditLog.create({
    data: {
      workspaceId,
      actorUserId,
      action,
      entityType,
      entityId,
      metadataJson: metadataJson ? sanitizeAuditMetadata(metadataJson) : undefined,
    },
  });
}
