// App constants
export const APP_NAME = 'Things to Try';
export const APP_DESCRIPTION = 'Discover amazing local events and experiences';
export const APP_URL = 'https://thingstotry.ai';

// API constants
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;
export const DEFAULT_SEARCH_RADIUS = 10; // km
export const MAX_SEARCH_RADIUS = 100; // km

// Points system
export const POINTS_PER_POST = 100;
export const POINTS_PER_REVIEW = 50;
export const POINTS_SIGNUP_BONUS = 500;

// Rate limits
export const MAX_POSTS_PER_DAY = 5;
export const MAX_PLANS_PER_USER = 20;
export const MAX_EVENTS_PER_PLAN = 50;

// Image constraints
export const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
export const THUMBNAIL_SIZE = 300;
export const MAX_IMAGE_DIMENSION = 2048;

// Categories
export const EVENT_CATEGORIES = [
  'Arts & Culture',
  'Comedy',
  'Food & Drink',
  'Health & Wellness',
  'Music',
  'Nightlife',
  'Outdoors & Recreation',
  'Sports & Fitness',
  'Technology',
  'Travel & Tourism',
  'Family & Kids',
  'Business & Networking',
  'Community',
  'Education',
  'Fashion & Beauty',
  'Film & Media',
  'Gaming',
  'LGBTQ+',
  'Photography',
  'Religion & Spirituality',
  'Science',
  'Social Impact',
  'Other'
];

// Ingestion sources
export const INGESTION_SOURCES = {
  TICKETMASTER: 'ticketmaster',
  EVENTBRITE: 'eventbrite',
  FACEBOOK: 'facebook',
  MEETUP: 'meetup'
};

// Rate limiting by source
export const SOURCE_RATE_LIMITS = {
  [INGESTION_SOURCES.TICKETMASTER]: 5000, // requests per hour
  [INGESTION_SOURCES.EVENTBRITE]: 1000,
  [INGESTION_SOURCES.FACEBOOK]: 200,
  [INGESTION_SOURCES.MEETUP]: 10000
};

// PWA constants
export const PWA_THEME_COLOR = '#1f2937';
export const PWA_BACKGROUND_COLOR = '#111827';

// Mapbox
export const MAPBOX_STYLE = 'mapbox://styles/mapbox/dark-v10';
export const DEFAULT_MAP_ZOOM = 12;

// Auth providers
export const AUTH_PROVIDERS = {
  GOOGLE: 'google',
  APPLE: 'apple'
};

// Error messages
export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'You must be logged in to perform this action',
  FORBIDDEN: 'You do not have permission to perform this action',
  NOT_FOUND: 'Resource not found',
  VALIDATION_ERROR: 'Invalid input data',
  RATE_LIMIT: 'Rate limit exceeded, please try again later',
  INTERNAL_ERROR: 'An internal error occurred'
};