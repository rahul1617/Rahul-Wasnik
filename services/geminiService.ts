
import { GoogleGenAI, Type } from "@google/genai";
import { Game, NewsArticle, GamingEvent, Review, GamerProfile, MerchItem } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const REAL_GAMES_DATA: Game[] = [
    // --- TOP HITS ---
    {
        id: 'pubg-mobile',
        title: 'PUBG MOBILE',
        studio: 'LightSpeed & Quantum',
        publisher: 'Level Infinite',
        genre: 'Battle Royale',
        platform: ['Mobile'],
        description: 'The original Battle Royale on mobile. Extreme battles, 10-minute matches, and massive events.',
        rating: 4.9,
        officialLink: 'https://www.pubgmobile.com/en-US',
        imageUrl: 'https://image.pollinations.ai/prompt/pubg%20mobile%20action%20screenshot%20desert%20realistic%208k?width=1280&height=720&nologo=true',
        trailerVideoId: '0y_1_k2_c6I',
        tags: ['Shooter', 'Battle Royale', 'Survival']
    },
    {
        id: 'fortnite',
        title: 'Fortnite',
        studio: 'Epic Games',
        genre: 'Battle Royale',
        platform: ['PC', 'Console', 'Mobile'],
        description: 'Drop into a vast, destructible world with countless ways to play and win.',
        rating: 4.8,
        officialLink: 'https://www.fortnite.com',
        imageUrl: 'https://image.pollinations.ai/prompt/fortnite%20battle%20bus%20sky%20unreal%20engine%205%208k?width=1280&height=720&nologo=true',
        trailerVideoId: 'WJW-VvmRKsE',
        tags: ['Building', 'Competitive']
    },
    {
        id: 'valorant',
        title: 'Valorant',
        studio: 'Riot Games',
        genre: 'Tactical FPS',
        platform: ['PC'],
        description: 'A 5v5 character-based tactical shooter where precise gunplay meets unique agent abilities.',
        rating: 4.5,
        officialLink: 'https://playvalorant.com',
        imageUrl: 'https://image.pollinations.ai/prompt/valorant%20jett%20anime%20style%20dynamic%20lighting%204k?width=1280&height=720&nologo=true',
        trailerVideoId: 'e_E9W2vsRbQ',
        tags: ['FPS', 'Hero Shooter']
    },
    {
        id: 'the-first-descendant',
        title: 'The First Descendant',
        studio: 'Nexon Games',
        genre: 'Looter Shooter',
        platform: ['PC', 'Console'],
        description: 'Cooperative action RPG shooter with high-quality graphics and intense boss fights.',
        rating: 4.3,
        steamId: '2074920',
        officialLink: 'https://tfd.nexon.com',
        tags: ['Co-op', 'Sci-Fi']
    },
    {
        id: 'once-human',
        title: 'Once Human',
        studio: 'Starry Studio',
        genre: 'Survival',
        platform: ['PC'],
        description: 'A supernatural open-world survival game set in a post-apocalyptic future.',
        rating: 4.5,
        steamId: '2139460',
        officialLink: 'https://www.oncehuman.game',
        tags: ['Horror', 'Open World']
    },
    {
        id: 'zenless-zone-zero',
        title: 'Zenless Zone Zero',
        studio: 'HoYoverse',
        genre: 'Action RPG',
        platform: ['PC', 'Mobile', 'Console'],
        description: 'Urban fantasy action game with a unique art style and fast-paced combat.',
        rating: 4.7,
        officialLink: 'https://zzz.hoyoverse.com',
        imageUrl: 'https://image.pollinations.ai/prompt/zenless%20zone%20zero%20anime%20city%20combat%20stylish%208k?width=1280&height=720&nologo=true',
        tags: ['Anime', 'Hack and Slash']
    },
    {
        id: 'warframe',
        title: 'Warframe',
        studio: 'Digital Extremes',
        genre: 'Action RPG',
        platform: ['PC', 'Console'],
        description: 'Interplanetary space ninja battles with deep progression and massive customization.',
        rating: 4.7,
        steamId: '230410',
        officialLink: 'https://www.warframe.com',
        tags: ['Ninja', 'Loot']
    },
    {
        id: 'path-of-exile',
        title: 'Path of Exile',
        studio: 'Grinding Gear Games',
        genre: 'Action RPG',
        platform: ['PC', 'Console'],
        description: 'The definitive hardcore ARPG. Deep skill trees and a player-driven economy.',
        rating: 4.8,
        steamId: '238960',
        officialLink: 'https://www.pathofexile.com',
        tags: ['Dark Fantasy', 'Hardcore']
    },
    {
        id: 'halo-infinite-mp',
        title: 'Halo Infinite Multiplayer',
        studio: '343 Industries',
        genre: 'FPS',
        platform: ['PC', 'Console'],
        description: 'Legendary arena shooter experience, now free-to-play with seasonal updates.',
        rating: 4.4,
        steamId: '1240440',
        officialLink: 'https://www.halowaypoint.com',
        tags: ['Arena', 'Sci-Fi']
    },
    {
        id: 'war-thunder',
        title: 'War Thunder',
        studio: 'Gaijin Entertainment',
        genre: 'Vehicle Combat',
        platform: ['PC', 'Console'],
        description: 'Comprehensive military simulation featuring aircraft, tanks, and naval vessels.',
        rating: 4.6,
        steamId: '236390',
        officialLink: 'https://warthunder.com',
        tags: ['Simulation', 'History']
    },
    {
        id: 'world-of-tanks',
        title: 'World of Tanks',
        studio: 'Wargaming',
        genre: 'Vehicle Combat',
        platform: ['PC', 'Console'],
        description: 'Team-based tactical tank warfare featuring hundreds of historical vehicles.',
        rating: 4.4,
        steamId: '1407200',
        officialLink: 'https://worldoftanks.com',
        tags: ['Tactical', 'Strategy']
    },
    {
        id: 'apex-legends',
        title: 'Apex Legends',
        studio: 'Respawn Entertainment',
        genre: 'Battle Royale',
        platform: ['PC', 'Console'],
        description: 'Hero-based battle royale with high mobility and tactical team play.',
        rating: 4.7,
        steamId: '1172470',
        officialLink: 'https://www.ea.com/games/apex-legends',
        tags: ['Hero Shooter', 'Fast-Paced']
    },
    {
        id: 'league-of-legends',
        title: 'League of Legends',
        studio: 'Riot Games',
        genre: 'MOBA',
        platform: ['PC'],
        description: 'The world\'s most popular MOBA. Strategy, speed, and massive champion roster.',
        rating: 4.9,
        officialLink: 'https://www.leagueoflegends.com',
        imageUrl: 'https://image.pollinations.ai/prompt/league%20of%20legends%20yasuo%20vs%20yone%20cinematic%208k?width=1280&height=720&nologo=true',
        tags: ['Competitive', 'Esports']
    },
    {
        id: 'dota-2',
        title: 'Dota 2',
        studio: 'Valve',
        genre: 'MOBA',
        platform: ['PC'],
        description: 'Deep, complex tactical MOBA with all heroes free from the start.',
        rating: 4.8,
        steamId: '570',
        officialLink: 'https://www.dota2.com',
        tags: ['Hardcore', 'Strategy']
    },
    {
        id: 'cs2',
        title: 'Counter-Strike 2',
        studio: 'Valve',
        genre: 'FPS',
        platform: ['PC'],
        description: 'The technical evolution of the world\'s premiere tactical shooter.',
        rating: 4.8,
        steamId: '730',
        officialLink: 'https://www.counter-strike.net',
        tags: ['Tactical', 'Competitive']
    },
    {
        id: 'destiny-2',
        title: 'Destiny 2',
        studio: 'Bungie',
        genre: 'MMO FPS',
        platform: ['PC', 'Console'],
        description: 'Explore the solar system and master your Guardian powers in this epic space opera.',
        rating: 4.5,
        steamId: '1085660',
        officialLink: 'https://www.bungie.net',
        tags: ['Space', 'Looter Shooter']
    },
    {
        id: 'genshin-impact',
        title: 'Genshin Impact',
        studio: 'HoYoverse',
        genre: 'Action RPG',
        platform: ['PC', 'Console', 'Mobile'],
        description: 'Vast open world adventure with elemental combat and stunning anime art.',
        rating: 4.8,
        officialLink: 'https://genshin.hoyoverse.com',
        imageUrl: 'https://image.pollinations.ai/prompt/genshin%20impact%20teyvat%20landscape%20cel%20shaded%208k?width=1280&height=720&nologo=true',
        tags: ['Open World', 'Anime']
    },
    {
        id: 'honkai-star-rail',
        title: 'Honkai: Star Rail',
        studio: 'HoYoverse',
        genre: 'Turn-Based RPG',
        platform: ['PC', 'Console', 'Mobile'],
        description: 'Tactical turn-based battles across the stars with cinematic storytelling.',
        rating: 4.7,
        officialLink: 'https://hsr.hoyoverse.com',
        imageUrl: 'https://image.pollinations.ai/prompt/honkai%20star%20rail%20astral%20express%20cosmic%20anime%208k?width=1280&height=720&nologo=true',
        tags: ['Strategy', 'Sci-Fi']
    },
    {
        id: 'tower-of-fantasy',
        title: 'Tower of Fantasy',
        studio: 'Hotta Studio',
        genre: 'MMORPG',
        platform: ['PC', 'Mobile'],
        description: 'Shared open-world RPG with futuristic weapons and character customization.',
        rating: 4.1,
        steamId: '2064650',
        officialLink: 'https://www.toweroffantasy-global.com',
        tags: ['Cyberpunk', 'Anime']
    },
    {
        id: 'lost-ark',
        title: 'Lost Ark',
        studio: 'Smilegate',
        genre: 'Action RPG',
        platform: ['PC'],
        description: 'Isometric MMO with explosive combat and massive raiding content.',
        rating: 4.4,
        steamId: '1599340',
        officialLink: 'https://www.playlostark.com',
        tags: ['MMO', 'Fantasy']
    },
    {
        id: 'smite',
        title: 'Smite',
        studio: 'Hi-Rez',
        genre: 'MOBA',
        platform: ['PC', 'Console'],
        description: 'Third-person battleground of the gods. Action-packed tactical MOBA.',
        rating: 4.5,
        steamId: '386360',
        officialLink: 'https://www.smitegame.com',
        tags: ['Mythology', 'Third-Person']
    },
    {
        id: 'paladins',
        title: 'Paladins',
        studio: 'Hi-Rez',
        genre: 'Hero Shooter',
        platform: ['PC', 'Console'],
        description: 'Fantasy team-based hero shooter with deep card-based customization.',
        rating: 4.3,
        steamId: '444090',
        officialLink: 'https://www.paladins.com',
        tags: ['Fantasy', 'Competitive']
    },
    {
        id: 'brawlhalla',
        title: 'Brawlhalla',
        studio: 'Ubisoft',
        genre: 'Fighting',
        platform: ['PC', 'Console', 'Mobile'],
        description: 'Epic platform fighter for up to 8 players online or local.',
        rating: 4.6,
        steamId: '291550',
        officialLink: 'https://www.brawlhalla.com',
        tags: ['Platformer', 'Party']
    },
    {
        id: 'multiversus',
        title: 'MultiVersus',
        studio: 'Player First Games',
        genre: 'Fighting',
        platform: ['PC', 'Console'],
        description: 'Platform fighter featuring WB characters from Batman to Shaggy.',
        rating: 4.3,
        steamId: '1818750',
        officialLink: 'https://multiversus.com',
        tags: ['Crossover', 'Team-Based']
    },
    {
        id: 'the-finals',
        title: 'The Finals',
        studio: 'Embark Studios',
        genre: 'FPS',
        platform: ['PC', 'Console'],
        description: 'Destructible virtual arenas in a high-stakes combat game show.',
        rating: 4.5,
        steamId: '2073850',
        officialLink: 'https://www.reachthefinals.com',
        tags: ['Destruction', 'Arena']
    },
    {
        id: 'marvel-snap',
        title: 'Marvel Snap',
        studio: 'Second Dinner',
        genre: 'Card Game',
        platform: ['PC', 'Mobile'],
        description: 'Fast-paced strategic card battler with iconic Marvel characters.',
        rating: 4.8,
        steamId: '1997040',
        officialLink: 'https://www.marvelsnap.com',
        tags: ['Marvel', 'Fast-Paced']
    },
    {
        id: 'hearthstone',
        title: 'Hearthstone',
        studio: 'Blizzard',
        genre: 'Card Game',
        platform: ['PC', 'Mobile'],
        description: 'The strategy card game that started the digital card revolution.',
        rating: 4.6,
        officialLink: 'https://playhearthstone.com',
        imageUrl: 'https://image.pollinations.ai/prompt/hearthstone%20card%20battle%20tavern%20warm%20lighting%208k?width=1280&height=720&nologo=true',
        tags: ['Blizzard', 'Fantasy']
    },
    {
        id: 'mtg-arena',
        title: 'MTG Arena',
        studio: 'Wizards of the Coast',
        genre: 'Card Game',
        platform: ['PC', 'Mobile'],
        description: 'The original strategy card game, now in digital format.',
        rating: 4.5,
        steamId: '2141910',
        officialLink: 'https://magic.wizards.com',
        tags: ['Strategy', 'TCG']
    },
    {
        id: 'master-duel',
        title: 'Yu-Gi-Oh! Master Duel',
        studio: 'Konami',
        genre: 'Card Game',
        platform: ['PC', 'Console', 'Mobile'],
        description: 'The ultimate digital edition of the competitive card game.',
        rating: 4.6,
        steamId: '1449850',
        officialLink: 'https://www.konami.com/yugioh/masterduel',
        tags: ['Anime', 'Tactical']
    },
    {
        id: 'fall-guys',
        title: 'Fall Guys',
        studio: 'Mediatonic',
        genre: 'Party Royale',
        platform: ['PC', 'Console', 'Mobile'],
        description: 'Chaotic race courses and hilarious mini-games with dozens of players.',
        rating: 4.4,
        officialLink: 'https://www.fallguys.com',
        imageUrl: 'https://image.pollinations.ai/prompt/fall%20guys%20chaotic%20race%20vibrant%20colors%208k?width=1280&height=720&nologo=true',
        tags: ['Casual', 'Family']
    },
    {
        id: 'stumble-guys',
        title: 'Stumble Guys',
        studio: 'Scopely',
        genre: 'Party Royale',
        platform: ['PC', 'Console', 'Mobile'],
        description: 'Massive multiplayer party knockout game with up to 32 players.',
        rating: 4.2,
        steamId: '1677740',
        officialLink: 'https://www.stumbleguys.com',
        tags: ['Action', 'Fun']
    },
    {
        id: 'roblox',
        title: 'Roblox',
        studio: 'Roblox Corp',
        genre: 'Sandbox',
        platform: ['PC', 'Console', 'Mobile'],
        description: 'Ultimate virtual universe that lets you create and share experiences.',
        rating: 4.5,
        officialLink: 'https://www.roblox.com',
        imageUrl: 'https://image.pollinations.ai/prompt/roblox%20metaverse%20colorful%20creations%208k?width=1280&height=720&nologo=true',
        tags: ['Creation', 'Metaverse']
    },
    {
        id: 'minecraft-classic',
        title: 'Minecraft Classic',
        studio: 'Mojang',
        genre: 'Sandbox',
        platform: ['Web'],
        description: 'Play the original classic Minecraft in your browser for free.',
        rating: 4.5,
        officialLink: 'https://classic.minecraft.net',
        imageUrl: 'https://image.pollinations.ai/prompt/minecraft%20classic%20blocks%20sunset%208k?width=1280&height=720&nologo=true',
        tags: ['Retro', 'Creative']
    },
    {
        id: 'vrchat',
        title: 'VRChat',
        studio: 'VRChat Inc',
        genre: 'Social',
        platform: ['PC', 'VR'],
        description: 'Imagine a world where anything is possible. Socialize in VR.',
        rating: 4.6,
        steamId: '438100',
        officialLink: 'https://hello.vrchat.com',
        tags: ['VR', 'Community']
    },
    {
        id: 'albion-online',
        title: 'Albion Online',
        studio: 'Sandbox Interactive',
        genre: 'MMORPG',
        platform: ['PC', 'Mobile'],
        description: 'Sandbox MMO with player-driven economy and full-loot PvP.',
        rating: 4.3,
        steamId: '761890',
        officialLink: 'https://albiononline.com',
        tags: ['Economy', 'PvP']
    },
    {
        id: 'runescape',
        title: 'RuneScape',
        studio: 'Jagex',
        genre: 'MMORPG',
        platform: ['PC', 'Mobile'],
        description: 'Classic fantasy MMO with over 20 years of history and content.',
        rating: 4.5,
        steamId: '1343400',
        officialLink: 'https://www.runescape.com',
        tags: ['Fantasy', 'Open World']
    },
    {
        id: 'guild-wars-2',
        title: 'Guild Wars 2',
        studio: 'ArenaNet',
        genre: 'MMORPG',
        platform: ['PC'],
        description: 'Vibrant living world with dynamic events and horizontal progression.',
        rating: 4.7,
        steamId: '1284210',
        officialLink: 'https://www.guildwars2.com',
        tags: ['Adventure', 'Co-op']
    },
    {
        id: 'swtor',
        title: 'Star Wars: The Old Republic',
        studio: 'Bioware',
        genre: 'MMORPG',
        platform: ['PC'],
        description: 'Story-driven Star Wars MMO with fully voiced cinematic quests.',
        rating: 4.6,
        steamId: '1286830',
        officialLink: 'https://www.swtor.com',
        tags: ['Star Wars', 'Sci-Fi']
    },
    {
        id: 'pso2-ngs',
        title: 'PSO2 New Genesis',
        studio: 'Sega',
        genre: 'Action RPG',
        platform: ['PC', 'Console'],
        description: 'Open-field online action RPG with incredible character creation.',
        rating: 4.5,
        steamId: '1056640',
        officialLink: 'https://pso2.com',
        tags: ['Anime', 'Sci-Fi']
    },
    {
        id: 'eafc-mobile',
        title: 'EA SPORTS FC Mobile',
        studio: 'EA Sports',
        genre: 'Sports',
        platform: ['Mobile'],
        description: 'Build your Ultimate Team and compete in the world\'s game.',
        rating: 4.8,
        officialLink: 'https://www.ea.com/games/fifa/fifa-mobile',
        imageUrl: 'https://image.pollinations.ai/prompt/ea%20fc%20mobile%20stadium%20soccer%20action%208k?width=1280&height=720&nologo=true',
        tags: ['Football', 'Soccer']
    },
    {
        id: 'free-fire',
        title: 'Free Fire',
        studio: 'Garena',
        genre: 'Battle Royale',
        platform: ['Mobile'],
        description: 'Survival shooter with 10-minute matches on remote islands.',
        rating: 4.7,
        officialLink: 'https://ff.garena.com',
        imageUrl: 'https://image.pollinations.ai/prompt/garena%20free%20fire%20tactical%20action%208k?width=1280&height=720&nologo=true',
        tags: ['Fast-Paced', 'Mobile']
    },
    {
        id: 'mobile-legends',
        title: 'Mobile Legends',
        studio: 'Moonton',
        genre: 'MOBA',
        platform: ['Mobile'],
        description: '5v5 MOBA showdown on the go with real human opponents.',
        rating: 4.7,
        officialLink: 'https://m.mobilelegends.com',
        imageUrl: 'https://image.pollinations.ai/prompt/mobile%20legends%20battle%20arena%20fantasy%20heroes%208k?width=1280&height=720&nologo=true',
        tags: ['Mobile MOBA', 'Team']
    }
];

