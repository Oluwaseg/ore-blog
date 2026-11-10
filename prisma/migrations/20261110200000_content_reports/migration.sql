CREATE TYPE "ContentReportStatus" AS ENUM ('PENDING', 'RESOLVED', 'DISMISSED');

CREATE TABLE "ContentReport" (
    "id" TEXT NOT NULL,
    "articleId" TEXT,
    "commentId" TEXT,
    "reason" TEXT NOT NULL,
    "details" TEXT,
    "reporterEmail" TEXT,
    "status" "ContentReportStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewedAt" TIMESTAMP(3),

    CONSTRAINT "ContentReport_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "ContentReport_one_target_check" CHECK (
      ("articleId" IS NOT NULL AND "commentId" IS NULL) OR
      ("articleId" IS NULL AND "commentId" IS NOT NULL)
    )
);

CREATE INDEX "ContentReport_status_createdAt_idx"
ON "ContentReport"("status", "createdAt");

CREATE INDEX "ContentReport_articleId_idx" ON "ContentReport"("articleId");
CREATE INDEX "ContentReport_commentId_idx" ON "ContentReport"("commentId");

ALTER TABLE "ContentReport"
ADD CONSTRAINT "ContentReport_articleId_fkey"
FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ContentReport"
ADD CONSTRAINT "ContentReport_commentId_fkey"
FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;