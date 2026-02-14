'use client';

import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { timeAgo } from '@/lib/utils';

interface PostCardProps {
  post: any;
  index: number;
}

export function PostCard({ post, index }: PostCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="glass rounded-2xl overflow-hidden card-shine"
    >
      {/* Header */}
      <div className="flex items-center gap-3 p-4 pb-3">
        <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-brand-500/30">
          <Image
            src={post.user?.avatar_url || '/placeholder.png'}
            alt={post.user?.name || 'User'}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate">{post.user?.name}</p>
          <p className="text-xs text-dark-400">{timeAgo(post.created_at)}</p>
        </div>
        {post.event && (
          <Link
            href={`/explore/${post.event.id}`}
            className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-brand-500/15 text-brand-400 hover:bg-brand-500/25 transition-colors"
          >
            {post.event.category?.icon} {post.event.category?.name || 'Event'}
          </Link>
        )}
      </div>

      {/* Image */}
      <div className="relative aspect-[4/3] bg-dark-800">
        <Image
          src={post.image_url}
          alt={post.caption}
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-sm text-dark-100 leading-relaxed mb-3">{post.caption}</p>

        {post.event && (
          <Link
            href={`/explore/${post.event.id}`}
            className="flex items-center gap-1.5 text-xs text-dark-400 mb-3 hover:text-brand-400 transition-colors"
          >
            <MapPin size={12} />
            <span className="truncate">{post.event.title}</span>
          </Link>
        )}

        {/* Actions */}
        <div className="flex items-center gap-5 pt-2 border-t border-white/5">
          <button className="flex items-center gap-1.5 text-dark-400 hover:text-rose-400 transition-colors group">
            <Heart size={18} className="group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium">{post.likes_count || 0}</span>
          </button>
          <button className="flex items-center gap-1.5 text-dark-400 hover:text-brand-400 transition-colors group">
            <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium">{post.comments_count || 0}</span>
          </button>
          <button className="flex items-center gap-1.5 text-dark-400 hover:text-emerald-400 transition-colors group ml-auto">
            <Share2 size={18} className="group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Comments preview */}
        {post.comments?.length > 0 && (
          <div className="mt-3 space-y-1.5">
            {post.comments.slice(0, 2).map((c: any) => (
              <p key={c.id} className="text-xs text-dark-300">
                <span className="font-semibold text-dark-200">{c.user?.name}</span>{' '}
                {c.text}
              </p>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}
