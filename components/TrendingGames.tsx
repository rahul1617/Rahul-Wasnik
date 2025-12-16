import React from 'react';
import { Game } from '../types';
import Button from './Button';
import GameCard from './GameCard';
import { TrendingUp } from 'lucide-react';

interface TrendingGamesProps {
  games: Game[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onStudioClick: (studio: string) => void;
  onViewAll: () => void;
}

const TrendingGames: React.FC<TrendingGamesProps> = ({ 
  games, 
  favorites, 
  onToggleFavorite, 
  onStudioClick,
  onViewAll 
}) => {
  return (
    <section>
      <div className="flex justify-between items-end mb-8">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-xl bg-[#38BDF8] flex items-center justify-center shadow-lg shadow-[#38BDF8]/20">
             <TrendingUp className="w-6 h-6 text-black" />
           </div>
           <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-white">Trending Now</h2>
              <p className="text-slate-400 text-sm font-medium">What everyone is playing</p>
           </div>
        </div>
        <Button variant="ghost" onClick={onViewAll} className="hidden sm:flex">View Directory</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {games.map(game => (
          <GameCard 
            key={game.id} 
            game={game} 
            isFavorite={favorites.includes(game.id)}
            onToggleFavorite={onToggleFavorite}
            onStudioClick={onStudioClick}
          />
        ))}
      </div>
    </section>
  );
};

export default TrendingGames;