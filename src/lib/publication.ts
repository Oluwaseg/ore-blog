import { db } from '@/lib/db';

export const publication = {
  name: 'Beyond the Statute',
  tagline:
    'Understanding the law. Centering lived realities. Advancing justice.',
  description:
    'Beyond the Statute is an independent legal research, education, and advocacy platform advancing understanding and meaningful conversations around sexual and gender-based violence. We explore what the law promises, what happens in practice, whose realities are overlooked, and how justice can become a lived experience.',
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
