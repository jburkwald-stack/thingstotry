import { EventDetailPage } from './EventDetailPage';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export const dynamic = 'force-dynamic';

async function getEvent(id: string) {
  try {
    const res = await fetch(`${API}/events/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function EventPage({ params }: { params: { id: string } }) {
  const event = await getEvent(params.id);
  if (!event) {
    return (
      <div className="px-4 pt-20 text-center">
        <p className="text-dark-400">Event not found</p>
      </div>
    );
  }
  return <EventDetailPage event={event} />;
}
