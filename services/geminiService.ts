import { GoogleGenAI, Type } from "@google/genai";
import { Game, NewsArticle, GamingEvent, Review, GamerProfile, MerchItem } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Comprehensive List of Free Games
// Steam IDs added where available to fetch real box art/capsule images.
const REAL_GAMES_DATA: Game[] = [
    // --- TOP TRENDING / POPULAR ---
    {
        id: 'fortnite',
        title: 'Fortnite',
        studio: 'Epic Games',
        genre: 'Battle Royale',
        platform: ['PC', 'Console', 'Mobile'],
        description: 'Drop into a vast, destructible world where no two games are ever the same. Build huge forts, find loot and squad up with friends.',
        rating: 4.8,
        officialLink: 'https://www.fortnite.com',
        isNewRelease: false,
        imageUrl: 'https://image.pollinations.ai/prompt/fortnite%20battle%20royale%20action%20gameplay%20vibrant%20colors%20building?width=640&height=360&nologo=true&seed=fortnite_main',
        trailerVideoId: 'WJW-VvmRKsE',
        tags: ['Shooter', 'Building', 'Multiplayer', 'Event', 'Cross-Platform']
    },
    {
        id: 'gta-v',
        title: 'Grand Theft Auto V',
        studio: 'Rockstar Games',
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
        genre: 'Sandbox',
        platform: ['PC', 'Mobile', 'Console'],
        description: 'The ultimate virtual universe that lets you create, share experiences, and be anything.',
        rating: 4.5,
        officialLink: 'https://www.roblox.com',
        isNewRelease: false,
        imageUrl: 'https://image.pollinations.ai/prompt/roblox%20gameplay%20screenshot%20colorful%20parkour%20obby%20fun?width=640&height=360&nologo=true&seed=roblox_main',
        trailerVideoId: 'eAvXhNlO-rA',
        tags: ['Creation', 'Social', 'Multiplayer', 'Casual', 'Adventure']
    },
    {
        id: 'minecraft-classic',
        title: 'Minecraft Classic',
        studio: 'Mojang',
        genre: 'Sandbox',
        platform: ['Web'],
        description: 'Play the classic version of Minecraft in your browser for free.',
        rating: 4.5,
        officialLink: 'https://classic.minecraft.net/',
        isNewRelease: false,
        imageUrl: 'https://image.pollinations.ai/prompt/minecraft%20classic%20browser%20gameplay%20grass%20blocks%20sky?width=640&height=360&nologo=true&seed=minecraft_classic',
        trailerVideoId: 'MmB9b5njVbA',
        tags: ['Survival', 'Building', 'Retro', 'Browser', 'Crafting']
    },
    {
        id: 'league-of-legends',
        title: 'League of Legends',
        studio: 'Riot Games',
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
        genre: 'Tactical FPS',
        platform: ['PC'],
        description: 'A 5v5 character-based tactical shooter where precise gunplay meets unique agent abilities.',
        rating: 4.5,
        officialLink: 'https://playvalorant.com',
        isNewRelease: false,
        imageUrl: 'https://image.pollinations.ai/prompt/valorant%20jett%20anime%20style%20action%20pose%20riot%20games?width=640&height=360&nologo=true&seed=valorant_official',
        trailerVideoId: 'e_E9W2vsRbQ',
        tags: ['FPS', 'Shooter', 'Competitive', 'Hero Shooter', 'Team']
    },
    {
        id: 'cs2',
        title: 'Counter-Strike 2',
        studio: 'Valve',
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
        genre: 'Action RPG',
        platform: ['PC', 'Console', 'Mobile'],
        description: 'Step into Teyvat, a vast world teeming with life and flowing with elemental energy.',
        rating: 4.8,
        officialLink: 'https://genshin.hoyoverse.com',
        isNewRelease: false,
        imageUrl: 'https://image.pollinations.ai/prompt/genshin%20impact%20anime%20landscape%20teyvat%20character?width=640&height=360&nologo=true&seed=genshin_impact',
        trailerVideoId: 'TAlKhARUcoY',
        tags: ['Open World', 'Anime', 'Adventure', 'Gacha', 'Singleplayer']
    },
    {
        id: 'cod-mobile',
        title: 'Call of Duty: Mobile',
        studio: 'Activision',
        genre: 'FPS',
        platform: ['Mobile'],
        description: 'Console quality HD gaming on your phone with customizable controls, voice and text chat, and thrilling 3D graphics.',
        rating: 4.6,
        officialLink: 'https://www.callofduty.com/mobile',
        isNewRelease: false,
        imageUrl: 'https://image.pollinations.ai/prompt/call%20of%20duty%20mobile%20soldier%20tactical%20gear%20action?width=640&height=360&nologo=true&seed=cod_mobile',
        trailerVideoId: '7h33d3_tZ7c',
        tags: ['Shooter', 'Battle Royale', 'Multiplayer', 'Action', 'Zombies']
    },
    {
        id: 'cod-warzone',
        title: 'Call of Duty: Warzone',
        studio: 'Activision',
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
        studio: 'Respawn / EA',
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
        studio: 'Psyonix / Epic',
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
        genre: 'Platformer',
        platform: ['PC', 'Console'],
        description: 'Fall Guys is a free, cross-platform, massively multiplayer, party royale game where you and your fellow contestants compete through escalating rounds of absurd obstacle course chaos.',
        rating: 4.4,
        officialLink: 'https://www.fallguys.com',
        isNewRelease: false,
        imageUrl: 'https://image.pollinations.ai/prompt/fall%20guys%20colorful%20obstacle%20course%20beans%20running?width=640&height=360&nologo=true&seed=fall_guys',
        trailerVideoId: 'z6UrdUAZ7wM',
        tags: ['Battle Royale', 'Casual', 'Multiplayer', 'Funny', 'Family']
    },
    {
        id: 'overwatch-2',
        title: 'Overwatch 2',
        studio: 'Blizzard',
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
        genre: 'Fighting / Action',
        platform: ['Mobile'],
        description: 'Fast-paced 3v3 multiplayer and battle royale for mobile.',
        rating: 4.6,
        officialLink: 'https://supercell.com/en/games/brawlstars',
        isNewRelease: false,
        imageUrl: 'https://image.pollinations.ai/prompt/brawl%20stars%20cartoon%20characters%20battle%20arena%20supercell?width=640&height=360&nologo=true&seed=brawl_stars',
        tags: ['MOBA', 'Battle Royale', 'Casual', 'Team', 'Cartoony']
    },
    {
        id: 'dota-2',
        title: 'Dota 2',
        studio: 'Valve',
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
             imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(game.title + ' video game gameplay screenshot high quality unreal engine 5')}?width=640&height=360&nologo=true&seed=${game.id.length}`;
        }
      }

      // Generate a studio logo if one isn't provided (simulated)
      // Using a consistent seed based on studio name ensures the same "logo" appears for the same studio.
      // Small dimension (64x64) is sufficient for a logo.
      const studioLogoUrl = `https://image.pollinations.ai/prompt/minimalist%20logo%20for%20video%20game%20studio%20${encodeURIComponent(game.studio)}%20white%20on%20black%20background%20vector%20graphics?width=64&height=64&nologo=true&seed=${encodeURIComponent(game.studio)}`;

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
    const searchResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Find 12 distinct, latest, and trending news stories about video games (console, PC, mobile) and the gaming industry from major outlets (IGN, Gamespot, Polygon, etc.) published in the last 24 hours. For each story, provide the Headline, a detailed Summary, the Source Name, the Date, and the direct Source URL in the text.",
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
        imageUrl: `https://image.pollinations.ai/prompt/${encodeURIComponent('video game news ' + item.headline + ' ' + item.summary)}?width=500&height=250&nologo=true`
    }));

  } catch (error) {
    console.error("Failed to fetch news:", error);
    // Fallback static data if API fails
    return [
        {
            id: 'fallback-1',
            headline: 'Global Server Maintenance Scheduled',
            summary: 'Several major online titles will undergo maintenance this weekend. Check official status pages for details.',
            source: 'UnrealGames System',
            date: 'Just now',
            url: '#',
            imageUrl: 'https://image.pollinations.ai/prompt/server%20maintenance%20gaming?width=500&height=250&nologo=true'
        }
    ];
  }
};

