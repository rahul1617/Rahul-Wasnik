
import React from 'react';
import { GamerProfile } from '../types';
import { Youtube, Twitch, Twitter, Instagram, Fingerprint } from 'lucide-react';

interface GamerProfileCardProps {
  gamer: GamerProfile;
}

const GamerProfileCard: React.FC<GamerProfileCardProps> = ({ gamer }) => {
  const bgPrompt = `abstract minimal architecture dark blueprint ${gamer.game.split('/')[0]}`;
  const bgUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(bgPrompt)}?width=400&height=500&nologo=true&seed=${gamer.id}`;

  return (
    <div className="group relative w-72 flex-shrink-0 bg-[#08080c] rounded-[2rem] border border-white/5 hover:border-white/20 transition-all duration-500 p-8 overflow-hidden h-[22rem] flex flex-col items-center justify-between">
      
      <div className="absolute inset-0 z-0">
          <img 
            src={bgUrl} 
            alt="" 
            className="w-full h-full object-cover opacity-0 group-hover:opacity-10 transition-opacity duration-1000 grayscale" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080c] via-[#08080c]/90 to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full mt-2">
        <div className="relative mb-5 transition-transform duration-500">
            <div className="w-24 h-24 rounded-full p-[1.5px] bg-white/10 group-hover:bg-[#70CFFF]/30 transition-colors">
                <div className="w-full h-full rounded-full p-[3px] bg-[#08080c]">
                    <img 
                        src={gamer.imageUrl} 
                        alt={gamer.handle} 
                        className="w-full h-full rounded-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                        loading="lazy"
                    />
                </div>
            </div>
             <div className="absolute bottom-1 right-0 bg-[#08080c] border border-white/10 p-1.5 rounded-full shadow-lg text-slate-500 group-hover:text-[#70CFFF] transition-colors">
                <Fingerprint className="w-3 h-3" />
            </div>
        </div>

        <h3 className="text-xl font-display font-bold text-white mb-4 tracking-wider uppercase text-center">{gamer.handle}</h3>
        
        <div className="flex items-center gap-3 w-full justify-center">
             <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest bg-white/[0.02] px-2.5 py-1 rounded-md border border-white/5">
                {gamer.region}
             </span>
             <div className="w-1 h-1 bg-white/20 rounded-full"></div>
             <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest bg-white/[0.02] px-2.5 py-1 rounded-md border border-white/5 max-w-[120px] truncate">
                {gamer.game}
             </span>
        </div>
      </div>

      <div className="relative z-10 flex gap-4 mt-auto">
         {Object.entries(gamer.socials).map(([platform, url]) => {
             if (!url) return null;
             const Icon = platform === 'youtube' ? Youtube : platform === 'twitch' ? Twitch : platform === 'twitter' ? Twitter : Instagram;
             return (
                <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/[0.02] border border-white/5 hover:border-white/30 text-slate-600 hover:text-white transition-all">
                    <Icon className="w-3.5 h-3.5" />
                </a>
             )
         })}
      </div>
    </div>
  );
};

export default GamerProfileCard;
