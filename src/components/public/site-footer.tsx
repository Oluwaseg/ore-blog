import Link from "next/link";
import { NewsletterForm } from "@/components/public/newsletter-form";
import { publication } from "@/lib/publication";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto grid w-full max-w-5xl gap-8 px-6 py-10 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="text-sm font-semibold">{publication.name}</p>
          <p className="mt-2 max-w-md text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            {publication.description}
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold">Newsletter</p>
          <p className="mt-2 mb-4 text-sm text-zinc-600 dark:text-zinc-400">
            Get new articles by email. You can unsubscribe at any time.
          </p>
          <NewsletterForm />
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-5xl flex-wrap gap-4 px-6 pb-8 text-sm text-zinc-500">
        <Link className="hover:text-zinc-950 dark:hover:text-zinc-50" href="/about">
          About
        </Link>
        <Link className="hover:text-zinc-950 dark:hover:text-zinc-50" href="/contact">
          Contact
        </Link>
      </div>
    </footer>
  );
}