export const fetchGamingEvents = async (): Promise<GamingEvent[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      // INCREASED COUNT TO 12
      contents: "List 12 upcoming major gaming events, tournaments, or season updates for free-to-play games. Include specific locations (City, Country) or 'Online' if applicable.",
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
            // INCREASED COUNT TO 8
            contents: "Generate 12 short, punchy reviews for popular free games (like Valorant, Genshin Impact, Warzone) from the perspective of pro gamers or streamers.",
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
    const getIndianAvatar = (name: string) => 
      `https://image.pollinations.ai/prompt/portrait%20of%20famous%20indian%20gamer%20${encodeURIComponent(name)}%20face%20close%20up%20esports%20jersey%20neon%20lighting%20professional%20photography%20hyperrealistic?width=150&height=150&nologo=true&seed=${name}`;

    // Curated list of 50 Top Indian Gamers + a few global ones
    const gamers: GamerProfile[] = [
        // --- Global Icons ---
        {
            id: 'faker',
            name: 'Lee Sang-hyeok',
            handle: 'Faker',
            region: 'South Korea',
            game: 'League of Legends',
            imageUrl: 'https://image.pollinations.ai/prompt/portrait%20of%20Faker%20T1%20esports%20gamer%20glasses%20serious%20expression%20korean%20jersey?width=150&height=150&nologo=true&seed=faker',
            socials: { twitch: 'https://www.twitch.tv/faker', instagram: 'https://www.instagram.com/faker' }
        },
        // --- Indian Icons ---
        {
            id: 'mortal',
            name: 'Naman Mathur',
            handle: 'Mortal',
            region: 'India',
            game: 'BGMI',
            imageUrl: getIndianAvatar('Mortal Naman Mathur'),
            socials: { youtube: 'https://www.youtube.com/c/Mortal', instagram: 'https://www.instagram.com/ig_mortal' }
        },
        {
            id: 'scout',
            name: 'Tanmay Singh',
            handle: 'ScoutOP',
            region: 'India',
            game: 'BGMI',
            imageUrl: getIndianAvatar('ScoutOP Tanmay Singh'),
            socials: { youtube: 'https://www.youtube.com/c/scout', instagram: 'https://www.instagram.com/scoutop' }
        },
        {
            id: 'jonathan',
            name: 'Jonathan Amaral',
            handle: 'Jonathan',
            region: 'India',
            game: 'BGMI',
            imageUrl: getIndianAvatar('Jonathan Gaming'),
            socials: { youtube: 'https://www.youtube.com/c/JONATHANGAMINGYT', instagram: 'https://www.instagram.com/jonathangamingyt' }
        },
        {
            id: 'dynamo',
            name: 'Aadii Sawant',
            handle: 'Dynamo Gaming',
            region: 'India',
            game: 'BGMI',
            imageUrl: getIndianAvatar('Dynamo Gaming'),
            socials: { youtube: 'https://www.youtube.com/c/DynamoGaming', instagram: 'https://www.instagram.com/dynamo__gaming' }
        },
        {
            id: 'techno',
            name: 'Ujjwal Chaurasia',
            handle: 'Techno Gamerz',
            region: 'India',
            game: 'GTA V / Minecraft',
            imageUrl: getIndianAvatar('Techno Gamerz Ujjwal'),
            socials: { youtube: 'https://www.youtube.com/c/TechnoGamerzOfficial', instagram: 'https://www.instagram.com/ujjwalgamer' }
        },
        {
            id: 'total',
            name: 'Ajay',
            handle: 'Total Gaming',
            region: 'India',
            game: 'Free Fire',
            imageUrl: getIndianAvatar('Total Gaming Ajay'),
            socials: { youtube: 'https://www.youtube.com/c/TotalGaming093', instagram: 'https://www.instagram.com/totalgaming_official' }
        },
        {
            id: 'carry',
            name: 'Ajey Nagar',
            handle: 'CarryisLive',
            region: 'India',
            game: 'Variety',
            imageUrl: getIndianAvatar('CarryMinati Ajey Nagar'),
            socials: { youtube: 'https://www.youtube.com/c/CarryisLive', instagram: 'https://www.instagram.com/carryminati' }
        },
        {
            id: 'desigamers',
            name: 'Amit Sharma',
            handle: 'Desi Gamers',
            region: 'India',
            game: 'Free Fire',
            imageUrl: getIndianAvatar('Desi Gamers Amit'),
            socials: { youtube: 'https://www.youtube.com/c/DesiGamers_Amit', instagram: 'https://www.instagram.com/desigamers_official' }
        },
        {
            id: 'gyan',
            name: 'Sujan Mistri',
            handle: 'Gyan Gaming',
            region: 'India',
            game: 'Free Fire',
            imageUrl: getIndianAvatar('Gyan Gaming Sujan'),
            socials: { youtube: 'https://www.youtube.com/c/GyanGaming', instagram: 'https://www.instagram.com/gyangaming' }
        },
        {
            id: 'lokesh',
            name: 'Lokesh Raj',
            handle: 'Lokesh Gamer',
            region: 'India',
            game: 'Free Fire',
            imageUrl: getIndianAvatar('Lokesh Gamer'),
            socials: { youtube: 'https://www.youtube.com/c/LOKESHGAMER', instagram: 'https://www.instagram.com/lokeshraj07' }
        },
        {
            id: 'asgaming',
            name: 'Sahil Rana',
            handle: 'AS Gaming',
            region: 'India',
            game: 'Free Fire',
            imageUrl: getIndianAvatar('AS Gaming Sahil'),
            socials: { youtube: 'https://www.youtube.com/c/ASGaming', instagram: 'https://www.instagram.com/sahilrana' }
        },
        {
            id: 'twoside',
            name: 'Ritik & Jash',
            handle: 'Two Side Gamers',
            region: 'India',
            game: 'Free Fire',
            imageUrl: getIndianAvatar('Two Side Gamers'),
            socials: { youtube: 'https://www.youtube.com/c/TwoSideGamers', instagram: 'https://www.instagram.com/twosidegamers' }
        },
        {
            id: 'mythpat',
            name: 'Mithilesh Patankar',
            handle: 'Mythpat',
            region: 'India',
            game: 'Variety / Minecraft',
            imageUrl: getIndianAvatar('Mythpat Mithilesh'),
            socials: { youtube: 'https://www.youtube.com/c/Mythpat', instagram: 'https://www.instagram.com/mythpat' }
        },
        {
            id: 'triggered',
            name: 'Nischay Malhan',
            handle: 'Live Insaan',
            region: 'India',
            game: 'Variety',
            imageUrl: getIndianAvatar('Live Insaan Nischay'),
            socials: { youtube: 'https://www.youtube.com/c/LiveInsaan', instagram: 'https://www.instagram.com/triggeredinsaan' }
        },
        {
            id: 'bbs',
            name: 'Shubham Saini',
            handle: 'BeastBoyShub',
            region: 'India',
            game: 'Variety',
            imageUrl: getIndianAvatar('BeastBoyShub'),
            socials: { youtube: 'https://www.youtube.com/c/BeastBoyShub', instagram: 'https://www.instagram.com/beastboyshub' }
        },
        {
            id: 'kronten',
            name: 'Chetan Chandgude',
            handle: 'Kronten',
            region: 'India',
            game: 'BGMI',
            imageUrl: getIndianAvatar('Kronten Gaming'),
            socials: { youtube: 'https://www.youtube.com/c/KrontenGaming', instagram: 'https://www.instagram.com/krontengaming' }
        },
        {
            id: 'ghatak',
            name: 'Abhijeet Andhare',
            handle: 'Ghatak',
            region: 'India',
            game: 'BGMI',
            imageUrl: getIndianAvatar('Ghatak Gaming'),
            socials: { youtube: 'https://www.youtube.com/c/GHATAKGAMING', instagram: 'https://www.instagram.com/ghatak_official' }
        },
        {
            id: 'viper',
            name: 'Yash Soni',
            handle: 'Viper',
            region: 'India',
            game: 'BGMI',
            imageUrl: getIndianAvatar('Soul Viper'),
            socials: { youtube: 'https://www.youtube.com/c/SOULViper', instagram: 'https://www.instagram.com/soul_viper' }
        },
        {
            id: 'regaltos',
            name: 'Parv Singh',
            handle: 'Regaltos',
            region: 'India',
            game: 'BGMI',
            imageUrl: getIndianAvatar('Soul Regaltos'),
            socials: { youtube: 'https://www.youtube.com/c/SOULRegaltos', instagram: 'https://www.instagram.com/soul_regaltos' }
        },
        {
            id: 'snax',
            name: 'Raj Varma',
            handle: 'Snax',
            region: 'India',
            game: 'BGMI',
            imageUrl: getIndianAvatar('Snax Gaming'),
            socials: { youtube: 'https://www.youtube.com/c/SnaxGaming', instagram: 'https://www.instagram.com/snaxgaming' }
        },
        {
            id: 'mavi',
            name: 'Harmandeep Singh',
            handle: 'Mavi',
            region: 'India',
            game: 'BGMI',
            imageUrl: getIndianAvatar('Mavi Gaming'),
            socials: { youtube: 'https://www.youtube.com/c/MaviGaming', instagram: 'https://www.instagram.com/mavi_harman' }
        },
        {
            id: 'clutchgod',
            name: 'Vivek Aabhas',
            handle: 'ClutchGod',
            region: 'India',
            game: 'BGMI',
            imageUrl: getIndianAvatar('ClutchGod'),
            socials: { youtube: 'https://www.youtube.com/c/ClutchGod', instagram: 'https://www.instagram.com/clutchgod_official' }
        },
        {
            id: 'zgod',
            name: 'Abhishek Choudhary',
            handle: 'ZGod',
            region: 'India',
            game: 'BGMI',
            imageUrl: getIndianAvatar('ZGod Gaming'),
            socials: { youtube: 'https://www.youtube.com/c/ZGODGAMING', instagram: 'https://www.instagram.com/zgod_official' }
        },
        {
            id: 'neyoo',
            name: 'Suraj Majumdar',
            handle: 'Neyoo',
            region: 'India',
            game: 'BGMI',
            imageUrl: getIndianAvatar('Neyoo Gaming'),
            socials: { youtube: 'https://www.youtube.com/c/Neyoo', instagram: 'https://www.instagram.com/neyoo_official' }
        },
        {
            id: 'rakazone',
            name: 'Rishab Karanwal',
            handle: 'Rakazone',
            region: 'India',
            game: 'Valorant / GTA V',
            imageUrl: getIndianAvatar('Rakazone Gaming'),
            socials: { youtube: 'https://www.youtube.com/c/RakazoneGaming', instagram: 'https://www.instagram.com/rakazonegaming' }
        },
        {
            id: 'hydraflick',
            name: 'Rohan Ledwani',
            handle: 'HydraFlick',
            region: 'India',
            game: 'Variety / Valorant',
            imageUrl: getIndianAvatar('HydraFlick'),
            socials: { youtube: 'https://www.youtube.com/c/HydraFlick', instagram: 'https://www.instagram.com/hydraflick' }
        },
        {
            id: 'skrossi',
            name: 'Ganesh Gangadhar',
            handle: 'SkRossi',
            region: 'India',
            game: 'Valorant',
            imageUrl: getIndianAvatar('SkRossi Valorant'),
            socials: { twitter: 'https://twitter.com/skrossi' }
        },
        {
            id: 'hellranger',
            name: 'Debanjan Das',
            handle: 'HellrangeR',
            region: 'India',
            game: 'Valorant',
            imageUrl: getIndianAvatar('HellrangeR'),
            socials: { twitter: 'https://twitter.com/hellranger', instagram: 'https://www.instagram.com/hellranger' }
        },
        {
            id: 'excali',
            name: 'Karan Mhaswadkar',
            handle: 'Excali',
            region: 'India',
            game: 'Valorant',
            imageUrl: getIndianAvatar('Excali'),
            socials: { twitter: 'https://twitter.com/excali', instagram: 'https://www.instagram.com/excali' }
        },
        {
            id: 'v3nom',
            name: 'Ankit Panth',
            handle: 'V3nom',
            region: 'India',
            game: 'Valorant',
            imageUrl: getIndianAvatar('V3nom Ankit Panth'),
            socials: { youtube: 'https://www.youtube.com/c/AnkitPanth', instagram: 'https://www.instagram.com/ankitpanth' }
        }
    ];

    return new Promise(resolve => setTimeout(() => resolve(gamers), 600));
}

