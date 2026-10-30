"use client";

import { useEffect, useState, useRef } from "react";
import { X, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { BOT_API_URL } from "@/lib/site";
import Image from "next/image";

interface ChatbotModalProps {
  onClose: () => void;
  agentCode?: string;
}

interface Message {
  sender: "user" | "agent";
  text: string;
}

/**
 * Rendered only while open (see FloatingBots): every open starts a fresh
 * websocket session with an empty transcript, and closing disconnects.
 */
export function ChatbotModal({ onClose, agentCode = "solara" }: ChatbotModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isConnecting, setIsConnecting] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Convert http(s):// to ws(s)://
    const ws = new WebSocket(`${BOT_API_URL.replace(/^http/, "ws")}/chat?agent=${agentCode}`);

    ws.onopen = () => {
      setIsConnecting(false);
      setIsConnected(true);
      console.log("Chat websocket connected");
    };

    ws.onmessage = (event) => {
      const text = event.data;
      setMessages((prev) => [...prev, { sender: "agent", text }]);
      setIsTyping(false);
    };

    ws.onerror = (err) => {
      console.error("Chat websocket error:", err);
      setError("Failed to connect to the chat server.");
      setIsConnecting(false);
      setIsTyping(false);
    };

    ws.onclose = () => {
      console.log("Chat websocket closed");
      setIsConnecting(false);
      setIsConnected(false);
      setIsTyping(false);
    };

    wsRef.current = ws;

    return () => {
      ws.close();
      wsRef.current = null;
    };
  }, [agentCode]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim() || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

    const text = inputText;
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setIsTyping(true);
    wsRef.current.send(text);
    setInputText("");
  };

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
              <h2 className="text-lg font-semibold tracking-tight text-white">Solara AI Chat</h2>
              <div className="mt-0.5 flex items-center gap-2">
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    isConnected
                      ? "bg-green-500"
                      : isConnecting
                        ? "animate-pulse bg-yellow-500"
                        : "bg-red-500",
                  )}
                ></span>
                <span className="text-xs font-medium text-slate-300">
                  {isConnecting ? "Connecting..." : isConnected ? "Online" : "Disconnected"}
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
          ) : (
            <div className="flex h-full flex-1 flex-col">
              {/* Transcript / Chat Area */}
              <div className="flex-1 space-y-4 overflow-y-auto p-4" ref={scrollRef}>
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex max-w-[85%] flex-col",
                      msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start",
                    )}
                  >
                    <span className="mb-1 px-1 text-[10px] text-slate-400">
                      {msg.sender === "user" ? "You" : "Solara Agent"}
                    </span>
                    <div
                      className={cn(
                        "rounded-2xl p-3 text-sm",
                        msg.sender === "user"
                          ? "rounded-tr-sm bg-[#f97316] text-white"
                          : "rounded-tl-sm bg-[#3e3525] text-slate-200",
                      )}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="mr-auto flex max-w-[85%] flex-col items-start">
                    <span className="mb-1 px-1 text-[10px] text-slate-400">Solara Agent</span>
                    <div className="flex h-[44px] items-center gap-1.5 rounded-2xl rounded-tl-sm bg-[#3e3525] p-4 text-slate-200">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]"></span>
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]"></span>
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"></span>
                    </div>
                  </div>
                )}
                {isConnecting && (
                  <div className="py-4 text-center text-xs text-slate-500">
                    Connecting to server...
                  </div>
                )}
              </div>

              {/* Controls / Input Area */}
              <div className="shrink-0 border-t border-[#3e3525] bg-[#2a241b] p-4 pb-6">
                <div className="flex items-center gap-2">
                  {/* Text Input */}
                  <div className="flex h-10 flex-1 items-center rounded-full border border-[#3e3525] bg-[#1e1912] px-4">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      disabled={!isConnected}
                      placeholder="Type your message..."
                      className="w-full border-none bg-transparent text-sm text-white outline-none placeholder:text-slate-500 disabled:opacity-50"
                    />
                  </div>

                  {/* Send Button */}
                  <button
                    onClick={handleSend}
                    disabled={!isConnected || !inputText.trim()}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#3e3525] text-white transition-colors hover:bg-[#4a402d] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Send className="ml-0.5 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
