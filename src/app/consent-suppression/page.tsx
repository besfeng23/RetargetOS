import { AppShell } from "@/components/app-shell";
import { ComplianceBanner } from "@/components/compliance-banner";
import { PageHeader } from "@/components/page-header";
import { RecordsView } from "@/components/records-view";
import { SectionCard } from "@/components/section-card";
import { StatusChip } from "@/components/status-chip";

const consent = [
  { consent_type: "custom audience activation", status: "granted", source: "Merchant CSV", timestamp: "2026-06-03", jurisdiction: "PH", expiry: "2027-06-03" },
  { consent_type: "retargeting", status: "unknown", source: "Unknown legacy leads", timestamp: "not recorded", jurisdiction: "unknown", expiry: "blocked" },
  { consent_type: "sms marketing", status: "revoked", source: "Preference center", timestamp: "2026-05-22", jurisdiction: "PH", expiry: "revoked" },
];
const suppression = [
  { suppression_type: "global opt out", reason: "user opt out", applies_to: "all destinations", active_status: "active", source: "Preference center", timestamp: "2026-05-22" },
  { suppression_type: "chargeback", reason: "payment dispute", applies_to: "paid media", active_status: "active", source: "Payment ledger", timestamp: "2026-05-30" },
];

export default function ConsentSuppressionPage() {
  return <AppShell><div className="space-y-6"><PageHeader title="Consent & Suppression" eyebrow="Gatekeeper" description="Activation eligibility is decided here. Unknown consent blocks activation, and suppression overrides every other rule." /><ComplianceBanner /><div className="flex flex-wrap gap-2"><StatusChip value="Consent" tone="success" /><StatusChip value="Suppression" tone="danger" /><StatusChip value="Unknown consent blocks activation" tone="warning" /></div><SectionCard title="Consent ledger"><RecordsView rows={consent} titleKey="consent_type" subtitleKey="status" /></SectionCard><SectionCard title="Suppression ledger" className="border-red-300/20 bg-red-500/[0.04]"><RecordsView rows={suppression} titleKey="suppression_type" subtitleKey="reason" /></SectionCard></div></AppShell>;
}
