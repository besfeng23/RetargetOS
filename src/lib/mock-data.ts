import type { EndpointKey } from "./retargetos-config";

export type Metric = {
  title: string;
  metric: string;
  note: string;
};

export type TableRow = Record<string, string>;

export type ActionEndpoint = {
  label: string;
  endpoint: EndpointKey;
  method: "GET" | "POST";
  purpose: string;
};

export const dashboardMetrics: Metric[] = [
  { title: "Payment Revenue", metric: "₱0", note: "From rt_payments once events/payments are recorded" },
  { title: "Net Profit", metric: "₱0", note: "Revenue minus costs, fees, refunds, ad spend" },
  { title: "Consent-safe Profiles", metric: "0", note: "Unknown consent is blocked" },
  { title: "Suppressed Profiles", metric: "0", note: "Excluded from every activation path" },
  { title: "Mock Sync Jobs", metric: "0", note: "No live platform upload occurred" },
  { title: "Pending AI Actions", metric: "0", note: "Draft/recommendation only" },
];

export const dataSourceRows: TableRow[] = [
  { source: "Merchant customer CSV", type: "CSV Upload", risk: "medium", consent: "needs review", use: "Import + profile matching" },
  { source: "Payment provider export", type: "Payment Data", risk: "high", consent: "transactional", use: "Attribution + buyer segmentation" },
  { source: "Meta ad history", type: "Ad Platform Export", risk: "low", consent: "aggregate", use: "Creative/campaign learning" },
  { source: "Unknown legacy leads", type: "Legacy Database", risk: "blocked", consent: "unknown", use: "Quarantine / repermission only" },
];

export const importRows: TableRow[] = [
  { batch: "batch_demo_customers", status: "mapping_required", rows: "0", quarantine: "pending", audit: "required" },
  { batch: "batch_old_leads", status: "needs_review", rows: "0", quarantine: "high-risk", audit: "required" },
  { batch: "batch_payments", status: "draft", rows: "0", quarantine: "none yet", audit: "required" },
];

export const profileRows: TableRow[] = [
  { profile: "prof_demo_001", stage: "repeat_buyer", consent: "granted", suppression: "not_suppressed", pii: "masked" },
  { profile: "prof_demo_002", stage: "hot_lead", consent: "unknown", suppression: "blocked", pii: "masked" },
  { profile: "prof_demo_003", stage: "buyer", consent: "granted", suppression: "chargeback", pii: "masked" },
];

export const consentRows: TableRow[] = [
  { type: "custom_audience_activation", status: "granted", action: "eligible after suppression check", risk: "low" },
  { type: "retargeting", status: "unknown", action: "block activation", risk: "high" },
  { type: "sms_marketing", status: "revoked", action: "suppress SMS", risk: "blocked" },
  { type: "data_deletion_requested", status: "active", action: "stop processing workflow", risk: "blocked" },
];

export const audienceRows: TableRow[] = [
  { audience: "7-day abandoned checkout", total: "0", eligible: "0", suppressed: "0", destination: "Meta/TikTok mock", status: "draft" },
  { audience: "30-day hot leads", total: "0", eligible: "0", suppressed: "0", destination: "Meta/TikTok mock", status: "draft" },
  { audience: "High-LTV buyers", total: "0", eligible: "0", suppressed: "0", destination: "Lookalike seed review", status: "needs approval" },
  { audience: "Needs repermission", total: "0", eligible: "0", suppressed: "0", destination: "Email only if lawful", status: "review" },
];

export const destinationRows: TableRow[] = [
  { platform: "Meta / Instagram", mode: "mock", status: "not connected", action: "create mock sync job" },
  { platform: "TikTok Ads", mode: "mock", status: "not connected", action: "create mock sync job" },
  { platform: "Google / YouTube", mode: "mock", status: "not connected", action: "eligibility review" },
  { platform: "SpeedyPay / Payment Links", mode: "mock", status: "not connected", action: "payment attribution test" },
];

export const productOfferRows: TableRow[] = [
  { name: "Glow Starter Kit", type: "product", margin: "needs cost", risk: "low", action: "create product" },
  { name: "Comeback Bundle", type: "merchant offer", margin: "needs validation", risk: "medium", action: "create offer" },
  { name: "Affiliate Finance Lead", type: "affiliate", margin: "payout-based", risk: "high", action: "compliance review" },
];

export const creativeRows: TableRow[] = [
  { asset: "Abandoned checkout proof ad", platform: "Meta", stage: "hot", status: "draft", risk: "medium" },
  { asset: "TikTok UGC demo script", platform: "TikTok", stage: "warm", status: "draft", risk: "low" },
  { asset: "Repermission email", platform: "Email", stage: "repermission", status: "review_needed", risk: "high" },
];

export const campaignRows: TableRow[] = [
  { campaign: "Abandoned Checkout Recovery", platform: "Meta + TikTok", budget: "₱0", status: "draft", approval: "required" },
  { campaign: "Lapsed Buyer Winback", platform: "Email / Meta", budget: "₱0", status: "draft", approval: "required" },
  { campaign: "Suppression Refresh", platform: "All", budget: "₱0", status: "guarded", approval: "system-safe" },
];

export const eventRows: TableRow[] = [
  { event: "PageView", source: "web pixel", quality: "low until session/click id", use: "retargeting seed" },
  { event: "InitiateCheckout", source: "checkout", quality: "high with profile/payment", use: "abandoned checkout" },
  { event: "Purchase", source: "payment webhook", quality: "highest", use: "payment truth" },
  { event: "OptOut", source: "unsubscribe", quality: "system-critical", use: "suppression" },
];

export const aiRows: TableRow[] = [
  { recommendation: "Launch 7-day abandoned checkout recovery", mode: "draft", risk: "medium", approval: "required" },
  { recommendation: "Quarantine old unknown leads", mode: "recommendation", risk: "high", approval: "admin" },
  { recommendation: "Clone winning proof creative", mode: "draft", risk: "low", approval: "review" },
  { recommendation: "Increase budget", mode: "blocked by default", risk: "high", approval: "manual only" },
];

export const endpointActions: Record<string, ActionEndpoint[]> = {
  dashboard: [{ label: "Load dashboard", endpoint: "dashboard", method: "POST", purpose: "Fetch money, profile, audience, campaign, and AI counts" }],
  dataSources: [{ label: "Create data source", endpoint: "dataSource", method: "POST", purpose: "Register source, risk, consent default, and allowed uses" }],
  imports: [{ label: "Create import batch", endpoint: "importBatch", method: "POST", purpose: "Create server-side import batch shell" }],
  profiles: [{ label: "Create profile", endpoint: "profile", method: "POST", purpose: "Create masked operational profile" }],
  consent: [
    { label: "Add consent record", endpoint: "consent", method: "POST", purpose: "Append consent ledger entry" },
    { label: "Add suppression", endpoint: "suppression", method: "POST", purpose: "Suppress profile or identifier server-side" },
  ],
  audiences: [{ label: "Create audience", endpoint: "audience", method: "POST", purpose: "Create draft audience rules" }],
  destinations: [{ label: "Create mock sync", endpoint: "mockSync", method: "POST", purpose: "Create mock sync job with no live upload" }],
  createRecord: [{ label: "Create record", endpoint: "createRecord", method: "POST", purpose: "Create product, offer, creative, campaign, payment, or AI recommendation" }],
  events: [{ label: "Ingest event", endpoint: "event", method: "POST", purpose: "Store event with UTM/click ID attribution fields" }],
};
