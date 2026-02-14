'use client';

import { motion } from 'framer-motion';
import { Trophy, Star, Gift, Zap } from 'lucide-react';

export function RewardsPage({ rewards }: { rewards: any[] }) {
  const userPoints = 2450; // Mock

  return (
    <div className="px-4 pt-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold mb-1">
          <span className="gradient-text">Rewards</span>
        </h1>
        <p className="text-xs text-dark-400">Earn points by trying new things</p>
      </motion.div>

      {/* Points balance */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="mt-5 glass rounded-2xl p-5 glow relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-3xl" />
        <div className="relative">
          <p className="text-xs text-dark-400 font-medium mb-1">Your Balance</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold gradient-text">{userPoints.toLocaleString()}</span>
            <span className="text-sm text-dark-400">pts</span>
          </div>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5 text-xs text-dark-300">
              <Zap size={13} className="text-amber-400" />
              <span>+100 pts per post</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-dark-300">
              <Star size={13} className="text-purple-400" />
              <span>Level 5 Explorer</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Rewards catalog */}
      <h2 className="text-sm font-semibold text-white mt-6 mb-3">Redeem Rewards</h2>
      <div className="space-y-3 pb-8">
        {rewards.length === 0 ? (
          <div className="text-center py-12">
            <Gift className="mx-auto mb-3 text-dark-600" size={40} />
            <p className="text-dark-400 text-sm">No rewards available yet</p>
          </div>
        ) : (
          rewards.map((reward: any, i: number) => (
            <motion.div
              key={reward.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              className="glass rounded-xl p-4 flex items-center gap-4 glass-hover cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                {reward.type === 'BRAND' ? (
                  <Gift size={22} className="text-brand-400" />
                ) : (
                  <Trophy size={22} className="text-amber-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white">{reward.title}</p>
                {reward.brand_name && (
                  <p className="text-xs text-brand-400">{reward.brand_name}</p>
                )}
                <p className="text-xs text-dark-400 mt-0.5 line-clamp-1">{reward.description}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold text-white">{reward.cost_points}</p>
                <p className="text-[10px] text-dark-500">pts</p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
