import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Search } from "lucide-react";

export type Country = {
  iso: string;
  name: string;
  dial: string;
  /** Valid national-number lengths. */
  lengths: number[];
  example?: string;
};

/**
 * US is intentionally first: it is the default, and it wins the "+1" prefix
 * over Canada when auto-detecting (the sort below is stable).
 */
export const COUNTRIES: Country[] = [
  { iso: "US", name: "United States", dial: "1", lengths: [10], example: "(212) 555-0123" },
  { iso: "IN", name: "India", dial: "91", lengths: [10], example: "98765 43210" },
  { iso: "CA", name: "Canada", dial: "1", lengths: [10], example: "(416) 555-0123" },
  { iso: "GB", name: "United Kingdom", dial: "44", lengths: [10, 9] },
  { iso: "AU", name: "Australia", dial: "61", lengths: [9] },
  { iso: "NZ", name: "New Zealand", dial: "64", lengths: [8, 9, 10] },
  { iso: "IE", name: "Ireland", dial: "353", lengths: [9] },
  { iso: "AE", name: "United Arab Emirates", dial: "971", lengths: [9] },
  { iso: "SA", name: "Saudi Arabia", dial: "966", lengths: [9] },
  { iso: "SG", name: "Singapore", dial: "65", lengths: [8] },
  { iso: "MY", name: "Malaysia", dial: "60", lengths: [9, 10] },
  { iso: "PH", name: "Philippines", dial: "63", lengths: [10] },
  { iso: "ID", name: "Indonesia", dial: "62", lengths: [9, 10, 11] },
  { iso: "TH", name: "Thailand", dial: "66", lengths: [9] },
  { iso: "VN", name: "Vietnam", dial: "84", lengths: [9] },
  { iso: "PK", name: "Pakistan", dial: "92", lengths: [10] },
  { iso: "BD", name: "Bangladesh", dial: "880", lengths: [10] },
  { iso: "LK", name: "Sri Lanka", dial: "94", lengths: [9] },
  { iso: "NP", name: "Nepal", dial: "977", lengths: [10] },
  { iso: "CN", name: "China", dial: "86", lengths: [11] },
  { iso: "JP", name: "Japan", dial: "81", lengths: [10] },
  { iso: "KR", name: "South Korea", dial: "82", lengths: [9, 10] },
  { iso: "DE", name: "Germany", dial: "49", lengths: [10, 11] },
  { iso: "FR", name: "France", dial: "33", lengths: [9] },
  { iso: "ES", name: "Spain", dial: "34", lengths: [9] },
  { iso: "IT", name: "Italy", dial: "39", lengths: [9, 10] },
  { iso: "NL", name: "Netherlands", dial: "31", lengths: [9] },
  { iso: "BE", name: "Belgium", dial: "32", lengths: [9] },
  { iso: "CH", name: "Switzerland", dial: "41", lengths: [9] },
  { iso: "AT", name: "Austria", dial: "43", lengths: [10, 11] },
  { iso: "SE", name: "Sweden", dial: "46", lengths: [9] },
  { iso: "NO", name: "Norway", dial: "47", lengths: [8] },
  { iso: "DK", name: "Denmark", dial: "45", lengths: [8] },
  { iso: "FI", name: "Finland", dial: "358", lengths: [9, 10] },
  { iso: "PL", name: "Poland", dial: "48", lengths: [9] },
  { iso: "PT", name: "Portugal", dial: "351", lengths: [9] },
  { iso: "GR", name: "Greece", dial: "30", lengths: [10] },
  { iso: "RO", name: "Romania", dial: "40", lengths: [9] },
  { iso: "TR", name: "Turkey", dial: "90", lengths: [10] },
  { iso: "IL", name: "Israel", dial: "972", lengths: [9] },
  { iso: "ZA", name: "South Africa", dial: "27", lengths: [9] },
  { iso: "NG", name: "Nigeria", dial: "234", lengths: [10] },
  { iso: "KE", name: "Kenya", dial: "254", lengths: [9] },
  { iso: "EG", name: "Egypt", dial: "20", lengths: [10] },
  { iso: "MX", name: "Mexico", dial: "52", lengths: [10] },
  { iso: "BR", name: "Brazil", dial: "55", lengths: [10, 11] },
  { iso: "AR", name: "Argentina", dial: "54", lengths: [10] },
  { iso: "CL", name: "Chile", dial: "56", lengths: [9] },
  { iso: "CO", name: "Colombia", dial: "57", lengths: [10] },
];

