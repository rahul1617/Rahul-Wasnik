
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Terminal, Cpu } from 'lucide-react';
import { chatWithGamerPal } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: "Secure connection established. Gamer Pal V2 online. State query." }
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
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'model', text: response || "ERR_NULL_RESPONSE" }]);
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: "Connection instability detected." }]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 flex items-center justify-center bg-[#0a0a0f] border border-white/5 backdrop-blur-3xl shadow-2xl hover:border-white/30 transition-all duration-500 rounded-2xl group"
          >
            <Terminal className="w-6 h-6 text-white group-hover:text-[#70CFFF] transition-colors" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#70CFFF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#70CFFF]"></span>
            </span>
          </button>
        </div>
      )}

      {isOpen && (
        <div className={`fixed z-[60] flex flex-col bg-[#050508]/95 backdrop-blur-2xl border border-white/10 shadow-2xl
          md:bottom-6 md:right-6 md:w-80 md:h-[500px]
          inset-0 w-full h-full animate-in fade-in slide-in-from-bottom-5 duration-500
          rounded-none md:rounded-3xl overflow-hidden
        `}>
          <div className="p-4 flex justify-between items-center border-b border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center rounded-lg">
                <Cpu className="w-3.5 h-3.5 text-[#70CFFF]" />
              </div>
              <div>
                <h3 className="font-mono font-bold text-white tracking-[0.1em] text-[10px] uppercase">Gamer Pal V2</h3>
                <span className="text-[8px] text-slate-600 font-mono flex items-center gap-1 uppercase">
                    <span className="w-1 h-1 bg-[#70CFFF] rounded-full animate-pulse"></span> Encrypted
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition-colors"><X className="w-4 h-4" /></button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-5 font-mono text-[11px] scrollbar-hide">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 border leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-white/5 text-white border-white/10 rounded-xl rounded-tr-none' 
                    : 'bg-black/40 text-slate-400 border-white/5 rounded-xl rounded-tl-none'
                }`}>
                   {msg.text}
                </div>
              </div>
            ))}
            {isThinking && (
               <div className="flex justify-start">
                  <div className="bg-black/40 px-3 py-2 border border-white/5 flex gap-1.5 items-center rounded-xl">
                      <span className="w-1 h-1 bg-slate-500 animate-bounce"></span>
                      <span className="w-1 h-1 bg-slate-500 animate-bounce delay-100"></span>
                      <span className="w-1 h-1 bg-slate-500 animate-bounce delay-200"></span>
                  </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-white/5 bg-black/20">
            <div className="flex gap-2 items-center bg-white/[0.02] border border-white/5 p-1 rounded-xl focus-within:border-white/20 transition-all">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Query system..."
                className="flex-1 bg-transparent px-3 py-2 text-[11px] text-white focus:outline-none placeholder-slate-700 font-mono"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isThinking}
                className="p-2 text-slate-500 hover:text-white transition-all"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
