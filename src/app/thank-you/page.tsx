import type { Metadata } from "next";

import { ThankYouPage } from "@/components/pages/ThankYouPage";

export const metadata: Metadata = {
  title: "Your Seat Is Confirmed | Solara Dental AI",
  description: "Your place is secured. You will receive your Solara call at the time you selected.",
  // Conversion pages shouldn't be indexed, they skew organic traffic data.
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ThankYouPage />;
}
