import { GoogleGenAI, Type } from "@google/genai";
import { Game, NewsArticle, GamingEvent, Review, GamerProfile, MerchItem } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Comprehensive List of Free Games
// Steam IDs added where available to fetch real box art/capsule images.
const REAL_GAMES_DATA: Game[] = [
    // --- MENA TOP HITS ---
    {
        id: 'pubg-mobile',
        title: 'PUBG MOBILE',
        studio: 'LightSpeed & Quantum',
        publisher: 'Level Infinite',
        genre: 'Battle Royale',
        platform: ['Mobile'],
        description: 'The original Battle Royale on mobile. Extreme battles, 10-minute matches, and massive events. The #1 choice in the Middle East.',
        rating: 4.9,
        officialLink: 'https://www.pubgmobile.com/en-US',
        isNewRelease: false,
        imageUrl: 'https://image.pollinations.ai/prompt/pubg%20mobile%20gameplay%20action%20screenshot%20desert%20map%20miramar%20realistic%20graphics%208k%20cinematic%20lighting?width=1280&height=720&nologo=true&seed=pubgm',
        trailerVideoId: '0y_1_k2_c6I',
        tags: ['Shooter', 'Battle Royale', 'Multiplayer', 'Survival', 'Mobile']
    },
    {
        id: 'ea-fc-mobile',
        title: 'EA SPORTS FC™ Mobile',
        studio: 'EA Mobile',
        publisher: 'EA Sports',
        genre: 'Sports',
        platform: ['Mobile'],
        description: 'Build your Ultimate Team™ with stars like Vini Jr. and Haaland. The world\'s game, in your pocket.',
        rating: 4.8,
        officialLink: 'https://www.ea.com/games/fifa/fifa-mobile',
        isNewRelease: true,
        imageUrl: 'https://image.pollinations.ai/prompt/ea%20fc%20mobile%20soccer%20match%20stadium%20floodlights%20hyperrealistic%20grass%204k%20action%20shot?width=1280&height=720&nologo=true&seed=eafc',
        trailerVideoId: 'Iq9D2QjW3_U',
        tags: ['Football', 'Sports', 'Multiplayer', 'Competitive', 'Simulation']
    },
    {
        id: 'free-fire',
        title: 'Free Fire',
        studio: '111dots Studio',
        publisher: 'Garena',
        genre: 'Battle Royale',
        platform: ['Mobile'],
        description: 'Survival shooter available on mobile. Each 10-minute game places you on a remote island where you are pit against 49 other players.',
        rating: 4.7,
        officialLink: 'https://ff.garena.com/',
        isNewRelease: false,
        imageUrl: 'https://image.pollinations.ai/prompt/free%20fire%20battle%20royale%20character%20tactical%20gear%20dynamic%20pose%20explosions%20background%20digital%20art%20masterpiece%208k?width=1280&height=720&nologo=true&seed=freefire',
        trailerVideoId: 'u4Z_gC7zJ34',
        tags: ['Shooter', 'Survival', 'Battle Royale', 'Action', 'Mobile']
    },
    // --- GLOBAL HITS ---
    {
        id: 'fortnite',
        title: 'Fortnite',
        studio: 'Epic Games',
        publisher: 'Epic Games',
        genre: 'Battle Royale',
        platform: ['PC', 'Console', 'Mobile'],
        description: 'Drop into a vast, destructible world. Middle East servers available for low latency action.',
        rating: 4.8,
        officialLink: 'https://www.fortnite.com',
        isNewRelease: false,
        imageUrl: 'https://image.pollinations.ai/prompt/fortnite%20battle%20bus%20sky%20sunset%20vibrant%20colors%20stylized%203d%20render%20unreal%20engine%205%208k?width=1280&height=720&nologo=true&seed=fortnite_neon',
        trailerVideoId: 'WJW-VvmRKsE',
        tags: ['Shooter', 'Building', 'Multiplayer', 'Event', 'Cross-Platform']
    },
    {
        id: 'gta-v',
        title: 'Grand Theft Auto V',
        studio: 'Rockstar North',
        publisher: 'Rockstar Games',
        genre: 'Open World',
        platform: ['PC', 'Console'],
        description: 'Experience the entangled lives of Michael, Franklin and Trevor in the sprawling city of Los Santos.',
        rating: 4.9,
        officialLink: 'https://www.rockstargames.com/gta-v',
        isNewRelease: false,
        steamId: '271590',
        trailerVideoId: 'QkkoHAzjnUs',
        tags: ['Action', 'Multiplayer', 'Crime', 'Third-Person', 'Racing']
    },
    {
        id: 'roblox',
        title: 'Roblox',
        studio: 'Roblox Corporation',
        publisher: 'Roblox Corporation',
        genre: 'Sandbox',
        platform: ['PC', 'Mobile', 'Console'],
        description: 'The ultimate virtual universe that lets you create, share experiences, and be anything.',
        rating: 4.5,
        officialLink: 'https://www.roblox.com',
        isNewRelease: false,
        imageUrl: 'https://image.pollinations.ai/prompt/roblox%20avatar%20in%20futuristic%20neon%20city%20high%20quality%203d%20render%20ambient%20occlusion%20bright%20colors?width=1280&height=720&nologo=true&seed=roblox_meta',
        trailerVideoId: 'eAvXhNlO-rA',
        tags: ['Creation', 'Social', 'Multiplayer', 'Casual', 'Adventure']
    },
    {
        id: 'minecraft-classic',
        title: 'Minecraft Classic',
        studio: 'Mojang',
        publisher: 'Xbox Game Studios',
        genre: 'Sandbox',
        platform: ['Web'],
        description: 'Play the classic version of Minecraft in your browser for free.',
        rating: 4.5,
        officialLink: 'https://classic.minecraft.net/',
        isNewRelease: false,
        imageUrl: 'https://image.pollinations.ai/prompt/minecraft%20landscape%20with%20rtx%20shaders%20ray%20tracing%20sunset%20reflection%20on%20water%20photorealistic%20textures?width=1280&height=720&nologo=true&seed=mc_rtx',
        trailerVideoId: 'MmB9b5njVbA',
        tags: ['Survival', 'Building', 'Retro', 'Browser', 'Crafting']
    },
    {
        id: 'league-of-legends',
        title: 'League of Legends',
        studio: 'Riot Games',
        publisher: 'Riot Games',
        genre: 'MOBA',
        platform: ['PC'],
        description: 'Team-based strategy game where two teams of five powerful champions face off.',
        rating: 4.9,
        officialLink: 'https://www.leagueoflegends.com',
        isNewRelease: false,
        imageUrl: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg', 
        trailerVideoId: 'mDYqT0_9VR4',
        tags: ['Strategy', 'Competitive', 'Team', 'Esports', 'Fantasy']
    },
    {
        id: 'valorant',
        title: 'Valorant',
        studio: 'Riot Games',
        publisher: 'Riot Games',
        genre: 'Tactical FPS',
        platform: ['PC'],
        description: 'A 5v5 character-based tactical shooter where precise gunplay meets unique agent abilities.',
        rating: 4.5,
        officialLink: 'https://playvalorant.com',
        isNewRelease: false,
        imageUrl: 'https://image.pollinations.ai/prompt/valorant%20jett%20using%20abilities%20anime%20style%203d%20render%20dynamic%20lighting%20action%20freeze%20frame%204k?width=1280&height=720&nologo=true&seed=val_glitch',
        trailerVideoId: 'e_E9W2vsRbQ',
        tags: ['FPS', 'Shooter', 'Competitive', 'Hero Shooter', 'Team']
    },
    {
        id: 'cs2',
        title: 'Counter-Strike 2',
        studio: 'Valve',
        publisher: 'Valve',
        genre: 'FPS',
        platform: ['PC'],
        description: 'The largest technical leap forward in Counter-Strike history.',
        rating: 4.8,
        officialLink: 'https://www.counter-strike.net',
        isNewRelease: true,
        steamId: '730',
        trailerVideoId: 'nSE38hvdZEk',
        tags: ['Shooter', 'Competitive', 'Tactical', 'Multiplayer', 'Action']
    },
    {
        id: 'warframe',
        title: 'Warframe',
        studio: 'Digital Extremes',
        publisher: 'Digital Extremes',
        genre: 'Action RPG',
        platform: ['PC', 'Console'],
        description: 'Awaken as an unstoppable warrior and battle alongside your friends in this story-driven free-to-play online action game.',
        rating: 4.7,
        officialLink: 'https://www.warframe.com',
        isNewRelease: false,
        steamId: '230410',
        trailerVideoId: 'Qk-c23tY4nI',
        tags: ['Sci-Fi', 'Co-op', 'Looter Shooter', 'Ninja', 'Space']
    },
    {
        id: 'destiny-2',
        title: 'Destiny 2',
        studio: 'Bungie',
        publisher: 'Bungie',
        genre: 'MMO FPS',
        platform: ['PC', 'Console'],
        description: 'Dive into the world of Destiny 2 to explore the mysteries of the solar system and experience responsive first-person shooter combat.',
        rating: 4.6,
        officialLink: 'https://www.bungie.net/7',
        isNewRelease: false,
        steamId: '1085660',
        trailerVideoId: 'D8Hq1b7kZqM',
        tags: ['Sci-Fi', 'Looter Shooter', 'Multiplayer', 'Story', 'Space']
    },
    {
        id: 'path-of-exile',
        title: 'Path of Exile',
        studio: 'Grinding Gear Games',
        publisher: 'Grinding Gear Games',
        genre: 'Action RPG',
        platform: ['PC', 'Console'],
        description: 'You are an Exile, struggling to survive on the dark continent of Wraeclast, as you fight to earn power that will allow you to exact your revenge.',
        rating: 4.8,
        officialLink: 'https://www.pathofexile.com',
        isNewRelease: false,
        steamId: '238960',
        trailerVideoId: 'YI2R38iO9y4',
        tags: ['Hack and Slash', 'Dungeon Crawler', 'Dark Fantasy', 'Loot', 'Hardcore']
    },
    {
        id: 'genshin-impact',
        title: 'Genshin Impact',
        studio: 'HoYoverse',
        publisher: 'HoYoverse',
        genre: 'Action RPG',
        platform: ['PC', 'Console', 'Mobile'],
        description: 'Step into Teyvat, a vast world teeming with life and flowing with elemental energy.',
        rating: 4.8,
        officialLink: 'https://genshin.hoyoverse.com',
        isNewRelease: false,
        imageUrl: 'https://image.pollinations.ai/prompt/genshin%20impact%20open%20world%20landscape%20anime%20art%20style%20lush%20greenery%20cel%20shaded%208k%20wallpaper?width=1280&height=720&nologo=true&seed=genshin_night',
        trailerVideoId: 'TAlKhARUcoY',
        tags: ['Open World', 'Anime', 'Adventure', 'Gacha', 'Singleplayer']
    },
    {
        id: 'cod-mobile',
        title: 'Call of Duty: Mobile',
        studio: 'TiMi Studio Group',
        publisher: 'Activision',
        genre: 'FPS',
        platform: ['Mobile'],
        description: 'Console quality HD gaming on your phone with customizable controls, voice and text chat, and thrilling 3D graphics.',
        rating: 4.6,
        officialLink: 'https://www.callofduty.com/mobile',
        isNewRelease: false,
        imageUrl: 'https://image.pollinations.ai/prompt/call%20of%20duty%20mobile%20soldier%20military%20gear%20tactical%20close%20up%20depth%20of%20field%20photorealistic%208k%20unreal%20engine?width=1280&height=720&nologo=true&seed=cod_neon',
        trailerVideoId: '7h33d3_tZ7c',
        tags: ['Shooter', 'Battle Royale', 'Multiplayer', 'Action', 'Zombies']
    },
    {
        id: 'cod-warzone',
        title: 'Call of Duty: Warzone',
        studio: 'Raven Software',
        publisher: 'Activision',
        genre: 'Battle Royale',
        platform: ['PC', 'Console'],
        description: 'Massive combat arena featuring Battle Royale and Plunder modes.',
        rating: 4.6,
        officialLink: 'https://www.callofduty.com/warzone',
        isNewRelease: false,
        steamId: '1962660',
        trailerVideoId: 'S5q1F9c9v60',
        tags: ['FPS', 'Shooter', 'Multiplayer', 'Military', 'Action']
    },
    {
        id: 'apex-legends',
        title: 'Apex Legends',
        studio: 'Respawn Entertainment',
        publisher: 'Electronic Arts',
        genre: 'Battle Royale',
        platform: ['PC', 'Console'],
        description: 'Master a growing roster of legendary characters with powerful abilities.',
        rating: 4.7,
        officialLink: 'https://www.ea.com/games/apex-legends',
        isNewRelease: false,
        steamId: '1172470',
        trailerVideoId: 'G1D_k8x75f4',
        tags: ['FPS', 'Sci-Fi', 'Hero Shooter', 'Team', 'Fast-Paced']
    },
    {
        id: 'rocket-league',
        title: 'Rocket League',
        studio: 'Psyonix',
        publisher: 'Epic Games',
        genre: 'Sports',
        platform: ['PC', 'Console'],
        description: 'A high-powered hybrid of arcade-style soccer and vehicular mayhem.',
        rating: 4.6,
        officialLink: 'https://www.rocketleague.com',
        isNewRelease: false,
        steamId: '252950',
        trailerVideoId: 'SgSX3gOrj60',
        tags: ['Racing', 'Football', 'Multiplayer', 'Competitive', 'Team']
    },
    {
        id: 'fall-guys',
        title: 'Fall Guys',
        studio: 'Mediatonic',
        publisher: 'Epic Games',
        genre: 'Platformer',
        platform: ['PC', 'Console'],
        description: 'Fall Guys is a free, cross-platform, massively multiplayer, party royale game where you and your fellow contestants compete through escalating rounds of absurd obstacle course chaos.',
        rating: 4.4,
        officialLink: 'https://www.fallguys.com',
        isNewRelease: false,
        imageUrl: 'https://image.pollinations.ai/prompt/fall%20guys%20obstacle%20course%20chaotic%20fun%20bright%20pastel%20colors%20high%20quality%203d%20render%204k?width=1280&height=720&nologo=true&seed=fall_guys_vapor',
        trailerVideoId: 'z6UrdUAZ7wM',
        tags: ['Battle Royale', 'Casual', 'Multiplayer', 'Funny', 'Family']
    },
    {
        id: 'overwatch-2',
        title: 'Overwatch 2',
        studio: 'Blizzard Team 4',
        publisher: 'Blizzard Entertainment',
        genre: 'Hero FPS',
        platform: ['PC', 'Console'],
        description: 'Team-based action game featuring a diverse cast of heroes.',
        rating: 4.4,
        officialLink: 'https://overwatch.blizzard.com',
        isNewRelease: false,
        steamId: '2357570',
        trailerVideoId: 'lgj3D5-jJ74',
        tags: ['Shooter', 'Team', 'Class-Based', 'Sci-Fi', 'Multiplayer']
    },
    {
        id: 'brawl-stars',
        title: 'Brawl Stars',
        studio: 'Supercell',
        publisher: 'Supercell',
        genre: 'Fighting / Action',
        platform: ['Mobile'],
        description: 'Fast-paced 3v3 multiplayer and battle royale for mobile.',
        rating: 4.6,
        officialLink: 'https://supercell.com/en/games/brawlstars',
        isNewRelease: false,
        imageUrl: 'https://image.pollinations.ai/prompt/brawl%20stars%20characters%20battling%203d%20cartoon%20style%20vibrant%20high%20saturation%20sharp%20focus%208k?width=1280&height=720&nologo=true&seed=brawl_neon',
        tags: ['MOBA', 'Battle Royale', 'Casual', 'Team', 'Cartoony']
    },
    {
        id: 'dota-2',
        title: 'Dota 2',
        studio: 'Valve',
        publisher: 'Valve',
        genre: 'MOBA',
        platform: ['PC'],
        description: 'The deepest multi-player action RTS game ever made.',
        rating: 4.7,
        officialLink: 'https://www.dota2.com',
        isNewRelease: false,
        steamId: '570',
        trailerVideoId: '-cSFPIwMEq4',
        tags: ['Strategy', 'Fantasy', 'Esports', 'Team', 'Hardcore']
    },
    {
        id: 'the-finals',
        title: 'The Finals',
        studio: 'Embark Studios',
        publisher: 'Embark Studios',
        genre: 'FPS',
        platform: ['PC', 'Console'],
        description: 'A combat-centered game show set in virtual arenas that you can alter, exploit, and destroy.',
        rating: 4.4,
        officialLink: 'https://www.reachthefinals.com',
        isNewRelease: true,
        steamId: '2073850',
        trailerVideoId: '2pY8lO9y0_4',
        tags: ['Shooter', 'Destruction', 'Team', 'Action', 'Parkour']
    },
    {
        id: 'marvel-snap',
        title: 'Marvel Snap',
        studio: 'Second Dinner',
        publisher: 'Nuverse',
        genre: 'Card Game',
        platform: ['PC', 'Mobile'],
        description: 'Unleash the entire Marvel Multiverse in this fast-paced, adrenaline-pumping strategic card battler.',
        rating: 4.7,
        officialLink: 'https://www.marvelsnap.com',
        isNewRelease: true,
        steamId: '1997040',
        trailerVideoId: 'W6H1v0VqfT0',
        tags: ['Strategy', 'Card Battler', 'Marvel', 'Casual', 'Competitive']
    },
    {
        id: 'team-fortress-2',
        title: 'Team Fortress 2',
        studio: 'Valve',
        publisher: 'Valve',
        genre: 'Hero FPS',
        platform: ['PC'],
        description: 'Nine distinct classes provide a broad range of tactical abilities and personalities. Constantly updated with new game modes, maps, equipment and more.',
        rating: 4.8,
        officialLink: 'https://www.teamfortress.com',
        isNewRelease: false,
        steamId: '440',
        trailerVideoId: 'h_c3iQImXZg',
        tags: ['Shooter', 'Class-Based', 'Funny', 'Multiplayer', 'Classic']
    },
    // --- 50 ADDITIONAL GAMES ---
    {
        id: 'war-thunder',
        title: 'War Thunder',
        studio: 'Gaijin Entertainment',
        publisher: 'Gaijin Entertainment',
        genre: 'Vehicle Combat',
        platform: ['PC', 'Console'],
        description: 'A comprehensive free-to-play MMO military game dedicated to aviation, armored vehicles, and naval craft from the early 20th century to modern combat units.',
        rating: 4.5,
        officialLink: 'https://warthunder.com',
        isNewRelease: false,
        steamId: '236390',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['Action', 'Simulation', 'Military', 'Tanks', 'Flight']
    },
    {
        id: 'world-of-tanks',
        title: 'World of Tanks',
        studio: 'Wargaming',
        publisher: 'Wargaming',
        genre: 'Vehicle Combat',
        platform: ['PC', 'Console', 'Mobile'],
        description: 'Command over 600 war machines from the mid-20th century in this team-based MMO dedicated to armored warfare.',
        rating: 4.4,
        officialLink: 'https://worldoftanks.com',
        isNewRelease: false,
        steamId: '1407200',
        trailerVideoId: '4iL5s2i7X2k',
        tags: ['Action', 'Strategy', 'Tanks', 'Shooter', 'Multiplayer']
    },
    {
        id: 'world-of-warships',
        title: 'World of Warships',
        studio: 'Wargaming',
        publisher: 'Wargaming',
        genre: 'Naval Combat',
        platform: ['PC', 'Console'],
        description: 'Experience epic naval combat in this free-to-play MMO action game. Master the art of naval warfare with hundreds of historic vessels.',
        rating: 4.3,
        officialLink: 'https://worldofwarships.com',
        isNewRelease: false,
        steamId: '552990',
        trailerVideoId: '9gq3h5T6g7c',
        tags: ['Action', 'Naval', 'Simulation', 'Multiplayer', 'Tactical']
    },
    {
        id: 'lost-ark',
        title: 'Lost Ark',
        studio: 'Smilegate RPG',
        publisher: 'Amazon Games',
        genre: 'MMORPG',
        platform: ['PC'],
        description: 'Embark on an odyssey for the Lost Ark in a vast, vibrant world: explore new lands, seek out lost treasures, and test yourself in thrilling action combat.',
        rating: 4.4,
        officialLink: 'https://www.playlostark.com',
        isNewRelease: false,
        steamId: '1599340',
        trailerVideoId: '4iL5s2i7X2k',
        tags: ['Action RPG', 'Fantasy', 'Adventure', 'Multiplayer', 'Co-op']
    },
    {
        id: 'albion-online',
        title: 'Albion Online',
        studio: 'Sandbox Interactive',
        publisher: 'Sandbox Interactive',
        genre: 'MMORPG',
        platform: ['PC', 'Mobile'],
        description: 'A sandbox MMORPG featuring a player-driven economy, classless combat system, and intense PvP battles.',
        rating: 4.3,
        officialLink: 'https://albiononline.com',
        isNewRelease: false,
        steamId: '761890',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['Sandbox', 'Economy', 'PvP', 'Fantasy', 'Crafting']
    },
    {
        id: 'eve-online',
        title: 'EVE Online',
        studio: 'CCP Games',
        publisher: 'CCP Games',
        genre: 'Space MMO',
        platform: ['PC'],
        description: 'A community-driven spaceship MMO where players can play free, choosing their own path from countless options.',
        rating: 4.2,
        officialLink: 'https://www.eveonline.com',
        isNewRelease: false,
        steamId: '8500',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['Space', 'Sci-Fi', 'Economy', 'Sandbox', 'Simulation']
    },
    {
        id: 'runescape',
        title: 'RuneScape',
        studio: 'Jagex',
        publisher: 'Jagex',
        genre: 'MMORPG',
        platform: ['PC', 'Mobile'],
        description: 'A unique fantasy MMORPG with a vast open world, freedom of choice, and community-driven content.',
        rating: 4.5,
        officialLink: 'https://www.runescape.com',
        isNewRelease: false,
        steamId: '1343400',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['Fantasy', 'Adventure', 'RPG', 'Multiplayer', 'Open World']
    },
    {
        id: 'paladins',
        title: 'Paladins',
        studio: 'Evil Mojo Games',
        publisher: 'Hi-Rez Studios',
        genre: 'Hero Shooter',
        platform: ['PC', 'Console'],
        description: 'A fantasy team-based shooter with deep character customization through its unique card system.',
        rating: 4.4,
        officialLink: 'https://www.paladins.com',
        isNewRelease: false,
        steamId: '444090',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['Shooter', 'FPS', 'Multiplayer', 'Fantasy', 'Team-Based']
    },
    {
        id: 'smite',
        title: 'Smite',
        studio: 'Titan Forge Games',
        publisher: 'Hi-Rez Studios',
        genre: 'MOBA',
        platform: ['PC', 'Console'],
        description: 'The Battleground of the Gods. Wield Thor\'s hammer, turn your foes to stone as Medusa, or flex your divine power as one of 100+ mythological icons.',
        rating: 4.5,
        officialLink: 'https://www.smitegame.com',
        isNewRelease: false,
        steamId: '386360',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['Action', 'Mythology', 'Strategy', 'Multiplayer', 'Third Person']
    },
    {
        id: 'teamfight-tactics',
        title: 'Teamfight Tactics',
        studio: 'Riot Games',
        publisher: 'Riot Games',
        genre: 'Auto Battler',
        platform: ['PC', 'Mobile'],
        description: 'An auto-battler game set in the League of Legends universe where players draft teams of champions to battle it out.',
        rating: 4.6,
        officialLink: 'https://teamfighttactics.leagueoflegends.com',
        isNewRelease: false,
        imageUrl: 'https://image.pollinations.ai/prompt/teamfight%20tactics%20pengu%20tactician%20colorful%20battlefield%20league%20of%20legends%20characters%203d%20render?width=1280&height=720&nologo=true&seed=tft',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['Strategy', 'Card Game', 'Multiplayer', 'Casual', 'Fantasy']
    },
    {
        id: 'mtg-arena',
        title: 'Magic: The Gathering Arena',
        studio: 'Wizards Digital Games Studio',
        publisher: 'Wizards of the Coast',
        genre: 'Card Game',
        platform: ['PC', 'Mobile'],
        description: 'The original strategy card game, now digital. Collect cards, build decks, and duel players online.',
        rating: 4.5,
        officialLink: 'https://magic.wizards.com/en/mtgarena',
        isNewRelease: false,
        steamId: '2141910',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['Strategy', 'Card Battler', 'Fantasy', 'Multiplayer', 'Trading Card Game']
    },
    {
        id: 'master-duel',
        title: 'Yu-Gi-Oh! Master Duel',
        studio: 'Konami Digital Entertainment',
        publisher: 'Konami',
        genre: 'Card Game',
        platform: ['PC', 'Console', 'Mobile'],
        description: 'The definitive digital edition of the competitive card game that has been evolving for over 20 years!',
        rating: 4.6,
        officialLink: 'https://www.konami.com/yugioh/masterduel/us/en/',
        isNewRelease: false,
        steamId: '1449850',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['Strategy', 'Anime', 'Card Game', 'Multiplayer', 'Competitive']
    },
    {
        id: 'hearthstone',
        title: 'Hearthstone',
        studio: 'Blizzard Entertainment',
        publisher: 'Blizzard Entertainment',
        genre: 'Card Game',
        platform: ['PC', 'Mobile'],
        description: 'A fast-paced strategy card game for everyone. Deceptively simple. Insanely fun.',
        rating: 4.5,
        officialLink: 'https://hearthstone.blizzard.com',
        isNewRelease: false,
        imageUrl: 'https://image.pollinations.ai/prompt/hearthstone%20tavern%20warm%20lighting%20cards%20on%20table%20fantasy%20art%20blizzard%20style?width=1280&height=720&nologo=true&seed=hearthstone',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['Strategy', 'Card Game', 'Fantasy', 'Multiplayer', 'Casual']
    },
    {
        id: 'honkai-star-rail',
        title: 'Honkai: Star Rail',
        studio: 'HoYoverse',
        publisher: 'HoYoverse',
        genre: 'Turn-Based RPG',
        platform: ['PC', 'Console', 'Mobile'],
        description: 'A space fantasy RPG. Hop aboard the Astral Express and experience the galaxy\'s infinite wonders.',
        rating: 4.8,
        officialLink: 'https://hsr.hoyoverse.com',
        isNewRelease: true,
        imageUrl: 'https://image.pollinations.ai/prompt/honkai%20star%20rail%20astral%20express%20train%20in%20space%20anime%20style%20cosmic%20background%20stars%20glowing?width=1280&height=720&nologo=true&seed=hsr',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['RPG', 'Anime', 'Sci-Fi', 'Turn-Based', 'Adventure']
    },
    {
        id: 'tower-of-fantasy',
        title: 'Tower of Fantasy',
        studio: 'Hotta Studio',
        publisher: 'Level Infinite',
        genre: 'MMORPG',
        platform: ['PC', 'Mobile', 'Console'],
        description: 'Set hundreds of years in the future on the distant planet of Aida, this shared open-world MMORPG features anime-style graphics and sci-fi adventure.',
        rating: 4.2,
        officialLink: 'https://www.toweroffantasy-global.com',
        isNewRelease: false,
        steamId: '2064650',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['Open World', 'Anime', 'Sci-Fi', 'Action', 'Multiplayer']
    },
    {
        id: 'wuthering-waves',
        title: 'Wuthering Waves',
        studio: 'Kuro Games',
        publisher: 'Kuro Games',
        genre: 'Action RPG',
        platform: ['PC', 'Mobile'],
        description: 'An open-world action RPG with a high degree of freedom, featuring fast-paced combat and a deep narrative.',
        rating: 4.7,
        officialLink: 'https://wutheringwaves.kurogame.com',
        isNewRelease: true,
        imageUrl: 'https://image.pollinations.ai/prompt/wuthering%20waves%20rover%20character%20action%20pose%20anime%20style%20post%20apocalyptic%20landscape?width=1280&height=720&nologo=true&seed=wuwa',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['Action', 'RPG', 'Open World', 'Anime', 'Adventure']
    },
    {
        id: 'multiversus',
        title: 'MultiVersus',
        studio: 'Player First Games',
        publisher: 'Warner Bros. Games',
        genre: 'Fighting',
        platform: ['PC', 'Console'],
        description: 'A platform fighter that lets you team up with your friends using some of the most iconic characters, including Batman, Shaggy, and more.',
        rating: 4.3,
        officialLink: 'https://multiversus.com',
        isNewRelease: true,
        steamId: '1818750',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['Fighting', 'Platformer', 'Multiplayer', 'Action', 'Co-op']
    },
    {
        id: 'brawlhalla',
        title: 'Brawlhalla',
        studio: 'Blue Mammoth Games',
        publisher: 'Ubisoft',
        genre: 'Fighting',
        platform: ['PC', 'Console', 'Mobile'],
        description: 'An epic platform fighter for up to 8 players online or local. Try casual free-for-alls, ranked matches, or invite friends to a private room.',
        rating: 4.6,
        officialLink: 'https://www.brawlhalla.com',
        isNewRelease: false,
        steamId: '291550',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['Fighting', 'Platformer', 'Multiplayer', 'Casual', 'Competitive']
    },
    {
        id: 'asphalt-9',
        title: 'Asphalt 9: Legends',
        studio: 'Gameloft',
        publisher: 'Gameloft',
        genre: 'Racing',
        platform: ['PC', 'Console', 'Mobile'],
        description: 'Tear up the asphalt in the ultimate console racing experience on mobile and PC.',
        rating: 4.5,
        officialLink: 'https://asphaltlegends.com',
        isNewRelease: false,
        steamId: '973700',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['Racing', 'Arcade', 'Multiplayer', 'Action', 'Sports']
    },
    {
        id: 'dauntless',
        title: 'Dauntless',
        studio: 'Phoenix Labs',
        publisher: 'Epic Games',
        genre: 'Action RPG',
        platform: ['PC', 'Console'],
        description: 'Battle boss-sized Behemoths, forge powerful weapons, and craft armor from the very creatures you slay - all in a massive, free-to-play online world.',
        rating: 4.2,
        officialLink: 'https://playdauntless.com',
        isNewRelease: false,
        imageUrl: 'https://image.pollinations.ai/prompt/dauntless%20slayer%20fighting%20behemoth%20monster%20floating%20islands%20fantasy%20art%20style?width=1280&height=720&nologo=true&seed=dauntless',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['Action', 'RPG', 'Co-op', 'Monster Hunter', 'Fantasy']
    },
    {
        id: 'vrchat',
        title: 'VRChat',
        studio: 'VRChat Inc.',
        publisher: 'VRChat Inc.',
        genre: 'Social',
        platform: ['PC', 'VR'],
        description: 'Imagine a world where anything is possible. Join a game of capture the flag in outer space. Share stories around a campfire while roasting marshmallows.',
        rating: 4.6,
        officialLink: 'https://hello.vrchat.com',
        isNewRelease: false,
        steamId: '438100',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['VR', 'Social', 'Sandbox', 'Multiplayer', 'Casual']
    },
    {
        id: 'guild-wars-2',
        title: 'Guild Wars 2',
        studio: 'ArenaNet',
        publisher: 'NCSoft',
        genre: 'MMORPG',
        platform: ['PC'],
        description: 'Explore a vast, living world filled with dynamic events and hidden secrets in this award-winning MMORPG.',
        rating: 4.7,
        officialLink: 'https://www.guildwars2.com',
        isNewRelease: false,
        steamId: '1284210',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['MMORPG', 'Fantasy', 'Open World', 'Adventure', 'Action']
    },
    {
        id: 'swtor',
        title: 'Star Wars: The Old Republic',
        studio: 'Broadsword',
        publisher: 'Electronic Arts',
        genre: 'MMORPG',
        platform: ['PC'],
        description: 'Play as a Jedi, a Sith, a Bounty Hunter, or one of many other Star Wars iconic roles and explore an age over three thousand years before the classic films.',
        rating: 4.6,
        officialLink: 'https://www.swtor.com',
        isNewRelease: false,
        steamId: '1286830',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['Sci-Fi', 'Star Wars', 'RPG', 'Story', 'Multiplayer']
    },
    {
        id: 'planetside-2',
        title: 'PlanetSide 2',
        studio: 'Rogue Planet Games',
        publisher: 'Daybreak Game Company',
        genre: 'MMOFPS',
        platform: ['PC', 'Console'],
        description: 'A free-to-play, massive scale, first-person shooter where soldiers battle in an all-out planetary war on a scale never before seen.',
        rating: 4.3,
        officialLink: 'https://www.planetside2.com',
        isNewRelease: false,
        steamId: '218230',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['FPS', 'Massive Multiplayer', 'Sci-Fi', 'Shooter', 'War']
    },
    {
        id: 'enlisted',
        title: 'Enlisted',
        studio: 'Darkflow Software',
        publisher: 'Gaijin Entertainment',
        genre: 'FPS',
        platform: ['PC', 'Console'],
        description: 'A squad-based first-person MMO shooter covering key battles from World War II.',
        rating: 4.4,
        officialLink: 'https://enlisted.net',
        isNewRelease: false,
        imageUrl: 'https://image.pollinations.ai/prompt/enlisted%20ww2%20soldiers%20battlefield%20action%20squad%20gameplay%20realistic%20war%20scene?width=1280&height=720&nologo=true&seed=enlisted',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['FPS', 'World War II', 'Shooter', 'Multiplayer', 'Tactical']
    },
    {
        id: 'warface',
        title: 'Warface',
        studio: 'Allods Team',
        publisher: 'My.Games',
        genre: 'FPS',
        platform: ['PC', 'Console'],
        description: 'A contemporary MMO first person shooter with millions of fans around the world.',
        rating: 4.1,
        officialLink: 'https://pc.warface.com',
        isNewRelease: false,
        steamId: '291480',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['FPS', 'Action', 'Shooter', 'Multiplayer', 'Co-op']
    },
    {
        id: 'xdefiant',
        title: 'XDefiant',
        studio: 'Ubisoft San Francisco',
        publisher: 'Ubisoft',
        genre: 'FPS',
        platform: ['PC', 'Console'],
        description: 'A free-to-play, fast-paced arena shooter that combines intense gunplay with personalized loadouts and specialized factions.',
        rating: 4.3,
        officialLink: 'https://www.ubisoft.com/en-us/game/xdefiant',
        isNewRelease: true,
        imageUrl: 'https://image.pollinations.ai/prompt/xdefiant%20faction%20characters%20shooter%20gameplay%20modern%20arena%20ubisoft%20style?width=1280&height=720&nologo=true&seed=xdefiant',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['FPS', 'Shooter', 'Competitive', 'Multiplayer', 'Action']
    },
    {
        id: 'the-first-descendant',
        title: 'The First Descendant',
        studio: 'Nexon Games',
        publisher: 'Nexon',
        genre: 'Looter Shooter',
        platform: ['PC', 'Console'],
        description: 'A third-person cooperative action RPG shooter in which you can play as Descendants who inherited the unknown powers to save humanity.',
        rating: 4.4,
        officialLink: 'https://tfd.nexon.com',
        isNewRelease: true,
        steamId: '2074920',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['Action', 'RPG', 'Shooter', 'Co-op', 'Sci-Fi']
    },
    {
        id: 'once-human',
        title: 'Once Human',
        studio: 'Starry Studio',
        publisher: 'Starry Studio',
        genre: 'Survival',
        platform: ['PC'],
        description: 'A multiplayer open-world survival game set in a strange, post-apocalyptic future.',
        rating: 4.5,
        officialLink: 'https://www.oncehuman.game',
        isNewRelease: true,
        steamId: '2139460',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['Survival', 'Open World', 'Horror', 'Multiplayer', 'Action']
    },
    {
        id: 'naraka-bladepoint',
        title: 'NARAKA: BLADEPOINT',
        studio: '24 Entertainment',
        publisher: 'NetEase Games',
        genre: 'Battle Royale',
        platform: ['PC', 'Console'],
        description: 'A 60-player PVP mythical action combat experience with martial arts inspired melee combat, gravity defying mobility, and vast arsenals.',
        rating: 4.6,
        officialLink: 'https://www.narakathegame.com',
        isNewRelease: false,
        steamId: '1203220',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['Battle Royale', 'Action', 'Martial Arts', 'Multiplayer', 'PvP']
    },
    {
        id: 'conquerors-blade',
        title: 'Conqueror\'s Blade',
        studio: 'Booming Tech',
        publisher: 'Poros Interactive',
        genre: 'Tactical Action',
        platform: ['PC'],
        description: 'Master the art of medieval warfare in this tactical action MMO. Command units, siege castles, and battle for territory.',
        rating: 4.2,
        officialLink: 'https://conqblade.com',
        isNewRelease: false,
        steamId: '905370',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['Strategy', 'Action', 'Medieval', 'Multiplayer', 'War']
    },
    {
        id: 'pokemon-unite',
        title: 'Pokémon UNITE',
        studio: 'TiMi Studio Group',
        publisher: 'The Pokémon Company',
        genre: 'MOBA',
        platform: ['Mobile', 'Switch'],
        description: 'Team up and take down the opposition in Pokémon’s first 5-on-5 strategic team battle game!',
        rating: 4.4,
        officialLink: 'https://unite.pokemon.com',
        isNewRelease: false,
        imageUrl: 'https://image.pollinations.ai/prompt/pokemon%20unite%20pikachu%20charizard%20battle%20arena%20moba%20style%20vibrant%20colors?width=1280&height=720&nologo=true&seed=pokeunite',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['MOBA', 'Strategy', 'Pokémon', 'Multiplayer', 'Casual']
    },
    {
        id: 'marvel-contest-of-champions',
        title: 'Marvel Contest of Champions',
        studio: 'Kabam',
        publisher: 'Kabam',
        genre: 'Fighting',
        platform: ['Mobile'],
        description: 'Prepare for epic versus-fighting action with your favorite Marvel Super Heroes & Super Villains in the ultimate cosmic showdown!',
        rating: 4.5,
        officialLink: 'https://playcontestofchampions.com',
        isNewRelease: false,
        imageUrl: 'https://image.pollinations.ai/prompt/marvel%20contest%20of%20champions%20spiderman%20vs%20hulk%20fighting%20game%20mobile%20graphics?width=1280&height=720&nologo=true&seed=mcoc',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['Fighting', 'Marvel', 'Action', 'RPG', 'Mobile']
    },
    {
        id: 'sky-children-of-the-light',
        title: 'Sky: Children of the Light',
        studio: 'thatgamecompany',
        publisher: 'thatgamecompany',
        genre: 'Adventure',
        platform: ['PC', 'Console', 'Mobile'],
        description: 'From the creators of Journey, experience a peaceful MMO where you can fly, hold hands, and solve puzzles with friends.',
        rating: 4.8,
        officialLink: 'https://www.thatskygame.com',
        isNewRelease: false,
        steamId: '2325290',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['Adventure', 'Indie', 'Relaxing', 'Multiplayer', 'Social']
    },
    {
        id: 'rec-room',
        title: 'Rec Room',
        studio: 'Rec Room Inc',
        publisher: 'Rec Room Inc',
        genre: 'Social',
        platform: ['PC', 'Console', 'VR', 'Mobile'],
        description: 'The best place to build and play games together. Party up with friends from all around the world to chat, hang out, explore MILLIONS of player-created rooms, or build something new and amazing to share with us all.',
        rating: 4.5,
        officialLink: 'https://recroom.com',
        isNewRelease: false,
        steamId: '471710',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['Social', 'VR', 'Sandbox', 'Multiplayer', 'Casual']
    },
    {
        id: 'trove',
        title: 'Trove',
        studio: 'Trion Worlds',
        publisher: 'Gamigo',
        genre: 'MMO',
        platform: ['PC', 'Console'],
        description: 'Grab your friends, hone your blades, and set off for adventure in this free-to-play, voxel-based action MMO.',
        rating: 4.3,
        officialLink: 'https://www.trionworlds.com/trove/en/',
        isNewRelease: false,
        steamId: '304050',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['Voxel', 'Sandbox', 'MMORPG', 'Building', 'Adventure']
    },
    {
        id: 'neverwinter',
        title: 'Neverwinter',
        studio: 'Cryptic Studios',
        publisher: 'Gearbox Publishing',
        genre: 'MMORPG',
        platform: ['PC', 'Console'],
        description: 'A free-to-play action MMORPG based on the acclaimed Dungeons & Dragons fantasy roleplaying game.',
        rating: 4.2,
        officialLink: 'https://www.playneverwinter.com',
        isNewRelease: false,
        steamId: '109600',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['MMORPG', 'Fantasy', 'D&D', 'RPG', 'Adventure']
    },
    {
        id: 'star-trek-online',
        title: 'Star Trek Online',
        studio: 'Cryptic Studios',
        publisher: 'Gearbox Publishing',
        genre: 'MMORPG',
        platform: ['PC', 'Console'],
        description: 'In Star Trek Online, the Star Trek universe appears for the first time on a truly massive scale. Players take the captain\'s chair as they command their own starship and crew.',
        rating: 4.3,
        officialLink: 'https://www.playstartrekonline.com',
        isNewRelease: false,
        steamId: '9900',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['Sci-Fi', 'Space', 'MMORPG', 'Star Trek', 'RPG']
    },
    {
        id: 'dc-universe-online',
        title: 'DC Universe Online',
        studio: 'Dimensional Ink Games',
        publisher: 'Daybreak Game Company',
        genre: 'MMO',
        platform: ['PC', 'Console'],
        description: 'Join thousands of other players in a massive online action game set in the popular DC Comics universe.',
        rating: 4.2,
        officialLink: 'https://www.dcuniverseonline.com',
        isNewRelease: false,
        steamId: '24200',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['Superhero', 'Action', 'MMORPG', 'Open World', 'DC Comics']
    },
    {
        id: 'crossout',
        title: 'Crossout',
        studio: 'Targem Games',
        publisher: 'Gaijin Entertainment',
        genre: 'Vehicle Combat',
        platform: ['PC', 'Console'],
        description: 'A post-apocalyptic MMO Action game! Craft your unique battle machines from dozens of interchangeable parts and destroy your enemies in explosive PvP online battles!',
        rating: 4.4,
        officialLink: 'https://crossout.net',
        isNewRelease: false,
        steamId: '386180',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['Vehicle Combat', 'Building', 'Action', 'Post-Apocalyptic', 'PvP']
    },
    {
        id: 'mechwarrior-online',
        title: 'MechWarrior Online',
        studio: 'Piranha Games',
        publisher: 'Piranha Games',
        genre: 'Vehicle Combat',
        platform: ['PC'],
        description: 'A tactical battle mech simulation set in the rich BattleTech universe.',
        rating: 4.3,
        officialLink: 'https://mwomercs.com',
        isNewRelease: false,
        steamId: '342200',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['Mechs', 'Simulation', 'Action', 'Sci-Fi', 'Multiplayer']
    },
    {
        id: 'farlight-84',
        title: 'Farlight 84',
        studio: 'Farlight Games',
        publisher: 'Farlight Games',
        genre: 'Battle Royale',
        platform: ['PC', 'Mobile'],
        description: 'A fast-paced Hero Battle Royale. Survivors invited to Isle City can access futuristic vehicles, weapons, and jetpacks!',
        rating: 4.4,
        officialLink: 'https://farlight84.farlightgames.com',
        isNewRelease: false,
        steamId: '1928420',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['Battle Royale', 'Shooter', 'Sci-Fi', 'Hero Shooter', 'Multiplayer']
    },
    {
        id: 'blood-strike',
        title: 'Blood Strike',
        studio: 'NetEase Games',
        publisher: 'NetEase Games',
        genre: 'FPS',
        platform: ['PC', 'Mobile'],
        description: 'A fast-paced battle royale FPS optimized for low-end devices and featuring intense combat.',
        rating: 4.5,
        officialLink: 'https://www.blood-strike.com',
        isNewRelease: true,
        imageUrl: 'https://image.pollinations.ai/prompt/blood%20strike%20fps%20game%20character%20running%20gun%20battle%20royale%20mobile%20graphics?width=1280&height=720&nologo=true&seed=bloodstrike',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['FPS', 'Battle Royale', 'Shooter', 'Action', 'Mobile']
    },
    {
        id: 'undawn',
        title: 'Undawn',
        studio: 'LightSpeed Studios',
        publisher: 'Level Infinite',
        genre: 'Survival',
        platform: ['PC', 'Mobile'],
        description: 'Explore, adapt, and survive in an open-world apocalypse.',
        rating: 4.1,
        officialLink: 'https://www.undawn.game',
        isNewRelease: true,
        steamId: '1881700',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['Survival', 'Open World', 'Zombies', 'Shooter', 'Multiplayer']
    },
    {
        id: 'diablo-immortal',
        title: 'Diablo Immortal',
        studio: 'Blizzard Entertainment',
        publisher: 'Blizzard Entertainment',
        genre: 'Action RPG',
        platform: ['PC', 'Mobile'],
        description: 'A brand-new mobile game from Blizzard Entertainment. A genre-defining action RPG series set between the events of Diablo II: Lord of Destruction and Diablo III.',
        rating: 4.0,
        officialLink: 'https://diabloimmortal.blizzard.com',
        isNewRelease: false,
        imageUrl: 'https://image.pollinations.ai/prompt/diablo%20immortal%20barbarian%20fighting%20demons%20dark%20fantasy%20isometric%20view%20action?width=1280&height=720&nologo=true&seed=diablo',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['Action RPG', 'Hack and Slash', 'Dark Fantasy', 'Multiplayer', 'Loot']
    },
    {
        id: 'legends-of-runeterra',
        title: 'Legends of Runeterra',
        studio: 'Riot Games',
        publisher: 'Riot Games',
        genre: 'Card Game',
        platform: ['PC', 'Mobile'],
        description: 'A strategy card game where skill, creativity, and cleverness determine your success.',
        rating: 4.7,
        officialLink: 'https://playruneterra.com',
        isNewRelease: false,
        imageUrl: 'https://image.pollinations.ai/prompt/legends%20of%20runeterra%20fantasy%20card%20art%20league%20of%20legends%20characters%20battlefield?width=1280&height=720&nologo=true&seed=lor',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['Card Game', 'Strategy', 'Fantasy', 'Lore', 'Multiplayer']
    },
    {
        id: 'shadowverse',
        title: 'Shadowverse',
        studio: 'Cygames',
        publisher: 'Cygames',
        genre: 'Card Game',
        platform: ['PC', 'Mobile'],
        description: 'A strategic multiplayer digital card game with anime-style art.',
        rating: 4.4,
        officialLink: 'https://shadowverse.com',
        isNewRelease: false,
        steamId: '453480',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['Card Game', 'Anime', 'Strategy', 'Fantasy', 'Multiplayer']
    },
    {
        id: 'the-sims-4',
        title: 'The Sims™ 4',
        studio: 'Maxis',
        publisher: 'Electronic Arts',
        genre: 'Simulation',
        platform: ['PC', 'Console'],
        description: 'Unleash your imagination and create a unique world of Sims that\'s an expression of you.',
        rating: 4.6,
        officialLink: 'https://www.ea.com/games/the-sims/the-sims-4',
        isNewRelease: false,
        steamId: '1222670',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['Simulation', 'Life Sim', 'Casual', 'Singleplayer', 'Building']
    },
    {
        id: 'trackmania',
        title: 'Trackmania',
        studio: 'Ubisoft Nadeo',
        publisher: 'Ubisoft',
        genre: 'Racing',
        platform: ['PC', 'Console'],
        description: 'The legendary racing game returns with a remake of the Nations experience. Play for free and join the community.',
        rating: 4.5,
        officialLink: 'https://www.ubisoft.com/en-us/game/trackmania/trackmania',
        isNewRelease: false,
        steamId: '2225070',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['Racing', 'Time Attack', 'Multiplayer', 'Competitive', 'Building']
    },
    {
        id: 'pubg-battlegrounds',
        title: 'PUBG: BATTLEGROUNDS',
        studio: 'KRAFTON',
        publisher: 'KRAFTON',
        genre: 'Battle Royale',
        platform: ['PC', 'Console'],
        description: 'Land, loot, and out-survive your opponents on the ultimate battlegrounds.',
        rating: 4.5,
        officialLink: 'https://pubg.com',
        isNewRelease: false,
        steamId: '578080',
        trailerVideoId: 'uCD6vUk9HQM',
        tags: ['Shooter', 'Battle Royale', 'Survival', 'Tactical', 'Multiplayer']
    },
    {
        id: 'smash-legends',
        title: 'SMASH LEGENDS',
        studio: '5minlab',
        publisher: '5minlab',
        genre: 'Action',
        platform: ['PC', 'Mobile'],
        description: 'A real-time action game where you knock opponents out of the arena.',
        rating: 4.2,
        officialLink: 'https://smashlegends.com',
        isNewRelease: false,
        steamId: '1352080',
        trailerVideoId: 'p05F1p52_Q0',
        tags: ['Action', 'Fighting', 'Casual', 'Multiplayer', 'Anime']
    }
];

