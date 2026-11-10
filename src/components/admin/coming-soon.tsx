export function ComingSoon({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <main>
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
    </main>
  );
}
