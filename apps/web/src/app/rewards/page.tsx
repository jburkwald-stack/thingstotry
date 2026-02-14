import { RewardsPage } from './RewardsPage';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export const dynamic = 'force-dynamic';

async function getRewards() {
  try {
    const res = await fetch(`${API}/rewards/catalog`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function Rewards() {
  const rewards = await getRewards();
  return <RewardsPage rewards={rewards} />;
}
