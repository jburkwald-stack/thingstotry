-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "avatar_url" TEXT,
    "provider" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "points_balance" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "icon" TEXT,
    "color" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "source_name" TEXT NOT NULL DEFAULT 'seed',
    "source_event_id" TEXT NOT NULL DEFAULT '',
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image_url" TEXT,
    "category_id" TEXT,
    "tags" TEXT,
    "difficulty" TEXT NOT NULL DEFAULT 'FUN',
    "is_free" BOOLEAN NOT NULL DEFAULT false,
    "price_min" REAL,
    "price_max" REAL,
    "kid_friendly" BOOLEAN NOT NULL DEFAULT false,
    "indoor_outdoor" TEXT NOT NULL DEFAULT 'BOTH',
    "venue_name" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "lat" REAL,
    "lng" REAL,
    "start_datetime" DATETIME NOT NULL,
    "end_datetime" DATETIME,
    "event_url" TEXT,
    "ticket_url" TEXT,
    "organizer" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "events_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "saved_events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "saved_events_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "saved_events_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "plans" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "date" DATETIME,
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "invite_code" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "plans_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "plan_invites" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "plan_id" TEXT NOT NULL,
    "inviter_id" TEXT NOT NULL,
    "invitee_id" TEXT,
    "email" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "plan_invites_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plans" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "plan_invites_inviter_id_fkey" FOREIGN KEY ("inviter_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "plan_events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "plan_id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    CONSTRAINT "plan_events_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plans" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "plan_events_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "event_id" TEXT,
    "caption" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "thumbnail_url" TEXT,
    "status" TEXT NOT NULL DEFAULT 'APPROVED',
    "points_awarded" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "posts_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "post_likes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "post_likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "post_likes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "points_ledger" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "delta" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "ref_type" TEXT,
    "ref_id" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "points_ledger_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "reward_catalog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL DEFAULT 'GENERIC',
    "brand_name" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cost_points" INTEGER NOT NULL,
    "discount_type" TEXT NOT NULL DEFAULT 'PERCENT',
    "discount_value" TEXT,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "max_redemptions_per_user" INTEGER NOT NULL DEFAULT 1,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "redemptions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "reward_id" TEXT NOT NULL,
    "code_issued" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ISSUED',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "redemptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "redemptions_reward_id_fkey" FOREIGN KEY ("reward_id") REFERENCES "reward_catalog" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "saved_events_user_id_event_id_key" ON "saved_events"("user_id", "event_id");

-- CreateIndex
CREATE UNIQUE INDEX "plans_invite_code_key" ON "plans"("invite_code");

-- CreateIndex
CREATE UNIQUE INDEX "plan_events_plan_id_event_id_key" ON "plan_events"("plan_id", "event_id");

-- CreateIndex
CREATE UNIQUE INDEX "post_likes_user_id_post_id_key" ON "post_likes"("user_id", "post_id");
