import { z } from 'zod';

// Enums
export enum Difficulty {
  EASY = 'EASY',
  FUN = 'FUN',
  CHALLENGE = 'CHALLENGE'
}

export enum IndoorOutdoor {
  INDOOR = 'INDOOR',
  OUTDOOR = 'OUTDOOR',
  BOTH = 'BOTH'
}

export enum PostStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export enum RewardType {
  BRAND = 'BRAND',
  GENERIC = 'GENERIC'
}

export enum DiscountType {
  PERCENT = 'PERCENT',
  FIXED = 'FIXED',
  CODE = 'CODE',
  LINK = 'LINK'
}

export enum RedemptionStatus {
  ISSUED = 'ISSUED',
  REDEEMED = 'REDEEMED',
  EXPIRED = 'EXPIRED'
}

export enum IngestionStatus {
  RUNNING = 'RUNNING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED'
}

// Location types
export interface Location {
  lat: number;
  lng: number;
}

export interface BoundingBox {
  north: number;
  south: number;
  east: number;
  west: number;
}

// API Response types
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Event types
export interface Event {
  id: string;
  source_name: string;
  source_event_id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  category: string | null;
  tags: string[];
  difficulty: Difficulty;
  is_free: boolean;
  price_min: number | null;
  price_max: number | null;
  kid_friendly: boolean;
  indoor_outdoor: IndoorOutdoor;
  venue_name: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  location: Location | null;
  start_datetime: string;
  end_datetime: string | null;
  event_url: string | null;
  ticket_url: string | null;
  affiliate_url: string | null;
  discount_code: string | null;
  organizer: string | null;
  created_at: string;
  updated_at: string;
}

export interface EventFilters {
  lat?: number;
  lng?: number;
  radius?: number; // km
  category?: string;
  tags?: string[];
  difficulty?: Difficulty;
  is_free?: boolean;
  kid_friendly?: boolean;
  indoor_outdoor?: IndoorOutdoor;
  start_date?: string;
  end_date?: string;
  search?: string;
}

// User types
export interface User {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  provider: string;
  provider_id: string;
  points_balance: number;
  created_at: string;
  updated_at: string;
}

// Post types
export interface Post {
  id: string;
  user_id: string;
  event_id: string | null;
  caption: string;
  image_url: string;
  thumbnail_url: string;
  status: PostStatus;
  points_awarded: number;
  created_at: string;
  user?: User;
  event?: Event;
  likes_count?: number;
  liked?: boolean;
}

// Plan types
export interface Plan {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  date: string | null;
  is_public: boolean;
  invite_code: string | null;
  created_at: string;
  updated_at: string;
  user?: User;
  events?: Event[];
  invites?: PlanInvite[];
}

export interface PlanInvite {
  id: string;
  plan_id: string;
  inviter_id: string;
  invitee_id: string | null;
  email: string | null;
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED';
  created_at: string;
}

// Reward types
export interface RewardCatalog {
  id: string;
  type: RewardType;
  brand_name: string | null;
  title: string;
  description: string;
  rules_json: any;
  cost_points: number;
  discount_type: DiscountType;
  discount_value: string | null;
  code_pool_id: string | null;
  start_at: string | null;
  end_at: string | null;
  max_redemptions_per_user: number;
  enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface Redemption {
  id: string;
  user_id: string;
  reward_id: string;
  code_issued: string | null;
  status: RedemptionStatus;
  created_at: string;
  reward?: RewardCatalog;
}

// Points types
export interface PointsLedger {
  id: string;
  user_id: string;
  delta: number;
  reason: string;
  ref_type: string | null;
  ref_id: string | null;
  created_at: string;
}

// Validation schemas
export const EventFiltersSchema = z.object({
  lat: z.number().optional(),
  lng: z.number().optional(),
  radius: z.number().min(0).max(100).optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  difficulty: z.nativeEnum(Difficulty).optional(),
  is_free: z.boolean().optional(),
  kid_friendly: z.boolean().optional(),
  indoor_outdoor: z.nativeEnum(IndoorOutdoor).optional(),
  start_date: z.string().datetime().optional(),
  end_date: z.string().datetime().optional(),
  search: z.string().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20)
});

export const CreatePostSchema = z.object({
  event_id: z.string().uuid().optional(),
  caption: z.string().min(1).max(500),
  image: z.string() // base64 encoded image
});

export const CreatePlanSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  date: z.string().datetime().optional(),
  is_public: z.boolean().default(false),
  event_ids: z.array(z.string().uuid()).optional()
});

export const RedeemRewardSchema = z.object({
  reward_id: z.string().uuid()
});