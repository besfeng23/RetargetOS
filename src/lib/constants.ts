import {
  Activity,
  Bot,
  Cable,
  ClipboardCheck,
  Database,
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
export const CURRENT_PHASE = "mvp-command-shell";

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
    label: "RetargetOS Build Flow",
    items: [
      { title: "1. Dashboard", href: "/dashboard", icon: Gauge },
      { title: "2. Data Sources", href: "/data-sources", icon: Database },
      { title: "3. Imports", href: "/imports", icon: FileUp },
      { title: "4. Profiles", href: "/profiles", icon: Users },
      { title: "5. Consent & Suppression", href: "/consent-suppression", icon: ShieldCheck },
      { title: "6. Audiences", href: "/audiences", icon: ClipboardCheck },
      { title: "7. Destinations / Mock Sync", href: "/destinations", icon: Cable },
      { title: "8A. Products", href: "/products", icon: Package },
      { title: "8B. Offers", href: "/offers", icon: ReceiptText },
      { title: "9. Creative Studio", href: "/creative-studio", icon: Palette },
      { title: "10. Campaigns", href: "/campaigns", icon: Megaphone },
      { title: "11. Events", href: "/events", icon: Activity },
      { title: "12. AI Copilot", href: "/ai-copilot", icon: Bot },
    ],
  },
  {
    label: "System",
    items: [{ title: "Settings", href: "/settings", icon: Settings }],
  },
];

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