export const DEFAULT_COUNTRY = "US";

/** Longest dial code first, so "+971" beats "+97"/"+9". Stable, so US beats CA on "+1". */
const BY_DIAL_LENGTH = [...COUNTRIES].sort((a, b) => b.dial.length - a.dial.length);

export function findCountry(iso: string): Country {
  return COUNTRIES.find((c) => c.iso === iso) ?? COUNTRIES[0];
}

/** Splits a digit string that begins with a dial code into { country, rest }. */
function matchDialCode(digits: string) {
  for (const country of BY_DIAL_LENGTH) {
    if (digits.startsWith(country.dial)) {
      return { country, rest: digits.slice(country.dial.length) };
    }
  }
  return null;
}

const maxLength = (c: Country) => Math.max(...c.lengths);

/** Formats the national part according to local convention. */
export function formatNational(digits: string, iso: string): string {
  const country = findCountry(iso);
  const d = digits.replace(/\D/g, "").slice(0, maxLength(country));

  if (iso === "US" || iso === "CA") {
    if (d.length <= 3) return d;
    if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
    return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  }

  if (iso === "IN") {
    if (d.length <= 5) return d;
    return `${d.slice(0, 5)} ${d.slice(5)}`;
  }

  // Generic: groups of three, absorbing any trailing 1–2 digit orphan into the
  // previous group so we never render something like "207 183 875 0".
  const groups = d.match(/\d{1,3}/g) ?? [];
  if (groups.length > 1 && groups[groups.length - 1].length < 3) {
    groups[groups.length - 2] += groups[groups.length - 1];
    groups.pop();
  }
  return groups.join(" ");
}

/** Returns an error message, or "" when the number is valid. */
export function validatePhone(national: string, iso: string): string {
  const d = national.replace(/\D/g, "");
  const country = findCountry(iso);

  if (!d) return "Please enter your phone number.";

  if (iso === "US" || iso === "CA") {
    if (d.length !== 10) return `Enter a 10-digit ${country.iso} phone number.`;
    // NANP: area code and exchange code both start 2–9.
    if (!/^[2-9]\d{2}[2-9]\d{6}$/.test(d)) return `Enter a valid ${country.name} phone number.`;
    return "";
  }

  if (iso === "IN") {
    if (d.length !== 10 || !/^[6-9]\d{9}$/.test(d))
      return "Enter a valid 10-digit Indian mobile number.";
    return "";
  }

  if (!country.lengths.includes(d.length)) return `Enter a valid ${country.name} phone number.`;
  return "";
}

/** Full international form for your backend, e.g. +919876543210 */
export function toE164(national: string, iso: string): string {
  const d = national.replace(/\D/g, "");
  return d ? `+${findCountry(iso).dial}${d}` : "";
}

type PhoneInputProps = {
  value: string;
  countryIso: string;
  onChange: (national: string, iso: string) => void;
  onBlur?: () => void;
  hasError?: boolean;
  inputClassName: string;
};

