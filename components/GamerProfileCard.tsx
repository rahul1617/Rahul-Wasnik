import React from 'react';
import { GamerProfile } from '../types';
import { Youtube, Twitch, Twitter, Instagram, Globe } from 'lucide-react';

interface GamerProfileCardProps {
  gamer: GamerProfile;
}

const GamerProfileCard: React.FC<GamerProfileCardProps> = ({ gamer }) => {
  return (
    <div className="flex flex-col items-center bg-slate-900/50 border border-slate-800 rounded-xl p-4 hover:bg-slate-800 transition-colors group w-64 flex-shrink-0">
      <div className="relative w-24 h-24 mb-4">
        <div className="absolute inset-0 bg-cyan-500 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
        <img 
          src={gamer.imageUrl} 
          alt={gamer.handle} 
          className="w-full h-full rounded-full object-cover border-2 border-slate-700 group-hover:border-cyan-400 transition-colors relative z-10"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute bottom-0 right-0 bg-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-700 z-20 flex items-center gap-1">
          <Globe className="w-3 h-3 text-cyan-400" />
          {gamer.region}
        </div>
      </div>
      
      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{gamer.handle}</h3>
      <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">{gamer.name}</p>
      <span className="text-xs font-bold px-2 py-1 bg-blue-600/20 text-blue-400 rounded-full mb-4">
        {gamer.game}
      </span>

      <div className="flex gap-3 mt-auto">
        {gamer.socials.youtube && (
          <a href={gamer.socials.youtube} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-red-500 transition-colors">
            <Youtube className="w-5 h-5" />
          </a>
        )}
        {gamer.socials.twitch && (
          <a href={gamer.socials.twitch} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-purple-500 transition-colors">
            <Twitch className="w-5 h-5" />
          </a>
        )}
        {gamer.socials.twitter && (
          <a href={gamer.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
        )}
        {gamer.socials.instagram && (
          <a href={gamer.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-pink-500 transition-colors">
            <Instagram className="w-5 h-5" />
          </a>
        )}
      </div>
    </div>
  );
};

export default GamerProfileCard;