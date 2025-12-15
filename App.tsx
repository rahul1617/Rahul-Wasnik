import React, { useState, useEffect, useMemo } from 'react';
import { Game, NewsArticle, GamingEvent, ViewState, Review, GamerProfile, MerchItem } from './types';
import { fetchFeaturedGames, fetchNewsWithSearch, fetchGamingEvents, fetchGameReviews, fetchTopGamers, fetchMerchItems } from './services/geminiService';
import { Gamepad2, Newspaper, Calendar, LayoutGrid, Search, Menu, X, Trophy, MessageSquare, Filter, ArrowUpDown, Heart, Users, Star, PlusCircle, User, MessageCircle, MapPin, ShoppingBag } from 'lucide-react';
import GameCard from './components/GameCard';
import GamerProfileCard from './components/GamerProfileCard';
import TrendingGames from './components/TrendingGames';
import GetFeaturedModal from './components/GetFeaturedModal';
import SubmitGameModal from './components/SubmitGameModal';
import Button from './components/Button';
import ChatWidget from './components/ChatWidget';
import MerchCard from './components/MerchCard';

const LOGO_URL = "https://image.pollinations.ai/prompt/minimalist%20logo%20symbol%20two%20bold%20orange%20X%20shapes%20flanking%20a%20solid%20black%20circle%20XOX%20geometric%20vector%20art%20white%20background?width=128&height=128&nologo=true";

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showFeaturedModal, setShowFeaturedModal] = useState(false);
  const [showSubmitGameModal, setShowSubmitGameModal] = useState(false);
  
  // Data States
  const [games, setGames] = useState<Game[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [events, setEvents] = useState<GamingEvent[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [topGamers, setTopGamers] = useState<GamerProfile[]>([]);
  const [merchItems, setMerchItems] = useState<MerchItem[]>([]);
  
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

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [view]);

  // Initialization
  useEffect(() => {
    const initData = async () => {
      setLoadingGames(true);
      setLoadingNews(true);
      setLoadingEvents(true);
      setLoadingReviews(true);
      setLoadingGamers(true);
      setLoadingMerch(true);

      // Parallel fetching for performance
      fetchFeaturedGames().then(data => { setGames(data); setLoadingGames(false); });
      fetchNewsWithSearch().then(data => { setNews(data); setLoadingNews(false); });
      fetchGamingEvents().then(data => { setEvents(data); setLoadingEvents(false); });
      fetchGameReviews().then(data => { setReviews(data); setLoadingReviews(false); });
      fetchTopGamers().then(data => { setTopGamers(data); setLoadingGamers(false); });
      fetchMerchItems().then(data => { setMerchItems(data); setLoadingMerch(false); });
    };

    initData();
  }, []);

  // Persist Favorites
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

  // Derived Data for Filters
  const uniqueGenres = useMemo(() => {
    const genres = new Set(games.map(g => g.genre));
    return ['All', ...Array.from(genres).sort()];
  }, [games]);

  const uniquePlatforms = useMemo(() => {
    const platforms = new Set(games.flatMap(g => g.platform));
    return ['All', ...Array.from(platforms).sort()];
  }, [games]);

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

  const NavItem = ({ id, icon: Icon, label }: { id: ViewState; icon: any; label: string }) => (
    <button
      onClick={() => {
        setView(id);
        setMobileMenuOpen(false);
      }}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 w-full md:w-auto
        ${view === id 
          ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/50' 
          : 'text-slate-400 hover:text-white hover:bg-white/5'
        }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-display font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#050b14] flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 w-full border-b border-slate-800 bg-[#050b14]/80 backdrop-blur-xl">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <div className="flex-shrink-0 cursor-pointer flex items-center gap-3" onClick={() => setView('home')}>
              <img 
                src={LOGO_URL}
                alt="Unreal Games Logo" 
                className="h-10 md:h-12 w-auto object-contain rounded-lg" 
              />
              <span className="font-display font-bold text-xl md:text-2xl text-white hidden sm:block">
                unrealgames<span className="text-cyan-400">.cloud</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              <NavItem id="home" icon={LayoutGrid} label="Discover" />
              <NavItem id="directory" icon={Search} label="Directory" />
              <NavItem id="shop" icon={ShoppingBag} label="Shop" />
              <NavItem id="news" icon={Newspaper} label="News" />
              <NavItem id="events" icon={Calendar} label="Events" />
              <NavItem id="reviews" icon={MessageSquare} label="Reviews" />
              <NavItem id="favorites" icon={Heart} label="Favorites" />
            </div>

            {/* User Actions */}
            <div className="hidden md:flex items-center gap-4">
               <div className="h-6 w-px bg-slate-700"></div>
               <button className="text-slate-400 hover:text-white">
                 <Search className="w-5 h-5" />
               </button>
               <Button size="sm">Sign In</Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-400 hover:text-white p-2"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <NavItem id="home" icon={LayoutGrid} label="Discover" />
              <NavItem id="directory" icon={Search} label="Directory" />
              <NavItem id="shop" icon={ShoppingBag} label="Shop" />
              <NavItem id="favorites" icon={Heart} label="Favorites" />
              <NavItem id="news" icon={Newspaper} label="News" />
              <NavItem id="events" icon={Calendar} label="Events" />
              <NavItem id="reviews" icon={MessageSquare} label="Reviews" />
              <div className="pt-4 mt-4 border-t border-slate-800">
                <Button className="w-full">Sign In</Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* Loading Overlay */}
        {(loadingGames && view === 'home') && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#050b14] z-30">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-cyan-400 font-display animate-pulse">Initializing UnrealGames...</p>
            </div>
          </div>
        )}

        {/* HOME VIEW */}
        {view === 'home' && !loadingGames && (
          <div className="space-y-12">
            {/* Trending Games Component - Showing 15 items for wider grid */}
            <TrendingGames 
              games={games.slice(0, 15)} 
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onStudioClick={handleStudioClick}
              onViewAll={() => setView('directory')}
            />

             {/* Top Gamers Section */}
             <section>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-6 h-6 text-cyan-400" />
                    <h2 className="text-2xl font-display font-bold text-white">Global Gaming Icons</h2>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setShowFeaturedModal(true)}
                    className="flex items-center gap-2"
                  >
                    <Star className="w-4 h-4" /> Get Featured
                  </Button>
                </div>
                
                {loadingGamers ? (
                  <div className="text-slate-500">Loading profiles...</div>
                ) : (
                  <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                    {topGamers.map(gamer => (
                      <GamerProfileCard key={gamer.id} gamer={gamer} />
                    ))}
                  </div>
                )}
             </section>

             {/* News Snippets */}
             <section className="grid md:grid-cols-2 gap-8">
                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                   <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
                        <Newspaper className="w-5 h-5 text-purple-500" /> Latest News
                      </h2>
                      <Button variant="ghost" size="sm" onClick={() => setView('news')}>More</Button>
                   </div>
                   <div className="space-y-4">
                      {loadingNews ? <p className="text-slate-500">Loading feeds...</p> : news.slice(0, 3).map(item => (
                        <div key={item.id} className="flex gap-4 group cursor-pointer" onClick={() => window.open(item.url || '#', '_blank')}>
                           <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                             <img src={item.imageUrl} className="w-full h-full object-cover" alt="news" loading="lazy" decoding="async" />
                           </div>
                           <div>
                             <h4 className="text-white font-medium group-hover:text-cyan-400 transition-colors line-clamp-2">{item.headline}</h4>
                             <span className="text-xs text-slate-500 mt-1 block">{item.source} • {item.date}</span>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                   <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-yellow-500" /> Upcoming Events
                      </h2>
                      <Button variant="ghost" size="sm" onClick={() => setView('events')}>Calendar</Button>
                   </div>
                   <div className="space-y-4">
                     {loadingEvents ? <p className="text-slate-500">Syncing calendar...</p> : events.slice(0, 3).map(event => (
                        <div key={event.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors">
                           <div className="bg-slate-800 p-2 rounded text-center min-w-[3.5rem]">
                              <span className="block text-xs text-slate-400 uppercase">{event.date.split(' ')[0]}</span>
                              <span className="block text-lg font-bold text-white">{event.date.split(' ')[1] || 'TBA'}</span>
                           </div>
                           <div>
                             <h4 className="text-white font-bold">{event.name}</h4>
                             <p className="text-xs text-slate-400 mt-1">{event.type.toUpperCase()}</p>
                           </div>
                           {/* Location Highlight */}
                           <div className="flex items-center gap-2 text-sm font-medium text-slate-300 bg-slate-800/50 w-fit px-3 py-1.5 rounded-lg border border-slate-700/50 ml-auto">
                              <MapPin className="w-4 h-4 text-cyan-400" />
                              <span>{event.location || 'Online'}</span>
                           </div>
                        </div>
                     ))}
                   </div>
                </div>
             </section>
          </div>
        )}

        {/* SHOP VIEW */}
        {view === 'shop' && (
           <div className="space-y-8 animate-in fade-in duration-500">
               <div className="flex items-center justify-between">
                   <div>
                       <h2 className="text-4xl font-display font-bold text-white mb-2">Pro Gear Shop</h2>
                       <p className="text-slate-400">Upgrade your setup with top-tier equipment chosen by pros.</p>
                   </div>
                   <Button variant="secondary" className="hidden sm:flex items-center gap-2">
                       <ShoppingBag className="w-4 h-4" /> View Cart
                   </Button>
               </div>
               
               {loadingMerch ? (
                   <div className="text-center py-20 text-slate-500">Loading inventory...</div>
               ) : (
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                       {merchItems.map(item => (
                           <MerchCard key={item.id} item={item} />
                       ))}
                   </div>
               )}
           </div>
        )}

        {/* DIRECTORY VIEW */}
        {view === 'directory' && (
          <div className="space-y-6">
             <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                   <div className="flex items-center gap-4">
                     <h2 className="text-2xl font-display font-bold text-white">Game Directory</h2>
                     <Button variant="outline" size="sm" onClick={() => setShowSubmitGameModal(true)} className="flex items-center gap-2">
                        <PlusCircle className="w-4 h-4" /> Submit Game
                     </Button>
                   </div>
                   <div className="relative w-full md:w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search games..." 
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                   </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
                   {/* Genre Filter */}
                   <div className="space-y-1">
                      <label className="text-xs text-slate-400 uppercase font-bold tracking-wider flex items-center gap-1">
                        <Filter className="w-3 h-3" /> Genre
                      </label>
                      <select 
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                      >
                         {uniqueGenres.map(g => <option key={g} value={g}>{g}</option>)}
                      </select>
                   </div>

                   {/* Platform Filter */}
                   <div className="space-y-1">
                      <label className="text-xs text-slate-400 uppercase font-bold tracking-wider flex items-center gap-1">
                         <Filter className="w-3 h-3" /> Platform
                      </label>
                      <select 
                        value={selectedPlatform}
                        onChange={(e) => setSelectedPlatform(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                      >
                         {uniquePlatforms.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                   </div>

                   {/* Sort */}
                   <div className="space-y-1">
                      <label className="text-xs text-slate-400 uppercase font-bold tracking-wider flex items-center gap-1">
                         <ArrowUpDown className="w-3 h-3" /> Sort By
                      </label>
                      <select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                      >
                         <option value="rating">Highest Rating</option>
                         <option value="name">Name (A-Z)</option>
                         <option value="newest">Newest Releases</option>
                      </select>
                   </div>

                   {/* Results Count */}
                   <div className="flex items-end justify-end">
                      <div className="text-slate-400 text-sm pb-2">
                         Showing <span className="text-cyan-400 font-bold">{filteredGames.length}</span> games
                      </div>
                   </div>
                </div>
             </div>
             
             {loadingGames ? (
                <div className="text-center py-20 text-slate-500">Loading directory...</div>
             ) : (
               <>
                 {filteredGames.length > 0 ? (
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
                 ) : (
                   <div className="text-center py-20 text-slate-500">
                     No games found matching your criteria.
                   </div>
                 )}
               </>
             )}
          </div>
        )}

        {/* FAVORITES VIEW */}
        {view === 'favorites' && (
          <div className="space-y-6">
             <div className="flex items-center gap-4 mb-8">
                <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800">
                   <Heart className="w-8 h-8 text-red-500 fill-red-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-display font-bold text-white">Your Favorites</h2>
                  <p className="text-slate-400">Games you've marked as top tier.</p>
                </div>
             </div>

             {loadingGames ? (
                <div className="text-center py-20 text-slate-500">Loading your collection...</div>
             ) : (
               <>
                 {favoriteGamesList.length > 0 ? (
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                     {favoriteGamesList.map(game => (
                       <GameCard 
                          key={game.id} 
                          game={game} 
                          isFavorite={true}
                          onToggleFavorite={toggleFavorite}
                          onStudioClick={handleStudioClick}
                       />
                     ))}
                   </div>
                 ) : (
                   <div className="text-center py-20 border border-dashed border-slate-800 rounded-3xl bg-slate-900/30">
                     <Heart className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                     <h3 className="text-xl font-bold text-white mb-2">No Favorites Yet</h3>
                     <p className="text-slate-400 mb-6">Start building your collection by browsing the directory.</p>
                     <Button onClick={() => setView('directory')}>Browse Games</Button>
                   </div>
                 )}
               </>
             )}
          </div>
        )}

        {/* NEWS VIEW */}
        {view === 'news' && (
           <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-4xl font-display font-bold text-white">Gaming News & Updates</h2>
                <div className="flex gap-2">
                   <Button variant="ghost" size="sm" className="hidden sm:flex">Top Stories</Button>
                   <Button variant="outline" size="sm" onClick={() => setLoadingNews(true)}>Refresh</Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                 {loadingNews ? <div className="text-white col-span-full text-center py-20">Gathering intel...</div> : news.map(item => (
                    <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all group flex flex-col h-full">
                       <div className="h-48 overflow-hidden relative">
                          <img src={item.imageUrl} alt={item.headline} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
                          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-white font-bold uppercase tracking-wider">
                             {item.source}
                          </div>
                       </div>
                       <div className="p-6 flex flex-col flex-grow">
                          <span className="text-xs text-slate-500 mb-2">{item.date}</span>
                          <h3 className="text-lg font-bold text-white mb-3 group-hover:text-purple-400 transition-colors line-clamp-2">{item.headline}</h3>
                          <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">{item.summary}</p>
                          <a href={item.url || '#'} target="_blank" rel="noopener noreferrer" className="mt-auto text-sm font-medium text-white hover:text-purple-400 flex items-center gap-1 transition-all">
                             Read Full Story <ArrowUpDown className="w-3 h-3 rotate-[-90deg]" />
                          </a>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        )}

        {/* EVENTS VIEW */}
        {view === 'events' && (
           <div className="space-y-8 animate-in fade-in duration-500">
               <h2 className="text-4xl font-display font-bold text-white">Global Event Calendar</h2>
               <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {loadingEvents ? <div className="text-white col-span-full text-center py-20">Syncing calendar...</div> : events.map(event => (
                     <div key={event.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex gap-6 items-start hover:bg-slate-800/80 hover:border-slate-700 transition-colors group">
                        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-4 text-center min-w-[100px] flex-shrink-0 shadow-lg group-hover:shadow-blue-500/20 transition-all">
                           <span className="block text-3xl font-display font-bold text-white">{event.date.split(' ')[0] || '??'}</span>
                           <span className="block text-sm text-white/80 uppercase tracking-wider">{event.date.split(' ')[1] || 'DATE'}</span>
                        </div>
                        <div className="flex-grow">
                           <div className="flex items-center justify-between mb-2">
                             <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider
                               ${event.type === 'tournament' ? 'bg-yellow-500/20 text-yellow-400' : 
                                 event.type === 'release' ? 'bg-green-500/20 text-green-400' : 
                                 'bg-slate-700 text-slate-300'}`}>
                                {event.type}
                             </span>
                             <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-full"><PlusCircle className="w-4 h-4" /></Button>
                           </div>
                           <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{event.name}</h3>
                           <p className="text-slate-400 text-sm line-clamp-2 mb-4">{event.description}</p>
                           
                           {/* Location Highlight */}
                           <div className="flex items-center gap-2 text-sm font-medium text-slate-300 bg-slate-800/50 w-fit px-3 py-1.5 rounded-lg border border-slate-700/50">
                              <MapPin className="w-4 h-4 text-cyan-400" />
                              <span>{event.location || 'Online'}</span>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
           </div>
        )}

        {/* REVIEWS VIEW */}
        {view === 'reviews' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <h2 className="text-4xl font-display font-bold text-white">Pro Gamer Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {loadingReviews ? <div className="text-white col-span-full text-center py-20">Analyzing meta...</div> : reviews.map((review) => (
                    <div key={review.id} className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex flex-col h-full hover:border-cyan-500/30 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                                   <User className="w-5 h-5 text-slate-400" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-white leading-tight">{review.gameTitle}</h3>
                                    <p className="text-xs text-cyan-400 font-medium">{review.reviewerName}</p>
                                </div>
                            </div>
                            <div className="bg-slate-800 px-2 py-1 rounded-lg flex items-center gap-1 border border-slate-700">
                                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                <span className="text-white font-bold text-sm">{review.rating}</span>
                            </div>
                        </div>
                        <div className="relative flex-grow">
                           <MessageCircle className="absolute -top-1 -left-1 w-4 h-4 text-slate-700 opacity-50" />
                           <p className="text-slate-300 text-sm italic leading-relaxed pl-4 border-l-2 border-slate-800">
                             "{review.content}"
                           </p>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-[#02060a] border-t border-slate-800 py-12">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src={LOGO_URL} 
                    alt="Unreal Games Logo" 
                    className="h-10 object-contain rounded-lg" 
                  />
                  <span className="font-display font-bold text-xl text-white">
                    unrealgames<span className="text-cyan-400">.cloud</span>
                  </span>
                </div>
                <p className="text-slate-500 text-sm">The unified home for free-to-play gaming.</p>
              </div>
              <div className="flex gap-8 text-sm text-slate-400">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Partners</a>
                <a href="#" className="hover:text-white transition-colors">Contact</a>
              </div>
              <div className="text-slate-600 text-sm">
                © 2024 unrealgames.cloud. Powered by Gemini.
              </div>
           </div>
        </div>
      </footer>

      {/* AI Assistant */}
      <ChatWidget />
      
      {/* Featured Gamer Application Modal */}
      <GetFeaturedModal 
        isOpen={showFeaturedModal} 
        onClose={() => setShowFeaturedModal(false)} 
      />

      {/* Submit Game Modal */}
      <SubmitGameModal 
        isOpen={showSubmitGameModal}
        onClose={() => setShowSubmitGameModal(false)}
      />
    </div>
  );
};

export default App;