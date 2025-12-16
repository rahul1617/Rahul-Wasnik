import React, { useState, useRef, useEffect } from 'react';
import { ShortVideo } from '../types';
import { Heart, MessageCircle, Share2, MoreHorizontal, ThumbsUp, ThumbsDown, User, CheckCircle, Upload, ArrowLeft, Play } from 'lucide-react';
import Button from './Button';

interface ShortsFeedProps {
  videos: ShortVideo[];
  onUploadClick: () => void;
}

const ShortsFeed: React.FC<ShortsFeedProps> = ({ videos, onUploadClick }) => {
  const [activeVideo, setActiveVideo] = useState<ShortVideo | null>(null);

  // Scroll to top when switching views
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeVideo]);

  // Browse View: Thumbnail Grid
  if (!activeVideo) {
    return (
      <div className="animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4 border-b border-white/10 pb-6">
            <div>
                <h2 className="text-4xl font-display font-black text-white mb-2 uppercase tracking-tighter">Media <span className="text-[#38BDF8]">Stream</span></h2>
                <p className="text-slate-500 font-mono text-xs tracking-widest">COMMUNITY UPLOADS // LIVE FEED</p>
            </div>
            <Button size="md" variant="primary" onClick={onUploadClick} className="gap-2">
                 <Upload className="w-4 h-4" /> Upload Clip
            </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => (
                <div 
                    key={video.id} 
                    className="group cursor-pointer flex flex-col gap-3"
                    onClick={() => setActiveVideo(video)}
                >
                    {/* Thumbnail */}
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-[#121212] border border-white/5 group-hover:border-[#38BDF8]/50 transition-all">
                        <img 
                            src={video.thumbnailUrl || video.creatorAvatar} 
                            alt={video.title} 
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                            <div className="w-12 h-12 bg-[#38BDF8] rounded-full flex items-center justify-center shadow-[0_0_20px_#38BDF8]">
                                <Play className="w-5 h-5 text-black fill-current ml-1" />
                            </div>
                        </div>
                        <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded font-mono">
                            0:45
                        </span>
                    </div>

                    {/* Metadata */}
                    <div className="flex gap-3">
                         <div className="w-9 h-9 rounded-full bg-slate-800 flex-shrink-0 overflow-hidden border border-white/10">
                             <img src={video.creatorAvatar} className="w-full h-full object-cover" alt="" />
                         </div>
                         <div className="flex flex-col">
                             <h3 className="text-white font-bold leading-tight group-hover:text-[#38BDF8] transition-colors line-clamp-2 mb-1">{video.title}</h3>
                             <div className="text-xs text-slate-400 font-medium flex items-center gap-1">
                                 {video.creator}
                                 <CheckCircle className="w-3 h-3 text-slate-500" />
                             </div>
                             <div className="text-[10px] text-slate-500 mt-1 font-mono">
                                 {video.views || '1K'} views • {video.uploadDate || '1 day ago'}
                             </div>
                         </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    );
  }

  // Watch View: Player & Details
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Primary Content (Player + Info) */}
            <div className="flex-1 min-w-0">
                {/* Video Player */}
                <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl mb-6 group">
                     <video 
                        src={videoUrl(activeVideo.url)} 
                        className="w-full h-full object-contain" 
                        controls 
                        autoPlay 
                        loop
                     />
                     <button 
                        onClick={() => setActiveVideo(null)}
                        className="absolute top-4 left-4 p-2 bg-black/60 hover:bg-[#38BDF8] text-white hover:text-black rounded-full backdrop-blur-md transition-colors z-20"
                     >
                        <ArrowLeft className="w-5 h-5" />
                     </button>
                </div>

                {/* Video Title */}
                <h1 className="text-xl md:text-2xl font-display font-bold text-white mb-3 tracking-wide">{activeVideo.title}</h1>

                {/* Actions Bar */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-4 mb-6">
                    {/* Creator Info */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#38BDF8] to-purple-600 p-[2px]">
                            <img src={activeVideo.creatorAvatar} className="w-full h-full rounded-full object-cover border border-black" alt="" />
                        </div>
                        <div>
                            <div className="flex items-center gap-1">
                                <span className="font-bold text-white text-sm md:text-base">{activeVideo.creator}</span>
                                <CheckCircle className="w-3 h-3 text-[#38BDF8] fill-current" />
                            </div>
                            <span className="text-xs text-slate-400 font-mono">1.2M Subscribers</span>
                        </div>
                        <Button size="sm" variant="secondary" className="ml-4 rounded-full px-4 h-9 text-xs">Subscribe</Button>
                    </div>

                    {/* Stats/Actions */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center bg-white/5 rounded-full overflow-hidden border border-white/10">
                            <button className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 transition-colors border-r border-white/10">
                                <ThumbsUp className="w-4 h-4 text-white" />
                                <span className="text-xs font-bold text-white">{activeVideo.likes}</span>
                            </button>
                            <button className="px-4 py-2 hover:bg-white/10 transition-colors">
                                <ThumbsDown className="w-4 h-4 text-white" />
                            </button>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors border border-white/10 text-white">
                            <Share2 className="w-4 h-4" />
                            <span className="text-xs font-bold hidden sm:inline">Share</span>
                        </button>
                        <button className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors border border-white/10 text-white">
                            <MoreHorizontal className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Description Box */}
                <div className="bg-[#1a1a20] rounded-xl p-4 mb-8">
                    <div className="flex gap-3 text-xs font-bold text-slate-300 font-mono mb-2">
                        <span>{activeVideo.views || '24K'} Views</span>
                        <span>{activeVideo.uploadDate || '3 days ago'}</span>
                        <span className="text-[#38BDF8]">#{activeVideo.gameTag}</span>
                    </div>
                    <p className="text-sm text-slate-300 whitespace-pre-line leading-relaxed">
                        {activeVideo.description || "No description provided for this clip. Watch and enjoy!"}
                    </p>
                </div>

                {/* Comments Section (Simulated) */}
                <div>
                     <h3 className="text-lg font-bold text-white mb-6 font-display">
                        {activeVideo.comments} Comments
                     </h3>
                     
                     <div className="flex gap-4 mb-8">
                        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                            <User className="w-5 h-5 text-slate-400" />
                        </div>
                        <div className="flex-grow">
                             <input type="text" placeholder="Add a comment..." className="w-full bg-transparent border-b border-white/10 pb-2 text-white text-sm focus:outline-none focus:border-[#38BDF8] transition-colors" />
                        </div>
                     </div>

                     {/* Mock Comments */}
                     {[1, 2, 3].map((i) => (
                        <div key={i} className="flex gap-4 mb-6">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-700 to-slate-600 flex-shrink-0 overflow-hidden">
                                <img src={`https://image.pollinations.ai/prompt/gamer%20avatar%20${i}?width=50&height=50&nologo=true`} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-bold text-white">GamerUser_{99+i}</span>
                                    <span className="text-[10px] text-slate-500">2 hours ago</span>
                                </div>
                                <p className="text-sm text-slate-300">This clip is absolutely insane! The way you handled that situation was pro level.</p>
                                <div className="flex items-center gap-4 mt-2">
                                    <button className="flex items-center gap-1 text-slate-500 hover:text-white text-xs">
                                        <ThumbsUp className="w-3 h-3" /> 24
                                    </button>
                                    <button className="flex items-center gap-1 text-slate-500 hover:text-white text-xs">
                                        <ThumbsDown className="w-3 h-3" />
                                    </button>
                                    <button className="text-xs text-slate-500 hover:text-white font-bold">Reply</button>
                                </div>
                            </div>
                        </div>
                     ))}
                </div>
            </div>

            {/* Sidebar (Up Next) */}
            <div className="w-full lg:w-[350px] flex-shrink-0">
                <div className="flex justify-between items-center mb-4">
                     <h3 className="text-lg font-bold text-white font-display">Up Next</h3>
                     <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Autoplay</span>
                        <div className="w-8 h-4 bg-[#38BDF8] rounded-full relative cursor-pointer">
                            <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-black rounded-full shadow-sm"></div>
                        </div>
                     </div>
                </div>

                <div className="flex flex-col gap-3">
                    {videos.filter(v => v.id !== activeVideo.id).map((video) => (
                        <div 
                            key={video.id} 
                            className="flex gap-2 group cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors"
                            onClick={() => setActiveVideo(video)}
                        >
                            <div className="relative w-40 aspect-video rounded-lg overflow-hidden bg-[#121212] flex-shrink-0 border border-white/5">
                                <img 
                                    src={video.thumbnailUrl || video.creatorAvatar} 
                                    alt={video.title} 
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                                <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] font-bold px-1 py-0.5 rounded font-mono">
                                    0:45
                                </span>
                            </div>
                            <div className="flex flex-col min-w-0">
                                <h4 className="text-sm font-bold text-white leading-tight line-clamp-2 mb-1 group-hover:text-[#38BDF8] transition-colors">{video.title}</h4>
                                <span className="text-xs text-slate-400 block truncate">{video.creator}</span>
                                <span className="text-[10px] text-slate-500 font-mono mt-auto">{video.views || '5K'} views</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

// Helper to make google storage URLs playable directly if needed, or use as is
const videoUrl = (url: string) => url;

export default ShortsFeed;