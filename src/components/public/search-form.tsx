export function SearchForm({ defaultValue = "" }: { defaultValue?: string }) {
  return (
    <form action="/search" className="flex w-full max-w-xs gap-2">
      <label className="sr-only" htmlFor="site-search">
        Search articles
      </label>
      <input
        className="h-10 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950"
        defaultValue={defaultValue}
        id="site-search"
        name="q"
        placeholder="Search articles"
        type="search"
      />
      <button
        className="h-10 rounded-md bg-zinc-900 px-3 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
        type="submit"
      >
        Search
      </button>
    </form>
  );
}
