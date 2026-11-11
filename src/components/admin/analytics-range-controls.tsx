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
      className='flex flex-col gap-5 border-y border-border py-4 lg:flex-row lg:items-end lg:justify-between'
    >
      <div
        aria-label='Preset date ranges'
        className='flex flex-wrap gap-x-5 gap-y-2'
        role='group'
      >
        {presetRanges.map((range) => {
          const isCurrent = !from && days === range;

          return (
            <Link
              aria-current={isCurrent ? 'true' : undefined}
              className={`border-b-2 py-1 text-sm transition-colors ${
                isCurrent
                  ? 'border-primary text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
              href={`/admin?days=${range}`}
              key={range}
            >
              {range} days
            </Link>
          );
        })}
      </div>

      <form
        action='/admin'
        className='flex flex-wrap items-end gap-x-4 gap-y-3'
        method='get'
      >
        <label className='flex flex-col gap-1 text-xs text-muted-foreground'>
          From
          <input
            className='h-9 min-w-36 border-b border-input bg-transparent text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            defaultValue={from}
            name='from'
            required
            type='date'
          />
        </label>

        <label className='flex flex-col gap-1 text-xs text-muted-foreground'>
          To
          <input
            className='h-9 min-w-36 border-b border-input bg-transparent text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            defaultValue={to}
            name='to'
            required
            type='date'
          />
        </label>

        <button
          className='h-9 border-b-2 border-primary px-1 text-sm font-medium text-foreground transition-colors hover:text-primary'
          type='submit'
        >
          Apply range
        </button>
      </form>
    </section>
  );
}
