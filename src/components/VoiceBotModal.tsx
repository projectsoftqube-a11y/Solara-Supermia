import { useEffect, useState, useRef, useMemo } from "react";
import { X, Mic, MicOff, Send, PhoneOff } from "lucide-react";
import { cn } from "../lib/utils";
import {
  LiveKitRoom,
  RoomAudioRenderer,
  useLocalParticipant,
  useChat,
  useRoomContext,
} from "@livekit/components-react";
import { RoomEvent, TranscriptionSegment, Participant } from "livekit-client";
import "@livekit/components-styles";

interface VoiceBotModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentCode?: string;
}

export function VoiceBotModal({ isOpen, onClose, agentCode = "solara" }: VoiceBotModalProps) {
  const [roomToken, setRoomToken] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // You can set this via environment variable or hardcode it as requested
  const liveKitUrl = import.meta.env.VITE_LIVEKIT_URL || "wss://your-livekit-url.livekit.cloud";
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

  useEffect(() => {
    if (isOpen && !roomToken && !isFetching) {
      setIsFetching(true);
      setError(null);
      // Fetch token
      fetch(`${apiBaseUrl}/getToken?agent=${agentCode}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.data && data.data.room_token) {
            setRoomToken(data.data.room_token);
          } else {
            setError("Failed to get a valid token from response.");
          }
        })
        .catch((err) => {
          console.error("Error fetching token:", err);
          setError("Failed to connect to the server to get a token.");
        })
        .finally(() => {
          setIsFetching(false);
        });
    }
  }, [isOpen, roomToken, isFetching]);

  // If the modal is closed, clean up the token so it fetches a new one next time
  useEffect(() => {
    if (!isOpen) {
      setRoomToken(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end sm:p-6 p-4 pointer-events-none">
      <div className="bg-[#2a241b] w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl border border-[#3e3525] flex flex-col pointer-events-auto h-[600px] max-h-[80vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-[#3e3525] flex items-center justify-between bg-[#2a241b] shrink-0">
          <div className="flex items-center gap-3">
             <div className="bg-primary/20 p-2 rounded-full">
                <img src="/images/secondary-logo.svg" alt="Solara" className="w-5 h-5" />
             </div>
            <div>
              <h2 className="text-white text-lg font-semibold tracking-tight">Solara AI Voice</h2>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs text-slate-300 font-medium">
                {isFetching ? "Connecting..." : roomToken ? "Connected" : "Disconnected"}
              </span>
            </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 relative flex flex-col overflow-hidden bg-[#221d15]">
          {error ? (
            <div className="p-6 text-center text-red-400 flex-1 flex items-center justify-center">
              {error}
            </div>
          ) : isFetching ? (
            <div className="p-6 text-center text-slate-400 flex-1 flex items-center justify-center">
              Initializing connection...
            </div>
          ) : roomToken ? (
            <LiveKitRoom
              serverUrl={liveKitUrl}
              token={roomToken}
              connect={true}
              audio={true}
              video={false}
              className="flex-1 flex flex-col"
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
  const [transcripts, setTranscripts] = useState<Record<string, { text: string, final: boolean, participant?: Participant, timestamp: number }>>({});

  useEffect(() => {
    const handleTranscription = (segments: TranscriptionSegment[], participant?: Participant) => {
      setTranscripts(prev => {
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
    const items: Array<{ id: string, text: string, isUser: boolean, name: string, timestamp: number, isFinal: boolean }> = [];
    
    // Add text chats
    chatMessages.forEach(msg => {
      const isUser = msg.from?.identity === localParticipant?.identity;
      items.push({
        id: msg.id || msg.timestamp.toString(),
        text: msg.message,
        isUser,
        name: msg.from?.name || (isUser ? 'You' : 'Solara Agent'),
        timestamp: msg.timestamp,
        isFinal: true
      });
    });

    // Add transcripts
    Object.entries(transcripts).forEach(([id, t]) => {
      // Only show transcripts that have some text to avoid empty bubbles
      if (!t.text.trim()) return;
      const isUser = t.participant?.identity === localParticipant?.identity;
      items.push({
        id: `transcript-${id}`,
        text: t.text + (t.final ? '' : '...'),
        isUser,
        name: t.participant?.name || (isUser ? 'You' : 'Solara Agent'),
        timestamp: t.timestamp,
        isFinal: t.final
      });
    });

    // Sort by timestamp
    return items.sort((a, b) => a.timestamp - b.timestamp);
  }, [chatMessages, transcripts, localParticipant]);

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Transcript / Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        {allMessages.length === 0 && (
          <div className="text-center text-slate-500 text-sm mt-4">
            Start talking to the agent...
          </div>
        )}
        {allMessages.map((msg) => {
          return (
            <div key={msg.id} className={cn("flex flex-col max-w-[85%]", msg.isUser ? "ml-auto items-end" : "mr-auto items-start", !msg.isFinal && "opacity-70")}>
              <span className="text-[10px] text-slate-400 mb-1 px-1">{msg.name}</span>
              <div 
                className={cn(
                  "p-3 rounded-2xl text-sm",
                  msg.isUser 
                    ? "bg-[#f97316] text-white rounded-tr-sm" // Orange user bubble
                    : "bg-[#3e3525] text-slate-200 rounded-tl-sm" // Dark agent bubble
                )}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls / Input Area */}
      <div className="p-4 border-t border-[#3e3525] bg-[#2a241b] shrink-0 pb-6">
        <div className="flex items-center gap-2">
          {/* Mic Toggle */}
          <button 
            onClick={toggleMic}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors",
              isMicrophoneEnabled 
                ? "bg-[#3e3525] text-white hover:bg-[#4a402d]" 
                : "bg-red-500/20 text-red-500 hover:bg-red-500/30"
            )}
          >
            {isMicrophoneEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>

          {/* Text Input */}
          <div className="flex-1 bg-[#1e1912] border border-[#3e3525] rounded-full flex items-center px-4 h-10">
            <input 
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-slate-500"
            />
          </div>

          {/* Send Button */}
          <button 
            onClick={handleSend}
            className="w-10 h-10 rounded-full bg-[#3e3525] text-white flex items-center justify-center shrink-0 hover:bg-[#4a402d] transition-colors"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
          
          {/* Hang Up Button */}
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center shrink-0 hover:bg-red-500/30 transition-colors ml-1"
          >
            <PhoneOff className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
