import React, { useState } from 'react';
import { Game } from '../types';
import { Play, Info, Aperture, Crosshair } from 'lucide-react';
import Button from './Button';

interface FeaturedGameProps {
  game: Game;
}

const FeaturedGame: React.FC<FeaturedGameProps> = ({ game }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  if (!game) return null;

  return (
    <section className="relative w-full h-[550px] md:h-[650px] lg:h-[750px] overflow-hidden group rounded-[2.5rem] bg-[#050510] border border-white/5 shadow-2xl">
      
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
         <img 
            src={game.imageUrl} 
            alt={game.title} 
            onLoad={() => setIsImageLoaded(true)}
            className={`w-full h-full object-cover transition-transform duration-[20s] ease-linear group-hover:scale-110
                ${isImageLoaded ? 'opacity-60' : 'opacity-0'}
            `}
            // Priority loading for LCP
            fetchPriority="high"
          />
          
          {/* Atmospheric Color Grade */}
          <div className="absolute inset-0 bg-[#38BDF8]/5 mix-blend-overlay" />
          
          {/* Main Gradient Fades */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/40 to-transparent" />
          
          {/* Tactical Pattern Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:40px_40px] opacity-10"></div>
          
          {/* Subtle Noise Texture */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

          {/* Animated Glow Orb (Blue Zone / Tech feel) */}
          <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-[#38BDF8]/10 blur-[120px] rounded-full animate-pulse pointer-events-none mix-blend-screen"></div>
          
          {/* Scanning Line Animation */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#38BDF8]/5 to-transparent h-[20%] w-full -translate-y-full animate-[scan_8s_linear_infinite] pointer-events-none"></div>
      </div>

      {/* Decorative HUD Elements */}
      <div className="absolute top-8 right-8 w-32 h-32 border-t-2 border-r-2 border-white/10 rounded-tr-3xl z-10 pointer-events-none opacity-50">
         <div className="absolute top-0 right-0 w-2 h-2 bg-[#38BDF8] shadow-[0_0_10px_#38BDF8]"></div>
      </div>
      <div className="absolute bottom-8 right-8 w-32 h-32 border-b-2 border-r-2 border-white/10 rounded-br-3xl z-10 pointer-events-none opacity-50">
         <div className="absolute bottom-0 right-0 w-2 h-2 bg-white/50"></div>
      </div>
      <div className="absolute top-1/2 right-8 transform -translate-y-1/2 flex flex-col gap-2 z-10 opacity-30 pointer-events-none">
          <div className="w-1 h-2 bg-white"></div>
          <div className="w-1 h-2 bg-white/50"></div>
          <div className="w-1 h-2 bg-white/20"></div>
          <div className="w-1 h-12 bg-white/10"></div>
          <div className="w-1 h-2 bg-white/20"></div>
          <div className="w-1 h-2 bg-white/50"></div>
          <div className="w-1 h-2 bg-white"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center p-8 md:p-12 lg:p-16 max-w-6xl z-10 items-start text-left">
          
          <div className="flex items-center gap-3 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
             <div className="flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/10 text-white text-xs font-bold uppercase tracking-wider font-display rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                <Aperture className="w-3.5 h-3.5 text-[#38BDF8] animate-spin-slow" />
                <span className="text-[#38BDF8]">{game.isNewRelease ? 'New Deployment' : 'Featured Operation'}</span>
             </div>
             <span className="text-white/60 font-bold uppercase tracking-widest text-[10px] border border-white/5 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full font-mono flex items-center gap-2">
                <Crosshair className="w-3 h-3" />
                {game.genre}
             </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white leading-[0.9] tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] uppercase">
             {game.title}
          </h1>

          <div className="flex items-start gap-4 mb-10 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
             <div className="w-1 bg-gradient-to-b from-[#38BDF8] to-transparent self-stretch rounded-full opacity-80"></div>
             <p className="text-slate-200 text-lg md:text-xl leading-relaxed line-clamp-3 font-sans font-medium drop-shadow-md">
                {game.description}
             </p>
          </div>

          <div className="flex flex-wrap gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
             <a href={game.officialLink || '#'} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button size="lg" variant="primary" className="w-full sm:w-auto justify-center min-w-[160px] font-display text-lg rounded-full shadow-[0_0_20px_rgba(56,189,248,0.4)]">
                   <Play className="w-5 h-5 mr-2 fill-current" /> Play Now
                </Button>
             </a>
             <Button variant="glass" size="lg" className="w-full sm:w-auto justify-center min-w-[160px] font-display text-lg rounded-full bg-white/5 border-white/10 hover:bg-white/10">
                <Info className="w-5 h-5 mr-2" /> More Details
             </Button>
          </div>
      </div>
      
      {/* Inline Styles for Keyframe Animations */}
      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(500%); }
        }
      `}</style>
    </section>
  );
};

export default FeaturedGame;