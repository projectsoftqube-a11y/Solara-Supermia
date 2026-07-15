import { useEffect, useState, useRef } from "react";
import { X, Send } from "lucide-react";
import { cn } from "../lib/utils";

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentCode?: string;
}

interface Message {
  sender: 'user' | 'agent';
  text: string;
}

export function ChatbotModal({ isOpen, onClose, agentCode = "solara" }: ChatbotModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const wsRef = useRef<WebSocket | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";
  // Convert http:// to ws://
  const wsUrl = apiBaseUrl.replace(/^http/, 'ws') + "/chat?agent=" + agentCode;

  useEffect(() => {
    if (isOpen) {
      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
        setIsConnecting(true);
        setError(null);
        setMessages([]); // Clear on new connection

        const ws = new WebSocket(wsUrl);

        ws.onopen = () => {
          setIsConnecting(false);
          console.log("Chat websocket connected");
        };

        ws.onmessage = (event) => {
          const text = event.data;
          setMessages(prev => [...prev, { sender: 'agent', text }]);
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
          setIsTyping(false);
        };

        wsRef.current = ws;
      }
    } else {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [isOpen, wsUrl]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim() || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
    
    const text = inputText;
    setMessages(prev => [...prev, { sender: 'user', text }]);
    setIsTyping(true);
    wsRef.current.send(text);
    setInputText("");
  };

  if (!isOpen) return null;

  const isConnected = wsRef.current?.readyState === WebSocket.OPEN;

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
              <h2 className="text-white text-lg font-semibold tracking-tight">Solara AI Chat</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={cn("w-2 h-2 rounded-full", isConnected ? "bg-green-500" : isConnecting ? "bg-yellow-500 animate-pulse" : "bg-red-500")}></span>
                <span className="text-xs text-slate-300 font-medium">
                  {isConnecting ? "Connecting..." : isConnected ? "Online" : "Disconnected"}
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
          ) : (
            <div className="flex-1 flex flex-col h-full">
              {/* Transcript / Chat Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
                {messages.map((msg, i) => (
                  <div key={i} className={cn("flex flex-col max-w-[85%]", msg.sender === 'user' ? "ml-auto items-end" : "mr-auto items-start")}>
                    <span className="text-[10px] text-slate-400 mb-1 px-1">{msg.sender === 'user' ? 'You' : 'Solara Agent'}</span>
                    <div 
                      className={cn(
                        "p-3 rounded-2xl text-sm",
                        msg.sender === 'user' 
                          ? "bg-[#f97316] text-white rounded-tr-sm" 
                          : "bg-[#3e3525] text-slate-200 rounded-tl-sm"
                      )}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex flex-col max-w-[85%] mr-auto items-start">
                    <span className="text-[10px] text-slate-400 mb-1 px-1">Solara Agent</span>
                    <div className="p-4 rounded-2xl bg-[#3e3525] text-slate-200 rounded-tl-sm flex gap-1.5 items-center h-[44px]">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                    </div>
                  </div>
                )}
                {isConnecting && (
                  <div className="text-center text-xs text-slate-500 py-4">Connecting to server...</div>
                )}
              </div>

              {/* Controls / Input Area */}
              <div className="p-4 border-t border-[#3e3525] bg-[#2a241b] shrink-0 pb-6">
                <div className="flex items-center gap-2">
                  {/* Text Input */}
                  <div className="flex-1 bg-[#1e1912] border border-[#3e3525] rounded-full flex items-center px-4 h-10">
                    <input 
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      disabled={!isConnected}
                      placeholder="Type your message..."
                      className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-slate-500 disabled:opacity-50"
                    />
                  </div>

                  {/* Send Button */}
                  <button 
                    onClick={handleSend}
                    disabled={!isConnected || !inputText.trim()}
                    className="w-10 h-10 rounded-full bg-[#3e3525] text-white flex items-center justify-center shrink-0 hover:bg-[#4a402d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4 ml-0.5" />
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