export const fetchFeaturedGames = async (): Promise<Game[]> => {
  // Using static real data to ensure official links are correct as per request
  return new Promise((resolve) => {
    // Add dynamic images via pollinations.ai for relevant game art
    const gamesWithImages = REAL_GAMES_DATA.map(game => {
      let imageUrl = game.imageUrl; // Default to manual override if present

      if (!imageUrl) {
        if (game.steamId) {
             // Use Steam Capsule image (616x353 is a standard high-res landscape header)
             imageUrl = `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${game.steamId}/capsule_616x353.jpg`;
        } else {
             // Fallback for non-steam games to generative AI with a specific prompt
             // Optimize dimensions for cards (16:9 aspect ratio, roughly 640x360) to save bandwidth
             imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(game.title + ' gameplay screenshot unreal engine 5 render 8k resolution cinematic lighting detailed textures action shot')}?width=640&height=360&nologo=true&seed=${game.id.length}`;
        }
      }

      // Generate a studio logo if one isn't provided (simulated)
      // Using a consistent seed based on studio name ensures the same "logo" appears for the same studio.
      // Small dimension (64x64) is sufficient for a logo.
      const studioLogoUrl = `https://image.pollinations.ai/prompt/modern%20abstract%20logo%20for%20game%20studio%20${encodeURIComponent(game.studio)}%20gradient%20neon%20vector%20on%20black?width=64&height=64&nologo=true&seed=${encodeURIComponent(game.studio)}`;

      return {
          ...game,
          imageUrl: imageUrl,
          studioLogoUrl: studioLogoUrl
      };
    });
    setTimeout(() => resolve(gamesWithImages), 800); // Simulate network latency
  });
};

export const fetchNewsWithSearch = async (): Promise<NewsArticle[]> => {
  try {
    // 1. Search for real news via Google Search Tool - INCREASED COUNT TO 12
    // FOCUSED ON SAUDI ARABIA / MENA
    const searchResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Find 12 distinct, latest, and trending news stories about video games (console, PC, mobile) and esports. Prioritize news from the Middle East, Saudi Arabia (Riyadh Season, Gamers8, SEF), and UAE. Also include major global stories popular in the region (FIFA/FC 24, PUBG Mobile, Fortnite). For each story, provide the Headline, a detailed Summary, the Source Name, the Date, and the direct Source URL in the text.",
      config: {
        tools: [{ googleSearch: {} }],
      },
    });
    
    const searchContext = searchResponse.text;
    
    // 2. Format the search results into structured JSON
    const formattingResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Transform the following gaming news text into a structured JSON array.
      
      Text to process:
      ${searchContext}
      
      Extract the specific URL provided in the text for each news item. If no URL is explicitly present for an item, leave the url field empty.
      `,
      config: {
        responseMimeType: "application/json",
         responseSchema: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    id: { type: Type.STRING },
                    headline: { type: Type.STRING },
                    summary: { type: Type.STRING },
                    source: { type: Type.STRING },
                    date: { type: Type.STRING },
                    url: { type: Type.STRING },
                }
            }
        }
      }
    });

    const parsed = JSON.parse(formattingResponse.text || '[]');
    
    // 3. Add generated images - Optimized for News Cards (2:1 aspect ratio roughly)
    return parsed.map((item: any, index: number) => ({
        ...item,
        id: item.id || `news-${Date.now()}-${index}`,
        imageUrl: `https://image.pollinations.ai/prompt/${encodeURIComponent('editorial illustration for gaming news ' + item.headline + ' digital art trending on artstation highly detailed 8k cinematic composition')}?width=500&height=250&nologo=true`
    }));

  } catch (error) {
    console.error("Failed to fetch news:", error);
    // Fallback static data if API fails
    return [
        {
            id: 'fallback-1',
            headline: 'Esports World Cup Riyadh Announced',
            summary: 'The biggest esports festival in history is returning to Riyadh with record-breaking prize pools.',
            source: 'UnrealGames System',
            date: 'Just now',
            url: '#',
            imageUrl: 'https://image.pollinations.ai/prompt/riyadh%20esports%20neon%20stage%208k%20cinematic?width=500&height=250&nologo=true'
        }
    ];
  }
};

