import type { AudienceValidationInput, DestinationPlatform, GuardedConnector } from "./types";

function createGuardedConnector(platform: DestinationPlatform): GuardedConnector {
  return {
    platform,
    validateAudience(input: AudienceValidationInput) {
      const blockedReasons: string[] = [];
      if (input.eligibleCount <= 0) blockedReasons.push("no_eligible_profiles");
      if (input.suppressedCount > 0) blockedReasons.push("suppressed_profiles_excluded");
      if (input.missingConsentCount > 0) blockedReasons.push("missing_consent_excluded");
      return {
        valid: blockedReasons.length === 0,
        blockedReasons,
        message: "Audience validation is approval-gated before any destination sync.",
      };
    },
    createSyncJob(input: AudienceValidationInput) {
      const valid = input.eligibleCount > 0 && input.suppressedCount === 0 && input.missingConsentCount === 0;
      return {
        platform,
        status: valid ? "approval_required" : "blocked",
        message: valid ? "Sync job is queued for human approval." : "Sync job is blocked by eligibility gates.",
      };
    },
    fetchHealth() {
      return {
        platform,
        mode: "approval_required",
        connected: false,
        message: "Connector execution requires an approved live destination configuration.",
      };
    },
  };
}

export const guardedConnectors = {
  meta: createGuardedConnector("meta"),
  tiktok: createGuardedConnector("tiktok"),
  google: createGuardedConnector("google"),
  x: createGuardedConnector("x"),
};
