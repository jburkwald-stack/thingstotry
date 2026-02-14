import { PlanDetailPage } from './PlanDetailPage';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export const dynamic = 'force-dynamic';

async function getPlan(id: string) {
  try {
    const res = await fetch(`${API}/plans/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function PlanPage({ params }: { params: { id: string } }) {
  const plan = await getPlan(params.id);
  if (!plan) {
    return (
      <div className="px-4 pt-20 text-center">
        <p className="text-dark-400">Plan not found</p>
      </div>
    );
  }
  return <PlanDetailPage plan={plan} />;
}
