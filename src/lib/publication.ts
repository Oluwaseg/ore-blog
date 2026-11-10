import { db } from '@/lib/db';

export const publication = {
  name: 'Publication name pending',
  tagline: 'Articles, insights, and perspectives on important social issues.',
  description:
    'A digital publication dedicated to sharing articles, insights, stories, and perspectives on important social issues, including sexual violence, rape awareness, education, and related topics.',
};

export async function getPublicationSettings() {
  const settings = await db.publicationSettings.findUnique({
    where: { id: 'default' },
  });

  return {
    name: settings?.publicationName ?? publication.name,
    logoUrl: settings?.logoUrl ?? '',
    tagline: settings?.tagline ?? publication.tagline,
    description: settings?.description ?? publication.description,
    metaTitle:
      settings?.metaTitle || settings?.publicationName || publication.name,
    metaDescription:
      settings?.metaDescription ||
      settings?.description ||
      publication.description,
  };
}
