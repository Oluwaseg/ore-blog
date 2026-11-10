import { db } from "@/lib/db";
import { slugify } from "@/lib/slug";

export async function uniqueArticleSlug(
  title: string,
  slugInput?: string,
  excludeId?: string,
) {
  const base = slugify(slugInput || title);
  let slug = base;
  let suffix = 2;

  while (true) {
    const existing = await db.article.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!existing || existing.id === excludeId) {
      return slug;
    }

    slug = `${base}-${suffix}`;
    suffix += 1;
  }
}

export async function uniqueCategorySlug(
  name: string,
  slugInput?: string,
  excludeId?: string,
) {
  const base = slugify(slugInput || name);
  let slug = base;
  let suffix = 2;

  while (true) {
    const existing = await db.category.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!existing || existing.id === excludeId) {
      return slug;
    }

    slug = `${base}-${suffix}`;
    suffix += 1;
  }
}
