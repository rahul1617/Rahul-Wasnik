import React, { useState } from 'react';
import { Game } from '../types';
import { Star, Share2, Check, Heart, Play, Code2, Building2 } from 'lucide-react';
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
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  // Rating state
  const [isRatingMode, setIsRatingMode] = useState(false);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const shareData = {
        title: game.title,
        text: `Check out ${game.title} on unrealgames.cloud!`,
        url: game.officialLink || window.location.href
    };
    if (navigator.share) {
        try { await navigator.share(shareData); } catch (err) { console.log('Error sharing:', err); }
    } else {
        try {
            await navigator.clipboard.writeText(`${shareData.title}\n${shareData.url}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) { console.error('Failed to copy', err); }
    }
  };

  const handleRating = (e: React.MouseEvent, rating: number) => {
      e.preventDefault();
      e.stopPropagation();
      setUserRating(rating);
  };

  return (
    <>
      <div 
        className="group relative flex flex-col h-full bg-[#121212] rounded-[2rem] overflow-hidden hover:shadow-[0_0_40px_rgba(56,189,248,0.1)] transition-all duration-500 cursor-pointer border border-white/5 hover:border-[#38BDF8]/30 hover:-translate-y-1"
        onClick={() => game.officialLink && window.open(game.officialLink, '_blank')}
      >
        {/* Image Container */}
        <div className="relative aspect-video overflow-hidden bg-[#0a0a0a]">
          {/* Skeleton Loader */}
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-white/5 animate-pulse flex items-center justify-center z-0">
               <div className="w-8 h-8 border-2 border-[#38BDF8]/30 border-t-[#38BDF8] rounded-full animate-spin"></div>
            </div>
          )}
          
          <img 
            src={game.imageUrl} 
            alt={game.title} 
            onLoad={() => setIsImageLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 relative z-10
              ${isImageLoaded ? 'opacity-90 group-hover:opacity-100' : 'opacity-0'}
            `}
            loading="lazy"
            decoding="async"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-60" />
          
          <div className="absolute top-4 right-4 flex gap-2 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 z-30">
             <button
              onClick={handleShare}
              className="p-2.5 bg-black/60 backdrop-blur-md text-white rounded-full hover:bg-[#38BDF8] hover:text-black transition-colors border border-white/10"
            >
              {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleFavorite(game.id);
              }}
              className={`p-2.5 bg-black/60 backdrop-blur-md rounded-full transition-colors border border-white/10 ${isFavorite ? 'bg-[#38BDF8] text-black border-[#38BDF8]' : 'text-white hover:bg-[#38BDF8] hover:text-black'}`}
            >
               <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>

          <button 
             onClick={(e) => {
                 e.stopPropagation();
                 setShowTrailer(true);
             }}
             className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
          >
             <div className="w-14 h-14 rounded-full bg-[#38BDF8]/90 flex items-center justify-center backdrop-blur-md hover:scale-110 transition-transform shadow-[0_0_20px_#38BDF8]">
                <Play className="w-6 h-6 text-black ml-1 fill-black" />
             </div>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow relative z-10">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] font-bold text-[#38BDF8] uppercase tracking-wider border border-[#38BDF8]/20 px-3 py-1 rounded-full bg-[#38BDF8]/5 font-display">
              {game.genre}
            </span>
            
            {/* Interactive Rating */}
            <div 
                className="relative z-20 flex items-center" 
                onMouseEnter={() => setIsRatingMode(true)}
                onMouseLeave={() => {
                    setIsRatingMode(false);
                    setHoverRating(null);
                }}
            >
                {/* Collapsed View (Score) */}
                <div className={`flex items-center gap-1.5 transition-all duration-200 ${isRatingMode ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'}`}>
                     <Star className={`w-3.5 h-3.5 ${userRating ? 'fill-[#38BDF8] text-[#38BDF8]' : 'fill-current text-[#38BDF8]'}`} />
                     <span className="text-sm font-bold font-display text-white">{userRating || game.rating}</span>
                </div>

                {/* Expanded View (Stars) */}
                <div className={`absolute right-0 flex items-center gap-1 bg-[#1a1a1a] rounded-full px-3 py-1.5 border border-white/10 shadow-xl transition-all duration-200 origin-right ${isRatingMode ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-90 translate-x-4 pointer-events-none'}`}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            onMouseEnter={() => setHoverRating(star)}
                            onClick={(e) => handleRating(e, star)}
                            className="focus:outline-none transition-transform hover:scale-125 p-0.5"
                        >
                            <Star 
                                className={`w-3.5 h-3.5 ${star <= (hoverRating || userRating || 0) ? 'fill-[#38BDF8] text-[#38BDF8]' : 'text-slate-600'}`} 
                            />
                        </button>
                    ))}
                </div>
            </div>
          </div>
          
          <h3 className="text-xl font-display font-bold text-white leading-tight mb-2 group-hover:text-[#38BDF8] transition-colors truncate uppercase tracking-tight">
            {game.title}
          </h3>
          
          <div className="mt-auto flex flex-col gap-1 w-full border-t border-white/5 pt-4">
             <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onStudioClick?.(game.studio);
                }}
                className="text-xs text-slate-400 hover:text-white transition-colors text-left truncate w-full flex items-center gap-2 font-display tracking-wide font-medium"
                title={`Developer: ${game.studio}`}
             >
                <Code2 className="w-3.5 h-3.5 text-slate-600" /> 
                <span className="truncate">{game.studio}</span>
             </button>
             
             {game.publisher && (
                <div className="text-[10px] text-slate-500 flex items-center gap-2 truncate font-display tracking-wide font-medium" title={`Publisher: ${game.publisher}`}>
                    <Building2 className="w-3.5 h-3.5 text-slate-600" />
                    <span className="truncate">{game.publisher}</span>
                </div>
             )}
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