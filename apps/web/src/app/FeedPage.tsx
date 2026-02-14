'use client';

import { motion } from 'framer-motion';
import { Sparkles, Zap } from 'lucide-react';
import { PostCard } from '@/components/PostCard';

export function FeedPage({ initialPosts }: { initialPosts: any[] }) {
  return (
    <div className="px-4 pt-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <h1 className="text-2xl font-bold">
            Things<span className="gradient-text">ToTry</span>
          </h1>
          <p className="text-xs text-dark-400 mt-0.5">What are people trying today?</p>
        </div>
        <button className="glass glass-hover p-2.5 rounded-xl">
          <Zap size={18} className="text-brand-400" />
        </button>
      </motion.div>

      {/* Stories-like featured strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex gap-3 mb-6 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide"
      >
        {['🔥 Trending', '🆓 Free', '🍕 Food', '🎨 Art', '🏔️ Outdoors', '🎵 Music'].map((label, i) => (
          <button
            key={label}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
              i === 0
                ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25'
                : 'glass glass-hover text-dark-300'
            }`}
          >
            {label}
          </button>
        ))}
      </motion.div>

      {/* Posts */}
      {initialPosts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <Sparkles className="mx-auto mb-4 text-dark-500" size={48} />
          <p className="text-dark-400 text-sm">No posts yet. Start the API and seed data!</p>
          <p className="text-dark-500 text-xs mt-2">
            Run: <code className="text-brand-400">pnpm db:migrate && pnpm db:seed</code>
          </p>
        </motion.div>
      ) : (
        <div className="space-y-5 pb-8">
          {initialPosts.map((post: any, i: number) => (
            <PostCard key={post.id} post={post} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
