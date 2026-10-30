import Link from "next/link";
import type { ReactNode } from "react";

import { COMPARISON_COLUMNS, coverage, type ColumnKey } from "@/components/inner/ComparisonTable";
import { statePath, type StateRecord } from "@/content/states";

/** Frosted card that sits on the dark hero in place of an image. */
export function GlassPanel({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-16 bg-[radial-gradient(closest-side,rgba(255,106,85,0.28),rgba(22,196,179,0.08)_65%,transparent)]"
      />
      <div className="relative rounded-[32px] border border-white/10 bg-[#0A1A1F]/90 p-7 sm:p-9">
        {children}
      </div>
    </div>
  );
}

export function PanelLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[12px] font-bold tracking-[0.2em] text-[#FFB23E] uppercase">{children}</p>
  );
}

/** Capability coverage per option, counted from the comparison table. */
export function ScoreBoard({ columns }: { columns: ColumnKey[] }) {
  return (
    <GlassPanel>
      <PanelLabel>Front-office coverage</PanelLabel>
      <ul className="mt-7 space-y-8">
        {columns.map((key) => {
          const { yes, limited, no } = coverage(key);
          const total = yes + limited + no;
          const solara = key === "solara";
          return (
            <li key={key}>
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-display text-xl font-bold text-white">
                  {COMPARISON_COLUMNS[key]}
                </span>
                <span className="font-display text-[40px] leading-none font-extrabold text-white">
                  {yes + limited}
                  <span className="text-lg font-semibold text-slate-400"> / {total}</span>
                </span>
              </div>
              <div
                aria-hidden="true"
                className="mt-3.5 flex h-3 gap-1 overflow-hidden rounded-full bg-white/10"
              >
                {yes > 0 && (
                  <span
                    className={
                      solara
                        ? "rounded-full bg-gradient-to-r from-[#FF6A55] to-[#FFB23E]"
                        : "rounded-full bg-[#16C4B3]"
                    }
                    style={{ width: `${(yes / total) * 100}%` }}
                  />
                )}
                {limited > 0 && (
                  <span
                    className="rounded-full bg-[#FFB23E]/50"
                    style={{ width: `${(limited / total) * 100}%` }}
                  />
                )}
              </div>
              <p className="mt-2.5 text-[14px] text-slate-300">
                {yes} fully · {limited} limited · {no} not covered
              </p>
            </li>
          );
        })}
      </ul>
    </GlassPanel>
  );
}

/** The all-party / one-party split, optionally listing the all-party states. */
export function ConsentSplit({
  allParty,
  total,
  list,
}: {
  allParty: number;
  total: number;
  list?: StateRecord[];
}) {
  const oneParty = total - allParty;
  return (
    <GlassPanel>
      <PanelLabel>Call recording consent</PanelLabel>
      <dl className="mt-6 grid grid-cols-2 gap-6">
        <div className="flex flex-col-reverse gap-2">
          <dt className="text-[15px] leading-snug text-slate-300">All-party jurisdictions</dt>
          <dd className="bg-gradient-to-r from-[#FF6A55] to-[#FFB23E] bg-clip-text font-display text-7xl leading-none font-extrabold text-transparent xl:text-[88px]">
            {allParty}
          </dd>
        </div>
        <div className="flex flex-col-reverse gap-2">
          <dt className="text-[15px] leading-snug text-slate-300">One-party jurisdictions</dt>
          <dd className="font-display text-7xl leading-none font-extrabold text-[#5EEAD4] xl:text-[88px]">
            {oneParty}
          </dd>
        </div>
      </dl>
      <div aria-hidden="true" className="mt-7 flex h-3 gap-1 overflow-hidden rounded-full">
        <span
          className="rounded-full bg-gradient-to-r from-[#FF6A55] to-[#FFB23E]"
          style={{ width: `${(allParty / total) * 100}%` }}
        />
        <span className="flex-1 rounded-full bg-[#16C4B3]" />
      </div>
      {list && (
        <>
          <p className="mt-7 text-[13px] font-semibold text-slate-300">All-party states</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {list.map((state) => (
              <li key={state.slug}>
                <Link
                  href={statePath(state.slug)}
                  aria-label={state.name}
                  className="inline-flex rounded-lg bg-white/5 px-2.5 py-1 font-mono text-[13px] font-bold text-white ring-1 ring-white/10 transition hover:bg-white/15"
                >
                  {state.abbr}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </GlassPanel>
  );
}
