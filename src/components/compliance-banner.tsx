export function ComplianceBanner({ title = "Suppression overrides every other rule.", message = "Unknown consent, unknown source, invalid identifiers, or active suppression block activation. Destination syncs require approved live connector support." }: { title?: string; message?: string }) {
  return (
    <aside className="rounded-[26px] border border-red-300/20 bg-gradient-to-br from-red-500/12 to-white/[0.03] p-5 sm:p-6">
      <p className="text-lg font-semibold text-red-50">{title}</p>
      <p className="mt-2 text-sm leading-6 text-red-50/68">{message}</p>
    </aside>
  );
}
