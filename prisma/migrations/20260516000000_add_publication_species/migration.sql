-- CreateEnum
CREATE TYPE "PublicationSpecies" AS ENUM ('CAT', 'DOG');

-- AlterTable
ALTER TABLE "Publication" ADD COLUMN "species" "PublicationSpecies" NOT NULL DEFAULT 'CAT';
