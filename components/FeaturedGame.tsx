import React from 'react';
import { Game } from '../types';
import { Play, Info, Star } from 'lucide-react';
import Button from './Button';

interface FeaturedGameProps {
  game: Game;
}

const FeaturedGame: React.FC<FeaturedGameProps> = ({ game }) => {
  if (!game) return null;

  return (
    <section className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl shadow-cyan-900/20 group">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={game.imageUrl} 
          alt={game.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050b14] via-[#050b14]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050b14] via-[#050b14]/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-8 md:p-12 max-w-3xl">
        <div className="space-y-4 animate-in fade-in slide-in-from-left-8 duration-700">
          <div className="flex gap-2">
            {game.isNewRelease && (
               <span className="bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse shadow-lg shadow-pink-500/50">
                 NEW RELEASE
               </span>
            )}
            <span className="bg-blue-600/90 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
              {game.genre}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-display font-black text-white leading-tight drop-shadow-md">
            {game.title}
          </h1>

          <div className="flex items-center gap-2 text-yellow-400">
             <div className="flex">
               {[...Array(5)].map((_, i) => (
                 <Star key={i} className={`w-5 h-5 ${i < Math.floor(game.rating) ? 'fill-current' : 'text-slate-600'}`} />
               ))}
             </div>
             <span className="font-bold text-white ml-2">{game.rating} Rating</span>
          </div>

          <p className="text-slate-300 text-lg md:text-xl line-clamp-3 max-w-2xl drop-shadow-sm">
            {game.description}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
             <a href={game.officialLink || '#'} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="gap-2 shadow-cyan-500/25">
                  <Play className="w-5 h-5 fill-current" /> Play Now
                </Button>
             </a>
             <Button variant="outline" size="lg" className="gap-2 bg-black/30 backdrop-blur-md border-white/20 hover:bg-white/10 hover:border-white/40">
                <Info className="w-5 h-5" /> More Info
             </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedGame;