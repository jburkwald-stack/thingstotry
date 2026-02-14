import { ExplorePage } from './ExplorePage';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export const dynamic = 'force-dynamic';

async function getData() {
  try {
    const [eventsRes, catsRes] = await Promise.all([
      fetch(`${API}/events?limit=20`, { cache: 'no-store' }),
      fetch(`${API}/events/categories`, { cache: 'no-store' }),
    ]);
    const events = eventsRes.ok ? await eventsRes.json() : { data: [] };
    const categories = catsRes.ok ? await catsRes.json() : [];
    return { events: events.data || [], categories };
  } catch {
    return { events: [], categories: [] };
  }
}

export default async function Explore() {
  const { events, categories } = await getData();
  return <ExplorePage initialEvents={events} categories={categories} />;
}
