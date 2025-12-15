import React, { useState } from 'react';
import { X, CheckCircle, Upload, Gamepad2, Globe, Link as LinkIcon, Monitor, Smartphone, Terminal } from 'lucide-react';
import Button from './Button';

interface SubmitGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubmitGameModal: React.FC<SubmitGameModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call processing
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-[#02040a] border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative flex flex-col my-auto">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto custom-scrollbar max-h-[85vh]">
          <div className="p-6 md:p-8">
            {submitted ? (
              <div className="text-center py-10 flex flex-col items-center">
                <div className="w-20 h-20 bg-cyan-500/10 text-cyan-500 rounded-full flex items-center justify-center mb-6 border border-cyan-500/20">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-display font-bold text-white mb-2">Game Submitted!</h3>
                <p className="text-slate-400 mb-8 max-w-sm">
                  Your game is now in our review queue. We'll notify you once it's live on unrealgames.cloud.
                </p>
                <Button onClick={onClose} variant="primary" className="w-full">Back to Directory</Button>
              </div>
            ) : (
              <>
                <div className="mb-8 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 mb-4 shadow-lg shadow-purple-500/20">
                    <Gamepad2 className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-white mb-2">Submit Your Game</h2>
                  <p className="text-slate-400 text-sm">Get your game in front of millions of players. Apply for a featured spot.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-4">
                    {/* Game Title */}
                    <div className="relative group">
                      <div className="absolute left-3 top-3 text-slate-500 group-focus-within:text-cyan-400 transition-colors">
                        <Terminal className="w-5 h-5" />
                      </div>
                      <input 
                        required 
                        type="text" 
                        placeholder="Game Title" 
                        className="w-full bg-slate-900/50 hover:bg-slate-900 border border-slate-700 hover:border-slate-500 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all" 
                      />
                    </div>
                    
                    {/* Studio & Genre */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative group">
                            <input 
                              required 
                              type="text" 
                              placeholder="Studio Name" 
                              className="w-full bg-slate-900/50 hover:bg-slate-900 border border-slate-700 hover:border-slate-500 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all" 
                            />
                        </div>
                        <div className="relative group">
                            <select className="w-full bg-slate-900/50 hover:bg-slate-900 border border-slate-700 hover:border-slate-500 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all appearance-none cursor-pointer">
                                <option value="" disabled selected>Select Genre</option>
                                <option>Battle Royale</option>
                                <option>FPS / Shooter</option>
                                <option>MOBA</option>
                                <option>RPG / MMO</option>
                                <option>Strategy</option>
                                <option>Sports / Racing</option>
                                <option>Indie</option>
                            </select>
                        </div>
                    </div>

                     {/* Platforms */}
                     <div className="bg-slate-900/50 hover:bg-slate-900 border border-slate-700 hover:border-slate-500 rounded-xl p-4 transition-all">
                        <label className="text-sm text-slate-400 block mb-3">Supported Platforms</label>
                        <div className="flex flex-wrap gap-4">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input type="checkbox" className="w-4 h-4 rounded border-slate-600 text-cyan-500 focus:ring-cyan-500 bg-slate-800" />
                                <span className="text-white group-hover:text-cyan-400 transition-colors flex items-center gap-1"><Monitor className="w-4 h-4" /> PC</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input type="checkbox" className="w-4 h-4 rounded border-slate-600 text-cyan-500 focus:ring-cyan-500 bg-slate-800" />
                                <span className="text-white group-hover:text-cyan-400 transition-colors flex items-center gap-1"><Gamepad2 className="w-4 h-4" /> Console</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input type="checkbox" className="w-4 h-4 rounded border-slate-600 text-cyan-500 focus:ring-cyan-500 bg-slate-800" />
                                <span className="text-white group-hover:text-cyan-400 transition-colors flex items-center gap-1"><Smartphone className="w-4 h-4" /> Mobile</span>
                            </label>
                        </div>
                     </div>

                    {/* Official Link */}
                    <div className="relative group">
                      <div className="absolute left-3 top-3 text-slate-500 group-focus-within:text-cyan-400 transition-colors">
                        <LinkIcon className="w-5 h-5" />
                      </div>
                      <input 
                        required 
                        type="url" 
                        placeholder="Official Game Website URL" 
                        className="w-full bg-slate-900/50 hover:bg-slate-900 border border-slate-700 hover:border-slate-500 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all" 
                      />
                    </div>

                    {/* Description */}
                    <textarea 
                        required
                        placeholder="Short description of the game..."
                        rows={3}
                        className="w-full bg-slate-900/50 hover:bg-slate-900 border border-slate-700 hover:border-slate-500 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none"
                    />
                    
                    {/* File Upload Simulation */}
                    <div className="border-2 border-dashed border-slate-700 rounded-xl p-6 text-center hover:border-cyan-500/50 hover:bg-slate-800/30 transition-all cursor-pointer group">
                        <Upload className="w-8 h-8 text-slate-500 mx-auto mb-2 group-hover:text-cyan-400 transition-colors" />
                        <p className="text-sm text-slate-400 font-medium">Upload Banner Image</p>
                        <p className="text-xs text-slate-600 mt-1">1920x1080 Recommended</p>
                    </div>
                  </div>

                  <div className="pt-4">
                      <Button type="submit" className="w-full h-12 shadow-cyan-900/20" isLoading={isLoading}>Submit Game</Button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitGameModal;