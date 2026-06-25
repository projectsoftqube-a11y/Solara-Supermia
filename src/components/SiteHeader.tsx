import { useEffect, useState } from "react";
import { motion } from "motion/react";

const NAV = [
  { label: "Features", href: "#platform" },
  { label: "How It Works", href: "#automation" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      setOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-1/2 top-4 z-50 -translate-x-1/2 px-4 md:top-6"
      style={{ width: "min(1100px, calc(100% - 24px))" }}
    >
      <div
        className="flex items-center justify-between rounded-full border border-[color:var(--border)] px-4 transition-all duration-300 md:px-6"
        style={{
          height: scrolled ? 60 : 68,
          background: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.78)",
          backdropFilter: "blur(14px)",
          boxShadow: scrolled
            ? "0 8px 28px rgba(15,23,42,.08)"
            : "0 4px 16px rgba(15,23,42,.04)",
        }}
      >
        <a href="/" className="flex items-center gap-2.5">
          <img src="/images/logo.svg" alt="Solara Logo" className="h-8 w-auto object-contain" />
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="group relative rounded-full px-4 py-2 text-[14px] font-medium text-[color:var(--secondary-foreground)] transition-colors hover:text-[color:var(--foreground)]"
            >
              {item.label}
              <span className="absolute inset-x-4 -bottom-0.5 h-px scale-x-0 bg-[color:var(--primary)] transition-transform duration-200 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="https://app.solara.supermia.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full border border-slate-200/80 bg-white/50 px-5 py-2.5 text-[14px] font-medium text-slate-700 backdrop-blur-sm transition-all hover:bg-slate-50 hover:text-slate-900 sm:inline-flex"
          >
            Log in
          </a>
          <a
            href="https://app.solara.supermia.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-[color:var(--foreground)] px-5 py-2.5 text-[14px] font-medium text-white transition-all hover:bg-[color:var(--surface-dark-2)] sm:inline-flex"
          >
            Get Started
          </a>
          <button
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className="grid h-9 w-9 place-items-center rounded-full border border-[color:var(--border)] md:hidden"
          >
            <div className="flex flex-col gap-1">
              <span className="h-px w-4 bg-[color:var(--foreground)]" />
              <span className="h-px w-4 bg-[color:var(--foreground)]" />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 rounded-3xl border border-[color:var(--border)] bg-white p-3 shadow-[0_16px_40px_rgba(15,23,42,.08)] md:hidden"
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="block rounded-2xl px-4 py-3 text-[15px] font-medium text-[color:var(--foreground)] hover:bg-[color:var(--muted)]"
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://app.solara.supermia.ai/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-2xl px-4 py-3 text-center text-[15px] font-medium text-[color:var(--secondary-foreground)] hover:bg-[color:var(--muted)]"
          >
            Log in
          </a>
          <a
            href="https://app.solara.supermia.ai/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-1 block rounded-2xl bg-[color:var(--foreground)] px-4 py-3 text-center text-[15px] font-medium text-white"
          >
            Get Started
          </a>
        </motion.div>
      )}
    </motion.header>
  );
}
