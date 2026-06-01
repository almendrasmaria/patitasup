-- AlterEnum
ALTER TYPE "AdoptionRequestStatus" ADD VALUE 'SCHEDULED' BEFORE 'APPROVED';

-- AlterTable
ALTER TABLE "AdoptionRequest" ADD COLUMN "visitScheduledAt" TIMESTAMP(3);
