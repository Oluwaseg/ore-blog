export function PublicationLoader({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={
        compact
          ? 'border-b border-border bg-background'
          : 'border-t border-border bg-background'
      }
      aria-label='Loading publication'
      role='status'
    >
      <div className='mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10'>
        <div className='flex items-center gap-3'>
          <img
            alt='Beyond the Statute logo'
            className='h-10 w-10 rounded-md object-cover ring-1 ring-border'
            src='/logo.png'
          />
          <div className='space-y-2'>
            <div className='h-4 w-28 animate-pulse rounded bg-muted' />
            {!compact ? (
              <div className='h-3 w-40 animate-pulse rounded bg-muted/80' />
            ) : null}
          </div>
        </div>
        {!compact ? (
          <div className='hidden h-3 w-24 animate-pulse rounded bg-muted sm:block' />
        ) : null}
      </div>
    </div>
  );
}
