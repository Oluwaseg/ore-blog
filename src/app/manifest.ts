import { getPublicationSettings } from '@/lib/publication';
import type { MetadataRoute } from 'next';
import { connection } from 'next/server';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  await connection();
  const publication = await getPublicationSettings();

  return {
    name: publication.name,
    short_name: publication.name,
    description: publication.tagline,
    start_url: '/',
    display: 'standalone',
    background_color: '#faf8fc',
    theme_color: '#563461',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
