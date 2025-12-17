
import React, { useState, useEffect, useMemo } from 'react';
import { Game, GamingEvent, ViewState, GamerProfile, MerchItem, ShortVideo } from './types';
import { fetchFeaturedGames, fetchGamingEvents, fetchTopGamers, fetchMerchItems } from './services/geminiService';
import { Search, Heart, ShoppingBag, Compass, Layers, PlaySquare, Calendar as CalendarIcon, ShoppingCart, Plus } from 'lucide-react';
import GameCard from './components/GameCard';
import GamerProfileCard from './components/GamerProfileCard';
import GetFeaturedModal from './components/GetFeaturedModal';
import SubmitGameModal from './components/SubmitGameModal';
import Button from './components/Button';
import ChatWidget from './components/ChatWidget';
import MerchCard from './components/MerchCard';
import FeaturedGame from './components/FeaturedGame';
import ShortsFeed from './components/ShortsFeed';
import UploadShortModal from './components/UploadShortModal';
import ReleaseCalendar from './components/ReleaseCalendar';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [showFeaturedModal, setShowFeaturedModal] = useState(false);
  const [showSubmitGameModal, setShowSubmitGameModal] = useState(false);
  const [showUploadShortModal, setShowUploadShortModal] = useState(false);
  
  const [games, setGames] = useState<Game[]>([]);
  const [events, setEvents] = useState<GamingEvent[]>([]);
  const [topGamers, setTopGamers] = useState<GamerProfile[]>([]);
  const [merchItems, setMerchItems] = useState<MerchItem[]>([]);
  const [shortVideos, setShortVideos] = useState<ShortVideo[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('nexus_favorites');
    if (saved) setFavorites(JSON.parse(saved));

    const initData = async () => {
      setLoading(true);
      const [gamesData, eventsData, gamersData, merchData] = await Promise.all([
        fetchFeaturedGames(),
        fetchGamingEvents(),
        fetchTopGamers(),
        fetchMerchItems()
      ]);

      setGames(gamesData);
      setEvents(eventsData);
      setTopGamers(gamersData);
      setMerchItems(merchData);

      setShortVideos([
        {
          id: 's1',
          url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          title: 'High Stakes: Cinematic Tournaments 2024',
          creator: 'AcePlayer_99',
          creatorAvatar: 'https://image.pollinations.ai/prompt/professional%20minimalist%20gamer%20avatar?width=100&height=100&nologo=true',
          likes: 4500,
          comments: 120,
          shares: 50,
          gameTag: 'eSports'
        },
        {
          id: 's2',
          url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          title: 'Unreal Engine 5: The Future of Free Play',
          creator: 'DevNexus',
          creatorAvatar: 'https://image.pollinations.ai/prompt/tech%20studio%20minimalist%20avatar?width=100&height=100&nologo=true',
          likes: 8200,
          comments: 430,
          shares: 110,
          gameTag: 'Meta'
        }
      ]);
      setLoading(false);
    };
    initData();
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
        const next = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
        localStorage.setItem('nexus_favorites', JSON.stringify(next));
        return next;
    });
  };

  const NavItem = ({ id, label, icon: Icon }: { id: ViewState; label: string; icon: any }) => (
    <button
      onClick={() => { setView(id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
      className={`relative h-12 px-6 flex items-center gap-3 transition-all duration-700 font-display font-medium text-xs uppercase tracking-widest rounded-full group
        ${view === id 
          ? 'bg-white text-black shadow-[0_4px_20px_rgba(255,255,255,0.1)]' 
          : 'text-slate-500 hover:text-slate-200'
        }`}
    >
      <Icon className={`w-3.5 h-3.5 ${view === id ? 'text-[#70CFFF]' : 'group-hover:text-white transition-colors'}`} />
      <span className="hidden md:inline">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col relative text-[#a0a0a0]">
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-fit px-4">
         <div className="bg-black/40 backdrop-blur-2xl border border-white/5 rounded-full p-1.5 flex items-center gap-1 shadow-2xl">
            <NavItem id="home" label="Discover" icon={Compass} />
            <NavItem id="directory" label="Library" icon={Layers} />
            <NavItem id="shorts" label="Media" icon={PlaySquare} />
            <NavItem id="calendar" label="Ops" icon={CalendarIcon} />
            <NavItem id="shop" label="Market" icon={ShoppingBag} />
            <div className="h-6 w-px bg-white/5 mx-2"></div>
            <button 
              onClick={() => setView('favorites')} 
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${view === 'favorites' ? 'bg-[#70CFFF] text-black' : 'text-slate-500 hover:text-white'}`}
            >
              <Heart className={`w-4 h-4 ${favorites.length > 0 && view !== 'favorites' ? 'fill-current text-[#70CFFF]' : ''}`} />
            </button>
         </div>
      </nav>

      <header className="w-full pt-8 px-8 flex justify-between items-center max-w-[1700px] mx-auto">
         <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setView('home')}>
            <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center group-hover:border-white/30 transition-all duration-500">
               <svg width="24" height="24" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 8L16 24M16 8L4 24" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                  <circle cx="24" cy="16" r="4" fill="#70CFFF"/>
                  <path d="M32 8L44 24M44 8L32 24" stroke="white" strokeWidth="4" strokeLinecap="round"/>
               </svg>
            </div>
            <h1 className="text-xl font-display font-bold tracking-[0.2em] text-white uppercase">
              UNREALGAME<span className="text-slate-500">.CLOUD</span>
            </h1>
         </div>
         <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center bg-white/5 border border-white/5 h-10 px-4 rounded-full group focus-within:border-white/20 transition-all">
               <Search className="w-3.5 h-3.5 text-slate-500 group-focus-within:text-white" />
               <input 
                  type="text" 
                  placeholder="Universal search..."
                  className="bg-transparent border-none h-full ml-3 text-xs text-white placeholder-slate-600 focus:outline-none w-48 font-mono"
                  onChange={(e) => setSearchQuery(e.target.value)}
               />
            </div>
            <button 
              onClick={() => setShowFeaturedModal(true)}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors"
            >
              Creator Portal
            </button>
         </div>
      </header>

      <main className="flex-grow max-w-[1700px] mx-auto px-6 md:px-12 py-12 w-full space-y-24 pb-40">
        {view === 'home' && (
          <div className="space-y-24 animate-slide-up">
            {games.length > 0 && <FeaturedGame game={games[0]} />}
            <section>
               <div className="flex justify-between items-end mb-10">
                  <div>
                    <h2 className="text-3xl font-display font-black text-white uppercase tracking-wider mb-2">High <span className="text-[#70CFFF]">Velocity</span></h2>
                    <p className="text-slate-500 font-mono text-[9px] uppercase tracking-[0.5em]">Global Active Operations</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setView('directory')}>View Archive</Button>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {games.slice(1, 11).map(game => (
                    <GameCard 
                      key={game.id} 
                      game={game} 
                      isFavorite={favorites.includes(game.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
               </div>
            </section>
          </div>
        )}

        {view === 'directory' && (
          <div className="animate-slide-up space-y-12">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-10">
                <div>
                   <h1 className="text-5xl font-display font-black text-white uppercase tracking-tighter mb-3 leading-none">The <span className="text-[#70CFFF]">Library</span></h1>
                   <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.4em]">Decentralized Game Registry</p>
                </div>
                <input 
                   type="text" 
                   placeholder="Filter by title..."
                   className="w-full md:w-64 bg-white/5 border border-white/5 h-11 px-4 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-white/20 transition-all"
                   onChange={(e) => setSearchQuery(e.target.value)}
                />
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {games.filter(g => g.title.toLowerCase().includes(searchQuery.toLowerCase())).map(game => (
                  <GameCard 
                    key={game.id} 
                    game={game} 
                    isFavorite={favorites.includes(game.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
             </div>
          </div>
        )}

        {view === 'shorts' && (
          <div className="animate-slide-up">
            <ShortsFeed videos={shortVideos} onUploadClick={() => setShowUploadShortModal(true)} />
          </div>
        )}

        {view === 'calendar' && (
          <div className="animate-slide-up">
            <ReleaseCalendar events={events} />
          </div>
        )}

        {view === 'shop' && (
          <div className="animate-slide-up space-y-12">
             <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-10">
                <div>
                   <h1 className="text-5xl font-display font-black text-white uppercase tracking-tighter mb-3 leading-none">Gear <span className="text-[#70CFFF]">Hub</span></h1>
                   <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.4em]">Curated Equipment Feed</p>
                </div>
                <Button variant="neo" className="h-11 rounded-xl gap-2"><ShoppingCart className="w-3.5 h-3.5" /> Checkout</Button>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {merchItems.map(item => <MerchCard key={item.id} item={item} />)}
             </div>
          </div>
        )}

        {view === 'favorites' && (
          <div className="animate-slide-up space-y-12">
             <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-10">
                <h1 className="text-5xl font-display font-black text-white uppercase tracking-tighter leading-none">Personal <span className="text-[#70CFFF]">Vault</span></h1>
             </div>
             {favorites.length > 0 ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {games.filter(g => favorites.includes(g.id)).map(game => (
                    <GameCard key={game.id} game={game} isFavorite={true} onToggleFavorite={toggleFavorite} />
                  ))}
               </div>
             ) : (
               <div className="py-24 text-center glass-card rounded-3xl">
                  <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Database entry empty</p>
                  <Button variant="outline" size="sm" className="mt-6" onClick={() => setView('directory')}>Acquire Intel</Button>
               </div>
             )}
          </div>
        )}
      </main>

      <ChatWidget />
      <GetFeaturedModal isOpen={showFeaturedModal} onClose={() => setShowFeaturedModal(false)} />
      <SubmitGameModal isOpen={showSubmitGameModal} onClose={() => setShowSubmitGameModal(false)} />
      <UploadShortModal isOpen={showUploadShortModal} onClose={() => setShowUploadShortModal(false)} onUpload={(v) => setShortVideos(p => [v, ...p])} />
    </div>
  );
};

export default App;
