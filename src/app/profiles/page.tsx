import { AppShell } from "@/components/app-shell";
import { ComplianceBanner } from "@/components/compliance-banner";
import { PageHeader } from "@/components/page-header";
import { RecordsView } from "@/components/records-view";
import { SectionCard } from "@/components/section-card";
import { StatusChip } from "@/components/status-chip";

const profiles = [
  { profile: "prof_7K2A", lifecycle: "repeat buyer", consent: "granted", suppression: "not suppressed", risk: "low", identity_keys: "email hash + payment token", pii: "masked" },
  { profile: "prof_91MD", lifecycle: "hot lead", consent: "unknown", suppression: "blocked", risk: "high", identity_keys: "device hash", pii: "masked" },
  { profile: "prof_P4Q8", lifecycle: "buyer", consent: "granted", suppression: "chargeback", risk: "blocked", identity_keys: "payment token", pii: "masked" },
];
const tabs = ["Summary", "Identity Keys", "Consent", "Suppression", "Events", "Payments"];

export default function ProfilesPage() {
  return <AppShell><div className="space-y-6"><PageHeader title="Profiles" eyebrow="Masked identity" description="Search and inspect operational profile state without exposing raw PII in UI, logs, client state, or console output." /><ComplianceBanner title="Raw PII is not displayed." message="Use masked identifiers, hashed keys, lifecycle state, consent, suppression, events, and payment truth only." /><SectionCard><input className="min-h-12 w-full rounded-2xl border border-white/[0.08] bg-[#0D0D0D] px-4 text-sm text-white outline-none placeholder:text-white/35" placeholder="Search masked profile ID, lifecycle, consent, or suppression state" /><div className="mt-4 flex flex-wrap gap-2">{["Lifecycle", "Consent", "Suppression", "Risk"].map((filter)=><StatusChip key={filter} value={filter} />)}</div></SectionCard><SectionCard title="Operational profiles"><RecordsView rows={profiles} titleKey="profile" subtitleKey="lifecycle" /></SectionCard><SectionCard title="Profile detail"><div className="flex flex-wrap gap-2">{tabs.map((tab)=><StatusChip key={tab} value={tab} />)}</div><div className="mt-5 rounded-[22px] border border-white/[0.08] bg-[#0D0D0D] p-5 text-sm leading-6 text-white/58">Selected profile shows masked keys, consent evidence, suppression state, events, and payments. Activation is blocked if consent is unknown or suppression is active.</div></SectionCard></div></AppShell>;
}
