import React, { useState } from 'react';
import { Game } from '../types';
import { Star, Monitor, Smartphone, Globe, ExternalLink, Heart, Video, Share2, Check } from 'lucide-react';
import TrailerModal from './TrailerModal';

interface GameCardProps {
  game: Game;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onStudioClick?: (studio: string) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, isFavorite, onToggleFavorite, onStudioClick }) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const shareData = {
        title: game.title,
        text: `Check out ${game.title} on unrealgames.cloud! ${game.description}`,
        url: game.officialLink || window.location.href
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (err) {
            console.log('Error sharing:', err);
        }
    } else {
        // Fallback to clipboard
        try {
            await navigator.clipboard.writeText(`${shareData.title}\n${shareData.url}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy', err);
        }
    }
  };

  return (
    <>
      <div className="group relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] flex flex-col h-full">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={game.imageUrl} 
            alt={game.title} 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-80" />
          
          {/* Badges - Moved to Left */}
          <div className="absolute top-2 left-2 flex gap-1 z-10">
            {game.isNewRelease && (
              <span className="bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse shadow-lg shadow-pink-500/50">
                NEW
              </span>
            )}
            <span className="bg-blue-600/90 text-white text-xs font-bold px-2 py-1 rounded-full backdrop-blur-sm">
              {game.genre}
            </span>
          </div>

          {/* Action Buttons - Top Right */}
          <div className="absolute top-2 right-2 flex gap-2 z-20">
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/10 text-slate-300 hover:bg-white/20 hover:text-white transition-all group/share"
              title="Share"
            >
              {copied ? <Check className="w-5 h-5 text-green-400" /> : <Share2 className="w-5 h-5" />}
            </button>
            
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleFavorite(game.id);
              }}
              className="p-2 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 transition-all group/heart"
            >
               <Heart 
                 className={`w-5 h-5 transition-colors duration-300 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-slate-300 group-hover/heart:text-white'}`} 
               />
            </button>
          </div>
        </div>

        <div className="p-5 flex-grow flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-display font-bold text-white group-hover:text-cyan-400 transition-colors">
              {game.title}
            </h3>
            <div className="flex items-center text-yellow-400">
              <Star className="w-4 h-4 fill-current" />
              <span className="ml-1 text-sm font-bold">{game.rating}</span>
            </div>
          </div>

          <p className="text-slate-400 text-sm mb-4 line-clamp-2 flex-grow">
            {game.description}
          </p>

          {/* Tags Section */}
          {game.tags && game.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {game.tags.slice(0, 5).map((tag) => (
                <span key={tag} className="text-[10px] uppercase font-bold text-slate-400 bg-slate-800 border border-slate-700 px-2 py-1 rounded hover:text-cyan-400 hover:border-cyan-500/30 transition-colors cursor-default">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-auto space-y-4">
             <div className="flex gap-3">
               {game.officialLink && (
                 <a 
                   href={game.officialLink} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-cyan-950/30 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-all duration-300 text-xs font-bold uppercase tracking-wider group/btn"
                 >
                   Website
                   <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                 </a>
               )}
               
               <button 
                 onClick={() => setShowTrailer(true)}
                 className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-rose-500/30 text-rose-400 bg-rose-950/10 hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all duration-300 text-xs font-bold uppercase tracking-wider group/trailer ${!game.officialLink ? 'w-full' : ''}`}
               >
                 Trailer
                 <Video className="w-3.5 h-3.5 group-hover/trailer:scale-110 transition-transform" />
               </button>
             </div>

             <div className="flex items-center justify-between pt-2 border-t border-slate-800">
               <div className="flex gap-2 text-slate-500">
                 {game.platform.some(p => p.toLowerCase().includes('pc')) && <Monitor className="w-4 h-4" />}
                 {game.platform.some(p => p.toLowerCase().includes('mobile')) && <Smartphone className="w-4 h-4" />}
                 {game.platform.some(p => p.toLowerCase().includes('web')) && <Globe className="w-4 h-4" />}
               </div>
               
               <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onStudioClick?.(game.studio);
                  }}
                  className="flex items-center gap-2 text-xs text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer group/studio"
               >
                  {game.studioLogoUrl ? (
                    <img 
                      src={game.studioLogoUrl} 
                      alt={`${game.studio} logo`} 
                      className="w-5 h-5 rounded-full border border-slate-700 group-hover/studio:border-cyan-400 transition-colors bg-black object-contain"
                    />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700"></div>
                  )}
                  <span className="uppercase tracking-wider font-bold">{game.studio}</span>
               </button>
             </div>
          </div>
        </div>
      </div>

      <TrailerModal 
        isOpen={showTrailer} 
        onClose={() => setShowTrailer(false)} 
        gameTitle={game.title} 
        trailerVideoId={game.trailerVideoId}
      />
    </>
  );
};

export default GameCard;