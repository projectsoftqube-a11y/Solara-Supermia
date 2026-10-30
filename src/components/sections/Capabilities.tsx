"use client";

import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import Image from "next/image";

const CARDS = [
  {
    title: "Checks insurance",
    desc: "Coverage and eligibility verified before the patient sits down.",
    featured: true,
    colClass: "sm:col-span-2 lg:col-span-8",
    themeClass:
      "bg-[#FFF9F2] border border-[#FF6A55]/10 shadow-[0_16px_32px_rgba(255,106,85,0.04)] hover:shadow-[0_24px_48px_rgba(255,106,85,0.06)] text-slate-900",
    descClass: "text-slate-600",
    layoutClass: "flex-col sm:flex-row items-center gap-6 sm:gap-10",
    textWrapperClass: "sm:w-1/2",
    imageWrapperClass:
      "w-full sm:w-1/2 h-48 sm:h-64 shrink-0 rounded-2xl overflow-hidden order-first sm:order-last border border-slate-200/50 shadow-sm",
    imageSrc: "/images/cap_insurance.png",
  },
  {
    title: "Sends & fills forms",
    desc: "Intake completed on the patient's phone. No clipboards, no paper.",
    featured: true,
    colClass: "sm:col-span-1 lg:col-span-4",
    themeClass: "bg-white border border-slate-200/60 shadow-sm hover:shadow-md text-slate-900",
    descClass: "text-slate-600",
    layoutClass: "flex-col",
    textWrapperClass: "",
    imageWrapperClass:
      "w-full h-40 mb-6 rounded-2xl overflow-hidden border border-slate-100 shadow-sm",
    imageSrc: "/images/cap_forms.png",
  },
  {
    title: "Answers every call",
    desc: "Picks up after hours, at lunch, and during overflow.",
    featured: false,
    colClass: "sm:col-span-1 lg:col-span-4",
    themeClass: "bg-white border border-slate-200/60 shadow-sm hover:shadow-md text-slate-900",
    descClass: "text-slate-600",
    layoutClass: "flex-col",
    textWrapperClass: "",
    imageWrapperClass:
      "w-full h-40 mb-6 rounded-2xl overflow-hidden border border-slate-100 shadow-sm",
    imageSrc: "/images/cap_calls.png",
  },
  {
    title: "Books visits by text",
    desc: "Patients book, reschedule, or confirm with one simple message.",
    featured: false,
    colClass: "sm:col-span-1 lg:col-span-4",
    themeClass: "bg-white border border-slate-200/60 shadow-sm hover:shadow-md text-slate-900",
    descClass: "text-slate-600",
    layoutClass: "flex-col",
    textWrapperClass: "",
    imageWrapperClass:
      "w-full h-40 mb-6 rounded-2xl overflow-hidden border border-slate-100 shadow-sm",
    imageSrc: "/images/cap_booking.png",
  },
  {
    title: "Website chat helper",
    desc: "A friendly chat helper that answers questions and books visits.",
    featured: false,
    colClass: "sm:col-span-1 lg:col-span-4",
    themeClass: "bg-white border border-slate-200/60 shadow-sm hover:shadow-md text-slate-900",
    descClass: "text-slate-600",
    layoutClass: "flex-col",
    textWrapperClass: "",
    imageWrapperClass:
      "w-full h-40 mb-6 rounded-2xl overflow-hidden border border-slate-100 shadow-sm",
    imageSrc: "/images/cap_chat.png",
  },
  {
    title: "Fills empty chairs",
    desc: "Reactivates overdue patients and backfills open slots automatically.",
    featured: false,
    colClass: "sm:col-span-1 lg:col-span-4",
    themeClass: "bg-white border border-slate-200/60 shadow-sm hover:shadow-md text-slate-900",
    descClass: "text-slate-600",
    layoutClass: "flex-col",
    textWrapperClass: "",
    imageWrapperClass:
      "w-full h-40 mb-6 rounded-2xl overflow-hidden border border-slate-100 shadow-sm",
    imageSrc: "/images/cap_chairs.png",
  },
  {
    title: "Writes visit notes",
    desc: "Notes generated automatically after every appointment.",
    featured: true,
    colClass: "sm:col-span-2 lg:col-span-8",
    themeClass: "bg-white border border-slate-200/60 shadow-sm hover:shadow-md text-slate-900",
    descClass: "text-slate-600",
    layoutClass: "flex-col sm:flex-row items-center gap-6 sm:gap-10",
    textWrapperClass: "sm:w-1/2 order-last sm:order-first",
    imageWrapperClass:
      "w-full sm:w-1/2 h-48 sm:h-64 shrink-0 rounded-2xl overflow-hidden border border-slate-100 shadow-sm",
    imageSrc: "/images/cap_notes.png",
  },
  {
    title: "Shows your numbers",
    desc: "Appointments, patients, revenue, and insurance, at a glance.",
    featured: false,
    colClass: "sm:col-span-1 lg:col-span-6",
    themeClass: "bg-white border border-slate-200/60 shadow-sm hover:shadow-md text-slate-900",
    descClass: "text-slate-600",
    layoutClass: "flex-col sm:flex-row items-center gap-6",
    textWrapperClass: "flex-1 order-last",
    imageWrapperClass:
      "w-full sm:w-48 h-40 sm:h-32 shrink-0 rounded-2xl overflow-hidden order-first border border-slate-100 shadow-sm",
    imageSrc: "/images/cap_analytics.png",
  },
  {
    title: "SEO + Google Ads",
    desc: "Search optimization and Google Ads support so new patients find your clinic first.",
    featured: false,
    colClass: "sm:col-span-1 lg:col-span-6",
    themeClass: "bg-white border border-slate-200/60 shadow-sm hover:shadow-md text-slate-900",
    descClass: "text-slate-600",
    layoutClass: "flex-col sm:flex-row items-center gap-6",
    textWrapperClass: "flex-1 order-last sm:order-first",
    imageWrapperClass:
      "w-full sm:w-48 h-40 sm:h-32 shrink-0 rounded-2xl overflow-hidden order-first sm:order-last border border-slate-100 shadow-sm",
    imageSrc: "/images/cap_seo.png",
  },
  {
    title: "Automated Reminders",
    desc: "Ensure patients show up with perfectly timed text and email reminders.",
    featured: false,
    colClass: "sm:col-span-2 lg:col-span-8",
    themeClass: "bg-white border border-slate-200/60 shadow-sm hover:shadow-md text-slate-900",
    descClass: "text-slate-600",
    layoutClass: "flex-col sm:flex-row items-center gap-6 sm:gap-10",
    textWrapperClass: "sm:w-1/2",
    imageWrapperClass:
      "w-full sm:w-1/2 h-48 sm:h-64 shrink-0 rounded-2xl overflow-hidden order-first sm:order-last border border-slate-100 shadow-sm",
    imageSrc: "/images/cap_reminders.png",
  },
  {
    title: "Campaign Text & Emails",
    desc: "Engage your patient base with targeted marketing blasts and announcements.",
    featured: false,
    colClass: "sm:col-span-1 lg:col-span-4",
    themeClass: "bg-white border border-slate-200/60 shadow-sm hover:shadow-md text-slate-900",
    descClass: "text-slate-600",
    layoutClass: "flex-col",
    textWrapperClass: "",
    imageWrapperClass:
      "w-full h-40 mb-6 rounded-2xl overflow-hidden border border-slate-100 shadow-sm",
    imageSrc: "/images/cap_campaigns.png",
  },
];

