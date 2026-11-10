export function SearchForm({
  defaultValue = '',
  inputId = 'site-search',
}: {
  defaultValue?: string;
  inputId?: string;
}) {
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
