import {
  Activity,
  Bot,
  Cable,
  ClipboardCheck,
  Database,
  FileText,
  FileUp,
  Gauge,
  Megaphone,
  Package,
  Palette,
  ReceiptText,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";

export const APP_NAME = "RetargetOS";
export const CURRENT_PHASE = "premium-command-center";

export const riskLevels = ["low", "medium", "high", "blocked", "quarantined"] as const;
export type RiskLevel = (typeof riskLevels)[number];

export const consentStatuses = ["granted", "denied", "unknown", "revoked", "expired", "needs_review"] as const;
export type ConsentStatus = (typeof consentStatuses)[number];

export const suppressionStatuses = ["not_suppressed", "suppressed"] as const;
export type SuppressionStatus = (typeof suppressionStatuses)[number];

export const connectorModes = ["mock", "sandbox", "read_only", "approval_required", "guarded_autopilot"] as const;
export type ConnectorMode = (typeof connectorModes)[number];

export const destinationPlatforms = [
  "meta",
  "tiktok",
  "google",
  "x",
  "shopee",
  "lazada",
  "tiktok_shop",
  "meta_catalog",
  "affiliate_network",
  "payment_provider",
  "speedypay",
  "custom_webhook",
] as const;
export type DestinationPlatform = (typeof destinationPlatforms)[number];

export const navGroups = [
  {
    label: "Growth Command",
    items: [
      { title: "Dashboard", href: "/dashboard", icon: Gauge },
      { title: "AI Copilot", href: "/ai-copilot", icon: Bot },
      { title: "Reports", href: "/reports", icon: FileText },
    ],
  },
  {
    label: "Data",
    items: [
      { title: "Data Sources", href: "/data-sources", icon: Database },
      { title: "Imports", href: "/imports", icon: FileUp },
      { title: "Profiles", href: "/profiles", icon: Users },
      { title: "Consent & Suppression", href: "/consent-suppression", icon: ShieldCheck },
      { title: "Events", href: "/events", icon: Activity },
    ],
  },
  {
    label: "Activation",
    items: [
      { title: "Audiences", href: "/audiences", icon: ClipboardCheck },
      { title: "Destinations", href: "/destinations", icon: Cable },
      { title: "Campaigns", href: "/campaigns", icon: Megaphone },
    ],
  },
  {
    label: "Monetization",
    items: [
      { title: "Creative Studio", href: "/creative-studio", icon: Palette },
      { title: "Products", href: "/products", icon: Package },
      { title: "Offers", href: "/offers", icon: ReceiptText },
    ],
  },
  {
    label: "Governance",
    items: [{ title: "Settings", href: "/settings", icon: Settings }],
  },
];

export const mobilePrimaryRoutes = [
  { title: "Home", href: "/dashboard", icon: Gauge },
  { title: "Audiences", href: "/audiences", icon: ClipboardCheck },
  { title: "Campaigns", href: "/campaigns", icon: Megaphone },
  { title: "Activity", href: "/events", icon: Activity },
] as const;

export const mobileMoreRoutes = [
  { title: "Data Sources", href: "/data-sources", icon: Database },
  { title: "Imports", href: "/imports", icon: FileUp },
  { title: "Profiles", href: "/profiles", icon: Users },
  { title: "Consent & Suppression", href: "/consent-suppression", icon: ShieldCheck },
  { title: "Destinations", href: "/destinations", icon: Cable },
  { title: "Products", href: "/products", icon: Package },
  { title: "Offers", href: "/offers", icon: ReceiptText },
  { title: "Creative Studio", href: "/creative-studio", icon: Palette },
  { title: "Events", href: "/events", icon: Activity },
  { title: "AI Copilot", href: "/ai-copilot", icon: Bot },
  { title: "Settings", href: "/settings", icon: Settings },
] as const;

export const moduleRoutes = navGroups.flatMap((group) => group.items);

export const platformLabel: Record<DestinationPlatform, string> = {
  meta: "Meta / Facebook / Instagram",
  tiktok: "TikTok Ads",
  google: "Google / YouTube",
  x: "X Ads",
  shopee: "Shopee",
  lazada: "Lazada",
  tiktok_shop: "TikTok Shop",
  meta_catalog: "Meta Catalog / Shops",
  affiliate_network: "Affiliate Network",
  payment_provider: "Payment Provider",
  speedypay: "SpeedyPay / Payment Links",
  custom_webhook: "Custom Webhook",
};
