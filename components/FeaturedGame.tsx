
import React, { useState } from 'react';
import { Game } from '../types';
import { Play, Sparkles } from 'lucide-react';
import Button from './Button';

interface FeaturedGameProps {
  game: Game;
}

const FeaturedGame: React.FC<FeaturedGameProps> = ({ game }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  if (!game) return null;

  return (
    <section className="relative w-full h-[650px] rounded-[2.5rem] overflow-hidden group shadow-2xl border border-white/5">
      <div className="absolute inset-0 z-0">
         <img 
            src={game.imageUrl} 
            alt={game.title} 
            onLoad={() => setIsImageLoaded(true)}
            className={`w-full h-full object-cover transition-transform duration-[40s] ease-linear opacity-40 group-hover:scale-105 ${isImageLoaded ? '' : 'hidden'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-[#020205]/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#020205] via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(112,207,255,0.1),transparent_70%)]"></div>
      </div>

      <div className="relative h-full flex flex-col justify-end p-10 md:p-16 z-10 max-w-4xl">
          <div className="mb-6 animate-slide-up">
             <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-slate-400 text-[9px] font-bold uppercase tracking-[0.3em]">
                <Sparkles className="w-3 h-3 text-[#70CFFF]" />
                Primary Objective
             </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white leading-[0.9] tracking-tighter mb-8 uppercase animate-slide-up">
             {game.title.split(' ').map((word, i) => (
               <span key={i} className={i % 2 === 1 ? 'text-[#70CFFF] opacity-90' : 'text-white'}>{word} </span>
             ))}
          </h1>

          <p className="text-base md:text-lg text-slate-400 max-w-xl mb-10 font-medium leading-relaxed animate-slide-up opacity-80">
             {game.description}
          </p>

          <div className="flex flex-wrap gap-4 animate-slide-up">
             <Button 
                size="md" 
                variant="primary" 
                className="rounded-xl h-14 px-10"
                onClick={() => game.officialLink && window.open(game.officialLink, '_blank')}
             >
                <Play className="w-4 h-4 mr-2 fill-current" /> Begin Deployment
             </Button>
             <Button 
                variant="outline" 
                size="md" 
                className="rounded-xl h-14 px-10 border-white/10 hover:border-white"
             >
                Archive Access
             </Button>
          </div>
      </div>
    </section>
  );
};

export default FeaturedGame;
