import { FeedPage } from './FeedPage';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export const dynamic = 'force-dynamic';

async function getFeed() {
  try {
    const res = await fetch(`${API}/feed?limit=20`, { cache: 'no-store' });
    if (!res.ok) return { data: [] };
    return res.json();
  } catch {
    return { data: [] };
  }
}

export default async function Home() {
  const feed = await getFeed();
  return <FeedPage initialPosts={feed.data || []} />;
}
