export type EligibilityInput = {
  exists: boolean;
  deleted?: boolean;
  globallySuppressed?: boolean;
  requiredConsentGranted?: boolean;
  sourceStatus?: "known" | "unknown" | "quarantined";
  destinationAllowed?: boolean;
  validIdentifier?: boolean;
  restrictedCategory?: boolean;
};

export type EligibilityResult = {
  eligible: boolean;
  blockedReasons: string[];
  warnings: string[];
};

export function evaluateActivationEligibility(input: EligibilityInput): EligibilityResult {
  const blockedReasons: string[] = [];
  const warnings: string[] = [];

  if (!input.exists) blockedReasons.push("profile_missing");
  if (input.deleted) blockedReasons.push("profile_deleted");
  if (input.globallySuppressed) blockedReasons.push("global_suppression_active");
  if (!input.requiredConsentGranted) blockedReasons.push("required_consent_not_granted");
  if (input.sourceStatus === "unknown") blockedReasons.push("source_unknown");
  if (input.sourceStatus === "quarantined") blockedReasons.push("source_quarantined");
  if (!input.destinationAllowed) blockedReasons.push("destination_not_allowed");
  if (!input.validIdentifier) blockedReasons.push("valid_identifier_missing");
  if (input.restrictedCategory) blockedReasons.push("restricted_category_risk");

  if (input.sourceStatus === "unknown") warnings.push("Review source before analysis or activation.");
  if (!input.validIdentifier) warnings.push("Audience size may not equal syncable size.");

  return {
    eligible: blockedReasons.length === 0,
    blockedReasons,
    warnings,
  };
}
