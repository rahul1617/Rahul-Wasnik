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