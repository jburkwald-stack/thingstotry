import { PlansPage } from './PlansPage';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export const dynamic = 'force-dynamic';

async function getPlans() {
  try {
    const res = await fetch(`${API}/plans`, { cache: 'no-store' });
    if (!res.ok) return { data: [] };
    return res.json();
  } catch {
    return { data: [] };
  }
}

export default async function Plans() {
  const plans = await getPlans();
  return <PlansPage plans={plans.data || []} />;
}
