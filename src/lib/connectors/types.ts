export type DestinationPlatform = "meta" | "tiktok" | "google" | "x";

export type MockHealth = {
  platform: DestinationPlatform;
  mode: "mock";
  connected: false;
  message: string;
};

export type AudienceValidationInput = {
  audienceName: string;
  eligibleCount: number;
  suppressedCount: number;
  missingConsentCount: number;
};

export type AudienceValidationResult = {
  valid: boolean;
  blockedReasons: string[];
  message: string;
};

export type MockSyncJob = {
  platform: DestinationPlatform;
  status: "mock_completed" | "blocked";
  message: string;
};

export type MockConnector = {
  platform: DestinationPlatform;
  validateAudience(input: AudienceValidationInput): AudienceValidationResult;
  createMockSyncJob(input: AudienceValidationInput): MockSyncJob;
  fetchMockHealth(): MockHealth;
};
