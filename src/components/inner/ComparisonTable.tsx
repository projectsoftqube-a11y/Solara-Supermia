import { CircleCheck, CircleMinus, CircleX } from "lucide-react";
import type { ReactNode } from "react";

import { comparisonRows, type Support } from "@/content/comparison";

export const COMPARISON_COLUMNS = {
  fd: "In-house front desk",
  bot: "Basic chatbot",
  solara: "Solara",
} as const;

export type ColumnKey = keyof typeof COMPARISON_COLUMNS;

/** How many rows of the capability table a column covers, and how fully. */
export function coverage(key: ColumnKey) {
  const limited = comparisonRows.filter((row) => row[key] === "limited").length;
  const no = comparisonRows.filter((row) => row[key] === "no").length;
  return { yes: comparisonRows.length - limited - no, limited, no };
}

/** White, rounded, horizontally scrollable frame for every data table. */
export function TableFrame({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-[28px] bg-white shadow-[0_40px_80px_-56px_rgba(15,23,42,0.6)] ring-1 ring-slate-900/5">
      {children}
    </div>
  );
}

function Cell({ value }: { value: Support }) {
  if (value === "no") {
    return (
      <span className="inline-flex items-center gap-2 text-slate-600">
        <CircleX className="h-5 w-5 text-rose-400" aria-hidden="true" />
        No
      </span>
    );
  }
  if (value === "limited") {
    return (
      <span className="inline-flex items-center gap-2 text-amber-800">
        <CircleMinus className="h-5 w-5 text-amber-500" aria-hidden="true" />
        Limited
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-2 font-semibold text-[#0B7A70]">
      <CircleCheck className="h-5 w-5 text-[#16C4B3]" aria-hidden="true" />
      {value === "yes" ? "Yes" : value}
    </span>
  );
}

/** The home-page capability comparison as a real, crawlable table. */
export function ComparisonTable({
  columns = ["fd", "bot", "solara"],
  caption,
}: {
  columns?: ColumnKey[];
  caption: string;
}) {
  return (
    <TableFrame>
      <table className="w-full min-w-[680px] border-collapse text-left text-[16px]">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="bg-[#0A1A1F] text-white">
            <th scope="col" className="px-6 py-5 text-[14px] font-semibold tracking-wide lg:px-8">
              Capability
            </th>
            {columns.map((key) => (
              <th
                key={key}
                scope="col"
                className={`px-6 py-5 text-[14px] font-semibold tracking-wide lg:px-8 ${
                  key === "solara" ? "bg-gradient-to-br from-[#D2432D] to-[#C13A22]" : ""
                }`}
              >
                {COMPARISON_COLUMNS[key]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparisonRows.map((row) => (
            <tr key={row.name} className="border-t border-slate-100">
              <th scope="row" className="px-6 py-4 font-semibold text-slate-900 lg:px-8">
                <span className="flex items-center gap-3.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#FFF0EB]">
                    <row.icon className="h-4 w-4 text-[#C13A22]" aria-hidden="true" />
                  </span>
                  {row.name}
                </span>
              </th>
              {columns.map((key) => (
                <td
                  key={key}
                  className={`px-6 py-4 lg:px-8 ${key === "solara" ? "bg-[#FF6A55]/[0.05]" : ""}`}
                >
                  <Cell value={row[key]} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </TableFrame>
  );
}
