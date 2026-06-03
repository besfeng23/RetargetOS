import { DesktopDataTable, type DataRow } from "./desktop-data-table";
import { MobileRecordCard } from "./mobile-record-card";

export function RecordsView({ rows, titleKey, subtitleKey }: { rows: DataRow[]; titleKey: string; subtitleKey?: string }) {
  return (
    <>
      <div className="space-y-3 md:hidden">
        {rows.map((row, index) => (
          <MobileRecordCard key={index} title={row[titleKey] ?? `Record ${index + 1}`} subtitle={subtitleKey ? row[subtitleKey] : undefined} fields={Object.entries(row).filter(([key]) => key !== titleKey && key !== subtitleKey).map(([label, value]) => ({ label: label.replaceAll("_", " "), value }))} />
        ))}
      </div>
      <DesktopDataTable rows={rows} />
    </>
  );
}
