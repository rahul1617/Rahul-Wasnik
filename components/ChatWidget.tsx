import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Terminal, Cpu } from 'lucide-react';
import { chatWithGamerPal } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: "System initialized. Gamer Pal AI online. Awaiting query..." }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  useEffect(() => {
    if (window.innerWidth < 768) {
      document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);

    try {
      const history = messages.map(m => ({
        role: m.role === 'model' ? 'model' : 'user',
        parts: [{ text: m.text }]
      }));
      
      const response = await chatWithGamerPal(history, userMsg.text);
      
      const botMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: response || "Error: Data corrupted." };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: "Connection interruption. Reconnecting..." }]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <>
      {/* Launcher Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="group relative w-16 h-16 flex items-center justify-center bg-white/10 border border-white backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:bg-white/20 hover:scale-105 transition-all duration-300"
            style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 80%, 80% 100%, 0 100%, 0 20%)' }}
            aria-label="Open Chat"
          >
            <Terminal className="w-8 h-8 text-white" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
          </button>
        </div>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <div className={`fixed z-[60] flex flex-col bg-[#050510]/95 backdrop-blur-xl border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.8)]
          md:bottom-6 md:right-6 md:w-96 md:h-[600px]
          inset-0 w-full h-full animate-in fade-in slide-in-from-bottom-10 duration-300
        `}
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 95%, 95% 100%, 0 100%)' }}
        >
          {/* Decorative scanline */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02),rgba(255,255,255,0.06))] z-0 bg-[length:100%_2px,3px_100%] opacity-20"></div>

          {/* Header */}
          <div className="p-4 flex justify-between items-center border-b border-white/10 bg-white/5 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/10 border border-white flex items-center justify-center">
                <Cpu className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-mono font-bold text-white tracking-widest text-sm">GAMER_PAL_V2</h3>
                <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-pulse"></span> ONLINE
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="w-8 h-8 flex items-center justify-center hover:bg-white/20 text-white transition-colors border border-transparent hover:border-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-hide font-mono relative z-10">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 text-sm leading-relaxed border ${
                  msg.role === 'user' 
                    ? 'bg-white/10 text-white border-white/30 rounded-tl-lg rounded-br-lg' 
                    : 'bg-[#111] text-[#e0e0e0] border-slate-700 rounded-tr-lg rounded-bl-lg'
                }`}>
                   <div className="text-[9px] opacity-50 mb-1 tracking-widest uppercase">
                       {msg.role === 'user' ? 'USER_INPUT' : 'AI_RESPONSE'}
                   </div>
                   {msg.text}
                </div>
              </div>
            ))}
            {isThinking && (
               <div className="flex justify-start">
                  <div className="bg-[#111] px-4 py-3 border border-slate-700 flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 bg-white animate-pulse"></span>
                      <span className="w-1.5 h-1.5 bg-white animate-pulse delay-75"></span>
                      <span className="w-1.5 h-1.5 bg-white animate-pulse delay-150"></span>
                      <span className="text-xs text-white ml-2 animate-pulse">PROCESSING...</span>
                  </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10 bg-black/40 relative z-10">
            <div className="flex gap-2 items-center bg-black/50 border border-white/20 p-1 focus-within:border-white transition-all">
              <Terminal className="w-4 h-4 text-white ml-2" />
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Enter command..."
                className="flex-1 bg-transparent px-2 py-3 text-sm text-white focus:outline-none placeholder-slate-500 font-mono"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isThinking}
                className="p-3 bg-white/10 hover:bg-white text-white hover:text-black border border-white/30 hover:border-white transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;