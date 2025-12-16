
import React, { useState, useRef } from 'react';
import { X, Upload, Video, Gamepad2, Type, CheckCircle } from 'lucide-react';
import Button from './Button';
import { ShortVideo } from '../types';

interface UploadShortModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (video: ShortVideo) => void;
}

const UploadShortModal: React.FC<UploadShortModalProps> = ({ isOpen, onClose, onUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [gameTag, setGameTag] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !previewUrl) return;

    setIsLoading(true);

    // Simulate upload delay
    setTimeout(() => {
      const newVideo: ShortVideo = {
        id: Date.now().toString(),
        url: previewUrl, // In a real app, this would be a cloud storage URL
        title: title,
        creator: 'You',
        creatorAvatar: 'https://image.pollinations.ai/prompt/cyberpunk%20avatar?width=100&height=100&nologo=true',
        likes: 0,
        comments: 0,
        shares: 0,
        gameTag: gameTag || 'Gaming',
        isUserUploaded: true
      };

      onUpload(newVideo);
      setIsLoading(false);
      setIsSuccess(true);
      
      // Reset after success
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setFile(null);
        setPreviewUrl(null);
        setTitle('');
        setGameTag('');
      }, 1500);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-[#0b0c15] border border-white/10 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row h-[80vh] md:h-[600px]">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all z-20"
        >
          <X className="w-6 h-6" />
        </button>

        {isSuccess ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-[#ccff00]/10 text-[#ccff00] rounded-full flex items-center justify-center mb-6 border border-[#ccff00]/20 shadow-lg shadow-[#ccff00]/20">
               <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-3xl font-display font-bold text-white mb-2">Clip Uploaded!</h3>
            <p className="text-slate-400">Your short is now live on the feed.</p>
          </div>
        ) : (
          <>
            {/* Left: Preview */}
            <div className="w-full md:w-1/2 bg-black relative flex items-center justify-center border-b md:border-b-0 md:border-r border-white/5">
              {previewUrl ? (
                <div className="relative w-full h-full">
                  <video 
                    src={previewUrl} 
                    className="w-full h-full object-cover" 
                    controls 
                    autoPlay 
                    loop 
                    muted 
                  />
                  <button 
                    onClick={() => {
                        setFile(null);
                        setPreviewUrl(null);
                    }}
                    className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md hover:bg-red-500/50 transition-colors"
                  >
                    Change Video
                  </button>
                </div>
              ) : (
                <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center justify-center cursor-pointer group p-8"
                >
                    <div className="w-20 h-20 rounded-2xl bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center mb-4 group-hover:border-[#ccff00] group-hover:bg-[#ccff00]/10 transition-all">
                        <Upload className="w-8 h-8 text-slate-400 group-hover:text-[#ccff00]" />
                    </div>
                    <p className="text-slate-300 font-bold mb-1">Click to Upload Short</p>
                    <p className="text-xs text-slate-500">MP4, WebM up to 50MB</p>
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="video/*" 
                className="hidden" 
              />
            </div>

            {/* Right: Metadata */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
              <h2 className="text-2xl font-display font-bold text-white mb-6">New Clip</h2>
              
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-5">
                 <div className="space-y-4 flex-grow">
                    <div className="relative group">
                       <div className="absolute left-3 top-3 text-slate-500">
                         <Type className="w-5 h-5" />
                       </div>
                       <input 
                         required
                         type="text" 
                         value={title}
                         onChange={(e) => setTitle(e.target.value)}
                         placeholder="Caption your clip..." 
                         className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#ccff00] transition-colors"
                       />
                    </div>

                    <div className="relative group">
                       <div className="absolute left-3 top-3 text-slate-500">
                         <Gamepad2 className="w-5 h-5" />
                       </div>
                       <select 
                         required
                         value={gameTag}
                         onChange={(e) => setGameTag(e.target.value)}
                         className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#ccff00] appearance-none cursor-pointer"
                       >
                          <option value="" disabled>Select Game</option>
                          <option value="Valorant">Valorant</option>
                          <option value="Fortnite">Fortnite</option>
                          <option value="Call of Duty">Call of Duty</option>
                          <option value="League of Legends">League of Legends</option>
                          <option value="CS2">CS2</option>
                          <option value="Minecraft">Minecraft</option>
                          <option value="Other">Other</option>
                       </select>
                    </div>
                 </div>

                 <div className="mt-auto">
                    <Button 
                        type="submit" 
                        variant="primary" 
                        className="w-full h-12 rounded-xl"
                        disabled={!file}
                        isLoading={isLoading}
                    >
                        Publish Clip
                    </Button>
                 </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UploadShortModal;
