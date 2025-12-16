import React, { useState } from 'react';
import { Game } from '../types';
import { Play, Info, Aperture } from 'lucide-react';
import Button from './Button';

interface FeaturedGameProps {
  game: Game;
}

const FeaturedGame: React.FC<FeaturedGameProps> = ({ game }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  if (!game) return null;

  return (
    <section className="relative w-full h-[550px] md:h-[650px] lg:h-[750px] overflow-hidden group rounded-[2.5rem] bg-black/40 border border-white/5 shadow-2xl">
      
      {/* Background Image */}
      <div className="absolute inset-0 bg-[#050510]">
         <img 
            src={game.imageUrl} 
            alt={game.title} 
            onLoad={() => setIsImageLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-[20s] group-hover:scale-105
                ${isImageLoaded ? 'opacity-70' : 'opacity-0'}
            `}
            // Priority loading for LCP
            fetchPriority="high"
          />
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/90 via-[#050505]/30 to-transparent" />
          
          {/* Grid Overlay - Subtler */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center p-8 md:p-16 lg:p-24 max-w-6xl z-10 items-start text-left">
          
          <div className="flex items-center gap-3 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
             <div className="flex items-center gap-2 px-4 py-1.5 bg-white text-black text-xs font-bold uppercase tracking-wider font-display rounded-full">
                <Aperture className="w-3.5 h-3.5 animate-spin-slow" />
                {game.isNewRelease ? 'New Release' : 'Featured'}
             </div>
             <span className="text-white/90 font-bold uppercase tracking-widest text-xs border border-white/20 bg-black/30 backdrop-blur-md px-4 py-1.5 rounded-full font-display">
                {game.genre}
             </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white leading-[0.9] tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 drop-shadow-xl uppercase">
             {game.title}
          </h1>

          <div className="flex items-start gap-4 mb-10 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
             <div className="w-1 bg-[#38BDF8] self-stretch rounded-full opacity-80"></div>
             <p className="text-slate-200 text-lg md:text-xl leading-relaxed line-clamp-3 font-sans font-medium drop-shadow-md">
                {game.description}
             </p>
          </div>

          <div className="flex flex-wrap gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
             <a href={game.officialLink || '#'} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button size="lg" variant="primary" className="w-full sm:w-auto justify-center min-w-[160px] font-display text-lg rounded-full">
                   <Play className="w-5 h-5 mr-2 fill-current" /> Play Now
                </Button>
             </a>
             <Button variant="glass" size="lg" className="w-full sm:w-auto justify-center min-w-[160px] font-display text-lg rounded-full">
                <Info className="w-5 h-5 mr-2" /> More Details
             </Button>
          </div>
      </div>
    </section>
  );
};

export default FeaturedGame;