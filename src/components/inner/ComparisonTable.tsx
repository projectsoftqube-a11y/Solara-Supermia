import { CircleCheck, CircleMinus, CircleX } from "lucide-react";

import { comparisonRows, type Support } from "@/content/comparison";

const COLUMNS = {
  fd: "In-house front desk",
  bot: "Basic chatbot",
  solara: "Solara",
} as const;

type ColumnKey = keyof typeof COLUMNS;

function Cell({ value }: { value: Support }) {
  if (value === "no") {
    return (
      <span className="inline-flex items-center gap-1.5 text-slate-600">
        <CircleX className="h-5 w-5 text-rose-300" aria-hidden="true" />
        No
      </span>
    );
  }
  if (value === "limited") {
    return (
      <span className="inline-flex items-center gap-1.5 text-amber-700">
        <CircleMinus className="h-5 w-5 text-amber-400" aria-hidden="true" />
        Limited
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 font-semibold text-[#0B7A70]">
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
    <div className="overflow-x-auto rounded-3xl border border-slate-200/80 bg-white shadow-[0_24px_60px_-40px_rgba(15,23,42,0.45)]">
      <table className="w-full min-w-[620px] border-collapse text-left text-[15px]">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="bg-slate-900 text-white">
            <th scope="col" className="px-5 py-4 text-[13px] font-semibold tracking-wide">
              Capability
            </th>
            {columns.map((key) => (
              <th
                key={key}
                scope="col"
                className={`px-5 py-4 text-[13px] font-semibold tracking-wide ${
                  key === "solara" ? "bg-gradient-to-br from-[#D2432D] to-[#C13A22]" : ""
                }`}
              >
                {COLUMNS[key]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparisonRows.map((row, i) => (
            <tr
              key={row.name}
              className={`border-t border-slate-100 ${i % 2 ? "bg-slate-50/50" : ""}`}
            >
              <th scope="row" className="px-5 py-3.5 font-semibold text-slate-900">
                <span className="flex items-center gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-slate-100 ring-1 ring-slate-200">
                    <row.icon className="h-4 w-4 text-slate-600" aria-hidden="true" />
                  </span>
                  {row.name}
                </span>
              </th>
              {columns.map((key) => (
                <td
                  key={key}
                  className={`px-5 py-3.5 ${key === "solara" ? "border-l-2 border-[#FF6A55]/25 bg-[#FF6A55]/[0.04]" : ""}`}
                >
                  <Cell value={row[key]} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
