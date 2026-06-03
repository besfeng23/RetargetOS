import { StatusPill } from "./status-pill";
import type { TableRow } from "@/lib/mock-data";

function looksLikeStatus(key: string) {
  return ["risk", "status", "consent", "suppression", "mode", "approval", "quarantine", "quality"].some((word) => key.toLowerCase().includes(word));
}

export function OpsTable({ rows }: { rows: TableRow[] }) {
  const columns = rows[0] ? Object.keys(rows[0]) : [];

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/70">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-800 text-sm">
          <thead className="bg-slate-900/70 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              {columns.map((column) => (
                <th key={column} className="px-4 py-3 font-medium">
                  {column.replaceAll("_", " ")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {rows.map((row, index) => (
              <tr key={index} className="text-slate-300">
                {columns.map((column) => (
                  <td key={column} className="whitespace-nowrap px-4 py-4">
                    {looksLikeStatus(column) ? <StatusPill value={row[column]} /> : row[column]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