export function Capabilities() {
  return (
    <section id="platform" className="relative overflow-hidden bg-[#FDFBF7] py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center sm:mb-20">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FF6A55]/20 bg-[#FF6A55]/5 px-3 py-1.5 text-[11px] font-bold tracking-[0.18em] text-[#FF6A55] uppercase shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            One platform, not nine tools
          </span>
          <h2 className="mb-6 font-display text-4xl leading-[1.1] font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Everything your front office needs, <span className="text-slate-400">in one place</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed font-medium text-slate-600 sm:text-xl">
            Eleven jobs Solara does for you, every day, automatically.
          </p>
        </div>

        {/* High-Contrast Bento Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-12">
          {CARDS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`group relative flex overflow-hidden rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 sm:p-8 ${item.themeClass} ${item.colClass} ${item.layoutClass}`}
            >
              {item.featured && (
                <span className="absolute top-6 left-6 z-10 inline-flex items-center gap-1.5 rounded-full bg-[#FF6A55] px-3 py-1 text-[10px] font-bold tracking-wider text-white uppercase shadow-md sm:top-8 sm:left-8">
                  <Sparkles className="h-3 w-3" /> Featured
                </span>
              )}

              <div
                className={`${item.imageWrapperClass} relative z-0 transition-transform duration-500 group-hover:scale-[1.02]`}
              >
                <Image
                  src={item.imageSrc}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>

              <div className={`${item.textWrapperClass} relative z-10 flex flex-col`}>
                <h3
                  className={`mb-2.5 font-display font-bold ${item.featured ? "text-2xl sm:text-3xl" : "text-xl"}`}
                >
                  {item.title}
                </h3>
                <p className={`text-[15px] leading-relaxed font-medium ${item.descClass}`}>
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