export const fetchGamingEvents = async (): Promise<GamingEvent[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      // INCREASED COUNT TO 12, FOCUSED ON KSA/UAE
      contents: "List 12 upcoming major gaming events, tournaments, or season updates. Prioritize events in Saudi Arabia (Riyadh, Jeddah), UAE (Dubai, Abu Dhabi), and major online tournaments for MENA region. Include specific locations.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              name: { type: Type.STRING },
              date: { type: Type.STRING },
              description: { type: Type.STRING },
              type: { type: Type.STRING, enum: ['tournament', 'release', 'convention', 'update'] },
              location: { type: Type.STRING },
            },
          },
        },
      },
    });
    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Failed to fetch events", error);
    return [];
  }
};

export const fetchGameReviews = async (): Promise<Review[]> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            // INCREASED COUNT TO 12, FOCUSED ON MENA CREATORS
            contents: "Generate 12 short, punchy reviews for popular free games (like PUBG Mobile, FC Mobile, Valorant) from the perspective of top Middle Eastern pro gamers and streamers (e.g., AboFlah, BanderitaX styles).",
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            id: { type: Type.STRING },
                            gameTitle: { type: Type.STRING },
                            reviewerName: { type: Type.STRING },
                            rating: { type: Type.NUMBER },
                            content: { type: Type.STRING },
                        }
                    }
                }
            }
        });
        return JSON.parse(response.text || '[]');
    } catch (e) {
        return [];
    }
}