export function PhoneInput({
  value,
  countryIso,
  onChange,
  onBlur,
  hasError,
  inputClassName,
}: PhoneInputProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [pos, setPos] = useState({ top: 0, left: 0, width: 320 });

  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const country = findCountry(countryIso);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (
        !triggerRef.current?.contains(t) &&
        !panelRef.current?.contains(t)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  // Keep the portal panel pinned to the trigger
  useEffect(() => {
    if (!open) return;
    const place = () => {
      const el = triggerRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const margin = 16;
      const width = Math.min(320, window.innerWidth - margin * 2);
      const left = Math.min(Math.max(r.left, margin), window.innerWidth - width - margin);
      setPos({ top: r.bottom + 8, left, width });
    };
    place();
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
    };
  }, [open]);

  const handleChange = (raw: string) => {
    // Typing/pasting a leading "+" switches the country automatically.
    if (raw.trim().startsWith("+")) {
      const digits = raw.replace(/\D/g, "");
      const match = matchDialCode(digits);
      if (match) {
        onChange(formatNational(match.rest, match.country.iso), match.country.iso);
      } else {
        // Dial code still incomplete — keep the "+" so the next keystroke can
        // still be recognised (e.g. "+9" → "+91" → India).
        onChange(`+${digits}`, countryIso);
      }
      return;
    }
    onChange(formatNational(raw, countryIso), countryIso);
  };

  const pick = (next: Country) => {
    setOpen(false);
    setQuery("");
    // Re-format the digits already typed under the new country's rules.
    onChange(formatNational(value, next.iso), next.iso);
  };

  const q = query.trim().toLowerCase();
  const filtered = q
    ? COUNTRIES.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.iso.toLowerCase().includes(q) ||
          c.dial.includes(q.replace(/\D/g, "")),
      )
    : COUNTRIES;

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={`Country code: ${country.name} +${country.dial}`}
        className={`absolute left-1.5 top-1/2 z-10 flex -translate-y-1/2 items-center gap-1 rounded-lg px-2 py-1.5 text-sm font-semibold text-[color:var(--foreground)] transition hover:bg-[color:var(--muted)] ${
          open ? "bg-[color:var(--muted)]" : ""
        }`}
      >
        <span className="text-[11px] font-bold text-[color:var(--muted-foreground)]">
          {country.iso}
        </span>
        +{country.dial}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <input
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={onBlur}
        placeholder={country.example ?? "Phone number"}
        aria-invalid={!!hasError}
        className={`${inputClassName} pl-[6.5rem]`}
      />

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                ref={panelRef}
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.16 }}
                style={{ top: pos.top, left: pos.left, width: pos.width }}
                className="fixed z-[90] overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] shadow-[0_16px_44px_rgba(15,23,42,0.16)]"
              >
                <div className="border-b border-[color:var(--divider)] p-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[color:var(--muted-foreground)]" />
                    <input
                      autoFocus
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search country or code"
                      className="w-full rounded-lg border border-[color:var(--border)] bg-[color:var(--background)] py-2 pl-8 pr-2.5 text-sm outline-none focus:border-[color:var(--primary)]"
                    />
                  </div>
                </div>

                <ul className="max-h-60 overflow-y-auto py-1">
                  {filtered.map((c) => (
                    <li key={c.iso}>
                      <button
                        type="button"
                        onClick={() => pick(c)}
                        className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition hover:bg-[color:var(--muted)] ${
                          c.iso === countryIso
                            ? "bg-[color:var(--primary-soft)] font-semibold text-[color:var(--foreground)]"
                            : "text-[color:var(--secondary-foreground)]"
                        }`}
                      >
                        <span className="w-7 shrink-0 text-[11px] font-bold text-[color:var(--muted-foreground)]">
                          {c.iso}
                        </span>
                        <span className="min-w-0 flex-1 truncate">{c.name}</span>
                        <span className="shrink-0 text-[color:var(--muted-foreground)]">
                          +{c.dial}
                        </span>
                      </button>
                    </li>
                  ))}
                  {filtered.length === 0 && (
                    <li className="px-3 py-6 text-center text-sm text-[color:var(--muted-foreground)]">
                      No match
                    </li>
                  )}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
