
import React, { useState } from 'react';
import { Game } from '../types';
import { Star, Heart, Play, ExternalLink } from 'lucide-react';
import TrailerModal from './TrailerModal';
import Button from './Button';

interface GameCardProps {
  game: Game;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, isFavorite, onToggleFavorite }) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <>
      <div className="group relative flex flex-col h-[440px] bg-[#08080c] rounded-[1.5rem] overflow-hidden border border-white/5 transition-all duration-500 hover:border-white/20 hover:bg-[#0a0a14]">
        <div className="relative h-[220px] w-full overflow-hidden bg-black">
          <img 
            src={game.imageUrl} 
            alt={game.title} 
            onLoad={() => setIsImageLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-700 opacity-60 group-hover:opacity-80 group-hover:scale-105 ${isImageLoaded ? '' : 'hidden'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080c] via-transparent to-transparent"></div>
          
          <div className="absolute top-3 right-3 z-20">
            <button
              onClick={(e) => { e.stopPropagation(); onToggleFavorite(game.id); }}
              className={`p-2.5 rounded-full backdrop-blur-md transition-all border border-white/5 hover:bg-white/10 ${isFavorite ? 'text-[#70CFFF] bg-white/5' : 'text-slate-500 hover:text-white'}`}
            >
               <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>

          <button 
             onClick={(e) => { e.stopPropagation(); setShowTrailer(true); }}
             className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
          >
             <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-500">
                <Play className="w-5 h-5 fill-current ml-0.5" />
             </div>
          </button>
        </div>

        <div className="p-6 flex flex-col flex-grow">
           <div className="flex justify-between items-center mb-3">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 font-mono">
                {game.genre}
              </span>
              <div className="flex items-center gap-1.5">
                <Star className="w-3 h-3 text-[#70CFFF] fill-current" />
                <span className="text-[10px] font-bold text-white font-mono">{game.rating}</span>
              </div>
           </div>

           <h3 className="text-lg font-display font-bold text-white mb-2 leading-tight group-hover:text-white transition-colors line-clamp-2">
             {game.title}
           </h3>
           
           <p className="text-slate-600 text-[10px] font-mono uppercase tracking-widest mb-6 truncate">{game.studio}</p>

           <div className="mt-auto">
              <Button 
                variant="outline" 
                className="w-full h-10 gap-2 rounded-xl text-[9px] border-white/5 hover:bg-white hover:text-black hover:border-white"
                onClick={(e) => { e.stopPropagation(); game.officialLink && window.open(game.officialLink, '_blank'); }}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Initialize
              </Button>
           </div>
        </div>
      </div>

      <TrailerModal isOpen={showTrailer} onClose={() => setShowTrailer(false)} gameTitle={game.title} trailerVideoId={game.trailerVideoId} />
    </>
  );
};

export default GameCard;
