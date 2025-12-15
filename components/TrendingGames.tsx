import React from 'react';
import { Game } from '../types';
import Button from './Button';
import GameCard from './GameCard';

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
    <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
      <div className="flex justify-between items-end mb-6">
        <div>
           <h2 className="text-2xl font-display font-bold text-white mb-1">Trending Now</h2>
           <p className="text-slate-400 text-sm">Most played free games this week</p>
        </div>
        <Button variant="ghost" onClick={onViewAll} className="hover:text-cyan-400 transition-colors">View All</Button>
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