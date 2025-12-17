
import React, { useState } from 'react';
import { ShortVideo } from '../types';
import { Play, ArrowLeft, ThumbsUp, Share2, CheckCircle, Upload } from 'lucide-react';
import Button from './Button';

interface ShortsFeedProps {
  videos: ShortVideo[];
  onUploadClick: () => void;
}

const ShortsFeed: React.FC<ShortsFeedProps> = ({ videos, onUploadClick }) => {
  const [activeVideo, setActiveVideo] = useState<ShortVideo | null>(null);

  if (!activeVideo) {
    return (
      <div className="animate-slide-up">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4 border-b border-white/5 pb-8">
            <div>
                <h2 className="text-3xl font-display font-black text-white mb-2 uppercase tracking-tight">Active <span className="text-[#70CFFF]">Broadcasting</span></h2>
                <p className="text-slate-500 font-mono text-[9px] tracking-[0.4em] uppercase">Unencrypted Community Intel</p>
            </div>
            <Button size="sm" variant="outline" onClick={onUploadClick} className="gap-2">
                 <Upload className="w-3.5 h-3.5" /> Transmit Data
            </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => (
                <div key={video.id} className="group cursor-pointer flex flex-col gap-4" onClick={() => setActiveVideo(video)}>
                    <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#0a0a0f] border border-white/5 group-hover:border-white/20 transition-all duration-500">
                        <img src={video.thumbnailUrl || video.creatorAvatar} alt="" className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-10 h-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center">
                                <Play className="w-4 h-4 text-white fill-current ml-0.5" />
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                         <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex-shrink-0 overflow-hidden">
                             <img src={video.creatorAvatar} className="w-full h-full object-cover" alt="" />
                         </div>
                         <div className="flex flex-col">
                             <h3 className="text-white font-bold text-sm leading-tight group-hover:text-[#70CFFF] transition-colors line-clamp-2">{video.title}</h3>
                             <span className="text-[10px] text-slate-500 mt-1 font-mono uppercase">{video.creator}</span>
                         </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-slide-up">
        <button onClick={() => setActiveVideo(null)} className="flex items-center gap-2 text-slate-500 hover:text-white mb-8 font-bold uppercase text-[10px] tracking-widest transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Broadcaster
        </button>
        <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-1">
                <div className="relative w-full aspect-video bg-black rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl mb-8">
                     <video src={activeVideo.url} className="w-full h-full" controls autoPlay loop />
                </div>
                <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full border border-white/10 p-0.5 bg-white/5">
                            <img src={activeVideo.creatorAvatar} className="w-full h-full rounded-full object-cover" alt="" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-white tracking-tight">{activeVideo.creator}</span>
                                <CheckCircle className="w-3 h-3 text-[#70CFFF] fill-current" />
                            </div>
                            <span className="text-[9px] text-slate-600 uppercase tracking-[0.3em] font-mono">Verified Source</span>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="glass" className="h-9 px-4 gap-2"><ThumbsUp className="w-3.5 h-3.5" /> {activeVideo.likes}</Button>
                        <Button variant="glass" className="h-9 px-4 gap-2"><Share2 className="w-3.5 h-3.5" /> Share</Button>
                    </div>
                </div>
                <h1 className="text-xl font-display font-bold text-white tracking-tight leading-relaxed">{activeVideo.title}</h1>
            </div>
            <div className="w-full lg:w-80">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 mb-6 font-mono border-b border-white/5 pb-2">Related Intel</h3>
                <div className="space-y-6">
                    {videos.filter(v => v.id !== activeVideo.id).map(v => (
                        <div key={v.id} className="flex gap-4 group cursor-pointer" onClick={() => setActiveVideo(v)}>
                            <div className="w-28 aspect-video bg-black rounded-lg overflow-hidden border border-white/5 group-hover:border-white/30 transition-all">
                                <img src={v.thumbnailUrl || v.creatorAvatar} className="w-full h-full object-cover opacity-50 group-hover:opacity-100" alt="" />
                            </div>
                            <h4 className="text-xs font-medium text-slate-300 line-clamp-2 group-hover:text-white transition-colors">{v.title}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default ShortsFeed;
