DO $$ BEGIN
    CREATE TYPE "StorySubmissionStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS "StorySubmission" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "anonymous" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT NOT NULL,
    "story" TEXT NOT NULL,
    "consentToReview" BOOLEAN NOT NULL,
    "status" "StorySubmissionStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewedAt" TIMESTAMP(3),

    CONSTRAINT "StorySubmission_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "StorySubmission_status_createdAt_idx"
ON "StorySubmission"("status", "createdAt");
