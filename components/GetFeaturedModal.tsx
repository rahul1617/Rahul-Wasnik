import React, { useState } from 'react';
import { X, CheckCircle, Upload, Trophy, User, Gamepad2, Globe, Link as LinkIcon } from 'lucide-react';
import Button from './Button';

interface GetFeaturedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GetFeaturedModal: React.FC<GetFeaturedModalProps> = ({ isOpen, onClose }) => {
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
      <div className="bg-[#0b1221] border border-slate-700 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative flex flex-col my-auto">
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
                <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6 border border-green-500/20">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-display font-bold text-white mb-2">Application Received!</h3>
                <p className="text-slate-400 mb-8 max-w-sm">
                  Thanks for throwing your hat in the ring. Our team will review your profile and reach out if you're selected for the roster.
                </p>
                <div className="flex gap-4 w-full">
                    <Button onClick={onClose} variant="primary" className="w-full">Back to UnrealGames</Button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-8 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 mb-4 shadow-lg shadow-cyan-500/20">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-white mb-2">Join the Elite Roster</h2>
                  <p className="text-slate-400 text-sm">Showcase your skills to millions of gamers worldwide on unrealgames.cloud.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-4">
                    {/* Handle */}
                    <div className="relative group">
                      <div className="absolute left-3 top-3 text-slate-500 group-focus-within:text-cyan-400 transition-colors">
                        <User className="w-5 h-5" />
                      </div>
                      <input 
                        required 
                        type="text" 
                        placeholder="Gamer Handle (e.g. Ninja)" 
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all" 
                      />
                    </div>
                    
                    {/* Real Name & Region */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative group">
                            <input 
                              required 
                              type="text" 
                              placeholder="Real Name" 
                              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all" 
                            />
                        </div>
                        <div className="relative group">
                            <div className="absolute left-3 top-3 text-slate-500 group-focus-within:text-cyan-400 transition-colors">
                                <Globe className="w-5 h-5" />
                            </div>
                            <select className="w-full bg-slate-900/50 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all appearance-none cursor-pointer">
                                <option value="" disabled selected>Select Region</option>
                                <option>North America</option>
                                <option>Europe</option>
                                <option>Asia Pacific</option>
                                <option>Latin America</option>
                                <option>Middle East & Africa</option>
                            </select>
                        </div>
                    </div>

                    {/* Game */}
                    <div className="relative group">
                      <div className="absolute left-3 top-3 text-slate-500 group-focus-within:text-cyan-400 transition-colors">
                        <Gamepad2 className="w-5 h-5" />
                      </div>
                      <input 
                        required 
                        type="text" 
                        placeholder="Main Game (e.g. Valorant)" 
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all" 
                      />
                    </div>

                    {/* Social URL */}
                    <div className="relative group">
                      <div className="absolute left-3 top-3 text-slate-500 group-focus-within:text-cyan-400 transition-colors">
                        <LinkIcon className="w-5 h-5" />
                      </div>
                      <input 
                        required 
                        type="url" 
                        placeholder="Primary Channel URL (Twitch/YouTube)" 
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all" 
                      />
                    </div>
                    
                    {/* File Upload Simulation */}
                    <div className="border-2 border-dashed border-slate-700 rounded-xl p-6 text-center hover:border-cyan-500/50 hover:bg-slate-800/30 transition-all cursor-pointer group">
                        <Upload className="w-8 h-8 text-slate-500 mx-auto mb-2 group-hover:text-cyan-400 transition-colors" />
                        <p className="text-sm text-slate-400 font-medium">Upload Profile Picture</p>
                        <p className="text-xs text-slate-600 mt-1">JPG, PNG up to 5MB</p>
                    </div>
                  </div>

                  <div className="pt-4">
                      <Button type="submit" className="w-full h-12 shadow-cyan-900/20" isLoading={isLoading}>Submit Application</Button>
                  </div>
                  
                  <p className="text-xs text-center text-slate-600 mt-4 px-4">
                      By applying, you agree to the unrealgames.cloud Creator Terms. Verification may take up to 48 hours.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetFeaturedModal;