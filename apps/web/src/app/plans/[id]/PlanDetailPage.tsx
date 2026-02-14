'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Share2, Users } from 'lucide-react';
import Link from 'next/link';
import { EventCard } from '@/components/EventCard';
import { formatDate } from '@/lib/utils';

export function PlanDetailPage({ plan }: { plan: any }) {
  return (
    <div className="px-4 pt-6 pb-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-5">
        <Link href="/plans" className="inline-flex items-center gap-1 text-xs text-dark-400 hover:text-white transition-colors mb-3">
          <ArrowLeft size={14} />
          Back to Plans
        </Link>
        <h1 className="text-2xl font-bold text-white">{plan.title}</h1>
        {plan.description && (
          <p className="text-sm text-dark-400 mt-1">{plan.description}</p>
        )}
        <div className="flex items-center gap-4 mt-3 text-xs text-dark-500">
          {plan.date && (
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {formatDate(plan.date)}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Users size={12} />
            by {plan.user?.name}
          </span>
          <button className="flex items-center gap-1 text-brand-400 hover:text-brand-300 transition-colors ml-auto">
            <Share2 size={12} />
            Share
          </button>
        </div>
      </motion.div>

      {/* Events in plan */}
      <h2 className="text-sm font-semibold text-white mb-3">{(plan.events || []).length} Events</h2>
      <div className="space-y-4">
        {(plan.events || []).map((event: any, i: number) => (
          <div key={event.id} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center text-xs font-bold text-brand-400">
                {i + 1}
              </div>
              {i < (plan.events || []).length - 1 && (
                <div className="w-0.5 flex-1 bg-white/5 my-1" />
              )}
            </div>
            <div className="flex-1 pb-4">
              <EventCard event={event} index={i} compact />
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      {plan.invite_code && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 glass rounded-xl p-4 text-center"
        >
          <p className="text-xs text-dark-400 mb-2">Share this plan with friends</p>
          <div className="flex items-center justify-center gap-2">
            <code className="text-sm font-mono text-brand-400 bg-brand-500/10 px-3 py-1.5 rounded-lg">
              {plan.invite_code}
            </code>
            <button className="text-xs text-brand-400 hover:text-brand-300">Copy</button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
