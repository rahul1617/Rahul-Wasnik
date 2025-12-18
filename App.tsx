
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { auth } from './services/firebase';
import { Game, GamingEvent, ViewState, GamerProfile, MerchItem, ShortVideo } from './types';
import { fetchFeaturedGames, fetchGamingEvents, fetchTopGamers, fetchMerchItems } from './services/geminiService';
import { Search, Heart, ShoppingBag, Compass, Layers, PlaySquare, Calendar as CalendarIcon, ShoppingCart, Plus, Menu, LogOut } from 'lucide-react';
import GameCard from './components/GameCard';
import GetFeaturedModal from './components/GetFeaturedModal';
import SubmitGameModal from './components/SubmitGameModal';
import Button from './components/Button';
import ChatWidget from './components/ChatWidget';
import MerchCard from './components/MerchCard';
import FeaturedGame from './components/FeaturedGame';
import ShortsFeed from './components/ShortsFeed';
import UploadShortModal from './components/UploadShortModal';
import ReleaseCalendar from './components/ReleaseCalendar';
import Login from './components/Login';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [view, setView] = useState<ViewState>('home');
  const [showFeaturedModal, setShowFeaturedModal] = useState(false);
  const [showSubmitGameModal, setShowSubmitGameModal] = useState(false);
  const [showUploadShortModal, setShowUploadShortModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [games, setGames] = useState<Game[]>([]);
  const [events, setEvents] = useState<GamingEvent[]>([]);
  const [topGamers, setTopGamers] = useState<GamerProfile[]>([]);
  const [merchItems, setMerchItems] = useState<MerchItem[]>([]);
  const [shortVideos, setShortVideos] = useState<ShortVideo[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [dataLoading, setDataLoading] = useState(false);

  // Monitor Authentication State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Fetch data only after user is authenticated
  useEffect(() => {
    if (!user) return;

    const saved = localStorage.getItem('nexus_favorites');
    if (saved) setFavorites(JSON.parse(saved));

    const initData = async () => {
      setDataLoading(true);
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
      setDataLoading(false);
    };
    initData();
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
        const next = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
        localStorage.setItem('nexus_favorites', JSON.stringify(next));
        return next;
    });
  };

  const NavItem = ({ id, label, icon: Icon }: { id: ViewState; label: string; icon: any }) => (
    <button
      onClick={() => { setView(id); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
      className={`relative h-10 px-5 flex items-center gap-2.5 transition-all duration-500 font-display font-medium text-[10px] uppercase tracking-widest rounded-full group
        ${view === id 
          ? 'bg-white text-black shadow-lg shadow-white/5' 
          : 'text-slate-500 hover:text-slate-200'
        }`}
    >
      <Icon className={`w-3.5 h-3.5 ${view === id ? 'text-[#70CFFF]' : 'group-hover:text-white transition-colors'}`} />
      <span>{label}</span>
    </button>
  );

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#020205] flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-[#70CFFF]/20 border-t-[#70CFFF] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen flex flex-col relative text-[#a0a0a0]">
      {/* Top Fixed Header with Navigation */}
      <header className="fixed top-0 left-0 w-full z-[100] bg-[#020205]/60 backdrop-blur-2xl border-b border-white/5 px-6 md:px-12 h-20 flex items-center">
         <div className="max-w-[1700px] w-full mx-auto flex justify-between items-center gap-8">
            {/* Branding */}
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setView('home')}>
                <div className="w-8 h-8 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center group-hover:border-white/30 transition-all duration-500">
                  <svg width="20" height="20" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 8L16 24M16 8L4 24" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                      <circle cx="24" cy="16" r="4" fill="#70CFFF"/>
                      <path d="M32 8L44 24M44 8L32 24" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                  </svg>
                </div>
                <h1 className="hidden sm:block text-sm font-display font-bold tracking-[0.2em] text-white uppercase">
                  UNREALGAME<span className="text-slate-600">.CLOUD</span>
                </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center bg-white/[0.03] border border-white/5 rounded-full p-1 gap-1">
                <NavItem id="home" label="Discover" icon={Compass} />
                <NavItem id="directory" label="Library" icon={Layers} />
                <NavItem id="shorts" label="Media" icon={PlaySquare} />
                <NavItem id="calendar" label="Ops" icon={CalendarIcon} />
                <NavItem id="shop" label="Market" icon={ShoppingBag} />
            </div>

            {/* Utility / Right Side */}
            <div className="flex items-center gap-4 md:gap-6">
                <div className="hidden lg:flex items-center bg-white/5 border border-white/5 h-10 px-4 rounded-full group focus-within:border-white/20 transition-all">
                  <Search className="w-3.5 h-3.5 text-slate-500 group-focus-within:text-white" />
                  <input 
                      type="text" 
                      placeholder="Search archive..."
                      className="bg-transparent border-none h-full ml-3 text-[10px] text-white placeholder-slate-600 focus:outline-none w-32 xl:w-48 font-mono uppercase tracking-wider"
                      onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <button 
                  onClick={() => setView('favorites')} 
                  className={`w-10 h-10 flex items-center justify-center rounded-full transition-all border border-white/5 ${view === 'favorites' ? 'bg-[#70CFFF] text-black border-transparent' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
                >
                  <Heart className={`w-4 h-4 ${favorites.length > 0 && view !== 'favorites' ? 'fill-current text-[#70CFFF]' : ''}`} />
                </button>

                <div className="h-6 w-px bg-white/10 hidden sm:block"></div>

                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex flex-col items-end">
                    <span className="text-[10px] font-bold text-white uppercase tracking-tight">{user.displayName || 'GUEST_OPERATIVE'}</span>
                    <span className="text-[8px] font-mono text-slate-500 uppercase">{user.email?.split('@')[0]}</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-500/5 text-red-500/50 hover:text-red-500 hover:bg-red-500/10 transition-all border border-red-500/10"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>

                <button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="xl:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-slate-400 hover:text-white"
                >
                  <Menu className="w-5 h-5" />
                </button>
            </div>
         </div>
      </header>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-xl xl:hidden p-8 animate-in fade-in slide-in-from-top-4 duration-300">
           <div className="flex justify-between items-center mb-12">
              <h2 className="font-display font-black text-white uppercase tracking-widest text-lg">Menu</h2>
              <button onClick={() => setMobileMenuOpen(false)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white"><Plus className="w-5 h-5 rotate-45" /></button>
           </div>
           <div className="flex flex-col gap-4">
              <NavItem id="home" label="Discover" icon={Compass} />
              <NavItem id="directory" label="Library" icon={Layers} />
              <NavItem id="shorts" label="Media" icon={PlaySquare} />
              <NavItem id="calendar" label="Ops" icon={CalendarIcon} />
              <NavItem id="shop" label="Market" icon={ShoppingBag} />
           </div>
           <div className="mt-12 pt-8 border-t border-white/5 flex flex-col gap-6">
              <button onClick={() => { setShowFeaturedModal(true); setMobileMenuOpen(false); }} className="text-xs font-bold uppercase tracking-widest text-slate-400">Creator Portal</button>
              <button onClick={() => { setShowSubmitGameModal(true); setMobileMenuOpen(false); }} className="text-xs font-bold uppercase tracking-widest text-slate-400">Submit Game</button>
           </div>
        </div>
      )}

      <main className="flex-grow max-w-[1700px] mx-auto px-6 md:px-12 py-32 w-full space-y-24 pb-40">
        {dataLoading ? (
          <div className="h-[60vh] flex flex-col items-center justify-center gap-6">
             <div className="w-12 h-12 border-2 border-[#70CFFF]/20 border-t-[#70CFFF] rounded-full animate-spin"></div>
             <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-slate-500">Accessing Database Archives...</p>
          </div>
        ) : (
          <>
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
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <input 
                          type="text" 
                          placeholder="Filter by title..."
                          className="w-full md:w-64 bg-white/5 border border-white/5 h-11 px-4 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-white/20 transition-all"
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Button variant="neo" size="sm" className="h-11 px-6 whitespace-nowrap" onClick={() => setShowSubmitGameModal(true)}><Plus className="w-3.5 h-3.5 mr-2" /> Add Game</Button>
                    </div>
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
                   <div className="py-24 text-center glass-card rounded-3xl border-dashed">
                      <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Database entry empty</p>
                      <Button variant="outline" size="sm" className="mt-6" onClick={() => setView('directory')}>Acquire Intel</Button>
                   </div>
                 )}
              </div>
            )}
          </>
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
