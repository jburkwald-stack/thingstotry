import { Location, BoundingBox } from '../types';

// Distance calculation using Haversine formula
export function calculateDistance(point1: Location, point2: Location): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(point2.lat - point1.lat);
  const dLng = toRadians(point2.lng - point1.lng);
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRadians(point1.lat)) * Math.cos(toRadians(point2.lat)) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// Generate bounding box for geo queries
export function getBoundingBox(center: Location, radiusKm: number): BoundingBox {
  const lat = center.lat;
  const lng = center.lng;
  
  // Rough conversion: 1 degree lat ≈ 111 km
  const latDelta = radiusKm / 111;
  const lngDelta = radiusKm / (111 * Math.cos(toRadians(lat)));
  
  return {
    north: lat + latDelta,
    south: lat - latDelta,
    east: lng + lngDelta,
    west: lng - lngDelta
  };
}

// Format points with commas
export function formatPoints(points: number): string {
  return points.toLocaleString();
}

// Generate random string for invite codes
export function generateInviteCode(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Format date for display
export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Format datetime for display
export function formatDateTime(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
}

// Check if date is in the future
export function isFuture(date: string | Date): boolean {
  return new Date(date) > new Date();
}

// Get time ago string
export function timeAgo(date: string | Date): string {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  
  if (years > 0) return `${years}y ago`;
  if (months > 0) return `${months}mo ago`;
  if (weeks > 0) return `${weeks}w ago`;
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return 'just now';
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

// Normalize tags (lowercase, trim, dedupe)
export function normalizeTags(tags: string[]): string[] {
  return [...new Set(tags.map(tag => tag.toLowerCase().trim()).filter(Boolean))];
}

// Format price range
export function formatPriceRange(min: number | null, max: number | null): string {
  if (min === null && max === null) return 'Free';
  if (min === 0 && max === 0) return 'Free';
  if (min === null) return `Up to $${max}`;
  if (max === null) return `From $${min}`;
  if (min === max) return `$${min}`;
  return `$${min} - $${max}`;
}

// Slug generation for URLs
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}