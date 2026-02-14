import type { Metadata } from 'next';
import './globals.css';
import { BottomNav } from '@/components/BottomNav';

export const metadata: Metadata = {
  title: 'ThingsToTry.ai — Discover Local Experiences',
  description: 'Find amazing things to try in your city. Events, food, art, music, and more.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen pb-20">
        <main className="max-w-lg mx-auto">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
