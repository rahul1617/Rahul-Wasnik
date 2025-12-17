
import React, { useState, useEffect, useMemo } from 'react';
import { Game, NewsArticle, GamingEvent, ViewState, Review, GamerProfile, MerchItem, ShortVideo } from './types';
import { fetchFeaturedGames, fetchNewsWithSearch, fetchGamingEvents, fetchGameReviews, fetchTopGamers, fetchMerchItems } from './services/geminiService';
import { auth } from './services/firebase';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { Menu, X, Search, Heart, ShoppingBag, ArrowUpRight, Gamepad2, Zap, PlaySquare, Trophy, ChevronRight, Calendar as CalendarIcon, Hexagon, Activity, LogOut } from 'lucide-react';
import GameCard from './components/GameCard';
import GamerProfileCard from './components/GamerProfileCard';
import TrendingGames from './components/TrendingGames';
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
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [view, setView] = useState<ViewState>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showFeaturedModal, setShowFeaturedModal] = useState(false);
  const [showSubmitGameModal, setShowSubmitGameModal] = useState(false);
  const [showUploadShortModal, setShowUploadShortModal] = useState(false);
  
  // Data States
  const [games, setGames] = useState<Game[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [events, setEvents] = useState<GamingEvent[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [topGamers, setTopGamers] = useState<GamerProfile[]>([]);
  const [merchItems, setMerchItems] = useState<MerchItem[]>([]);
  
  const [shortVideos, setShortVideos] = useState<ShortVideo[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Filter & Sort States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [sortBy, setSortBy] = useState('rating');
  
  // Loading States
  const [loadingGames, setLoadingGames] = useState(false);
  const [loadingNews, setLoadingNews] = useState(false);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [loadingGamers, setLoadingGamers] = useState(false);
  const [loadingMerch, setLoadingMerch] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    
    // Initial static favorites load
    try {
      const saved = localStorage.getItem('nexus_favorites');
      setFavorites(saved ? JSON.parse(saved) : []);
    } catch (e) {
      setFavorites([]);
    }

    const initData = async () => {
      setLoadingGames(true);
      setLoadingNews(true);
      setLoadingEvents(true);
      setLoadingReviews(true);
      setLoadingGamers(true);
      setLoadingMerch(true);

      fetchFeaturedGames().then(data => { setGames(data); setLoadingGames(false); });
      fetchNewsWithSearch().then(data => { setNews(data); setLoadingNews(false); });
      fetchGamingEvents().then(data => { setEvents(data); setLoadingEvents(false); });
      fetchGameReviews().then(data => { setReviews(data); setLoadingReviews(false); });
      fetchTopGamers().then(data => { setTopGamers(data); setLoadingGamers(false); });
      fetchMerchItems().then(data => { setMerchItems(data); setLoadingMerch(false); });
    };

    initData();
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('nexus_favorites', JSON.stringify(favorites));
    }
  }, [favorites, currentUser]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const handleStudioClick = (studio: string) => {
    setSearchQuery(studio);
    setView('directory');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          game.studio.toLowerCase().includes(searchQuery.toLowerCase());
      const matchGenre = selectedGenre === 'All' || game.genre === selectedGenre;
      const matchPlatform = selectedPlatform === 'All' || game.platform.includes(selectedPlatform);
      
      return matchSearch && matchGenre && matchPlatform;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.title.localeCompare(b.title);
      if (sortBy === 'newest') return (b.isNewRelease === a.isNewRelease) ? 0 : b.isNewRelease ? 1 : -1;
      return 0;
    });
  }, [games, searchQuery, selectedGenre, selectedPlatform, sortBy]);

  const favoriteGamesList = useMemo(() => {
    return games.filter(game => favorites.includes(game.id));
  }, [games, favorites]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Activity className="w-12 h-12 text-[#38BDF8] animate-spin mb-4" />
          <span className="text-white font-mono text-xs tracking-widest animate-pulse">AUTHORIZING_ACCESS...</span>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Login />;
  }

  const NavItem = ({ id, label, icon: Icon }: { id: ViewState; label: string; icon?: any }) => (
    <button
      onClick={() => {
        setView(id);
        setMobileMenuOpen(false);
      }}
      className={`relative px-5 py-2.5 transition-all duration-300 font-bold text-sm flex items-center gap-2 tracking-normal font-display rounded-full overflow-hidden group
        ${view === id 
          ? 'text-black bg-white shadow-[0_0_15px_rgba(255,255,255,0.4)] scale-105' 
          : 'text-slate-400 hover:text-white'
        }`}
    >
      {view !== id && (
        <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full"></span>
      )}
      {Icon && <Icon className="w-4 h-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />}
      <span className="relative z-10">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col relative text-[#e5e5e5] selection:bg-[#38BDF8] selection:text-black font-sans">
      <nav className="sticky top-6 z-50 w-full px-4 md:px-8">
         <div className="max-w-[1700px] mx-auto bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/5 shadow-2xl rounded-full px-4">
            <div className="h-20 flex items-center justify-between px-2">
                <div className="flex items-center gap-3 cursor-pointer group select-none pl-2" onClick={() => setView('home')}>
                   <div className="relative">
                      <svg width="48" height="32" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto group-hover:scale-110 transition-transform duration-300">
                        <path d="M8 8L20 24M20 8L8 24" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="24" cy="16" r="3.5" fill="white"/>
                        <path d="M28 8L40 24M40 8L28 24" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                   </div>
                  <div className="font-display font-black leading-none text-white text-2xl tracking-tight">
                    UNREAL<span className="text-[#38BDF8]">.CLOUD</span>
                  </div>
                </div>

                <div className="hidden xl:flex items-center gap-2 bg-black/40 p-1.5 border border-white/5 rounded-full">
                  <NavItem id="home" label="Discover" />
                  <NavItem id="shorts" label="Clips" icon={PlaySquare} />
                  <NavItem id="directory" label="Directory" />
                  <NavItem id="calendar" label="Calendar" icon={CalendarIcon} />
                  <NavItem id="shop" label="Gear" />
                  <NavItem id="news" label="News" />
                </div>

                <div className="hidden md:flex items-center gap-4 pr-2">
                   <button onClick={() => setView('directory')} className="p-3 text-white hover:bg-white/10 transition-colors border border-white/10 rounded-full active:scale-95 duration-200">
                     <Search className="w-5 h-5" />
                   </button>
                   <button onClick={() => setView('favorites')} className="p-3 text-[#38BDF8] hover:bg-[#38BDF8]/10 transition-colors border border-[#38BDF8]/30 rounded-full group relative active:scale-95 duration-200">
                     <Heart className="w-5 h-5 group-hover:fill-[#38BDF8]/50 transition-colors" />
                     {favorites.length > 0 && (
                        <span className="absolute top-1 right-1 w-2 h-2 bg-[#38BDF8] rounded-full animate-pulse"></span>
                     )}
                   </button>
                   <button onClick={handleLogout} className="p-3 text-slate-500 hover:text-white transition-colors border border-white/5 hover:bg-white/5 rounded-full active:scale-95" title="Logout">
                      <LogOut className="w-5 h-5" />
                   </button>
                </div>

                <div className="xl:hidden">
                  <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white p-2 hover:bg-white/10 border border-white/30 transition-colors rounded-full active:scale-95">
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                  </button>
                </div>
            </div>
         </div>
      </nav>

      <main className="flex-grow max-w-[1700px] mx-auto px-4 md:px-8 py-12 w-full space-y-24">
        {view === 'home' && !loadingGames && (
          <div className="space-y-20 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
             <section className="relative py-8 md:py-12 md:px-8 -mx-4 md:mx-0 rounded-[2.5rem] overflow-hidden border border-white/5 bg-[#050510] shadow-2xl group">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute inset-0 bg-[#050510]"></div>
                    <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: `linear-gradient(#38BDF8 1px, transparent 1px), linear-gradient(90deg, #38BDF8 1px, transparent 1px)`, backgroundSize: '40px 40px' }}></div>
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#38BDF8]/10 blur-[120px] rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-transparent to-[#050510]"></div>
                </div>
                <div className="relative z-10 px-4 md:px-0">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4 border-b border-white/10 pb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-[#38BDF8]/10 border border-[#38BDF8]/20 flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.15)] group-hover:shadow-[0_0_30px_rgba(56,189,248,0.25)] transition-shadow">
                                <Hexagon className="w-8 h-8 text-[#38BDF8]" />
                            </div>
                            <div>
                                <h2 className="text-3xl md:text-4xl font-display font-black text-white mb-1 uppercase tracking-tight leading-none">
                                    ELITE <span className="text-[#38BDF8]">OPERATIVES</span>
                                </h2>
                                <p className="text-slate-400 text-xs font-mono tracking-[0.2em] flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-[#38BDF8] rounded-full animate-pulse"></span>
                                    AUTHENTICATED USER: {currentUser?.email?.split('@')[0]}
                                </p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setShowFeaturedModal(true)} className="backdrop-blur-md bg-white/5 border-white/10 hover:bg-white/10 hover:border-[#38BDF8]/50 rounded-full px-6">
                            Apply For Status
                        </Button>
                    </div>
                    {loadingGamers ? (
                        <div className="text-[#38BDF8] text-sm font-mono animate-pulse py-10 text-center">ACCESSING_DATABASE...</div>
                    ) : (
                        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x perspective-1000 -mx-4 px-4 md:mx-0 md:px-0">
                            {topGamers.map(gamer => (
                                <div key={gamer.id} className="snap-start transform transition-transform duration-500 hover:scale-[1.02]">
                                    <GamerProfileCard gamer={gamer} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
             </section>

            {games.length > 0 && <FeaturedGame game={games[0]} />}

            <TrendingGames 
              games={games.slice(2, 17)} 
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onStudioClick={handleStudioClick}
              onViewAll={() => setView('directory')}
            />
          </div>
        )}

        {view === 'directory' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-500">
             <div className="bg-[#121212] border border-white/5 p-6 md:p-10 rounded-[2.5rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5">
                    <Gamepad2 className="w-96 h-96 text-white" />
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
                   <div>
                      <h2 className="text-5xl font-display font-black text-white mb-2 uppercase tracking-tighter">Game <span className="text-[#38BDF8]">Library</span></h2>
                      <p className="text-slate-500 font-mono text-xs tracking-widest">AUTHORIZED DATABASE ACCESS</p>
                   </div>
                   <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                      <div className="relative w-full md:w-96 group">
                          <input 
                            type="text" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="SEARCH_MAINFRAME..." 
                            className="w-full bg-[#0a0a0a] border border-white/10 pl-6 pr-12 py-4 text-white focus:outline-none focus:border-[#38BDF8] transition-all font-mono text-sm rounded-full"
                          />
                          <Search className="absolute right-6 top-4 w-5 h-5 text-white/40 pointer-events-none group-focus-within:text-[#38BDF8]" />
                      </div>
                      <Button variant="primary" onClick={() => setShowSubmitGameModal(true)} className="h-[52px] rounded-full">UPLOAD_INTEL</Button>
                   </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4 pt-8 mt-8 border-t border-white/5 relative z-10">
                   <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                      {['All', 'Battle Royale', 'FPS', 'MOBA', 'Strategy', 'Sports', 'RPG'].map(genre => (
                         <button key={genre} onClick={() => setSelectedGenre(genre)} className={`px-6 py-2 text-xs font-bold uppercase border font-mono rounded-full ${selectedGenre === genre ? 'bg-white text-black border-white' : 'text-white/60 border-white/10 hover:border-white'}`}>
                            {genre}
                         </button>
                      ))}
                   </div>
                </div>
             </div>
             {loadingGames ? (
                <div className="text-center py-20 text-white font-mono animate-pulse">DECRYPTING...</div>
             ) : (
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                   {filteredGames.map(game => (
                     <GameCard 
                        key={game.id} 
                        game={game} 
                        isFavorite={favorites.includes(game.id)}
                        onToggleFavorite={toggleFavorite}
                        onStudioClick={handleStudioClick}
                     />
                   ))}
                 </div>
             )}
          </div>
        )}
      </main>
      <ChatWidget />
    </div>
  );
};

export default App;
