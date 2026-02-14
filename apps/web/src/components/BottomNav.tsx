'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Trophy, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Feed', icon: Home },
  { href: '/explore', label: 'Explore', icon: Compass },
  { href: '/rewards', label: 'Rewards', icon: Trophy },
  { href: '/profile', label: 'Profile', icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/10">
      <div className="max-w-lg mx-auto flex items-center justify-around h-16">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/' && pathname?.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200',
                active
                  ? 'text-brand-400'
                  : 'text-dark-400 hover:text-dark-200'
              )}
            >
              <Icon size={22} strokeWidth={active ? 2.5 : 1.5} />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
