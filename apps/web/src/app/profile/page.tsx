'use client';

import { motion } from 'framer-motion';
import { MapPin, Calendar, Heart, Award, Settings, ChevronRight, Flame } from 'lucide-react';
import Image from 'next/image';

// Mock profile data
const user = {
  name: 'Alex Rivera',
  email: 'alex@demo.local',
  avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  points_balance: 2450,
  joined: 'January 2026',
  stats: { tried: 12, saved: 24, streak: 5, likes: 47 },
};

const recentTries = [
  { id: '1', title: 'Sunrise Hike at Griffith', emoji: '🏔️', date: '2 days ago' },
  { id: '2', title: 'Underground Ramen Pop-Up', emoji: '🍜', date: '5 days ago' },
  { id: '3', title: 'Pottery & Pour Night', emoji: '🏺', date: '1 week ago' },
  { id: '4', title: 'Street Taco Crawl', emoji: '🌮', date: '2 weeks ago' },
];

const badges = [
  { icon: '🔥', label: 'First Try', earned: true },
  { icon: '🌅', label: 'Early Bird', earned: true },
  { icon: '🍕', label: 'Foodie', earned: true },
  { icon: '🎨', label: 'Creative', earned: true },
  { icon: '🏆', label: 'Explorer', earned: false },
  { icon: '💎', label: 'VIP', earned: false },
];

export default function ProfilePage() {
  return (
    <div className="px-4 pt-6 pb-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <h1 className="text-2xl font-bold">Profile</h1>
        <button className="glass p-2 rounded-xl hover:bg-white/10 transition-colors">
          <Settings size={18} className="text-dark-400" />
        </button>
      </motion.div>

      {/* Profile card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.05 }}
        className="glass rounded-2xl p-5 glow relative overflow-hidden mb-5"
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="relative flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-brand-500/40">
            <Image src={user.avatar_url} alt={user.name} fill className="object-cover" unoptimized />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{user.name}</h2>
            <p className="text-xs text-dark-400">Member since {user.joined}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <Flame size={13} className="text-orange-400" />
              <span className="text-xs text-orange-400 font-semibold">{user.stats.streak} day streak</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mt-5">
          {[
            { value: user.stats.tried, label: 'Tried', color: 'text-brand-400' },
            { value: user.stats.saved, label: 'Saved', color: 'text-purple-400' },
            { value: user.stats.likes, label: 'Likes', color: 'text-rose-400' },
            { value: user.points_balance, label: 'Points', color: 'text-amber-400' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className={`text-lg font-bold ${stat.color}`}>
                {stat.value >= 1000 ? `${(stat.value / 1000).toFixed(1)}k` : stat.value}
              </p>
              <p className="text-[10px] text-dark-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Badges */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <h3 className="text-sm font-semibold text-white mb-3">Badges</h3>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 mb-5">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.04 }}
              className={`flex-shrink-0 w-16 text-center ${!badge.earned ? 'opacity-30' : ''}`}
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-white/5 flex items-center justify-center text-xl mb-1">
                {badge.icon}
              </div>
              <p className="text-[10px] text-dark-400">{badge.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent tries */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
        <h3 className="text-sm font-semibold text-white mb-3">Recent Tries</h3>
        <div className="space-y-2">
          {recentTries.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.04 }}
              className="glass rounded-xl p-3 flex items-center gap-3 glass-hover cursor-pointer"
            >
              <span className="text-xl">{item.emoji}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{item.title}</p>
                <p className="text-xs text-dark-500">{item.date}</p>
              </div>
              <ChevronRight size={16} className="text-dark-600" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
