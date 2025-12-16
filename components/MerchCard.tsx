import React from 'react';
import { MerchItem } from '../types';
import Button from './Button';
import { ShoppingBag } from 'lucide-react';

interface MerchCardProps {
  item: MerchItem;
}

const MerchCard: React.FC<MerchCardProps> = ({ item }) => {
  return (
    <div className="group bg-[#121212] rounded-[2rem] overflow-hidden flex flex-col h-full border border-white/5 hover:border-[#38BDF8]/30 transition-all hover:shadow-[0_0_30px_rgba(0,0,0,0.2)] hover:-translate-y-1 duration-300">
      {/* Product Image Container */}
      <div className="relative h-72 bg-[#080808] p-8 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <img 
          src={item.imageUrl} 
          alt={item.name} 
          className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-1"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute top-4 left-4 bg-[#38BDF8] text-black text-[10px] font-bold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform -translate-y-2 group-hover:translate-y-0 duration-300 delay-100 shadow-[0_0_15px_#38BDF8]">
            NEW ARRIVAL
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow relative border-t border-white/5">
        <div className="flex justify-between items-start mb-3">
            <div>
              <span className="text-[10px] text-[#38BDF8] uppercase tracking-widest block mb-1 font-mono">{item.brand}</span>
              <h3 className="text-base font-display font-bold text-white leading-tight group-hover:text-[#38BDF8] transition-colors">
                {item.name}
              </h3>
            </div>
            <span className="text-sm font-bold text-white bg-white/10 px-2 py-1 rounded-lg font-mono">{item.price}</span>
        </div>

        <p className="text-slate-400 text-xs mb-6 line-clamp-2 flex-grow leading-relaxed font-sans">
          {item.description}
        </p>

        <a href={item.buyLink} target="_blank" rel="noopener noreferrer" className="mt-auto">
            <Button variant="outline" className="w-full gap-2 text-xs rounded-full border-white/10 text-slate-300 hover:text-[#38BDF8] hover:border-[#38BDF8] hover:bg-[#38BDF8]/5 group-hover:shadow-lg transition-all duration-300">
                <ShoppingBag className="w-3 h-3" /> Purchase Now
            </Button>
        </a>
      </div>
    </div>
  );
};

export default MerchCard;