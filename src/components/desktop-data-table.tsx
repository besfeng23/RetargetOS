import { StatusChip } from "./status-chip";

export type DataRow = Record<string, string>;

function label(key: string) {
  return key.replaceAll("_", " ");
}

function isChip(key: string) {
  return ["risk", "status", "consent", "suppression", "mode", "approval", "quality", "quarantine", "readiness"].some((word) => key.toLowerCase().includes(word));
}

export function DesktopDataTable({ rows }: { rows: DataRow[] }) {
  const columns = rows[0] ? Object.keys(rows[0]) : [];
  return (
    <div className="hidden overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#070707] md:block">
      <div className="overflow-x-auto premium-scrollbar">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-white/[0.08] bg-white/[0.03] text-xs text-white/45">
            <tr>{columns.map((column) => <th key={column} className="px-4 py-4 font-medium capitalize">{label(column)}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-white/[0.06]">
            {rows.map((row, index) => (
              <tr key={index} className="text-white/72">
                {columns.map((column) => <td key={column} className="whitespace-nowrap px-4 py-4">{isChip(column) ? <StatusChip value={row[column]} /> : row[column]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
