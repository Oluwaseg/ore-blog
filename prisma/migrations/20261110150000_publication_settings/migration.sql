CREATE TABLE "PublicationSettings" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "publicationName" TEXT NOT NULL DEFAULT 'Publication name pending',
    "tagline" TEXT NOT NULL DEFAULT 'Articles, insights, and perspectives on important social issues.',
    "description" TEXT NOT NULL DEFAULT 'A digital publication dedicated to sharing articles, insights, stories, and perspectives on important social issues.',
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PublicationSettings_pkey" PRIMARY KEY ("id")
);
