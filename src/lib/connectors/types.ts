export type DestinationPlatform = "meta" | "tiktok" | "google" | "x";

export type ConnectorHealth = {
  platform: DestinationPlatform;
  mode: "sandbox" | "read_only" | "approval_required" | "guarded_autopilot";
  connected: boolean;
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

export type SyncJob = {
  platform: DestinationPlatform;
  status: "queued" | "approval_required" | "blocked";
  message: string;
};

export type GuardedConnector = {
  platform: DestinationPlatform;
  validateAudience(input: AudienceValidationInput): AudienceValidationResult;
  createSyncJob(input: AudienceValidationInput): SyncJob;
  fetchHealth(): ConnectorHealth;
};
