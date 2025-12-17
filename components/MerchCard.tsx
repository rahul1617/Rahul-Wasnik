
import React from 'react';
import { MerchItem } from '../types';
import Button from './Button';
import { ShoppingBag } from 'lucide-react';

interface MerchCardProps {
  item: MerchItem;
}

const MerchCard: React.FC<MerchCardProps> = ({ item }) => {
  return (
    <div className="group bg-[#08080c] rounded-[1.5rem] overflow-hidden flex flex-col h-full border border-white/5 hover:border-white/20 transition-all duration-500">
      <div className="relative h-64 bg-black p-8 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent"></div>
        <img 
          src={item.imageUrl} 
          alt={item.name} 
          className="w-full h-full object-contain filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 transform group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-4 left-4 bg-white/5 backdrop-blur-md border border-white/10 text-slate-400 text-[8px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500">
            Secure Entry
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow relative border-t border-white/5">
        <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-[9px] text-slate-600 uppercase tracking-widest block mb-1 font-mono font-bold">{item.brand}</span>
              <h3 className="text-sm font-display font-bold text-white leading-tight">
                {item.name}
              </h3>
            </div>
            <span className="text-[10px] font-bold text-white bg-white/5 px-2 py-1 rounded-lg font-mono">{item.price}</span>
        </div>

        <p className="text-slate-500 text-[11px] mb-6 line-clamp-2 flex-grow leading-relaxed font-sans font-medium">
          {item.description}
        </p>

        <a href={item.buyLink} target="_blank" rel="noopener noreferrer" className="mt-auto">
            <Button variant="outline" className="w-full h-10 rounded-xl gap-2 text-[9px]">
                <ShoppingBag className="w-3.5 h-3.5" /> Acquire Gear
            </Button>
        </a>
      </div>
    </div>
  );
};

export default MerchCard;
