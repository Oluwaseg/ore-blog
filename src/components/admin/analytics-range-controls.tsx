import Link from 'next/link';

const presetRanges = [30, 90, 120, 365] as const;

export function AnalyticsRangeControls({
  days,
  from,
  to,
}: {
  days: number;
  from?: string;
  to?: string;
}) {
  return (
    <section
      aria-label='Analytics time range'
      className='flex flex-col gap-4 border-y border-border py-4 lg:flex-row lg:items-end lg:justify-between'
    >
      <div className='flex flex-wrap gap-2' aria-label='Preset date ranges'>
        {presetRanges.map((range) => (
          <Link
            aria-current={!from && days === range ? 'true' : undefined}
            className={`inline-flex min-h-9 items-center justify-center rounded-md border px-3 text-sm transition-colors ${!from && days === range ? 'border-primary bg-accent text-accent-foreground' : 'border-border text-muted-foreground hover:bg-muted hover:text-foreground'}`}
            href={`/admin?days=${range}`}
            key={range}
          >
            {range} days
          </Link>
        ))}
      </div>
      <form
        action='/admin'
        className='flex flex-wrap items-end gap-3'
        method='get'
      >
        <label className='flex flex-col gap-1 text-xs text-muted-foreground'>
          From
          <input
            className='h-9 rounded-md border border-input bg-card px-2 text-sm text-card-foreground focus-visible:ring-2 focus-visible:ring-ring'
            defaultValue={from}
            name='from'
            required
            type='date'
          />
        </label>
        <label className='flex flex-col gap-1 text-xs text-muted-foreground'>
          To
          <input
            className='h-9 rounded-md border border-input bg-card px-2 text-sm text-card-foreground focus-visible:ring-2 focus-visible:ring-ring'
            defaultValue={to}
            name='to'
            required
            type='date'
          />
        </label>
        <button
          className='inline-flex h-9 items-center justify-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90'
          type='submit'
        >
          Apply range
        </button>
      </form>
    </section>
  );
}
