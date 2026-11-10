ALTER TABLE "Comment"
ADD COLUMN "submissionKey" TEXT;

CREATE INDEX "Comment_submissionKey_createdAt_idx"
ON "Comment"("submissionKey", "createdAt");