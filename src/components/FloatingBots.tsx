"use client";

import { MessageSquare, Mic, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";

import { cn } from "@/lib/utils";
import Image from "next/image";

// The modals (LiveKit especially) are heavy and only needed once a visitor opens
// one, so they load on demand instead of shipping with every page.
const VoiceBotModal = dynamic(() => import("./VoiceBotModal").then((m) => m.VoiceBotModal), {
  ssr: false,
});
const ChatbotModal = dynamic(() => import("./ChatbotModal").then((m) => m.ChatbotModal), {
  ssr: false,
});

export function FloatingBots() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVoiceBotOpen, setIsVoiceBotOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <>
      <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-3">
        {/* Options */}
        <div
          className={cn(
            "flex origin-bottom flex-col gap-3 transition-all duration-300 ease-in-out",
            isOpen
              ? "translate-y-0 scale-100 opacity-100"
              : "pointer-events-none translate-y-4 scale-95 opacity-0",
          )}
        >
          <button
            className="group flex items-center gap-3 rounded-full border border-slate-100 bg-white p-2 pr-4 pl-2 text-slate-800 shadow-lg transition-all hover:bg-slate-50 hover:shadow-xl"
            onClick={() => {
              setIsOpen(false);
              setIsVoiceBotOpen(true);
            }}
          >
            <div className="rounded-full bg-primary/10 p-2 text-primary">
              <Mic className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium transition-colors group-hover:text-primary">
              Voice Bot
            </span>
          </button>

          <button
            className="group flex items-center gap-3 rounded-full border border-slate-100 bg-white p-2 pr-4 pl-2 text-slate-800 shadow-lg transition-all hover:bg-slate-50 hover:shadow-xl"
            onClick={() => {
              setIsOpen(false);
              setIsChatbotOpen(true);
            }}
          >
            <div className="rounded-full bg-primary/10 p-2 text-primary">
              <MessageSquare className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium transition-colors group-hover:text-primary">
              Chatbot
            </span>
          </button>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-all duration-300",
            isOpen
              ? "rotate-90 bg-slate-800 text-white hover:bg-slate-700"
              : "bg-slate-900 text-white hover:scale-105 hover:bg-slate-800",
          )}
        >
          {isOpen ? (
            <X className="h-6 w-6 -rotate-90 transition-transform duration-300" />
          ) : (
            <Image
              src="/images/secondary-logo.svg"
              alt="Solara"
              width={192}
              height={156}
              className="h-7 w-7"
            />
          )}
        </button>
      </div>
      {/* Each modal mounts only while open, so a close always ends its session. */}
      {isVoiceBotOpen && (
        <VoiceBotModal onClose={() => setIsVoiceBotOpen(false)} agentCode="solara" />
      )}
      {isChatbotOpen && <ChatbotModal onClose={() => setIsChatbotOpen(false)} agentCode="solara" />}
    </>
  );
}
