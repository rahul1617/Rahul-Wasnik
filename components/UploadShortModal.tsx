
import React, { useState, useRef } from 'react';
import { X, Upload, CheckCircle } from 'lucide-react';
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

    setTimeout(() => {
      const newVideo: ShortVideo = {
        id: Date.now().toString(),
        url: previewUrl,
        title: title,
        creator: 'You',
        creatorAvatar: 'https://image.pollinations.ai/prompt/minimalist%20gamer%20profile%20white?width=100&height=100&nologo=true',
        likes: 0,
        comments: 0,
        shares: 0,
        gameTag: 'Gaming',
        isUserUploaded: true
      };

      onUpload(newVideo);
      setIsLoading(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setFile(null);
        setPreviewUrl(null);
        setTitle('');
      }, 1500);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 animate-in fade-in duration-300">
      <div className="bg-[#050508] border border-white/10 rounded-[2rem] w-full max-w-2xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row h-[70vh] md:h-[500px]">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="flex-1 flex flex-col items-center justify-center p-10 text-center animate-in zoom-in duration-500">
            <div className="w-16 h-16 bg-[#70CFFF]/10 text-[#70CFFF] rounded-full flex items-center justify-center mb-6 border border-[#70CFFF]/20">
               <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-display font-bold text-white mb-2 uppercase tracking-tight">Transmission Complete</h3>
            <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest">Clip added to community feed</p>
          </div>
        ) : (
          <>
            <div className="w-full md:w-1/2 bg-black relative flex items-center justify-center border-b md:border-b-0 md:border-r border-white/5">
              {previewUrl ? (
                <div className="relative w-full h-full">
                  <video src={previewUrl} className="w-full h-full object-cover opacity-60" controls autoPlay loop muted />
                </div>
              ) : (
                <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center justify-center cursor-pointer group p-8"
                >
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-dashed border-white/20 flex items-center justify-center mb-4 group-hover:border-[#70CFFF]/50 transition-all">
                        <Upload className="w-6 h-6 text-slate-600 group-hover:text-white" />
                    </div>
                    <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Select Source</p>
                </div>
              )}
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="video/*" className="hidden" />
            </div>

            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
              <h2 className="text-xl font-display font-bold text-white mb-6 uppercase tracking-tight">New Broadcast</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                 <input 
                    required
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter description..." 
                    className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-4 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-white/20 transition-all font-mono"
                 />
                 <Button type="submit" variant="primary" className="w-full h-12 rounded-xl" disabled={!file} isLoading={isLoading}>Publish Intelligence</Button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UploadShortModal;
