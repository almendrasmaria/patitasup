-- CreateEnum
CREATE TYPE "PublicationAgeUnit" AS ENUM ('DAYS', 'MONTHS', 'YEARS');

-- CreateEnum
CREATE TYPE "PublicationSex" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "PublicationStatus" AS ENUM ('ACTIVE', 'ADOPTED', 'DRAFT');

-- CreateTable
CREATE TABLE "Publication" (
    "id" TEXT NOT NULL,
    "authorProfileId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "petName" TEXT NOT NULL,
    "ageValue" INTEGER NOT NULL,
    "ageUnit" "PublicationAgeUnit" NOT NULL,
    "sex" "PublicationSex" NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rescueInstagram" TEXT,
    "imageUrl" TEXT,
    "status" "PublicationStatus" NOT NULL DEFAULT 'ACTIVE',
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Publication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Publication_slug_key" ON "Publication"("slug");

-- CreateIndex
CREATE INDEX "Publication_authorProfileId_status_createdAt_idx" ON "Publication"("authorProfileId", "status", "createdAt");

-- CreateIndex
CREATE INDEX "Publication_status_createdAt_idx" ON "Publication"("status", "createdAt");

-- AddForeignKey
ALTER TABLE "Publication" ADD CONSTRAINT "Publication_authorProfileId_fkey" FOREIGN KEY ("authorProfileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- EnableRLS
ALTER TABLE "Publication" ENABLE ROW LEVEL SECURITY;