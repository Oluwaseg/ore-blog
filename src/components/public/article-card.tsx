import Link from "next/link";
import { formatDate, plainText } from "@/lib/plain-text";

type ArticleCardArticle = {
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featuredImage: string | null;
  publishedAt: Date | null;
  categories: { category: { name: string; slug: string } }[];
};

export function ArticleCard({ article }: { article: ArticleCardArticle }) {
  const summary = article.excerpt || plainText(article.content);

  return (
    <article className="flex flex-col gap-3">
      {article.featuredImage ? (
        <Link href={`/articles/${article.slug}`}>
          <img
            alt=""
            className="h-48 w-full rounded-xl object-cover"
            src={article.featuredImage}
          />
        </Link>
      ) : null}
      <div className="flex flex-wrap gap-2 text-xs font-medium uppercase tracking-wide text-zinc-500">
        {article.categories.map((item) => (
          <Link href={`/categories/${item.category.slug}`} key={item.category.slug}>
            {item.category.name}
          </Link>
        ))}
      </div>
      <h2 className="text-xl font-semibold tracking-tight">
        <Link href={`/articles/${article.slug}`}>{article.title}</Link>
      </h2>
      {article.publishedAt ? (
        <p className="text-sm text-zinc-500">{formatDate(article.publishedAt)}</p>
      ) : null}
      {summary ? (
        <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">{summary}</p>
      ) : null}
    </article>
  );
}
