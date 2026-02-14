'use client';

import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate, formatPrice, cn } from '@/lib/utils';

interface EventCardProps {
  event: any;
  index: number;
  compact?: boolean;
}

const difficultyColors: Record<string, string> = {
  EASY: 'bg-emerald-500/20 text-emerald-400',
  FUN: 'bg-amber-500/20 text-amber-400',
  CHALLENGE: 'bg-rose-500/20 text-rose-400',
};

export function EventCard({ event, index, compact }: EventCardProps) {
  const price = formatPrice(event.price_min, event.price_max);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
    >
      <Link
        href={`/explore/${event.id}`}
        className={cn(
          'group block glass rounded-2xl overflow-hidden card-shine hover:glow transition-all duration-300',
          compact ? '' : ''
        )}
      >
        <div className={cn('relative', compact ? 'aspect-[16/9]' : 'aspect-[3/2]')}>
          <Image
            src={event.image_url || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800'}
            alt={event.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Category badge */}
          {event.category && (
            <div className="absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white">
              {event.category.icon} {event.category.name}
            </div>
          )}

          {/* Price badge */}
          <div className={cn(
            'absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm',
            event.is_free ? 'bg-emerald-500/80 text-white' : 'bg-black/50 text-white'
          )}>
            {price}
          </div>

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-base font-bold text-white leading-tight mb-1 group-hover:text-brand-300 transition-colors">
              {event.title}
            </h3>
            <div className="flex items-center gap-3 text-xs text-white/70">
              <span className="flex items-center gap-1">
                <Calendar size={11} />
                {formatDate(event.start_datetime)}
              </span>
              {event.venue_name && (
                <span className="flex items-center gap-1 truncate">
                  <MapPin size={11} />
                  {event.venue_name}
                </span>
              )}
            </div>
          </div>
        </div>

        {!compact && (
          <div className="p-3 flex items-center gap-2">
            <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded-full', difficultyColors[event.difficulty] || difficultyColors.FUN)}>
              {event.difficulty}
            </span>
            {event.kid_friendly && (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400">
                👨‍👩‍👧 Kid Friendly
              </span>
            )}
            <span className="text-[10px] text-dark-500 ml-auto">
              {event.indoor_outdoor === 'INDOOR' ? '🏠' : event.indoor_outdoor === 'OUTDOOR' ? '🌳' : '🏠🌳'} {event.indoor_outdoor}
            </span>
          </div>
        )}
      </Link>
    </motion.div>
  );
}
