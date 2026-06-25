import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Hero } from "@/components/Hero";
import { Capabilities } from "@/components/sections/Capabilities";
import { Insurance } from "@/components/sections/Insurance";
import { Automation } from "@/components/sections/Automation";
import { VoiceBot } from "@/components/sections/VoiceBot";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { OpenDental } from "@/components/sections/OpenDental";
import { Dashboard } from "@/components/sections/Dashboard";
import { Comparison } from "@/components/sections/Comparison";
import { FoundingOffer } from "@/components/sections/FoundingOffer";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { ContactForm } from "@/components/sections/ContactForm";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Solara — AI Front Office OS for Dental Practices" },
      {
        name: "description",
        content:
          "Solara is the AI front office operating system for dental practices. Insurance, calls, booking, intake, recall, notes, analytics — unified with OpenDental.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-[color:var(--background)]">
      <SmoothScroll />
      <SiteHeader />
      <main>
        <Hero />
        <Capabilities />
        <Insurance />
        <Automation />
        <VoiceBot />
        <CaseStudy />
        <OpenDental />
        <Dashboard />
        <Comparison />
        <FoundingOffer />
        <Pricing />
        <FAQ />
        <ContactForm />
        <FinalCTA />
        <Footer />
      </main>
    </div>
  );
}
