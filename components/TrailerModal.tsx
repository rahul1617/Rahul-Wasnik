import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Loader2 } from 'lucide-react';

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameTitle: string;
  trailerVideoId?: string;
}

const TrailerModal: React.FC<TrailerModalProps> = ({ isOpen, onClose, gameTitle, trailerVideoId }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Use direct video ID if available (more reliable), otherwise fallback to search list
  const embedUrl = trailerVideoId 
    ? `https://www.youtube.com/embed/${trailerVideoId}?autoplay=1&mute=0`
    : `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(gameTitle + ' official trailer')}&autoplay=1&mute=0&origin=${window.location.origin}`;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
      {/* Close Button */}
      <button 
        onClick={onClose} 
        className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all z-30"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Click outside to close */}
      <div className="absolute inset-0 z-10" onClick={onClose}></div>

      <div className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl shadow-white/10 border border-slate-800 z-20">
         <div className="absolute inset-0 flex items-center justify-center -z-10">
            <Loader2 className="w-10 h-10 text-white animate-spin" />
         </div>
         <iframe
           className="w-full h-full"
           src={embedUrl}
           title={`${gameTitle} Trailer`}
           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
           allowFullScreen
         />
      </div>
    </div>,
    document.body
  );
};

export default TrailerModal;