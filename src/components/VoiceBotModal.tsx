"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { X, Mic, MicOff, Send, PhoneOff } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  LiveKitRoom,
  RoomAudioRenderer,
  useLocalParticipant,
  useChat,
  useRoomContext,
} from "@livekit/components-react";
import { RoomEvent, TranscriptionSegment, Participant } from "livekit-client";
import "@livekit/components-styles";

import { BOT_API_URL, LIVEKIT_URL } from "@/lib/site";
import Image from "next/image";

interface VoiceBotModalProps {
  onClose: () => void;
  agentCode?: string;
}

/**
 * Rendered only while open (see FloatingBots): every open fetches a fresh room
 * token, and closing unmounts the LiveKit room.
 */
export function VoiceBotModal({ onClose, agentCode = "solara" }: VoiceBotModalProps) {
  const [roomToken, setRoomToken] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(`${BOT_API_URL}/getToken?agent=${agentCode}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (data?.data?.room_token) {
          setRoomToken(data.data.room_token);
        } else {
          setError("Failed to get a valid token from response.");
        }
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("Error fetching token:", err);
        setError("Failed to connect to the server to get a token.");
      })
      .finally(() => {
        if (!cancelled) setIsFetching(false);
      });

    return () => {
      cancelled = true;
    };
  }, [agentCode]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-end justify-end p-4 sm:p-6">
      <div className="pointer-events-auto flex h-[600px] max-h-[80vh] w-full max-w-sm flex-col overflow-hidden rounded-3xl border border-[#3e3525] bg-[#2a241b] shadow-2xl">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-[#3e3525] bg-[#2a241b] p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/20 p-2">
              <Image
                src="/images/secondary-logo.svg"
                alt="Solara"
                width={192}
                height={156}
                className="h-5 w-5"
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-white">Solara AI Voice</h2>
              <div className="mt-0.5 flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
                <span className="text-xs font-medium text-slate-300">
                  {isFetching ? "Connecting..." : roomToken ? "Connected" : "Disconnected"}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="text-slate-400 transition-colors hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="relative flex flex-1 flex-col overflow-hidden bg-[#221d15]">
          {error ? (
            <div className="flex flex-1 items-center justify-center p-6 text-center text-red-400">
              {error}
            </div>
          ) : isFetching ? (
            <div className="flex flex-1 items-center justify-center p-6 text-center text-slate-400">
              Initializing connection...
            </div>
          ) : roomToken ? (
            <LiveKitRoom
              serverUrl={LIVEKIT_URL}
              token={roomToken}
              connect={true}
              audio={true}
              video={false}
              className="flex flex-1 flex-col"
            >
              <VoiceBotUI onClose={onClose} />
              <RoomAudioRenderer />
            </LiveKitRoom>
          ) : null}
        </div>
      </div>
    </div>
  );
}

// Separate component to use LiveKit hooks inside LiveKitRoom context
function VoiceBotUI({ onClose }: { onClose: () => void }) {
  const room = useRoomContext();
  const { isMicrophoneEnabled, localParticipant } = useLocalParticipant();
  const { chatMessages, send } = useChat();
  const [inputText, setInputText] = useState("");

  // Custom transcription state
  const [transcripts, setTranscripts] = useState<
    Record<string, { text: string; final: boolean; participant?: Participant; timestamp: number }>
  >({});

  useEffect(() => {
    const handleTranscription = (segments: TranscriptionSegment[], participant?: Participant) => {
      setTranscripts((prev) => {
        const next = { ...prev };
        for (const segment of segments) {
          next[segment.id] = {
            text: segment.text,
            final: segment.final,
            participant: participant,
            timestamp: Date.now(), // or segment.startTime
          };
        }
        return next;
      });
    };

    room.on(RoomEvent.TranscriptionReceived, handleTranscription);
    return () => {
      room.off(RoomEvent.TranscriptionReceived, handleTranscription);
    };
  }, [room]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages, transcripts]);

  const toggleMic = () => {
    if (localParticipant) {
      localParticipant.setMicrophoneEnabled(!isMicrophoneEnabled);
    }
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    // Send via LiveKit chat system
    send(inputText);
    setInputText("");
  };

  // Combine chat messages and transcriptions
  const allMessages = useMemo(() => {
    const items: Array<{
      id: string;
      text: string;
      isUser: boolean;
      name: string;
      timestamp: number;
      isFinal: boolean;
    }> = [];

    // Add text chats
    chatMessages.forEach((msg) => {
      const isUser = msg.from?.identity === localParticipant?.identity;
      items.push({
        id: msg.id || msg.timestamp.toString(),
        text: msg.message,
        isUser,
        name: msg.from?.name || (isUser ? "You" : "Solara Agent"),
        timestamp: msg.timestamp,
        isFinal: true,
      });
    });

    // Add transcripts
    Object.entries(transcripts).forEach(([id, t]) => {
      // Only show transcripts that have some text to avoid empty bubbles
      if (!t.text.trim()) return;
      const isUser = t.participant?.identity === localParticipant?.identity;
      items.push({
        id: `transcript-${id}`,
        text: t.text + (t.final ? "" : "..."),
        isUser,
        name: t.participant?.name || (isUser ? "You" : "Solara Agent"),
        timestamp: t.timestamp,
        isFinal: t.final,
      });
    });

    // Sort by timestamp
    return items.sort((a, b) => a.timestamp - b.timestamp);
  }, [chatMessages, transcripts, localParticipant]);

  return (
    <div className="flex h-full flex-1 flex-col">
      {/* Transcript / Chat Area */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4" ref={scrollRef}>
        {allMessages.length === 0 && (
          <div className="mt-4 text-center text-sm text-slate-500">
            Start talking to the agent...
          </div>
        )}
        {allMessages.map((msg) => {
          return (
            <div
              key={msg.id}
              className={cn(
                "flex max-w-[85%] flex-col",
                msg.isUser ? "ml-auto items-end" : "mr-auto items-start",
                !msg.isFinal && "opacity-70",
              )}
            >
              <span className="mb-1 px-1 text-[10px] text-slate-400">{msg.name}</span>
              <div
                className={cn(
                  "rounded-2xl p-3 text-sm",
                  msg.isUser
                    ? "rounded-tr-sm bg-[#f97316] text-white" // Orange user bubble
                    : "rounded-tl-sm bg-[#3e3525] text-slate-200", // Dark agent bubble
                )}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls / Input Area */}
      <div className="shrink-0 border-t border-[#3e3525] bg-[#2a241b] p-4 pb-6">
        <div className="flex items-center gap-2">
          {/* Mic Toggle */}
          <button
            onClick={toggleMic}
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors",
              isMicrophoneEnabled
                ? "bg-[#3e3525] text-white hover:bg-[#4a402d]"
                : "bg-red-500/20 text-red-500 hover:bg-red-500/30",
            )}
          >
            {isMicrophoneEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
          </button>

          {/* Text Input */}
          <div className="flex h-10 flex-1 items-center rounded-full border border-[#3e3525] bg-[#1e1912] px-4">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="w-full border-none bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
            />
          </div>

          {/* Send Button */}
          <button
            onClick={handleSend}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#3e3525] text-white transition-colors hover:bg-[#4a402d]"
          >
            <Send className="ml-0.5 h-4 w-4" />
          </button>

          {/* Hang Up Button */}
          <button
            onClick={onClose}
            className="ml-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-red-500 transition-colors hover:bg-red-500/30"
          >
            <PhoneOff className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
