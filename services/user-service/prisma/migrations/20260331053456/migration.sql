-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "user";

-- CreateTable
CREATE TABLE "user"."profiles" (
    "id" VARCHAR(36) NOT NULL,
    "username" VARCHAR(50),
    "display_name" TEXT,
    "avatar_url" TEXT,
    "bio" VARCHAR(300),
    "last_seen_at" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isOnboarded" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_username_key" ON "user"."profiles"("username");

-- CreateIndex
CREATE INDEX "profiles_last_seen_at_idx" ON "user"."profiles"("last_seen_at");
