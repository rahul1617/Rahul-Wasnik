import React, { useState, useEffect, useMemo } from 'react';
import { Game, NewsArticle, GamingEvent, ViewState, Review, GamerProfile, MerchItem, ShortVideo } from './types';
import { fetchFeaturedGames, fetchNewsWithSearch, fetchGamingEvents, fetchGameReviews, fetchTopGamers, fetchMerchItems } from './services/geminiService';
import { Menu, X, Search, Heart, ShoppingBag, ArrowUpRight, Gamepad2, Zap, PlaySquare, Trophy, ChevronRight, Calendar as CalendarIcon, Hexagon, Activity } from 'lucide-react';
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

const App: React.FC = () => {
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
  
  // Shorts State
  const [shortVideos, setShortVideos] = useState<ShortVideo[]>([
    {
       id: 'demo-1',
       url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
       title: 'Epic Joyride Moments 🚗',
       description: 'Checking out the new physics engine updates in the latest patch. The drifting feels absolutely insane now! Make sure to like and sub for more.',
       creator: 'SpeedDemon',
       creatorAvatar: 'https://image.pollinations.ai/prompt/cyberpunk%20racer%20avatar%20helmet%20neon%20lights%20digital%20art%20high%20quality?width=100&height=100&nologo=true',
       likes: 1240,
       comments: 85,
       shares: 400,
       gameTag: 'Racing',
       thumbnailUrl: 'https://image.pollinations.ai/prompt/racing%20game%20screenshot%20drift%20smoke%20neon%20lights%20night%20city%20unreal%20engine%205?width=640&height=360&nologo=true',
       views: '12K',
       uploadDate: '2 days ago'
    },
    {
       id: 'demo-2',
       url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
       title: 'Insane Combo! 🔥',
       description: 'I finally managed to pull off the infinite combo in ranked match. This took me 3 weeks to practice.',
       creator: 'ProGamerX',
       creatorAvatar: 'https://image.pollinations.ai/prompt/pro%20gamer%20avatar%20neon%20headset%20futuristic%20style%20digital%20art?width=100&height=100&nologo=true',
       likes: 3500,
       comments: 210,
       shares: 120,
       gameTag: 'Action',
       thumbnailUrl: 'https://image.pollinations.ai/prompt/action%20game%20explosion%20combo%20hit%20effect%20particle%20effects%20cinematic?width=640&height=360&nologo=true',
       views: '45K',
       uploadDate: '5 hours ago'
    },
    {
       id: 'demo-3',
       url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
       title: 'Close Call 😱',
       description: 'Stealth mission gone wrong but somehow I made it out alive. You wont believe the end.',
       creator: 'StealthMaster',
       creatorAvatar: 'https://image.pollinations.ai/prompt/ninja%20assassin%20avatar%20dark%20hood%20cyberpunk%20style%20digital%20art?width=100&height=100&nologo=true',
       likes: 8900,
       comments: 540,
       shares: 900,
       gameTag: 'Adventure',
       thumbnailUrl: 'https://image.pollinations.ai/prompt/stealth%20game%20hiding%20in%20shadows%20tension%20cinematic%20lighting?width=640&height=360&nologo=true',
       views: '89K',
       uploadDate: '1 week ago'
    },
    {
       id: 'demo-4',
       url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
       title: 'Funny Glitch 🤣',
       description: 'The physics just broke completely. Look at how the character flies into space!',
       creator: 'MemeLord',
       creatorAvatar: 'https://image.pollinations.ai/prompt/funny%20robot%20avatar%20cartoon%20style%20colorful%20high%20quality?width=100&height=100&nologo=true',
       likes: 5600,
       comments: 320,
       shares: 1500,
       gameTag: 'Fortnite',
       thumbnailUrl: 'https://image.pollinations.ai/prompt/funny%20video%20game%20glitch%20character%20ragdoll%20flying%20into%20sky?width=640&height=360&nologo=true',
       views: '1.2M',
       uploadDate: '3 weeks ago'
    },
    {
       id: 'demo-5',
       url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
       title: 'Squad Wipe 1v4 🏆',
       description: 'Ranked Diamond lobby, last man standing. Can I clutch it?',
       creator: 'SweatyTryhard',
       creatorAvatar: 'https://image.pollinations.ai/prompt/esports%20champion%20avatar%20gold%20details%20victory%20pose%20digital%20art?width=100&height=100&nologo=true',
       likes: 12000,
       comments: 900,
       shares: 5000,
       gameTag: 'Apex Legends',
       thumbnailUrl: 'https://image.pollinations.ai/prompt/fps%20game%20victory%20screen%20champion%20squad%20wipe%20hud%20elements?width=640&height=360&nologo=true',
       views: '250K',
       uploadDate: '1 day ago'
    },
    {
       id: 'demo-6',
       url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
       title: 'Jett Knives ACE 🔪',
       description: 'They thought they could push site, but I had other plans. Cleanest round of my career.',
       creator: 'ValorantGod',
       creatorAvatar: 'https://image.pollinations.ai/prompt/anime%20style%20gamer%20avatar%20white%20hair%20wind%20effect?width=100&height=100&nologo=true',
       likes: 4500,
       comments: 120,
       shares: 300,
       gameTag: 'Valorant',
       thumbnailUrl: 'https://image.pollinations.ai/prompt/valorant%20jett%20gameplay%20screenshot%20knives%20ultimate%20anime%20style%20action?width=640&height=360&nologo=true',
       views: '56K',
       uploadDate: '4 hours ago'
    },
    {
       id: 'demo-7',
       url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
       title: 'Building a Cyberpunk City 🏗️',
       description: 'Part 4 of my mega-build series. Today we are adding the neon district and the central tower.',
       creator: 'BlockBuilder',
       creatorAvatar: 'https://image.pollinations.ai/prompt/minecraft%20style%20avatar%20builder%20helmet?width=100&height=100&nologo=true',
       likes: 8200,
       comments: 450,
       shares: 1100,
       gameTag: 'Minecraft',
       thumbnailUrl: 'https://image.pollinations.ai/prompt/minecraft%20cyberpunk%20city%20build%20shaders%20night%20neon%20lights%20rain?width=640&height=360&nologo=true',
       views: '110K',
       uploadDate: '2 weeks ago'
    },
    {
       id: 'demo-8',
       url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
       title: 'Mirage Smoke Guide 2024 ☁️',
       description: 'Essential lineups for A-site execution. Learn these to rank up fast in CS2.',
       creator: 'TacticalNade',
       creatorAvatar: 'https://image.pollinations.ai/prompt/tactical%20soldier%20avatar%20cs2%20style?width=100&height=100&nologo=true',
       likes: 2100,
       comments: 80,
       shares: 600,
       gameTag: 'CS2',
       thumbnailUrl: 'https://image.pollinations.ai/prompt/cs2%20gameplay%20smoke%20grenade%20lineup%20mirage%20map%20tactical%20overlay?width=640&height=360&nologo=true',
       views: '34K',
       uploadDate: '3 days ago'
    },
    {
       id: 'demo-9',
       url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
       title: 'Elden Ring: Malenia No Hit Run ⚔️',
       description: 'After 400 attempts, I finally did it. No damage taken against the hardest boss in the game.',
       creator: 'SoulsVeteran',
       creatorAvatar: 'https://image.pollinations.ai/prompt/knight%20helmet%20avatar%20dark%20fantasy%20style?width=100&height=100&nologo=true',
       likes: 15000,
       comments: 1200,
       shares: 4000,
       gameTag: 'Elden Ring',
       thumbnailUrl: 'https://image.pollinations.ai/prompt/elden%20ring%20malenia%20boss%20fight%20cinematic%20screenshot%20action%20pose?width=640&height=360&nologo=true',
       views: '450K',
       uploadDate: '1 month ago'
    },
    {
       id: 'demo-10',
       url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
       title: 'Insane Air Dribble Goal! ⚽',
       description: 'Check out this flip reset into air dribble. My opponent specifically forfeited after this.',
       creator: 'RocketPro',
       creatorAvatar: 'https://image.pollinations.ai/prompt/futuristic%20driver%20avatar%20helmet%20orange%20blue?width=100&height=100&nologo=true',
       likes: 6700,
       comments: 230,
       shares: 950,
       gameTag: 'Rocket League',
       thumbnailUrl: 'https://image.pollinations.ai/prompt/rocket%20league%20car%20flying%20ball%20goal%20explosion%20stadium?width=640&height=360&nologo=true',
       views: '92K',
       uploadDate: '6 hours ago'
    }
  ]);
  
  // Favorites State
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('nexus_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to load favorites", e);
      return [];
    }
  });

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
    if (view !== 'shorts') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  }, [view]);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    localStorage.setItem('nexus_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const handleStudioClick = (studio: string) => {
    setSearchQuery(studio);
    setView('directory');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShortUpload = (video: ShortVideo) => {
    setShortVideos(prev => [video, ...prev]);
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

  const NavItem = ({ id, label, icon: Icon }: { id: ViewState; label: string; icon?: any }) => (
    <button
      onClick={() => {
        setView(id);
        setMobileMenuOpen(false);
      }}
      className={`relative px-5 py-2.5 transition-all duration-300 font-bold text-sm flex items-center gap-2 tracking-normal font-display rounded-full
        ${view === id 
          ? 'text-black bg-white shadow-lg' 
          : 'text-slate-400 hover:text-white hover:bg-white/10'
        }`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      <span className="relative z-10">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col relative text-[#e5e5e5] selection:bg-[#38BDF8] selection:text-black font-sans">
      
      {/* Navbar */}
      <nav className="sticky top-6 z-50 w-full px-4 md:px-8">
         <div className="max-w-[1700px] mx-auto bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/5 shadow-2xl rounded-full px-4"
         >
            <div className="h-20 flex items-center justify-between px-2">
                {/* Logo */}
                <div className="flex items-center gap-3 cursor-pointer group select-none pl-2" onClick={() => setView('home')}>
                   <div className="relative">
                      {/* X-Dot-X Logo */}
                      <svg width="48" height="32" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
                        <path d="M8 8L20 24M20 8L8 24" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="24" cy="16" r="3.5" fill="white"/>
                        <path d="M28 8L40 24M40 8L28 24" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                   </div>
                  <div className="font-display font-black leading-none text-white text-2xl tracking-tight">
                    UNREAL<span className="text-[#38BDF8]">.CLOUD</span>
                  </div>
                </div>

                {/* Desktop Nav */}
                <div className="hidden xl:flex items-center gap-2 bg-black/40 p-1.5 border border-white/5 rounded-full">
                  <NavItem id="home" label="Discover" />
                  <NavItem id="shorts" label="Clips" icon={PlaySquare} />
                  <NavItem id="directory" label="Directory" />
                  <NavItem id="calendar" label="Calendar" icon={CalendarIcon} />
                  <NavItem id="shop" label="Gear" />
                  <NavItem id="news" label="News" />
                </div>

                {/* Actions */}
                <div className="hidden md:flex items-center gap-4 pr-2">
                   <button 
                    onClick={() => setView('directory')}
                    className="p-3 text-white hover:bg-white/10 transition-colors border border-white/10 hover:border-white rounded-full"
                   >
                     <Search className="w-5 h-5" />
                   </button>
                   <button 
                     onClick={() => setView('favorites')}
                     className="p-3 text-[#38BDF8] hover:bg-[#38BDF8]/10 transition-colors border border-[#38BDF8]/30 hover:border-[#38BDF8] rounded-full group relative"
                   >
                     <Heart className="w-5 h-5 group-hover:fill-[#38BDF8]/50" />
                     {favorites.length > 0 && (
                        <span className="absolute top-1 right-1 w-2 h-2 bg-[#38BDF8] rounded-full shadow-[0_0_10px_#38BDF8]"></span>
                     )}
                   </button>
                   <Button variant="secondary" size="sm" className="shadow-none rounded-full">SIGN IN</Button>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="xl:hidden">
                  <button 
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                    className="text-white p-2 hover:bg-white/10 border border-white/30 transition-colors rounded-full"
                  >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                  </button>
                </div>
            </div>
         </div>

         {/* Mobile Menu Dropdown */}
         {mobileMenuOpen && (
           <div className="xl:hidden mt-4 absolute left-4 right-4 bg-[#121212] border border-white/10 p-6 animate-in fade-in slide-in-from-top-4 z-50 shadow-2xl rounded-3xl"
           >
             <div className="space-y-2 flex flex-col">
                <NavItem id="home" label="Discover" />
                <NavItem id="shorts" label="Clips" icon={PlaySquare} />
                <NavItem id="directory" label="Directory" />
                <NavItem id="calendar" label="Calendar" icon={CalendarIcon} />
                <NavItem id="shop" label="Gear" />
                <NavItem id="favorites" label="Favorites" />
                <NavItem id="news" label="News" />
                <div className="pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
                   <button 
                     onClick={() => {setView('directory'); setMobileMenuOpen(false);}}
                     className="flex items-center justify-center gap-2 p-3 bg-white/5 border border-white/10 text-white font-bold font-display uppercase tracking-wider rounded-xl"
                   >
                     <Search className="w-4 h-4" /> Search
                   </button>
                   <Button className="w-full rounded-xl">Sign In</Button>
                </div>
             </div>
           </div>
         )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow max-w-[1700px] mx-auto px-4 md:px-8 py-12 w-full space-y-24">
        
        {/* Loading Overlay */}
        {(loadingGames && view === 'home') && (
          <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
             <div className="flex flex-col items-center bg-[#121212] p-10 border border-white/10 shadow-2xl rounded-[2rem]">
                 <div className="w-16 h-16 border-4 border-[#38BDF8]/20 border-t-[#38BDF8] rounded-full animate-spin mb-6"></div>
                 <span className="text-white font-mono font-bold animate-pulse tracking-widest text-xs uppercase">INITIALIZING...</span>
             </div>
          </div>
        )}

        {/* HOME VIEW */}
        {view === 'home' && !loadingGames && (
          <div className="space-y-20 animate-in fade-in duration-700">
             
             {/* Top Gamers - Moved to Top */}
             <section className="relative pt-2">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 border-b border-white/5 pb-4">
                  <div>
                      <h2 className="text-3xl font-display font-black text-white mb-1 uppercase tracking-tight">Elite <span className="text-[#38BDF8]">Operatives</span></h2>
                      <p className="text-slate-500 text-xs font-mono tracking-widest">TOP RANKED PLAYERS // REGION: MENA</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setShowFeaturedModal(true)}>
                    Apply For Status
                  </Button>
                </div>
                
                {loadingGamers ? (
                  <div className="text-slate-500 text-sm font-mono">LOADING_PROFILE_DATA...</div>
                ) : (
                  <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x perspective-1000">
                    {topGamers.map(gamer => (
                      <div key={gamer.id} className="snap-start">
                         <GamerProfileCard gamer={gamer} />
                      </div>
                    ))}
                  </div>
                )}
             </section>

            {/* Featured Hero */}
            {games.length > 0 && <FeaturedGame game={games[0]} />}

            {/* Game of the Week */}
            {games.length > 1 && (
               <section className="relative overflow-hidden bg-[#121212] border border-white/5 group rounded-[2.5rem]">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                     <div className="relative h-64 lg:h-auto min-h-[400px] overflow-hidden">
                        <img 
                          src={games[1].imageUrl} 
                          alt={games[1].title} 
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                          loading="lazy"
                          decoding="async"
                        />
                         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none opacity-20"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#121212] z-10"></div>
                        
                        <div className="absolute top-6 left-6 z-20">
                           <div className="flex items-center gap-2 bg-white text-black px-4 py-2 font-black font-display uppercase tracking-wider text-xs rounded-full shadow-[0_0_15px_#ffffff]">
                              <Trophy className="w-4 h-4" /> HIGHLIGHT
                           </div>
                        </div>
                     </div>
                     
                     <div className="p-8 lg:p-16 flex flex-col justify-center relative z-20">
                        {/* Decorative background number */}
                        <div className="absolute top-4 right-4 text-[120px] font-black text-white/5 font-display leading-none select-none pointer-events-none">
                            01
                        </div>
                        
                        <div className="flex items-center gap-3 mb-6">
                           <span className="text-[#38BDF8] font-bold tracking-widest text-xs uppercase bg-[#38BDF8]/10 border border-[#38BDF8]/30 px-4 py-1.5 rounded-full font-display">{games[1].studio}</span>
                           <span className="text-slate-400 font-bold tracking-widest text-xs uppercase border border-slate-700 px-4 py-1.5 rounded-full font-display">{games[1].genre}</span>
                        </div>
                        
                        <h2 className="text-4xl lg:text-6xl font-display font-black text-white mb-6 leading-[0.9] tracking-tight uppercase">
                           {games[1].title}
                        </h2>
                        
                        <p className="text-slate-300 text-base lg:text-lg leading-relaxed mb-10 max-w-md line-clamp-3 font-sans border-l-2 border-[#38BDF8] pl-6 font-medium">
                           {games[1].description}
                        </p>
                        
                        <div className="flex flex-wrap gap-4">
                           <Button onClick={() => window.open(games[1].officialLink, '_blank')} className="min-w-[150px] rounded-full font-display">
                              INITIATE
                           </Button>
                           <Button variant="outline" onClick={() => toggleFavorite(games[1].id)} className="min-w-[150px] rounded-full font-display">
                              {favorites.includes(games[1].id) ? <Heart className="w-4 h-4 fill-current" /> : <Heart className="w-4 h-4" />} 
                              <span className="ml-2">{favorites.includes(games[1].id) ? 'SAVED' : 'SAVE'}</span>
                           </Button>
                        </div>
                     </div>
                  </div>
               </section>
            )}

            {/* Trending */}
            <TrendingGames 
              games={games.slice(2, 17)} 
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onStudioClick={handleStudioClick}
              onViewAll={() => setView('directory')}
            />

             {/* News & Events Grid */}
             <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* News */}
                <div className="bg-[#121212] border border-white/5 p-10 rounded-[2.5rem] relative overflow-hidden">
                   <div className="flex items-center justify-between mb-10">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white">
                           <Zap className="w-6 h-6 fill-current" />
                         </div>
                         <div>
                            <h2 className="text-3xl font-display font-black text-white uppercase tracking-tight">Data <span className="text-slate-500">Feed</span></h2>
                            <p className="text-[10px] text-slate-500 font-mono tracking-widest">LIVE TRANSMISSIONS</p>
                         </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setView('news')}>FULL LOGS</Button>
                   </div>
                   <div className="space-y-6">
                      {loadingNews ? <p className="text-white font-mono animate-pulse">DECRYPTING_SIGNAL...</p> : news.slice(0, 3).map(item => (
                        <div key={item.id} className="group cursor-pointer flex gap-5 items-start hover:bg-white/5 p-3 rounded-2xl transition-colors border border-transparent hover:border-white/5" onClick={() => window.open(item.url || '#', '_blank')}>
                           <div className="w-24 h-20 bg-black overflow-hidden rounded-xl border border-white/5 flex-shrink-0 relative">
                             <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100" alt="news" loading="lazy" decoding="async" />
                           </div>
                           <div>
                             <h4 className="text-white font-bold text-sm md:text-base leading-snug mb-2 group-hover:text-[#38BDF8] transition-colors line-clamp-2 uppercase font-display">{item.headline}</h4>
                             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">{item.source} // {item.date}</span>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>

                {/* Events */}
                <div className="bg-[#121212] border border-white/5 p-10 rounded-[2.5rem] relative overflow-hidden">
                   <div className="flex items-center justify-between mb-10">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-[#38BDF8]/10 border border-[#38BDF8]/20 rounded-full flex items-center justify-center text-[#38BDF8]">
                           <CalendarIcon className="w-6 h-6" />
                         </div>
                         <div>
                            <h2 className="text-3xl font-display font-black text-white uppercase tracking-tight">Mission <span className="text-[#38BDF8]">Ops</span></h2>
                            <p className="text-[10px] text-[#38BDF8]/60 font-mono tracking-widest">SCHEDULED DEPLOYMENTS</p>
                         </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setView('events')}>CALENDAR</Button>
                   </div>
                   <div className="space-y-4">
                     {loadingEvents ? <p className="text-[#38BDF8] font-mono animate-pulse">SYNCING_OPERATIONS...</p> : events.slice(0, 4).map((event, idx) => (
                        <div key={event.id} className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-2xl hover:bg-[#38BDF8]/5 transition-colors border border-white/5 hover:border-[#38BDF8]/20">
                           <div className="flex items-center gap-4">
                             <div className="text-center bg-[#38BDF8]/10 p-2 min-w-[4rem] rounded-xl border border-[#38BDF8]/20">
                                <span className="block text-[10px] font-bold text-[#38BDF8] uppercase font-mono">{event.date.split(' ')[0]}</span>
                                <span className="block text-xl font-black text-white font-display">{event.date.split(' ')[1] || 'TBA'}</span>
                             </div>
                             <div>
                                <h4 className="text-white font-bold text-sm md:text-base line-clamp-1 uppercase tracking-wide">{event.name}</h4>
                                <span className="text-[10px] text-slate-500 font-mono uppercase">{event.location || 'ONLINE_SERVER'}</span>
                             </div>
                           </div>
                           <span className={`hidden sm:inline-block text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider font-mono border
                             ${event.type === 'tournament' ? 'bg-[#38BDF8]/10 text-[#38BDF8] border-[#38BDF8]/30' : 'bg-white/10 text-white border-white/30'}
                           `}>
                              {event.type}
                           </span>
                        </div>
                     ))}
                   </div>
                </div>
             </section>
          </div>
        )}

        {/* SHORTS VIEW */}
        {view === 'shorts' && (
           <ShortsFeed 
             videos={shortVideos} 
             onUploadClick={() => setShowUploadShortModal(true)} 
           />
        )}

        {/* DIRECTORY VIEW */}
        {view === 'directory' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-500">
             <div className="bg-[#121212] border border-white/5 p-12 rounded-[2.5rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5">
                    <Gamepad2 className="w-96 h-96 text-white" />
                </div>
                
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
                   <div>
                      <h2 className="text-5xl font-display font-black text-white mb-2 uppercase tracking-tighter">Game <span className="text-[#38BDF8]">Library</span></h2>
                      <p className="text-slate-500 font-mono text-xs tracking-widest">ACCESSING MAINFRAME DATABASE...</p>
                   </div>
                   
                   <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                      <div className="relative w-full md:w-96 group">
                          <input 
                            type="text" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="SEARCH_DATABASE..." 
                            className="w-full bg-[#0a0a0a] border border-white/10 pl-6 pr-12 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-[#38BDF8] transition-all font-mono text-sm rounded-full"
                          />
                          <Search className="absolute right-6 top-4 w-5 h-5 text-white/40 pointer-events-none group-focus-within:text-[#38BDF8]" />
                      </div>
                      <Button variant="primary" onClick={() => setShowSubmitGameModal(true)} className="h-[52px] rounded-full">UPLOAD_GAME</Button>
                   </div>
                </div>
                
                <div className="flex flex-wrap items-center justify-between gap-4 pt-8 mt-8 border-t border-white/5 relative z-10">
                   <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                      {['All', 'Battle Royale', 'FPS', 'MOBA', 'Strategy', 'Sports'].map(genre => (
                         <button
                           key={genre}
                           onClick={() => setSelectedGenre(genre)}
                           className={`px-6 py-2 text-xs font-bold uppercase tracking-wider transition-all border font-mono rounded-full ${
                              selectedGenre === genre 
                                ? 'bg-white text-black border-white shadow-lg' 
                                : 'bg-transparent text-white/60 border-white/10 hover:border-white hover:text-white'
                           }`}
                         >
                            {genre}
                         </button>
                      ))}
                   </div>
                   <div className="text-[#38BDF8] font-bold text-xs font-mono">
                      {filteredGames.length} RECORDS FOUND
                   </div>
                </div>
             </div>
             
             {loadingGames ? (
                <div className="text-center py-20 text-white font-mono animate-pulse">RETRIEVING_DATA...</div>
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

        {/* SHOP VIEW */}
        {view === 'shop' && (
           <div className="animate-in fade-in duration-500 space-y-12">
               <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
                   <div>
                       <h2 className="text-4xl font-display font-black text-white mb-2 uppercase tracking-tighter">Armory <span className="text-[#38BDF8]">& Gear</span></h2>
                       <p className="text-slate-500 font-mono text-xs tracking-widest">UPGRADE YOUR LOADOUT</p>
                   </div>
                   <Button variant="secondary" className="hidden sm:flex items-center gap-2 rounded-full">
                       <ShoppingBag className="w-4 h-4" /> INVENTORY
                   </Button>
               </div>
               
               {loadingMerch ? (
                   <div className="text-center py-20 text-[#38BDF8] font-mono animate-pulse">SCANNING_INVENTORY...</div>
               ) : (
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                       {merchItems.map(item => (
                           <MerchCard key={item.id} item={item} />
                       ))}
                   </div>
               )}
           </div>
        )}

        {/* FAVORITES VIEW */}
        {view === 'favorites' && (
          <div className="space-y-12">
             <div className="flex items-center gap-6 mb-8 border-b border-[#38BDF8]/20 pb-8">
                <div className="p-4 bg-[#38BDF8]/10 border border-[#38BDF8]/50 rounded-full shadow-[0_0_20px_rgba(56,189,248,0.2)]">
                  <Heart className="w-10 h-10 text-[#38BDF8]" />
                </div>
                <div>
                  <h2 className="text-4xl font-display font-black text-white uppercase tracking-tighter">Saved <span className="text-[#38BDF8]">Collection</span></h2>
                  <p className="text-[#38BDF8]/60 font-mono text-xs tracking-widest">USER_ARCHIVES</p>
                </div>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
               {favoriteGamesList.length > 0 ? favoriteGamesList.map(game => (
                 <GameCard 
                    key={game.id} 
                    game={game} 
                    isFavorite={true}
                    onToggleFavorite={toggleFavorite}
                    onStudioClick={handleStudioClick}
                 />
               )) : (
                 <div className="col-span-full py-20 text-center text-slate-500 font-mono border border-dashed border-slate-800 rounded-[2rem]">
                    ARCHIVE_EMPTY. DISCOVER_GAMES_TO_POPULATE.
                 </div>
               )}
             </div>
          </div>
        )}

        {/* NEWS VIEW */}
        {view === 'news' && (
           <div className="space-y-12">
              <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-6">
                 <div>
                    <h2 className="text-4xl font-display font-black text-white uppercase tracking-tighter">Global <span className="text-slate-500">Transmissions</span></h2>
                    <p className="text-slate-500 font-mono text-xs tracking-widest">REAL-TIME INTELLIGENCE</p>
                 </div>
                 <Button variant="outline" size="sm" onClick={() => setLoadingNews(true)} className="rounded-full">REFRESH_SIGNAL</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                 {loadingNews ? <div className="text-white col-span-full text-center py-20 font-mono animate-pulse">DOWNLOADING...</div> : news.map(item => (
                    <div key={item.id} className="group flex flex-col h-full bg-[#121212] border border-white/5 overflow-hidden hover:border-white/20 transition-colors relative rounded-[2rem]">
                       <div className="h-48 overflow-hidden bg-black relative">
                          <img src={item.imageUrl} alt={item.headline} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" loading="lazy" decoding="async" />
                          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>
                       </div>
                       <div className="p-6 flex flex-col flex-grow relative border-t border-white/5">
                          <div className="flex items-center justify-between mb-4 z-10">
                            <span className="text-[10px] text-[#38BDF8] uppercase tracking-widest font-bold font-mono">{item.source}</span>
                            <span className="text-[10px] text-slate-500 font-bold font-mono">{item.date}</span>
                          </div>
                          <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#38BDF8] transition-colors leading-tight z-10 font-display uppercase">{item.headline}</h3>
                          <p className="text-slate-400 text-xs leading-relaxed mb-4 line-clamp-3 flex-grow z-10 font-mono border-l-2 border-[#38BDF8] pl-3">{item.summary}</p>
                          <a href={item.url || '#'} target="_blank" rel="noopener noreferrer" className="mt-auto text-xs font-bold text-white hover:text-[#38BDF8] flex items-center gap-1 transition-colors z-10 uppercase tracking-widest font-mono group-hover:translate-x-1 duration-300">
                             READ_FULL_LOG <ArrowUpRight className="w-3 h-3" />
                          </a>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        )}

        {/* EVENTS VIEW (LIST) */}
        {view === 'events' && (
           <div className="space-y-12">
               <div className="flex justify-between items-center mb-8 border-b border-[#38BDF8]/20 pb-6">
                   <div>
                    <h2 className="text-4xl font-display font-black text-white uppercase tracking-tighter">Event <span className="text-[#38BDF8]">Horizon</span></h2>
                    <p className="text-[#38BDF8]/60 font-mono text-xs tracking-widest">TIMELINE</p>
                  </div>
                  <Button variant="outline" onClick={() => setView('calendar')} className="hidden sm:flex items-center gap-2 border-[#38BDF8] text-[#38BDF8] hover:bg-[#38BDF8]/10 rounded-full">
                    <CalendarIcon className="w-4 h-4" /> VIEW_CALENDAR
                  </Button>
               </div>
               <div className="space-y-4">
                  {loadingEvents ? <div className="text-[#38BDF8] col-span-full text-center py-20 font-mono animate-pulse">SYNCING...</div> : events.map(event => (
                     <div key={event.id} className="group grid grid-cols-12 gap-6 p-6 bg-[#121212] hover:bg-[#38BDF8]/5 border border-[#38BDF8]/20 transition-all hover:border-[#38BDF8] relative overflow-hidden rounded-[2rem]">
                        
                        <div className="col-span-12 md:col-span-2 flex flex-col justify-center text-center md:text-left border-r border-[#38BDF8]/10">
                           <span className="text-xs font-bold text-[#38BDF8] uppercase tracking-widest mb-1 font-mono">{event.date.split(' ')[0]}</span>
                           <span className="text-4xl font-display font-black text-white">{event.date.split(' ')[1] || 'TBA'}</span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex flex-col justify-center pl-4">
                           <div className="flex items-center gap-3 mb-2">
                             <h3 className="text-xl font-bold text-white group-hover:text-[#38BDF8] transition-colors uppercase tracking-tight">{event.name}</h3>
                             <span className="px-3 py-1 bg-[#38BDF8]/10 border border-[#38BDF8]/30 text-[9px] uppercase text-[#38BDF8] font-bold tracking-widest font-mono rounded-full">
                                {event.type}
                             </span>
                           </div>
                           <p className="text-slate-400 text-sm max-w-2xl font-mono">{event.description}</p>
                        </div>
                        <div className="col-span-12 md:col-span-3 flex items-center justify-start md:justify-end text-xs font-bold text-slate-500 font-mono uppercase tracking-widest">
                           LOC: {event.location || 'ONLINE'}
                        </div>
                     </div>
                  ))}
               </div>
           </div>
        )}
        
        {/* CALENDAR VIEW */}
        {view === 'calendar' && (
            <ReleaseCalendar events={events} />
        )}

      </main>

      {/* Footer */}
      <footer className="bg-[#050505] border-t border-white/5 py-24 mt-24 relative overflow-hidden">
        <div className="max-w-[1700px] mx-auto px-6 relative z-10">
           <div className="flex flex-col md:flex-row justify-between items-start gap-12">
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                   <Activity className="w-8 h-8 text-[#38BDF8]" />
                   <span className="font-display font-bold text-2xl text-white tracking-tight">UNREAL<span className="text-[#38BDF8]">.CLOUD</span></span>
                </div>
                <p className="text-slate-500 text-sm max-w-xs leading-relaxed font-mono">
                  NEXT_GEN FREE-TO-PLAY DISCOVERY PLATFORM.<br/>
                  SYSTEM STATUS: <span className="text-emerald-500">OPTIMAL</span>
                </p>
              </div>
              <div className="grid grid-cols-2 gap-16 text-sm font-mono uppercase tracking-widest">
                <div className="flex flex-col gap-4">
                  <span className="text-white font-bold mb-2">Navigation</span>
                  <a href="#" className="text-slate-500 hover:text-white transition-colors">Directory</a>
                  <a href="#" className="text-slate-500 hover:text-white transition-colors">Intel</a>
                  <a href="#" className="text-slate-500 hover:text-white transition-colors">Ops</a>
                </div>
                <div className="flex flex-col gap-4">
                  <span className="text-white font-bold mb-2">System</span>
                  <a href="#" className="text-slate-500 hover:text-white transition-colors">About</a>
                  <a href="#" className="text-slate-500 hover:text-white transition-colors">Privacy</a>
                  <a href="#" className="text-slate-500 hover:text-white transition-colors">Terms</a>
                </div>
              </div>
           </div>
           <div className="mt-20 pt-8 border-t border-white/5 text-slate-700 text-[10px] font-bold uppercase tracking-[0.2em] flex justify-between font-mono">
              <span>© 2024 UNREALGAMES.CLOUD // ALL RIGHTS RESERVED</span>
              <span>SYS.VER.2.4.0</span>
           </div>
        </div>
      </footer>

      <ChatWidget />
      
      <GetFeaturedModal 
        isOpen={showFeaturedModal} 
        onClose={() => setShowFeaturedModal(false)} 
      />

      <SubmitGameModal 
        isOpen={showSubmitGameModal}
        onClose={() => setShowSubmitGameModal(false)}
      />

      <UploadShortModal
         isOpen={showUploadShortModal}
         onClose={() => setShowUploadShortModal(false)}
         onUpload={handleShortUpload}
      />
    </div>
  );
};

export default App;