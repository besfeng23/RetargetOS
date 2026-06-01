export const TEMP_WORKSPACE_ID = "workspace_phase_1_default";

export const dataSourceTypes = [
  "csv_upload",
  "api_connector",
  "manual_entry",
  "webhook",
  "event_sdk",
  "ad_platform_export",
  "marketplace_export",
  "payment_provider_export",
  "crm_export",
  "email_platform_export",
  "sms_platform_export",
  "affiliate_network_export",
] as const;

export const dataSourceStatuses = ["active", "paused", "needs_review", "quarantined", "deprecated", "deleted"] as const;

export const dataSourceRiskLevels = ["low", "medium", "high", "blocked", "quarantined"] as const;

export const dataSourceAllowedUses = [
  "analytics_only",
  "profile_enrichment",
  "audience_building",
  "custom_audience_sync",
  "email_marketing",
  "sms_marketing",
  "marketplace_retargeting",
  "affiliate_offer_targeting",
  "lookalike_seed",
  "suppression_only",
  "do_not_use",
  "unknown_needs_review",
] as const;

export type DataSourceType = (typeof dataSourceTypes)[number];
export type DataSourceStatus = (typeof dataSourceStatuses)[number];
export type DataSourceRiskLevel = (typeof dataSourceRiskLevels)[number];
export type DataSourceAllowedUse = (typeof dataSourceAllowedUses)[number];

export type DataSourceRecord = {
  id: string;
  workspaceId: string;
  name: string;
  type: string;
  description: string | null;
  sourceOwner: string | null;
  riskLevel: DataSourceRiskLevel;
  allowedUse: string;
  status: string;
  lastImportedAt: Date | string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type DataSourceListFilters = {
  status?: string;
  riskLevel?: string;
  type?: string;
  search?: string;
};

export type CreateDataSourceInput = {
  name: string;
  type: DataSourceType;
  description?: string;
  sourceOwner?: string;
  riskLevel?: DataSourceRiskLevel;
  allowedUse?: DataSourceAllowedUse;
  status?: DataSourceStatus;
};

export type UpdateDataSourceInput = Partial<CreateDataSourceInput>;

export const dataSourceTypeLabels: Record<DataSourceType, string> = {
  csv_upload: "CSV upload",
  api_connector: "API connector",
  manual_entry: "Manual entry",
  webhook: "Webhook",
  event_sdk: "Event SDK",
  ad_platform_export: "Ad platform export",
  marketplace_export: "Marketplace export",
  payment_provider_export: "Payment provider export",
  crm_export: "CRM export",
  email_platform_export: "Email platform export",
  sms_platform_export: "SMS platform export",
  affiliate_network_export: "Affiliate network export",
};
