'use client';

import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { EventCard } from '@/components/EventCard';

export function ExplorePage({ initialEvents, categories }: { initialEvents: any[]; categories: any[] }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = initialEvents.filter((e) => {
    if (activeCategory && e.category?.slug !== activeCategory) return false;
    if (searchQuery && !e.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="px-4 pt-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-5">
        <h1 className="text-2xl font-bold mb-1">
          Explore <span className="gradient-text">Experiences</span>
        </h1>
        <p className="text-xs text-dark-400">Find your next adventure</p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="relative mb-5"
      >
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-500" />
        <input
          type="text"
          placeholder="Search events, venues, activities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full glass rounded-xl pl-10 pr-12 py-3 text-sm text-white placeholder-dark-500 focus:outline-none focus:ring-1 focus:ring-brand-500/50 transition-all"
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-white/10 transition-colors">
          <SlidersHorizontal size={16} className="text-dark-400" />
        </button>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2 mb-6 overflow-x-auto pb-2 -mx-4 px-4"
      >
        <button
          onClick={() => setActiveCategory(null)}
          className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            !activeCategory ? 'bg-brand-500 text-white' : 'glass text-dark-300 hover:text-white'
          }`}
        >
          All
        </button>
        {categories.map((cat: any) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(activeCategory === cat.slug ? null : cat.slug)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeCategory === cat.slug ? 'bg-brand-500 text-white' : 'glass text-dark-300 hover:text-white'
            }`}
          >
            {cat.icon} {cat.name}
            {cat._count?.events > 0 && (
              <span className="ml-1 text-dark-500">{cat._count.events}</span>
            )}
          </button>
        ))}
      </motion.div>

      {/* Events grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <Sparkles className="mx-auto mb-3 text-dark-600" size={40} />
          <p className="text-dark-400 text-sm">No events found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 pb-8">
          {filtered.map((event: any, i: number) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
