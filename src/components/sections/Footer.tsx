"use client";

import { ArrowUpRight, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { footerColumns } from "@/content/navigation";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from "@/lib/site";
import { useCurrentYear } from "@/lib/use-current-year";

export function Footer() {
  const year = useCurrentYear();

  return (
    <footer className="relative overflow-hidden bg-[#02060A] pt-24 pb-8 text-[#FFF9F2] sm:pt-32">
      {/* Top subtle glow edge */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF6A55]/20 to-transparent" />

      {/* Background ambient light */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-t-full bg-[#FF6A55]/5 blur-[120px]" />

      {/* Spotlight for the logo */}
      <div className="pointer-events-none absolute top-0 left-0 h-[500px] w-[500px] rounded-br-full bg-white/5 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_repeat(4,minmax(0,1fr))] lg:gap-10">
          {/* Brand Column */}
          <div className="flex flex-col items-start">
            {/* Logo with White Text */}
            <Link
              href="/"
              className="relative mb-8 inline-block rounded-sm ring-offset-4 ring-offset-[#02060A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A55]"
            >
              <Image
                src="/images/logo-white.svg"
                alt="Solara Dental AI"
                width={390}
                height={123}
                className="relative z-10 h-10 w-auto transition-opacity hover:opacity-90 sm:h-12"
              />
            </Link>

            <p className="max-w-sm text-base leading-relaxed font-light text-slate-400 sm:text-lg">
              The complete AI front office, built specifically for dental clinics. Insurance,
              intake, booking, recall, and paperwork—handled automatically.
            </p>

            {/* Contact */}
            <ul className="mt-8 space-y-5 text-slate-400">
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="group inline-flex items-start gap-3 text-sm transition-colors hover:text-white sm:text-base"
                >
                  <div className="mt-0.5 rounded-md bg-white/5 p-1.5 transition-colors group-hover:bg-[#FF6A55]/20 group-hover:text-[#FF6A55]">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="mb-0.5 font-medium text-white">Email Support</div>
                    <div className="text-sm text-slate-400">{CONTACT_EMAIL}</div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT_PHONE.replaceAll("-", "")}`}
                  className="group inline-flex items-start gap-3 text-sm transition-colors hover:text-white sm:text-base"
                >
                  <div className="mt-0.5 rounded-md bg-white/5 p-1.5 transition-colors group-hover:bg-[#FF6A55]/20 group-hover:text-[#FF6A55]">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="mb-0.5 font-medium text-white">Call Us</div>
                    <div className="text-sm text-slate-400">{CONTACT_PHONE_DISPLAY}</div>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          {/* Sitemap columns */}
          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title} className="flex flex-col">
              <p className="mb-6 text-xs font-bold tracking-[0.2em] text-[#FFB23E] uppercase">
                {column.title}
              </p>
              <ul className="space-y-3.5 text-slate-400">
                {column.links.map((item) => (
                  <li key={item.href}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1.5 rounded-md text-sm ring-offset-2 ring-offset-[#02060A] transition-colors hover:text-[#FF6A55] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A55]"
                      >
                        {item.label}
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="group inline-flex items-center gap-2 rounded-md text-sm ring-offset-2 ring-offset-[#02060A] transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A55]"
                      >
                        <span className="transition-transform group-hover:translate-x-1">
                          {item.label}
                        </span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Massive Typography Watermark */}
        <div className="pointer-events-none relative flex w-full justify-center select-none">
          <p
            aria-hidden="true"
            className="-my-[4vw] bg-gradient-to-b from-white/15 to-white/5 bg-clip-text p-[4vw] text-center font-display text-[13vw] leading-normal font-black tracking-widest text-transparent sm:text-[15vw]"
          >
            SOLARA
          </p>
        </div>

        {/* Bottom Bar

            The meta line wraps as a row of whole items rather than being
            squeezed into fixed columns: `flex-wrap` lets it break between
            items, and each item carries its own `whitespace-nowrap` so a
            break never lands inside a phrase ("Softqube Technologies / LLC").
            The separators are decorative `<span>`s — as `<p>` elements a
            screen reader announced each bare "|" as content. They hide
            themselves once the row wraps onto its own line. */}
        <div className="flex flex-col gap-x-8 gap-y-5 border-t border-white/10 pt-8 text-xs text-slate-400 sm:text-sm lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <p className="whitespace-nowrap">© {year} Solara Dental AI</p>

            <span aria-hidden="true" className="text-white/20">
              |
            </span>

            <p className="whitespace-nowrap">
              by{" "}
              <a
                href="https://supermia.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-slate-300 transition-colors hover:text-[#FF6A55]"
              >
                SuperMIA
              </a>{" "}
              · Botfinity Inc.
            </p>

            <span aria-hidden="true" className="text-white/20">
              |
            </span>

            <p className="whitespace-nowrap">
              <a
                href="https://supermia.ai/industries/healthcare/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-slate-400 transition-colors hover:text-[#FF6A55]"
              >
                SuperMIA AI for Healthcare
              </a>
            </p>

            <span aria-hidden="true" className="text-white/20">
              |
            </span>

            <p className="whitespace-nowrap">All rights reserved.</p>

            <span aria-hidden="true" className="text-white/20">
              |
            </span>

            <p className="whitespace-nowrap">
              Design &amp; Develop by{" "}
              <a
                href="https://softqubes.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-slate-300 transition-colors hover:text-[#FF6A55]"
              >
                Softqube Technologies LLC
              </a>
            </p>
          </div>

          {/* `shrink-0` so the badge keeps its pill shape instead of being
              compressed until "Made with" and "for dental teams." split
              across lines. */}
          <p className="flex shrink-0 items-center gap-2 self-start rounded-full border border-white/5 bg-white/5 px-3 py-1.5 whitespace-nowrap lg:self-auto">
            Made with{" "}
            <Image
              src="/images/secondary-logo.svg"
              alt="Solara"
              width={192}
              height={156}
              className="h-4 w-auto drop-shadow-sm"
            />{" "}
            for dental teams.
          </p>
        </div>
      </div>
    </footer>
  );
}