export const chatWithGamerPal = async (history: {role: string, parts: {text: string}[]}[], message: string) => {
    const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: "You are 'Gamer Pal', a helpful AI assistant on the unrealgames.cloud platform. You know everything about free-to-play games. Be enthusiastic, use gamer slang appropriately (GG, OP, meta), and help users find games.",
        },
        history: history
    });
    
    const result = await chat.sendMessage({ message });
    return result.text;
}

export const fetchMerchItems = async (): Promise<MerchItem[]> => {
  // Simulator latency
  await new Promise(resolve => setTimeout(resolve, 600));

  return [
    {
      id: 'kb-1',
      name: 'Logitech G915 TKL',
      price: '$229.99',
      brand: 'Logitech',
      category: 'Keyboards',
      description: 'Lightspeed wireless RGB mechanical gaming keyboard without tenkey.',
      imageUrl: 'https://image.pollinations.ai/prompt/logitech%20g915%20tkl%20wireless%20mechanical%20keyboard%20rgb%20slim%20studio%20lighting%20product%20shot?width=500&height=500&nologo=true&seed=kb1',
      buyLink: 'https://www.amazon.com/Logitech-G915-TKL-Tenkeyless-Mechanical/dp/B085RLZ1C4',
      store: 'Amazon'
    },
    {
      id: 'ms-1',
      name: 'Razer DeathAdder V3 Pro',
      price: '$149.99',
      brand: 'Razer',
      category: 'Mice',
      description: '63g ultra-lightweight wireless ergonomic esports mouse.',
      imageUrl: 'https://image.pollinations.ai/prompt/razer%20deathadder%20v3%20pro%20white%20mouse%20product%20photography%20studio%20lighting?width=500&height=500&nologo=true&seed=ms1',
      buyLink: 'https://www.bestbuy.com/site/razer-deathadder-v3-pro-lightweight-wireless-optical-gaming-mouse-black/6510646.p?skuId=6510646',
      store: 'Best Buy'
    },
    {
      id: 'hs-1',
      name: 'HyperX Cloud II Wireless',
      price: '$149.99',
      brand: 'HyperX',
      category: 'Audio',
      description: 'Legendary comfort and durability with 30-hour battery life.',
      imageUrl: 'https://image.pollinations.ai/prompt/hyperx%20cloud%20ii%20wireless%20headset%20red%20and%20black%20studio%20lighting?width=500&height=500&nologo=true&seed=hs1',
      buyLink: 'https://www.amazon.com/HyperX-Cloud-Wireless-Comfortable-Noise-Cancelling/dp/B08NCMY4N7',
      store: 'Amazon'
    },
    {
      id: 'ch-1',
      name: 'Secretlab TITAN Evo 2022',
      price: '$549.00',
      brand: 'Secretlab',
      category: 'Furniture',
      description: 'The gold standard of gaming chairs. Integrated lumbar support.',
      imageUrl: 'https://image.pollinations.ai/prompt/secretlab%20titan%20evo%202022%20black%20gaming%20chair%20studio%20product%20photography?width=500&height=500&nologo=true&seed=ch1',
      buyLink: 'https://secretlab.co/products/titan-evo-2022-series',
      store: 'Secretlab'
    },
    {
      id: 'mn-1',
      name: 'LG 27GP850-B UltraGear',
      price: '$449.99',
      brand: 'LG',
      category: 'Display',
      description: '27-inch Nano IPS 1ms 165Hz QHD Gaming Monitor.',
      imageUrl: 'https://image.pollinations.ai/prompt/lg%20ultragear%20gaming%20monitor%20desk%20setup%20product%20photography?width=500&height=500&nologo=true&seed=mn1',
      buyLink: 'https://www.newegg.com/p/N82E16824026196',
      store: 'Newegg'
    },
    {
      id: 'mc-1',
      name: 'Elgato Wave:3',
      price: '$149.99',
      brand: 'Elgato',
      category: 'Streaming',
      description: 'Premium USB condenser microphone and digital mixing solution.',
      imageUrl: 'https://image.pollinations.ai/prompt/elgato%20wave%203%20microphone%20streaming%20setup%20product%20photography?width=500&height=500&nologo=true&seed=mc1',
      buyLink: 'https://www.corsair.com/us/en/p/streaming-gear/10mab9901/wave-3-10mab9901',
      store: 'Corsair'
    },
    {
      id: 'cn-1',
      name: 'Sony DualSense Edge',
      price: '$199.99',
      brand: 'PlayStation',
      category: 'Peripherals',
      description: 'Built with high performance and personalization in mind.',
      imageUrl: 'https://image.pollinations.ai/prompt/sony%20dualsense%20edge%20controller%20white%20background%20studio%20lighting?width=500&height=500&nologo=true&seed=cn1',
      buyLink: 'https://direct.playstation.com/en-us/accessories/dualsense-edge-wireless-controller',
      store: 'PlayStation'
    },
    {
      id: 'cl-1',
      name: '100 Thieves Foundation Jersey',
      price: '$85.00',
      brand: '100 Thieves',
      category: 'Apparel',
      description: 'Premium red jersey featuring the 100 Thieves logo.',
      imageUrl: 'https://image.pollinations.ai/prompt/100%20thieves%20esports%20jersey%20fashion%20photoshoot%20studio%20lighting?width=500&height=500&nologo=true&seed=cl1',
      buyLink: 'https://100thieves.com/collections/apparel',
      store: '100 Thieves'
    }
  ];
}