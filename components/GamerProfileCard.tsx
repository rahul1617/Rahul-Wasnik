import React from 'react';
import { GamerProfile } from '../types';
import { Youtube, Twitch, Twitter, Instagram, Fingerprint } from 'lucide-react';

interface GamerProfileCardProps {
  gamer: GamerProfile;
}

const GamerProfileCard: React.FC<GamerProfileCardProps> = ({ gamer }) => {
  // Dynamic background image based on the game
  const bgPrompt = `gameplay screenshot of ${gamer.game.split('/')[0]} video game dark moody 4k wallpaper`;
  const bgUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(bgPrompt)}?width=400&height=500&nologo=true&seed=${gamer.id}`;

  return (
    <div className="group relative w-80 flex-shrink-0 bg-[#0c0c0c] rounded-[2rem] border border-white/5 hover:border-[#38BDF8] transition-all duration-300 p-8 overflow-hidden h-[24rem] flex flex-col items-center justify-between hover:shadow-[0_0_40px_rgba(56,189,248,0.1)]">
      
      {/* Background Image Layer - Visible on Hover */}
      <div className="absolute inset-0 z-0">
          <img 
            src={bgUrl} 
            alt="" 
            className="w-full h-full object-cover opacity-0 group-hover:opacity-25 transition-opacity duration-500 scale-110 grayscale group-hover:grayscale-0" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/95 to-[#0c0c0c]/60" />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full mt-2">
        {/* Avatar Ring */}
        <div className="relative mb-5 group-hover:-translate-y-1 transition-transform duration-300">
            <div className="w-28 h-28 rounded-full p-[2px] bg-gradient-to-b from-[#38BDF8] to-transparent shadow-[0_0_25px_rgba(56,189,248,0.2)]">
                <div className="w-full h-full rounded-full p-[3px] bg-[#0c0c0c]">
                    <img 
                        src={gamer.imageUrl} 
                        alt={gamer.handle} 
                        className="w-full h-full rounded-full object-cover"
                        loading="lazy"
                    />
                </div>
            </div>
            {/* Fingerprint Badge */}
             <div className="absolute bottom-1 right-0 bg-[#0c0c0c] border border-[#38BDF8] p-1.5 rounded-full shadow-lg text-[#38BDF8] group-hover:scale-110 transition-transform">
                <Fingerprint className="w-3.5 h-3.5" />
            </div>
        </div>

        {/* Name */}
        <h3 className="text-2xl font-display font-black text-white mb-5 tracking-wide uppercase text-center">{gamer.handle}</h3>
        
        {/* Badges - matching screenshot layout (Pill | Dot | Pill) */}
        <div className="flex items-center gap-3 w-full justify-center">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-[#151515] px-3 py-1.5 rounded-lg border border-white/5 group-hover:border-white/10 transition-colors">
                {gamer.region}
             </span>
             <div className="w-1.5 h-1.5 bg-[#38BDF8] rounded-full shadow-[0_0_8px_#38BDF8] animate-pulse"></div>
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-[#151515] px-3 py-1.5 rounded-lg border border-white/5 group-hover:border-white/10 transition-colors max-w-[140px] truncate">
                {gamer.game}
             </span>
        </div>
      </div>

      {/* Socials - Bottom */}
      <div className="relative z-10 flex gap-4 mt-auto">
         {Object.entries(gamer.socials).map(([platform, url]) => {
             if (!url) return null;
             const Icon = platform === 'youtube' ? Youtube : platform === 'twitch' ? Twitch : platform === 'twitter' ? Twitter : Instagram;
             return (
                <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="p-3.5 rounded-full bg-[#151515] border border-white/5 hover:bg-white/10 hover:border-white/20 text-slate-400 hover:text-white transition-all hover:-translate-y-1">
                    <Icon className="w-4 h-4" />
                </a>
             )
         })}
      </div>
    </div>
  );
};

export default GamerProfileCard;