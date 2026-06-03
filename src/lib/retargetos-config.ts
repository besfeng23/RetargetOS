export const RETARGETOS_PROJECT_REF = "qlzcqzqbcjioweatllhi";
export const RETARGETOS_FUNCTION_BASE_URL = `https://${RETARGETOS_PROJECT_REF}.supabase.co/functions/v1`;

export const retargetosFunctions = {
  dashboard: `${RETARGETOS_FUNCTION_BASE_URL}/retargetos-api/dashboard`,
  createWorkspace: `${RETARGETOS_FUNCTION_BASE_URL}/retargetos-api/create-workspace`,
  dataSource: `${RETARGETOS_FUNCTION_BASE_URL}/retargetos-api/data-source`,
  audience: `${RETARGETOS_FUNCTION_BASE_URL}/retargetos-api/audience`,
  event: `${RETARGETOS_FUNCTION_BASE_URL}/retargetos-api/event`,
  consent: `${RETARGETOS_FUNCTION_BASE_URL}/retargetos-consent`,
  importBatch: `${RETARGETOS_FUNCTION_BASE_URL}/retargetos-import`,
  profile: `${RETARGETOS_FUNCTION_BASE_URL}/retargetos-profile`,
  suppression: `${RETARGETOS_FUNCTION_BASE_URL}/rt-suppress`,
  syncJob: `${RETARGETOS_FUNCTION_BASE_URL}/rt-sync-job`,
  createRecord: `${RETARGETOS_FUNCTION_BASE_URL}/rt-create`,
} as const;

export const buildOrder = [
  "Dashboard",
  "Data Sources",
  "Imports",
  "Profiles",
  "Consent & Suppression",
  "Audiences",
  "Destinations / Guarded Sync",
  "Products / Offers",
  "Creative Studio",
  "Campaigns",
  "Events",
  "AI Copilot",
] as const;

export const nonNegotiableRules = [
  "Suppression overrides everything.",
  "Unknown consent blocks activation.",
  "Unknown source blocks activation.",
  "No raw PII in logs or client-visible tables.",
  "Destination sync requires approved live connector support.",
  "AI can recommend and draft, but cannot spend, publish, upload, or remove suppression without approval.",
] as const;

export type EndpointKey = keyof typeof retargetosFunctions;
