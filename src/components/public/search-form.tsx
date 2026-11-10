export function SearchForm({
  defaultValue = '',
  inputId = 'site-search',
  variant = 'default',
}: {
  defaultValue?: string;
  inputId?: string;
  /** 'rule' = underlined editorial field used in the masthead */
  variant?: 'default' | 'rule';
}) {
  if (variant === 'rule') {
    return (
      <form
        action='/search'
        className='group flex w-full items-center gap-3 border-b border-foreground/60 focus-within:border-primary'
      >
        <label className='sr-only' htmlFor={inputId}>
          Search articles
        </label>
        <span
          aria-hidden
          className='font-heading text-lg italic text-muted-foreground'
        >
          Search
        </span>
        <input
          className='h-10 w-full bg-transparent font-heading text-lg text-foreground outline-none placeholder:italic'
          defaultValue={defaultValue}
          id={inputId}
          name='q'
          placeholder='essays, authors, topics…'
          type='search'
        />
        <button
          aria-label='Submit search'
          className='h-10 text-[0.6875rem] uppercase tracking-[0.2em] text-primary transition-colors hover:text-foreground'
          type='submit'
        >
          Go →
        </button>
      </form>
    );
  }

  return (
    <form action='/search' className='flex w-full max-w-xs gap-2'>
      <label className='sr-only' htmlFor={inputId}>
        Search articles
      </label>
      <input
        className='h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring'
        defaultValue={defaultValue}
        id={inputId}
        name='q'
        placeholder='Search articles'
        type='search'
      />
      <button
        className='h-10 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90'
        type='submit'
      >
        Search
      </button>
    </form>
  );
}
