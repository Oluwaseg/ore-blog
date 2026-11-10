export function SearchForm({ defaultValue = '' }: { defaultValue?: string }) {
  return (
    <form action='/search' className='flex w-full max-w-xs gap-2'>
      <label className='sr-only' htmlFor='site-search'>
        Search articles
      </label>
      <input
        className='h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring'
        defaultValue={defaultValue}
        id='site-search'
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
