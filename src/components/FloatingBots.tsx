import { useState } from 'react';
import { MessageSquare, Mic, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { VoiceBotModal } from './VoiceBotModal';
import { ChatbotModal } from './ChatbotModal';

export function FloatingBots() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVoiceBotOpen, setIsVoiceBotOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Options */}
      <div 
        className={cn(
          "flex flex-col gap-3 transition-all duration-300 ease-in-out origin-bottom",
          isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        <button 
          className="flex items-center gap-3 bg-white text-slate-800 p-2 pr-4 pl-2 rounded-full shadow-lg hover:shadow-xl hover:bg-slate-50 transition-all border border-slate-100 group"
          onClick={() => {
            setIsOpen(false);
            setIsVoiceBotOpen(true);
          }}
        >
          <div className="bg-primary/10 text-primary p-2 rounded-full">
            <Mic className="w-5 h-5" />
          </div>
          <span className="font-medium text-sm group-hover:text-primary transition-colors">Voice Bot</span>
        </button>
        
        <button 
          className="flex items-center gap-3 bg-white text-slate-800 p-2 pr-4 pl-2 rounded-full shadow-lg hover:shadow-xl hover:bg-slate-50 transition-all border border-slate-100 group"
          onClick={() => {
            setIsOpen(false);
            setIsChatbotOpen(true);
          }}
        >
          <div className="bg-primary/10 text-primary p-2 rounded-full">
            <MessageSquare className="w-5 h-5" />
          </div>
          <span className="font-medium text-sm group-hover:text-primary transition-colors">Chatbot</span>
        </button>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300",
          isOpen 
            ? "bg-slate-800 text-white hover:bg-slate-700 rotate-90" 
            : "bg-slate-900 text-white hover:bg-slate-800 hover:scale-105"
        )}
      >
        {isOpen ? <X className="w-6 h-6 -rotate-90 transition-transform duration-300" /> : <img src="/images/secondary-logo.svg" alt="Solara" className="w-7 h-7 " />}
      </button>
    </div>
    <VoiceBotModal isOpen={isVoiceBotOpen} onClose={() => setIsVoiceBotOpen(false)} agentCode="solara" />
    <ChatbotModal isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} agentCode="solara" />
    </>
  );
}
