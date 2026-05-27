import type { AudienceValidationInput, MockConnector, DestinationPlatform } from "./types";

function createMockConnector(platform: DestinationPlatform): MockConnector {
  return {
    platform,
    validateAudience(input: AudienceValidationInput) {
      const blockedReasons: string[] = [];
      if (input.eligibleCount <= 0) blockedReasons.push("no_eligible_profiles");
      if (input.suppressedCount > 0) blockedReasons.push("suppressed_profiles_excluded");
      if (input.missingConsentCount > 0) blockedReasons.push("missing_consent_excluded");
      return {
        valid: input.eligibleCount > 0,
        blockedReasons,
        message: "Mock validation only. No live platform sync occurred.",
      };
    },
    createMockSyncJob(input: AudienceValidationInput) {
      const valid = input.eligibleCount > 0;
      return {
        platform,
        status: valid ? "mock_completed" : "blocked",
        message: "Mock connector only. No live platform sync occurred.",
      };
    },
    fetchMockHealth() {
      return {
        platform,
        mode: "mock",
        connected: false,
        message: "Mock connector only. No live platform account is connected.",
      };
    },
  };
}

export const mockConnectors = {
  meta: createMockConnector("meta"),
  tiktok: createMockConnector("tiktok"),
  google: createMockConnector("google"),
  x: createMockConnector("x"),
};
