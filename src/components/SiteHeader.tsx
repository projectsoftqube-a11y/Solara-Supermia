"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useEffectEvent, useRef, useState, type FocusEvent } from "react";

import { headerMenus, integrationLink, type NavLink, type NavMenu } from "@/content/navigation";
import { APP_URL } from "@/lib/site";

/** `solid` keeps the bar opaque for pages that open on a dark hero. */
export function SiteHeader({ solid = false }: { solid?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  // Close everything when the route changes. Adjusting state during render
  // (rather than in an effect) avoids a flash of the stale menu.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpenMenu(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenus = useEffectEvent(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenus();
    };
    const onPointer = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, []);

  // Keyboard users: leaving a menu with Tab closes it.
  const onMenuBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpenMenu(null);
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 left-1/2 z-50 -translate-x-1/2 px-4 md:top-6"
      style={{ width: "min(1100px, calc(100% - 24px))" }}
    >
      <div
        className="flex items-center justify-between rounded-full border border-[color:var(--border)] px-4 transition-all duration-300 md:px-6"
        style={{
          height: scrolled ? 60 : 68,
          background: scrolled || solid ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.78)",
          backdropFilter: "blur(14px)",
          boxShadow: scrolled ? "0 8px 28px rgba(15,23,42,.08)" : "0 4px 16px rgba(15,23,42,.04)",
        }}
      >
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Solara home">
          <Image
            src="/images/logo.svg"
            alt="Solara Logo"
            width={390}
            height={123}
            priority
            className="h-8 w-auto object-contain"
          />
        </Link>

        <nav ref={navRef} aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {headerMenus.map((menu) =>
            menu.items ? (
              <div
                key={menu.label}
                className="relative"
                onMouseEnter={() => setOpenMenu(menu.label)}
                onMouseLeave={() => setOpenMenu(null)}
                onBlur={onMenuBlur}
              >
                <button
                  type="button"
                  aria-expanded={openMenu === menu.label}
                  aria-controls={`menu-${menu.label}`}
                  onClick={() => setOpenMenu((m) => (m === menu.label ? null : menu.label))}
                  className="group relative inline-flex items-center gap-1 rounded-full px-2.5 py-2 text-[14px] font-medium whitespace-nowrap text-[color:var(--secondary-foreground)] transition-colors hover:text-[color:var(--foreground)] lg:px-4"
                >
                  {menu.label}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${openMenu === menu.label ? "rotate-180 text-[color:var(--primary)]" : ""}`}
                    aria-hidden="true"
                  />
                </button>
                <DropdownPanel menu={menu} open={openMenu === menu.label} />
              </div>
            ) : (
              <Link
                key={menu.label}
                href={menu.href!}
                className="group relative rounded-full px-2.5 py-2 text-[14px] font-medium whitespace-nowrap text-[color:var(--secondary-foreground)] transition-colors hover:text-[color:var(--foreground)] lg:px-4"
              >
                {menu.label}
                <span className="absolute inset-x-2.5 -bottom-0.5 h-px scale-x-0 bg-[color:var(--primary)] transition-transform duration-200 group-hover:scale-x-100 lg:inset-x-4" />
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full border border-slate-200/80 bg-white/50 px-5 py-2.5 text-[14px] font-medium whitespace-nowrap text-slate-700 backdrop-blur-sm transition-all hover:bg-slate-50 hover:text-slate-900 sm:inline-flex"
          >
            Log in
          </a>
          <Link
            href="/book-a-demo"
            className="hidden rounded-full bg-[color:var(--foreground)] px-5 py-2.5 text-[14px] font-medium whitespace-nowrap text-white transition-all hover:bg-[color:var(--surface-dark-2)] sm:inline-flex"
          >
            Book a Demo
          </Link>
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((o) => !o)}
            className="grid h-9 w-9 place-items-center rounded-full border border-[color:var(--border)] lg:hidden"
          >
            <div className="flex flex-col gap-1">
              <span className="h-px w-4 bg-[color:var(--foreground)]" />
              <span className="h-px w-4 bg-[color:var(--foreground)]" />
            </div>
          </button>
        </div>
      </div>

      <MobileMenu open={mobileOpen} onNavigate={() => setMobileOpen(false)} />
    </motion.header>
  );
}

/**
 * Always rendered (hidden with CSS when closed) so every menu link is in the
 * server HTML for crawlers.
 */
function DropdownPanel({ menu, open }: { menu: NavMenu; open: boolean }) {
  const wide = (menu.items?.length ?? 0) > 4;
  return (
    <div
      id={`menu-${menu.label}`}
      className={`absolute top-full left-1/2 z-50 -translate-x-1/2 pt-3 transition duration-200 ${
        open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
      }`}
    >
      <div
        className={`overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_30px_70px_-30px_rgba(15,23,42,0.35)] ${
          wide ? "w-[720px]" : "w-[380px]"
        }`}
      >
        <ul className={`grid gap-1 p-3 ${wide ? "grid-cols-2" : "grid-cols-1"}`}>
          {menu.items!.map((item) => (
            <li key={item.href}>
              <MenuLink item={item} />
            </li>
          ))}
        </ul>
        {menu.footer && (
          <div className="flex items-center justify-between gap-4 border-t border-slate-100 bg-[#FCFBF8] px-6 py-4">
            <Link
              href={integrationLink.href}
              className="group text-[13.5px] font-medium text-slate-600 hover:text-slate-900"
            >
              <span className="font-semibold text-slate-900">{integrationLink.label}:</span>{" "}
              {integrationLink.description}
            </Link>
            <Link
              href={menu.footer.href}
              className="group inline-flex shrink-0 items-center gap-1.5 text-[13.5px] font-semibold text-[#E5503C]"
            >
              {menu.footer.label}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function MenuLink({ item }: { item: NavLink }) {
  const content = (
    <>
      {item.icon && (
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#FFF0EB] text-[#E5503C] transition group-hover:bg-[#FF6A55] group-hover:text-white">
          <item.icon className="h-[18px] w-[18px]" aria-hidden="true" />
        </span>
      )}
      <span className="min-w-0">
        <span className="block text-[14px] font-semibold text-slate-900">{item.label}</span>
        {item.description && (
          <span className="mt-0.5 block text-[12.5px] leading-snug text-slate-500">
            {item.description}
          </span>
        )}
      </span>
    </>
  );
  const className = "group flex items-start gap-3 rounded-2xl p-3 transition hover:bg-[#FAF8F4]";
  return item.external ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <Link href={item.href} className={className}>
      {content}
    </Link>
  );
}

function MobileMenu({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  return (
    <div
      id="mobile-menu"
      className={`mt-2 max-h-[calc(100dvh-110px)] overflow-y-auto rounded-3xl border border-[color:var(--border)] bg-white p-3 shadow-[0_16px_40px_rgba(15,23,42,.08)] lg:hidden ${
        open ? "block" : "hidden"
      }`}
    >
      {headerMenus.map((menu) =>
        menu.items ? (
          <details key={menu.label} className="group rounded-2xl">
            <summary className="flex cursor-pointer list-none items-center justify-between rounded-2xl px-4 py-3 text-[15px] font-medium text-[color:var(--foreground)] hover:bg-[color:var(--muted)] [&::-webkit-details-marker]:hidden">
              {menu.label}
              <ChevronDown
                className="h-4 w-4 transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <ul className="pb-2 pl-2">
              {menu.items.map((item) => (
                <li key={item.href}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-xl px-4 py-2.5 text-[14px] text-slate-600 hover:bg-[color:var(--muted)]"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      className="block rounded-xl px-4 py-2.5 text-[14px] text-slate-600 hover:bg-[color:var(--muted)]"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
              {menu.footer && (
                <li>
                  <Link
                    href={menu.footer.href}
                    onClick={onNavigate}
                    className="block rounded-xl px-4 py-2.5 text-[14px] font-semibold text-[#E5503C] hover:bg-[color:var(--muted)]"
                  >
                    {menu.footer.label}
                  </Link>
                </li>
              )}
            </ul>
          </details>
        ) : (
          <Link
            key={menu.label}
            href={menu.href!}
            onClick={onNavigate}
            className="block rounded-2xl px-4 py-3 text-[15px] font-medium text-[color:var(--foreground)] hover:bg-[color:var(--muted)]"
          >
            {menu.label}
          </Link>
        ),
      )}
      <a
        href={APP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 block rounded-2xl px-4 py-3 text-center text-[15px] font-medium text-[color:var(--secondary-foreground)] hover:bg-[color:var(--muted)]"
      >
        Log in
      </a>
      <Link
        href="/book-a-demo"
        onClick={onNavigate}
        className="mt-1 block rounded-2xl bg-[color:var(--foreground)] px-4 py-3 text-center text-[15px] font-medium text-white"
      >
        Book a Demo
      </Link>
    </div>
  );
}
