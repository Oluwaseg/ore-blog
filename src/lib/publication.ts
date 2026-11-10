import { db } from '@/lib/db';

export const publication = {
  name: 'Beyond the Statute',
  tagline:
    'Understanding the law. Centering lived realities. Advancing justice.',
  description:
    'Legal research, public education, and the realities the law too often leaves out.',
};

export async function getPublicationSettings() {
  const settings = await db.publicationSettings.findUnique({
    where: { id: 'default' },
  });

  return {
    name: settings?.publicationName ?? publication.name,
    logoUrl: settings?.logoUrl ?? '',
    instagramUrl: settings?.instagramUrl ?? '',
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
