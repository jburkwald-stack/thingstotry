'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export function PlansPage({ plans }: { plans: any[] }) {
  return (
    <div className="px-4 pt-6 pb-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold">
            <span className="gradient-text">Plans</span>
          </h1>
          <p className="text-xs text-dark-400">Curated itineraries</p>
        </div>
        <button className="glass p-2.5 rounded-xl glass-hover">
          <Plus size={18} className="text-brand-400" />
        </button>
      </motion.div>

      {plans.length === 0 ? (
        <div className="text-center py-16">
          <Calendar className="mx-auto mb-3 text-dark-600" size={40} />
          <p className="text-dark-400 text-sm">No plans yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {plans.map((plan: any, i: number) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link href={`/plans/${plan.id}`} className="block glass rounded-2xl overflow-hidden glass-hover">
                {/* Event thumbnails strip */}
                <div className="flex h-28">
                  {(plan.events || []).slice(0, 4).map((event: any, j: number) => (
                    <div key={event.id} className="relative flex-1">
                      <Image
                        src={event.image_url || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400'}
                        alt={event.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-black/20" />
                    </div>
                  ))}
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-white mb-1">{plan.title}</h3>
                  {plan.description && (
                    <p className="text-xs text-dark-400 mb-2">{plan.description}</p>
                  )}
                  <div className="flex items-center gap-4 text-xs text-dark-500">
                    {plan.date && (
                      <span className="flex items-center gap-1">
                        <Calendar size={11} />
                        {formatDate(plan.date)}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <MapPin size={11} />
                      {(plan.events || []).length} events
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={11} />
                      by {plan.user?.name || 'Anonymous'}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
