import type { Metadata } from "next";

import { BookingConfirmedPage } from "@/components/pages/BookingConfirmedPage";

export const metadata: Metadata = {
  title: "Your Demo Is Confirmed | Solara Dental AI",
  description:
    "Your Solara demo is booked. Check your inbox for the calendar invite and video link.",
  // Conversion pages shouldn't be indexed — they skew organic traffic data.
  robots: { index: false, follow: false },
};

export default function Page() {
  return <BookingConfirmedPage />;
}