export const fetchFeaturedGames = async (): Promise<Game[]> => {
  return new Promise((resolve) => {
    const gamesWithImages = REAL_GAMES_DATA.map(game => {
      let imageUrl = game.imageUrl;
      if (!imageUrl) {
        if (game.steamId) {
             imageUrl = `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${game.steamId}/capsule_616x353.jpg`;
        } else {
             imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(game.title + ' high quality gaming render 8k resolution')}?width=640&height=360&nologo=true&seed=${game.id}`;
        }
      }
      return { ...game, imageUrl };
    });
    setTimeout(() => resolve(gamesWithImages), 500);
  });
};

export const fetchNewsWithSearch = async (): Promise<NewsArticle[]> => {
  try {
    const searchResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Search for 12 latest gaming news stories (tournaments, updates, new free games) prioritizing the MENA region. Provide Headline, Summary, Source, and URL.",
      config: { tools: [{ googleSearch: {} }] },
    });
    const formattingResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `JSON array from: ${searchResponse.text}`,
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
    return parsed.map((item: any) => ({
        ...item,
        imageUrl: `https://image.pollinations.ai/prompt/${encodeURIComponent(item.headline)}?width=500&height=250&nologo=true`
    }));
  } catch (error) {
    return [];
  }
};

export const fetchGamingEvents = async (): Promise<GamingEvent[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "List 12 major upcoming gaming tournaments or conventions worldwide.",
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
    return [];
  }
};

