'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, Clock, Users, Heart, Share2, Bookmark, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate, formatPrice, cn } from '@/lib/utils';

const difficultyConfig: Record<string, { label: string; color: string }> = {
  EASY: { label: '🟢 Easy — Anyone can do this', color: 'text-emerald-400' },
  FUN: { label: '🟡 Fun — A great time', color: 'text-amber-400' },
  CHALLENGE: { label: '🔴 Challenge — Push yourself', color: 'text-rose-400' },
};

export function EventDetailPage({ event }: { event: any }) {
  const price = formatPrice(event.price_min, event.price_max);
  const diff = difficultyConfig[event.difficulty] || difficultyConfig.FUN;

  return (
    <div className="pb-8">
      {/* Hero */}
      <div className="relative aspect-[4/3]">
        <Image
          src={event.image_url || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800'}
          alt={event.title}
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent" />

        {/* Back button */}
        <Link
          href="/explore"
          className="absolute top-4 left-4 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors z-10"
        >
          <ArrowLeft size={20} />
        </Link>

        {/* Action buttons */}
        <div className="absolute top-4 right-4 flex gap-2 z-10">
          <button className="p-2 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors">
            <Heart size={20} />
          </button>
          <button className="p-2 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors">
            <Share2 size={20} />
          </button>
          <button className="p-2 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors">
            <Bookmark size={20} />
          </button>
        </div>

        {/* Title area */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          {event.category && (
            <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-brand-500/20 text-brand-400 mb-2">
              {event.category.icon} {event.category.name}
            </span>
          )}
          <h1 className="text-2xl font-bold text-white leading-tight">{event.title}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pt-5 space-y-5">
        {/* Quick info */}
        <div className="grid grid-cols-2 gap-3">
          <div className="glass rounded-xl p-3">
            <div className="flex items-center gap-2 text-brand-400 mb-1">
              <Calendar size={14} />
              <span className="text-xs font-semibold">When</span>
            </div>
            <p className="text-sm text-white">{formatDate(event.start_datetime)}</p>
          </div>
          <div className="glass rounded-xl p-3">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <span className="text-xs">💰</span>
              <span className="text-xs font-semibold">Price</span>
            </div>
            <p className="text-sm text-white font-semibold">{price}</p>
          </div>
          {event.venue_name && (
            <div className="glass rounded-xl p-3">
              <div className="flex items-center gap-2 text-rose-400 mb-1">
                <MapPin size={14} />
                <span className="text-xs font-semibold">Where</span>
              </div>
              <p className="text-sm text-white">{event.venue_name}</p>
              {event.city && <p className="text-xs text-dark-400">{event.city}, {event.state}</p>}
            </div>
          )}
          <div className="glass rounded-xl p-3">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <span className="text-xs">⚡</span>
              <span className="text-xs font-semibold">Difficulty</span>
            </div>
            <p className={cn('text-sm font-medium', diff.color)}>{event.difficulty}</p>
          </div>
        </div>

        {/* Description */}
        {event.description && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            <h2 className="text-sm font-semibold text-white mb-2">About</h2>
            <p className="text-sm text-dark-300 leading-relaxed">{event.description}</p>
          </motion.div>
        )}

        {/* Tags */}
        {event.tags && (
          <div className="flex flex-wrap gap-2">
            {event.tags.split(',').map((tag: string) => (
              <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-dark-400">
                #{tag.trim()}
              </span>
            ))}
          </div>
        )}

        {/* Posts from this event */}
        {event.posts?.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-white mb-3">People who tried this</h2>
            <div className="space-y-3">
              {event.posts.map((post: any) => (
                <div key={post.id} className="glass rounded-xl p-3 flex gap-3">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={post.image_url} alt="" fill className="object-cover" unoptimized />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white">{post.user?.name}</p>
                    <p className="text-xs text-dark-300 mt-0.5 line-clamp-2">{post.caption}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Heart size={11} className="text-rose-400" />
                      <span className="text-[10px] text-dark-500">{post._count?.likes || 0}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-500 to-purple-500 text-white font-semibold text-sm shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-shadow"
        >
          ✨ I Want to Try This
        </motion.button>
      </div>
    </div>
  );
}
