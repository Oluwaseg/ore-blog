import { AdminAccountSettingsForm } from '@/components/admin/admin-account-settings-form';
import { PublicationSettingsForm } from '@/components/admin/publication-settings-form';
import { requireAdmin } from '@/lib/auth';
import { getPublicationSettings, publication } from '@/lib/publication';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Settings',
};

export default function AdminSettingsPage() {
  return (
    <main className='flex flex-col gap-8'>
      <header>
        <h1 className='text-2xl font-semibold tracking-tight'>Settings</h1>
        <p className='mt-2 text-sm text-muted-foreground'>
          Manage publication identity, search metadata, and administrator
          credentials.
        </p>
      </header>
      <Suspense fallback={<SettingsFallback />}>
        <SettingsContent />
      </Suspense>
    </main>
  );
}

async function SettingsContent() {
  const [admin, savedPublication] = await Promise.all([
    requireAdmin(),
    getPublicationSettings(),
  ]);

  return (
    <div className='grid gap-8 xl:grid-cols-2'>
      <section className='flex flex-col gap-5 rounded-md border border-border bg-card p-5 sm:p-6'>
        <div>
          <h2 className='text-lg font-semibold'>Publication</h2>
          <p className='mt-1 text-sm text-muted-foreground'>
            These details are shown across the public site.
          </p>
        </div>
        <PublicationSettingsForm
          settings={{
            publicationName: savedPublication.name || publication.name,
            logoUrl: savedPublication.logoUrl,
            instagramUrl: savedPublication.instagramUrl,
            tagline: savedPublication.tagline || publication.tagline,
            description:
              savedPublication.description || publication.description,
            metaTitle:
              savedPublication.metaTitle === publication.name
                ? ''
                : savedPublication.metaTitle,
            metaDescription:
              savedPublication.metaDescription === publication.description
                ? ''
                : savedPublication.metaDescription,
          }}
        />
      </section>
      <section className='flex flex-col gap-5 rounded-md border border-border bg-card p-5 sm:p-6'>
        <div>
          <h2 className='text-lg font-semibold'>Administrator account</h2>
          <p className='mt-1 text-sm text-muted-foreground'>
            Confirm your current password before changing account credentials.
          </p>
        </div>
        <AdminAccountSettingsForm email={admin.email} />
      </section>
    </div>
  );
}

function SettingsFallback() {
  return (
    <div
      aria-label='Loading settings'
      className='grid gap-8 xl:grid-cols-2'
      role='status'
    >
      {[0, 1].map((item) => (
        <div
          className='h-136 animate-pulse rounded-md border border-border bg-card'
          key={item}
        />
      ))}
    </div>
  );
}
