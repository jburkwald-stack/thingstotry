import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({ data: { name: 'Food & Drink', slug: 'food-drink', icon: '🍕', color: '#F59E0B' } }),
    prisma.category.create({ data: { name: 'Outdoors', slug: 'outdoors', icon: '🏔️', color: '#10B981' } }),
    prisma.category.create({ data: { name: 'Arts & Culture', slug: 'arts-culture', icon: '🎨', color: '#8B5CF6' } }),
    prisma.category.create({ data: { name: 'Music', slug: 'music', icon: '🎵', color: '#EC4899' } }),
    prisma.category.create({ data: { name: 'Sports & Fitness', slug: 'sports-fitness', icon: '⚡', color: '#3B82F6' } }),
    prisma.category.create({ data: { name: 'Nightlife', slug: 'nightlife', icon: '🌙', color: '#6366F1' } }),
    prisma.category.create({ data: { name: 'Community', slug: 'community', icon: '🤝', color: '#14B8A6' } }),
    prisma.category.create({ data: { name: 'Wellness', slug: 'wellness', icon: '🧘', color: '#F472B6' } }),
  ]);

  const [food, outdoors, arts, music, sports, nightlife, community, wellness] = categories;

  // Create demo users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'alex@demo.local',
        name: 'Alex Rivera',
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        provider: 'demo',
        provider_id: 'demo-alex',
        points_balance: 2450,
      },
    }),
    prisma.user.create({
      data: {
        email: 'sam@demo.local',
        name: 'Sam Chen',
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam',
        provider: 'demo',
        provider_id: 'demo-sam',
        points_balance: 1800,
      },
    }),
    prisma.user.create({
      data: {
        email: 'jordan@demo.local',
        name: 'Jordan Park',
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan',
        provider: 'demo',
        provider_id: 'demo-jordan',
        points_balance: 3200,
      },
    }),
  ]);

  // Create events (fun local activities)
  const events = await Promise.all([
    prisma.event.create({
      data: {
        title: 'Sunrise Hike at Griffith Observatory',
        description: 'Catch the golden hour from the best viewpoint in LA. Easy trail, incredible views of the Hollywood sign and downtown skyline. Bring coffee!',
        image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        category_id: outdoors.id,
        tags: 'hiking,sunrise,views,nature',
        difficulty: 'EASY',
        is_free: true,
        kid_friendly: true,
        indoor_outdoor: 'OUTDOOR',
        venue_name: 'Griffith Observatory',
        city: 'Los Angeles',
        state: 'CA',
        lat: 34.1184,
        lng: -118.3004,
        start_datetime: new Date('2026-02-15T06:30:00'),
      },
    }),
    prisma.event.create({
      data: {
        title: 'Underground Ramen Pop-Up',
        description: 'A secret ramen chef is doing a one-night pop-up in a converted warehouse. 5 courses of handmade noodles, craft sake pairings. Limited to 30 seats.',
        image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800',
        category_id: food.id,
        tags: 'ramen,popup,foodie,japanese',
        difficulty: 'FUN',
        is_free: false,
        price_min: 65,
        price_max: 85,
        indoor_outdoor: 'INDOOR',
        venue_name: 'The Warehouse District',
        city: 'Los Angeles',
        state: 'CA',
        lat: 34.0407,
        lng: -118.2468,
        start_datetime: new Date('2026-02-16T19:00:00'),
        end_datetime: new Date('2026-02-16T22:00:00'),
      },
    }),
    prisma.event.create({
      data: {
        title: 'Full Moon Sound Bath on the Beach',
        description: 'Crystal bowls, ocean waves, starlight. Lie on the sand and let the vibrations wash over you. Blankets and tea provided.',
        image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
        category_id: wellness.id,
        tags: 'meditation,soundbath,beach,fullmoon',
        difficulty: 'EASY',
        is_free: false,
        price_min: 25,
        price_max: 25,
        indoor_outdoor: 'OUTDOOR',
        venue_name: 'Venice Beach',
        city: 'Los Angeles',
        state: 'CA',
        lat: 33.985,
        lng: -118.473,
        start_datetime: new Date('2026-02-17T20:00:00'),
        end_datetime: new Date('2026-02-17T21:30:00'),
      },
    }),
    prisma.event.create({
      data: {
        title: 'Jazz & Vinyl Night at The Blue Note',
        description: 'Local jazz trio performs while the DJ spins rare vinyl between sets. Craft cocktails, dim lights, good vibes only.',
        image_url: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800',
        category_id: music.id,
        tags: 'jazz,vinyl,cocktails,livemusic',
        difficulty: 'FUN',
        is_free: false,
        price_min: 15,
        price_max: 15,
        indoor_outdoor: 'INDOOR',
        venue_name: 'The Blue Note Lounge',
        city: 'Los Angeles',
        state: 'CA',
        lat: 34.0259,
        lng: -118.2806,
        start_datetime: new Date('2026-02-18T21:00:00'),
        end_datetime: new Date('2026-02-19T01:00:00'),
      },
    }),
    prisma.event.create({
      data: {
        title: 'Pottery & Pour: Make Your Own Mug',
        description: 'Get your hands dirty! Learn wheel-throwing basics while sipping natural wine. Take home a handmade mug fired and glazed.',
        image_url: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800',
        category_id: arts.id,
        tags: 'pottery,art,wine,creative,datenight',
        difficulty: 'FUN',
        is_free: false,
        price_min: 55,
        price_max: 55,
        indoor_outdoor: 'INDOOR',
        venue_name: 'Mud & Fire Studio',
        city: 'Los Angeles',
        state: 'CA',
        lat: 34.0195,
        lng: -118.4912,
        start_datetime: new Date('2026-02-19T18:00:00'),
        end_datetime: new Date('2026-02-19T20:30:00'),
      },
    }),
    prisma.event.create({
      data: {
        title: 'Rooftop Yoga at Sunset',
        description: 'Vinyasa flow 20 stories up with panoramic city views. All levels welcome. Mats provided, just bring yourself.',
        image_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
        category_id: wellness.id,
        tags: 'yoga,rooftop,sunset,fitness',
        difficulty: 'EASY',
        is_free: false,
        price_min: 20,
        price_max: 20,
        indoor_outdoor: 'OUTDOOR',
        venue_name: 'The Standard Rooftop',
        city: 'Los Angeles',
        state: 'CA',
        lat: 34.0482,
        lng: -118.2561,
        start_datetime: new Date('2026-02-20T17:00:00'),
        end_datetime: new Date('2026-02-20T18:15:00'),
      },
    }),
    prisma.event.create({
      data: {
        title: 'Street Taco Crawl through East LA',
        description: 'Hit 5 legendary taco stands in 3 hours with a local foodie guide. Al pastor, birria, mariscos — the real deal.',
        image_url: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800',
        category_id: food.id,
        tags: 'tacos,foodtour,mexican,streetfood',
        difficulty: 'FUN',
        is_free: false,
        price_min: 35,
        price_max: 35,
        kid_friendly: true,
        indoor_outdoor: 'OUTDOOR',
        venue_name: 'East LA Starting Point',
        city: 'Los Angeles',
        state: 'CA',
        lat: 34.0239,
        lng: -118.1723,
        start_datetime: new Date('2026-02-21T11:00:00'),
        end_datetime: new Date('2026-02-21T14:00:00'),
      },
    }),
    prisma.event.create({
      data: {
        title: 'Open Mic Comedy Night',
        description: 'See tomorrow\'s comedians today. Some will crush, some will bomb — that\'s the fun. $5 gets you in plus a drink.',
        image_url: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800',
        category_id: nightlife.id,
        tags: 'comedy,openmic,standup,nightlife',
        difficulty: 'FUN',
        is_free: false,
        price_min: 5,
        price_max: 5,
        indoor_outdoor: 'INDOOR',
        venue_name: 'The Laugh Factory',
        city: 'Los Angeles',
        state: 'CA',
        lat: 34.0901,
        lng: -118.3618,
        start_datetime: new Date('2026-02-22T20:00:00'),
        end_datetime: new Date('2026-02-22T22:00:00'),
      },
    }),
    prisma.event.create({
      data: {
        title: 'Pickup Basketball at Venice Courts',
        description: 'The most famous outdoor courts in the world. All skill levels, just show up. Games run all day, winners stay on.',
        image_url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800',
        category_id: sports.id,
        tags: 'basketball,pickup,venice,sports',
        difficulty: 'CHALLENGE',
        is_free: true,
        indoor_outdoor: 'OUTDOOR',
        venue_name: 'Venice Beach Courts',
        city: 'Los Angeles',
        state: 'CA',
        lat: 33.987,
        lng: -118.474,
        start_datetime: new Date('2026-02-23T10:00:00'),
        end_datetime: new Date('2026-02-23T16:00:00'),
      },
    }),
    prisma.event.create({
      data: {
        title: 'Neighborhood Mural Walk + Art Talk',
        description: 'Guided walk through the Arts District\'s best murals. Meet the artists, hear the stories behind the walls. Camera required.',
        image_url: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800',
        category_id: arts.id,
        tags: 'murals,streetart,walking,photography',
        difficulty: 'EASY',
        is_free: true,
        kid_friendly: true,
        indoor_outdoor: 'OUTDOOR',
        venue_name: 'Arts District',
        city: 'Los Angeles',
        state: 'CA',
        lat: 34.0404,
        lng: -118.2351,
        start_datetime: new Date('2026-02-24T10:00:00'),
        end_datetime: new Date('2026-02-24T12:00:00'),
      },
    }),
    prisma.event.create({
      data: {
        title: 'Mezcal Tasting & Agave Education',
        description: 'Learn the difference between mezcal and tequila (spoiler: it matters). 6 pours, artisan snacks, and a mini bottle to take home.',
        image_url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800',
        category_id: food.id,
        tags: 'mezcal,tasting,cocktails,education',
        difficulty: 'FUN',
        is_free: false,
        price_min: 45,
        price_max: 45,
        indoor_outdoor: 'INDOOR',
        venue_name: 'La Mezcaleria',
        city: 'Los Angeles',
        state: 'CA',
        lat: 34.0176,
        lng: -118.2597,
        start_datetime: new Date('2026-02-25T19:00:00'),
        end_datetime: new Date('2026-02-25T21:00:00'),
      },
    }),
    prisma.event.create({
      data: {
        title: 'Community Garden Volunteer Day',
        description: 'Get your hands in the soil. Plant, weed, harvest, and take home fresh veggies. No experience needed — just vibes and sunshine.',
        image_url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800',
        category_id: community.id,
        tags: 'garden,volunteer,community,nature',
        difficulty: 'EASY',
        is_free: true,
        kid_friendly: true,
        indoor_outdoor: 'OUTDOOR',
        venue_name: 'Silver Lake Community Garden',
        city: 'Los Angeles',
        state: 'CA',
        lat: 34.0869,
        lng: -118.2627,
        start_datetime: new Date('2026-02-26T09:00:00'),
        end_datetime: new Date('2026-02-26T12:00:00'),
      },
    }),
    prisma.event.create({
      data: {
        title: 'Outdoor Cinema: Classic Sci-Fi Night',
        description: 'Blade Runner on a 40-foot inflatable screen under the stars. Bring blankets, lawn chairs, and snacks. Food trucks on site.',
        image_url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800',
        category_id: nightlife.id,
        tags: 'movies,outdoor,cinema,scifi',
        difficulty: 'EASY',
        is_free: false,
        price_min: 12,
        price_max: 12,
        kid_friendly: true,
        indoor_outdoor: 'OUTDOOR',
        venue_name: 'Hollywood Forever Cemetery',
        city: 'Los Angeles',
        state: 'CA',
        lat: 34.0907,
        lng: -118.3196,
        start_datetime: new Date('2026-02-27T19:30:00'),
        end_datetime: new Date('2026-02-27T22:00:00'),
      },
    }),
  ]);

  // Create posts (proof-of-try)
  const posts = await Promise.all([
    prisma.post.create({
      data: {
        user_id: users[0].id,
        event_id: events[0].id,
        caption: 'Caught the sunrise from Griffith this morning. The city looked like it was on fire 🔥 Totally worth the 5am alarm.',
        image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600',
        thumbnail_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300',
        status: 'APPROVED',
        points_awarded: 100,
      },
    }),
    prisma.post.create({
      data: {
        user_id: users[1].id,
        event_id: events[1].id,
        caption: 'This ramen pop-up was INSANE. The tonkotsu was so rich I could feel my arteries closing. 10/10 would risk it again 🍜',
        image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600',
        thumbnail_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300',
        status: 'APPROVED',
        points_awarded: 100,
      },
    }),
    prisma.post.create({
      data: {
        user_id: users[2].id,
        event_id: events[4].id,
        caption: 'Made this wonky mug at the pottery night and honestly I\'ve never been prouder of anything in my life 🏺✨',
        image_url: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600',
        thumbnail_url: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=300',
        status: 'APPROVED',
        points_awarded: 100,
      },
    }),
    prisma.post.create({
      data: {
        user_id: users[0].id,
        event_id: events[6].id,
        caption: 'Five tacos stands, zero regrets. The birria quesatacos changed my life. East LA is the real deal 🌮',
        image_url: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600',
        thumbnail_url: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=300',
        status: 'APPROVED',
        points_awarded: 100,
      },
    }),
    prisma.post.create({
      data: {
        user_id: users[1].id,
        event_id: events[2].id,
        caption: 'Sound bath on the beach was transcendent. I fell asleep to crystal bowls and woke up to waves. Pure magic 🌊🔮',
        image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600',
        thumbnail_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
        status: 'APPROVED',
        points_awarded: 100,
      },
    }),
    prisma.post.create({
      data: {
        user_id: users[2].id,
        event_id: events[8].id,
        caption: 'Got absolutely destroyed at Venice Beach courts but hey, you miss 100% of the shots you don\'t take 🏀💀',
        image_url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600',
        thumbnail_url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=300',
        status: 'APPROVED',
        points_awarded: 100,
      },
    }),
  ]);

  // Add some likes
  await Promise.all([
    prisma.postLike.create({ data: { user_id: users[1].id, post_id: posts[0].id } }),
    prisma.postLike.create({ data: { user_id: users[2].id, post_id: posts[0].id } }),
    prisma.postLike.create({ data: { user_id: users[0].id, post_id: posts[1].id } }),
    prisma.postLike.create({ data: { user_id: users[2].id, post_id: posts[1].id } }),
    prisma.postLike.create({ data: { user_id: users[0].id, post_id: posts[2].id } }),
    prisma.postLike.create({ data: { user_id: users[1].id, post_id: posts[3].id } }),
    prisma.postLike.create({ data: { user_id: users[2].id, post_id: posts[3].id } }),
    prisma.postLike.create({ data: { user_id: users[0].id, post_id: posts[4].id } }),
    prisma.postLike.create({ data: { user_id: users[0].id, post_id: posts[5].id } }),
    prisma.postLike.create({ data: { user_id: users[1].id, post_id: posts[5].id } }),
  ]);

  // Add comments
  await Promise.all([
    prisma.comment.create({ data: { user_id: users[1].id, post_id: posts[0].id, text: 'This view is unreal! Adding this to my list 🙌' } }),
    prisma.comment.create({ data: { user_id: users[2].id, post_id: posts[1].id, text: 'WHERE was this?? I need coordinates immediately' } }),
    prisma.comment.create({ data: { user_id: users[0].id, post_id: posts[2].id, text: 'Your mug has character! Way better than mine lol' } }),
    prisma.comment.create({ data: { user_id: users[1].id, post_id: posts[3].id, text: 'The birria stand on Cesar Chavez is 🐐' } }),
  ]);

  // Create a sample plan
  await prisma.plan.create({
    data: {
      user_id: users[0].id,
      title: 'Perfect Weekend in LA',
      description: 'The ultimate 48-hour LA experience',
      date: new Date('2026-02-21'),
      is_public: true,
      invite_code: 'LAWEEKEND',
      events: {
        create: [
          { event_id: events[0].id },
          { event_id: events[1].id },
          { event_id: events[4].id },
          { event_id: events[6].id },
        ],
      },
    },
  });

  // Create rewards
  await Promise.all([
    prisma.rewardCatalog.create({
      data: {
        type: 'GENERIC',
        title: '10% Off Next Event',
        description: 'Get 10% off any ticketed event in the app',
        cost_points: 500,
        discount_type: 'PERCENT',
        discount_value: '10',
      },
    }),
    prisma.rewardCatalog.create({
      data: {
        type: 'BRAND',
        brand_name: 'Blue Bottle Coffee',
        title: 'Free Coffee',
        description: 'One free drink at any Blue Bottle location',
        cost_points: 300,
        discount_type: 'CODE',
        discount_value: 'TRYNEW',
      },
    }),
    prisma.rewardCatalog.create({
      data: {
        type: 'GENERIC',
        title: 'Premium Badge',
        description: 'Unlock the Explorer badge on your profile',
        cost_points: 1000,
        discount_type: 'CODE',
        discount_value: 'EXPLORER',
      },
    }),
  ]);

  console.log('✅ Seed complete!');
  console.log(`   ${categories.length} categories`);
  console.log(`   ${users.length} users`);
  console.log(`   ${events.length} events`);
  console.log(`   ${posts.length} posts`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
