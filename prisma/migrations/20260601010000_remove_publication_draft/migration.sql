-- Drop the DRAFT publication status. No rows are expected to use it; any that
-- do are published (set ACTIVE) before the enum value is removed.
UPDATE "Publication" SET "status" = 'ACTIVE' WHERE "status" = 'DRAFT';

ALTER TYPE "PublicationStatus" RENAME TO "PublicationStatus_old";
CREATE TYPE "PublicationStatus" AS ENUM ('ACTIVE', 'ADOPTED');
ALTER TABLE "Publication" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Publication" ALTER COLUMN "status" TYPE "PublicationStatus" USING ("status"::text::"PublicationStatus");
ALTER TABLE "Publication" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
DROP TYPE "PublicationStatus_old";