export const fetchTopGamers = async (): Promise<GamerProfile[]> => {
    // Optimized for avatar size (150x150)
    // Updated prompt for photorealistic images
    const getMENAAvatar = (name: string) =>
      `https://image.pollinations.ai/prompt/professional%20esports%20player%20portrait%20of%20${encodeURIComponent(name)}%20studio%20lighting%20confident%20expression%20high%20quality%20photography%208k%20bokeh%20background?width=150&height=150&nologo=true&seed=${name}`;

    // Curated list of Top Saudi & Middle Eastern Gamers
    const gamers: GamerProfile[] = [
        {
            id: 'aboflah',
            name: 'Hassan Suleiman',
            handle: 'AboFlah',
            region: 'Kuwait',
            game: 'Variety / GTA V',
            imageUrl: getMENAAvatar('AboFlah Hassan'),
            socials: { youtube: 'https://www.youtube.com/channel/UCk8fA-q6o7Y2g6_X9_X9_X9', instagram: 'https://www.instagram.com/aboflah' }
        },
        {
            id: 'banderitax',
            name: 'Bandar Madkhali',
            handle: 'BanderitaX',
            region: 'Saudi Arabia',
            game: 'Variety / Horror',
            imageUrl: getMENAAvatar('BanderitaX Bandar'),
            socials: { youtube: 'https://www.youtube.com/c/BanderitaX', instagram: 'https://www.instagram.com/banderitax' }
        },
        {
            id: 'shongxbong',
            name: 'Ahmad Al-Qahtani',
            handle: 'SHoNgxBoNg',
            region: 'Saudi Arabia',
            game: 'Fortnite',
            imageUrl: getMENAAvatar('SHoNgxBoNg Ahmad'),
            socials: { youtube: 'https://www.youtube.com/c/SHoNgxBoNg', instagram: 'https://www.instagram.com/shongxbong' }
        },
        {
            id: 'msdossary',
            name: 'Mosaad Al-Dossary',
            handle: 'Msdossary',
            region: 'Saudi Arabia',
            game: 'EA FC / FIFA',
            imageUrl: getMENAAvatar('Msdossary Mosaad'),
            socials: { twitter: 'https://twitter.com/Msdossary7', instagram: 'https://www.instagram.com/msdossary7' }
        },
        {
            id: 'miracle',
            name: 'Amer Al-Barkawi',
            handle: 'Miracle-',
            region: 'Jordan',
            game: 'Dota 2',
            imageUrl: getMENAAvatar('Miracle Amer Dota'),
            socials: { twitter: 'https://twitter.com/Nigmamiracle' }
        },
        {
            id: 'mjrmgames',
            name: 'Rayan',
            handle: 'MjrmGames',
            region: 'Saudi Arabia',
            game: 'GTA V',
            imageUrl: getMENAAvatar('MjrmGames Rayan'),
            socials: { youtube: 'https://www.youtube.com/user/MjrmGames', instagram: 'https://www.instagram.com/mjrm_games' }
        },
        {
            id: 'd7oomy999',
            name: 'Abdulrahman',
            handle: 'D7oomy999',
            region: 'Saudi Arabia',
            game: 'Minecraft',
            imageUrl: getMENAAvatar('D7oomy999 Abdulrahman'),
            socials: { youtube: 'https://www.youtube.com/user/d7oomy999', instagram: 'https://www.instagram.com/d7oomy999' }
        },
        {
            id: 'topz',
            name: 'Abdullah',
            handle: 'Topz',
            region: 'Saudi Arabia',
            game: 'FIFA / EA FC',
            imageUrl: getMENAAvatar('Topz Abdullah'),
            socials: { youtube: 'https://www.youtube.com/c/Topz', instagram: 'https://www.instagram.com/topz_k' }
        },
        {
            id: 'syriangamer',
            name: 'Simon',
            handle: 'Syrian Gamer',
            region: 'Syria',
            game: 'Variety',
            imageUrl: getMENAAvatar('Syrian Gamer Simon'),
            socials: { youtube: 'https://www.youtube.com/c/SyrianGamer', instagram: 'https://www.instagram.com/syriangamer' }
        },
        {
            id: 'ocmz',
            name: 'Osama',
            handle: 'Ocmz',
            region: 'Saudi Arabia',
            game: 'Call of Duty',
            imageUrl: getMENAAvatar('Ocmz Osama'),
            socials: { youtube: 'https://www.youtube.com/c/Ocmz', instagram: 'https://www.instagram.com/ocmz' }
        },
        {
            id: 'rakakan1',
            name: 'Rakan',
            handle: 'Rakakan1',
            region: 'Saudi Arabia',
            game: 'Variety',
            imageUrl: getMENAAvatar('Rakakan1 Rakan'),
            socials: { youtube: 'https://www.youtube.com/c/Rakakan1', instagram: 'https://www.instagram.com/rakakan1' }
        },
        {
            id: 'ahmedshow',
            name: 'Ahmed Al-Qahtani',
            handle: 'Ahmed Show',
            region: 'Saudi Arabia',
            game: 'FIFA / Variety',
            imageUrl: getMENAAvatar('Ahmed Show'),
            socials: { youtube: 'https://www.youtube.com/c/AhmedShow', instagram: 'https://www.instagram.com/ahmed_show' }
        },
        {
            id: 'faisal',
            name: 'Faisal Al-Yami',
            handle: 'Faisal Yami',
            region: 'Saudi Arabia',
            game: 'Fortnite / Variety',
            imageUrl: getMENAAvatar('Faisal Yami'),
            socials: { youtube: 'https://www.youtube.com/c/FaisalYami', instagram: 'https://www.instagram.com/faisalyami' }
        },
        {
            id: 'multisaver',
            name: 'Mohammed',
            handle: 'Multisaver',
            region: 'Saudi Arabia',
            game: 'Overwatch',
            imageUrl: getMENAAvatar('Multisaver'),
            socials: { youtube: 'https://www.youtube.com/c/Multisaver', instagram: 'https://www.instagram.com/multisaver' }
        },
         {
            id: 'gh',
            name: 'Maroun Merhej',
            handle: 'GH',
            region: 'Lebanon',
            game: 'Dota 2',
            imageUrl: getMENAAvatar('GH Maroun'),
            socials: { twitter: 'https://twitter.com/NigmaGH' }
        },
        {
            id: 'w33',
            name: 'Aliwi Omar',
            handle: 'w33',
            region: 'Romania/Syria',
            game: 'Dota 2',
            imageUrl: getMENAAvatar('w33 Aliwi'),
            socials: { twitter: 'https://twitter.com/w33haa' }
        }
    ];

    return new Promise(resolve => setTimeout(() => resolve(gamers), 600));
}

