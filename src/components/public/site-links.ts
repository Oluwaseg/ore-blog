export const links = [
  { href: '/', label: 'Home' },
  { href: '/articles', label: 'Articles' },
  { href: '/categories', label: 'Categories' },
  { href: '/stories/submit', label: 'Share your story' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export const pad = (index: number) => String(index + 1).padStart(2, '0');

export function isActivePath(activePath: string | null, href: string) {
  if (!activePath) return false;
  return href === '/'
    ? activePath === '/'
    : activePath === href || activePath.startsWith(`${href}/`);
}
