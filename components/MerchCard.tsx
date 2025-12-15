import React from 'react';
import { MerchItem } from '../types';
import { ShoppingBag, ExternalLink, Tag } from 'lucide-react';
import Button from './Button';

interface MerchCardProps {
  item: MerchItem;
}

const MerchCard: React.FC<MerchCardProps> = ({ item }) => {
  return (
    <div className="group bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all duration-300 flex flex-col h-full">
      {/* Product Image Container - Lighter background for contrast */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-b from-slate-700 to-slate-900 p-4 flex items-center justify-center">
        {/* Spotlight effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent opacity-50 pointer-events-none" />
        
        <img 
          src={item.imageUrl} 
          alt={item.name} 
          className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500 relative z-10 drop-shadow-xl"
          loading="lazy"
        />
        
        <div className="absolute top-3 left-3 z-20">
             <span className="bg-purple-600/90 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm border border-purple-400/20 shadow-lg">
               {item.brand}
             </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-display font-bold text-white leading-tight group-hover:text-purple-400 transition-colors">
              {item.name}
            </h3>
            <span className="text-lg font-bold text-cyan-400 whitespace-nowrap ml-2">{item.price}</span>
        </div>

        <div className="flex items-center gap-2 mb-3">
             <Tag className="w-3 h-3 text-slate-500" />
             <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">{item.category}</span>
        </div>

        <p className="text-slate-400 text-sm mb-6 line-clamp-2 flex-grow">
          {item.description}
        </p>

        <a href={item.buyLink} target="_blank" rel="noopener noreferrer" className="mt-auto">
            <Button variant="secondary" className="w-full gap-2 group/btn">
                <ShoppingBag className="w-4 h-4" />
                Buy on {item.store}
                <ExternalLink className="w-3 h-3 opacity-50 group-hover/btn:opacity-100 transition-opacity ml-1" />
            </Button>
        </a>
      </div>
    </div>
  );
};

export default MerchCard;