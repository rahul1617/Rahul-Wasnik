import React from 'react';
import { GamerProfile } from '../types';
import { Youtube, Twitch, Twitter, Instagram, Fingerprint } from 'lucide-react';

interface GamerProfileCardProps {
  gamer: GamerProfile;
}

const GamerProfileCard: React.FC<GamerProfileCardProps> = ({ gamer }) => {
  return (
    <div className="group relative w-72 flex-shrink-0 bg-[#121212] rounded-[2rem] border border-white/5 hover:border-[#38BDF8]/50 transition-all p-6 overflow-hidden hover:shadow-[0_0_30px_rgba(0,0,0,0.3)]">
      
      <div className="relative z-10 flex flex-col items-center">
        {/* Avatar Ring */}
        <div className="w-24 h-24 rounded-full p-[3px] bg-gradient-to-b from-[#38BDF8] to-transparent mb-5 relative shadow-[0_0_20px_rgba(56,189,248,0.2)]">
             <img 
                src={gamer.imageUrl} 
                alt={gamer.handle} 
                className="w-full h-full rounded-full object-cover border-4 border-[#121212] group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
            />
            <div className="absolute bottom-0 right-0 bg-[#121212] text-[#38BDF8] text-[10px] font-bold px-2 py-0.5 border border-[#38BDF8] rounded-full flex items-center gap-1">
                <Fingerprint className="w-3 h-3" />
            </div>
        </div>

        <h3 className="text-xl font-display font-bold text-white mb-1 tracking-wide uppercase">{gamer.handle}</h3>
        <div className="flex items-center gap-2 mb-6">
             <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{gamer.region}</span>
             <span className="w-1 h-1 bg-[#38BDF8] rounded-full"></span>
             <span className="text-[10px] font-mono text-slate-500 uppercase">{gamer.game}</span>
        </div>

        <div className="flex gap-3">
            {gamer.socials.youtube && (
            <a href={gamer.socials.youtube} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/5 hover:bg-[#FF0000] text-slate-400 hover:text-white transition-all border border-white/5">
                <Youtube className="w-4 h-4" />
            </a>
            )}
            {gamer.socials.twitch && (
            <a href={gamer.socials.twitch} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/5 hover:bg-[#9146FF] text-slate-400 hover:text-white transition-all border border-white/5">
                <Twitch className="w-4 h-4" />
            </a>
            )}
            {gamer.socials.twitter && (
            <a href={gamer.socials.twitter} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/5 hover:bg-[#1DA1F2] text-slate-400 hover:text-white transition-all border border-white/5">
                <Twitter className="w-4 h-4" />
            </a>
            )}
            {gamer.socials.instagram && (
            <a href={gamer.socials.instagram} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/5 hover:bg-[#E1306C] text-slate-400 hover:text-white transition-all border border-white/5">
                <Instagram className="w-4 h-4" />
            </a>
            )}
        </div>
      </div>
    </div>
  );
};

export default GamerProfileCard;