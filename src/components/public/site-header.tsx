import Link from "next/link";
import { SearchForm } from "@/components/public/search-form";
import { publication } from "@/lib/publication";

const links = [
  { href: "/", label: "Home" },
  { href: "/articles", label: "Articles" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-8">
          <Link className="text-lg font-semibold tracking-tight" href="/">
            {publication.name}
          </Link>
          <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            {links.map((link) => (
              <Link className="hover:text-zinc-950 dark:hover:text-zinc-50" href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <SearchForm />
      </div>
    </header>
  );
}
