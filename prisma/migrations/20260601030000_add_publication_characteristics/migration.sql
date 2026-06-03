-- Add the characteristics tag list shown on the public pet cards.
ALTER TABLE "Publication" ADD COLUMN "characteristics" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