export const chatWithGamerPal = async (history: {role: string, parts: {text: string}[]}[], message: string) => {
    const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: "You are 'Gamer Pal', a helpful AI assistant on the unrealgames.cloud platform. You specialize in serving the Middle Eastern gaming community. You know about Saudi servers, regional ping, Arabic localization in games, and popular influencers like AboFlah. Be enthusiastic, use gamer slang, and be helpful.",
        },
        history: history
    });
    
    const result = await chat.sendMessage({ message });
    return result.text;
}

export const fetchMerchItems = async (): Promise<MerchItem[]> => {
  // Simulator latency
  await new Promise(resolve => setTimeout(resolve, 600));

  // Localized Merch for KSA/UAE
  return [
    {
      id: 'kb-1',
      name: 'Logitech G915 TKL Arabic',
      price: 'SAR 899',
      brand: 'Logitech',
      category: 'Keyboards',
      description: 'Lightspeed wireless RGB mechanical gaming keyboard with Arabic layout.',
      imageUrl: 'https://image.pollinations.ai/prompt/product%20photography%20of%20logitech%20g915%20tkl%20keyboard%20studio%20lighting%20dark%20background%208k%20resolution%20highly%20detailed?width=500&height=500&nologo=true&seed=kb1',
      buyLink: 'https://www.jarir.com/sa-en/',
      store: 'Jarir Bookstore'
    },
    {
      id: 'ms-1',
      name: 'Razer DeathAdder V3 Pro',
      price: 'SAR 599',
      brand: 'Razer',
      category: 'Mice',
      description: '63g ultra-lightweight wireless ergonomic esports mouse.',
      imageUrl: 'https://image.pollinations.ai/prompt/product%20photography%20of%20razer%20deathadder%20v3%20pro%20mouse%20studio%20lighting%20dark%20background%208k%20resolution%20highly%20detailed?width=500&height=500&nologo=true&seed=ms1',
      buyLink: 'https://www.amazon.sa/',
      store: 'Amazon SA'
    },
    {
      id: 'hs-1',
      name: 'HyperX Cloud II Wireless',
      price: 'SAR 649',
      brand: 'HyperX',
      category: 'Audio',
      description: 'Legendary comfort and durability with 30-hour battery life.',
      imageUrl: 'https://image.pollinations.ai/prompt/product%20photography%20of%20hyperx%20cloud%20ii%20wireless%20headset%20studio%20lighting%20dark%20background%208k%20resolution%20highly%20detailed?width=500&height=500&nologo=true&seed=hs1',
      buyLink: 'https://www.noon.com/saudi-en/',
      store: 'Noon'
    },
    {
      id: 'ch-1',
      name: 'Secretlab TITAN Evo 2022',
      price: 'AED 2,100',
      brand: 'Secretlab',
      category: 'Furniture',
      description: 'The gold standard of gaming chairs. Integrated lumbar support.',
      imageUrl: 'https://image.pollinations.ai/prompt/product%20photography%20of%20secretlab%20titan%20evo%202022%20gaming%20chair%20studio%20lighting%20dark%20background%208k%20resolution%20highly%20detailed?width=500&height=500&nologo=true&seed=ch1',
      buyLink: 'https://secretlab.co/',
      store: 'Secretlab UAE'
    },
    {
      id: 'mn-1',
      name: 'LG 27GP850-B UltraGear',
      price: 'SAR 1,799',
      brand: 'LG',
      category: 'Display',
      description: '27-inch Nano IPS 1ms 165Hz QHD Gaming Monitor.',
      imageUrl: 'https://image.pollinations.ai/prompt/product%20photography%20of%20lg%20ultragear%20gaming%20monitor%20studio%20lighting%20dark%20background%208k%20resolution%20highly%20detailed?width=500&height=500&nologo=true&seed=mn1',
      buyLink: 'https://www.extra.com/',
      store: 'eXtra Stores'
    },
    {
      id: 'mc-1',
      name: 'Elgato Wave:3',
      price: 'SAR 699',
      brand: 'Elgato',
      category: 'Streaming',
      description: 'Premium USB condenser microphone and digital mixing solution.',
      imageUrl: 'https://image.pollinations.ai/prompt/product%20photography%20of%20elgato%20wave%203%20microphone%20studio%20lighting%20dark%20background%208k%20resolution%20highly%20detailed?width=500&height=500&nologo=true&seed=mc1',
      buyLink: 'https://www.virginmegastore.sa/en/',
      store: 'Virgin Megastore'
    },
    {
      id: 'cn-1',
      name: 'Sony DualSense Edge',
      price: 'SAR 849',
      brand: 'PlayStation',
      category: 'Peripherals',
      description: 'Built with high performance and personalization in mind.',
      imageUrl: 'https://image.pollinations.ai/prompt/product%20photography%20of%20sony%20dualsense%20edge%20controller%20studio%20lighting%20dark%20background%208k%20resolution%20highly%20detailed?width=500&height=500&nologo=true&seed=cn1',
      buyLink: 'https://www.jarir.com/sa-en/',
      store: 'Jarir Bookstore'
    },
    {
      id: 'cl-1',
      name: 'Falcons Esports Jersey',
      price: 'SAR 350',
      brand: 'Falcons',
      category: 'Apparel',
      description: 'Official Team Falcons Jersey. Support the green & white.',
      imageUrl: 'https://image.pollinations.ai/prompt/product%20photography%20of%20team%20falcons%20esports%20jersey%20green%20studio%20lighting%20dark%20background%208k%20resolution%20highly%20detailed?width=500&height=500&nologo=true&seed=falcons',
      buyLink: '#',
      store: 'Falcons Shop'
    }
  ];
}