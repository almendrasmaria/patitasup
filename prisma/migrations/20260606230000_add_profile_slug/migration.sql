-- AlterTable
ALTER TABLE "Profile" ADD COLUMN "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_slug_key" ON "Profile"("slug");
