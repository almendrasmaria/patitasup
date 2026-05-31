-- CreateEnum
CREATE TYPE "AdoptionRequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "AdoptionRequest" (
    "id" TEXT NOT NULL,
    "publicationId" TEXT NOT NULL,
    "ownerProfileId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "domicilio" TEXT NOT NULL,
    "barrio" TEXT NOT NULL,
    "preferredContact" TEXT NOT NULL,
    "housingType" TEXT NOT NULL,
    "protection" TEXT NOT NULL,
    "otherPets" TEXT,
    "reason" TEXT NOT NULL,
    "aloneHoursPerDay" TEXT NOT NULL,
    "status" "AdoptionRequestStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdoptionRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AdoptionRequest_ownerProfileId_status_createdAt_idx" ON "AdoptionRequest"("ownerProfileId", "status", "createdAt");

-- CreateIndex
CREATE INDEX "AdoptionRequest_publicationId_idx" ON "AdoptionRequest"("publicationId");

-- AddForeignKey
ALTER TABLE "AdoptionRequest" ADD CONSTRAINT "AdoptionRequest_publicationId_fkey" FOREIGN KEY ("publicationId") REFERENCES "Publication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdoptionRequest" ADD CONSTRAINT "AdoptionRequest_ownerProfileId_fkey" FOREIGN KEY ("ownerProfileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- EnableRLS
ALTER TABLE "AdoptionRequest" ENABLE ROW LEVEL SECURITY;