export const fetchGameReviews = async (): Promise<Review[]> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: "Generate 12 reviews for popular free games from professional streamer perspectives.",
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
};

export const fetchTopGamers = async (): Promise<GamerProfile[]> => {
    const getAvatar = (name: string) => `https://image.pollinations.ai/prompt/esports%20portrait%20${encodeURIComponent(name)}?width=150&height=150&nologo=true`;
    const gamers: GamerProfile[] = [
        { id: '1', name: 'Hassan', handle: 'AboFlah', region: 'Kuwait', game: 'Variety', imageUrl: getAvatar('AboFlah'), socials: { youtube: '#' } },
        { id: '2', name: 'Bandar', handle: 'BanderitaX', region: 'KSA', game: 'Horror', imageUrl: getAvatar('BanderitaX'), socials: { youtube: '#' } },
        { id: '3', name: 'Ahmad', handle: 'Shong', region: 'KSA', game: 'Fortnite', imageUrl: getAvatar('Shong'), socials: { youtube: '#' } }
    ];
    return new Promise(resolve => setTimeout(() => resolve(gamers), 500));
};

export const chatWithGamerPal = async (history: any[], message: string) => {
    const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: { systemInstruction: "You are Gamer Pal, a helpful AI assistant for gamers." },
        history: history
    });
    const result = await chat.sendMessage({ message });
    return result.text;
};

export const fetchMerchItems = async (): Promise<MerchItem[]> => {
  return [
    { id: '1', name: 'Pro Keyboard', price: 'SAR 499', brand: 'Logitech', category: 'Keyboards', description: 'RGB Mechanical Gaming Keyboard', imageUrl: 'https://image.pollinations.ai/prompt/gaming%20keyboard%20rgb?width=500&height=500&nologo=true', buyLink: '#', store: 'Unreal Store' }
  ];
};
