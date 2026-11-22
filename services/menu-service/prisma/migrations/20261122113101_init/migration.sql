-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "menu";

-- CreateTable
CREATE TABLE "menu"."stalls" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "stall_number" TEXT NOT NULL,
    "hawker_centre" TEXT NOT NULL,
    "cuisine" TEXT NOT NULL,
    "is_open" BOOLEAN NOT NULL DEFAULT true,
    "avg_prep_minutes" INTEGER NOT NULL DEFAULT 10,

    CONSTRAINT "stalls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu"."dishes" (
    "id" UUID NOT NULL,
    "stall_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "price_cents" INTEGER NOT NULL,
    "is_available" BOOLEAN NOT NULL DEFAULT true,
    "image_url" TEXT,

    CONSTRAINT "dishes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stalls_hawker_centre_stall_number_key" ON "menu"."stalls"("hawker_centre", "stall_number");

-- CreateIndex
CREATE INDEX "dishes_stall_id_idx" ON "menu"."dishes"("stall_id");

-- AddForeignKey
ALTER TABLE "menu"."dishes" ADD CONSTRAINT "dishes_stall_id_fkey" FOREIGN KEY ("stall_id") REFERENCES "menu"."stalls"("id") ON DELETE CASCADE ON UPDATE CASCADE;
