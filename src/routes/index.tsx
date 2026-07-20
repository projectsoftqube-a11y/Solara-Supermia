import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Hero } from "@/components/Hero";
import { CallbackChip } from "@/components/CallbackChip";
import { VideoShowcase } from "@/components/sections/VideoShowcase";
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
      <CallbackChip />
      <main>
        <Hero />
        <VideoShowcase
          id="demo"
          eyebrow="Watch the demo"
          title="See Solara"
          highlight="in action"
          description="A quick look at how Solara runs your entire front office — verifying insurance, answering calls, and booking patients while your team focuses on care."
          src="/videos/demo-1.mp4"
          theme="light"
          stats={[
            { value: "24/7", label: "Always answering" },
            { value: "94%", label: "Verified instantly" },
            { value: "<60s", label: "To book a patient" },
            { value: "0", label: "Calls missed" },
          ]}
        />
        <Capabilities />
        <Insurance />
        <Automation />
        <VoiceBot />
        <CaseStudy />
        <VideoShowcase
          id="walkthrough-video"
          eyebrow="Product walkthrough"
          title="Watch the front desk"
          highlight="run itself"
          description="From the first ring to a confirmed appointment — see every step Solara handles automatically, end to end, inside your existing workflow."
          src="/videos/demo-2.mp4"
          theme="dark"
          stats={[
            { value: "40+", label: "Tasks automated" },
            { value: "100%", label: "Synced to OpenDental" },
            { value: "Instant", label: "Chart updates" },
            { value: "5★", label: "Patient experience" },
          ]}
        />
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
