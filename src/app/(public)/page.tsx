import { publication } from '@/lib/publication';
import Link from 'next/link';

const featuredStories = [
  {
    title: 'How communities are rebuilding after trauma',
    category: 'Awareness',
    excerpt:
      'A closer look at local support networks, prevention work, and the everyday systems that help people heal.',
    href: '/articles/community-rebuilding',
  },
  {
    title: 'The role of education in breaking cycles',
    category: 'Education',
    excerpt:
      'Why informed, compassionate education matters in prevention, accountability, and long-term change.',
    href: '/articles/education-and-prevention',
  },
  {
    title: 'What public storytelling can change',
    category: 'Perspectives',
    excerpt:
      'Narratives shape policy, empathy, and public understanding. Here is why honest storytelling still matters.',
    href: '/articles/public-storytelling',
  },
];

const topicHighlights = [
  'Sexual violence awareness',
  'Education and prevention',
  'Community care',
  'Public accountability',
];

export default function HomePage() {
  return (
    <div className='space-y-12 pb-10'>
      <section className='overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm'>
        <div className='grid gap-8 px-6 py-8 md:grid-cols-[1.2fr_0.8fr] md:px-10 md:py-12'>
          <div className='space-y-6'>
            <p className='text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500'>
              New issue
            </p>
            <div className='space-y-4'>
              <h1 className='max-w-xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl'>
                {publication.tagline}
              </h1>
              <p className='max-w-xl text-base leading-7 text-zinc-600'>
                {publication.description}
              </p>
            </div>
            <div className='flex flex-wrap gap-3'>
              <Link
                className='rounded-full bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800'
                href='/articles'
              >
                Read latest articles
              </Link>
              <Link
                className='rounded-full border border-zinc-300 px-5 py-3 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-950'
                href='/about'
              >
                About the publication
              </Link>
            </div>
          </div>

          <div className='rounded-2xl bg-zinc-950 p-6 text-zinc-50 shadow-inner'>
            <div className='space-y-4'>
              <p className='text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400'>
                This week
              </p>
              <h2 className='text-2xl font-semibold tracking-tight'>
                Looking for the stories behind the statistics?
              </h2>
              <p className='text-sm leading-6 text-zinc-300'>
                We publish reporting, essays, and analysis focused on justice,
                prevention, education, and community care.
              </p>
            </div>

            <div className='mt-6 space-y-3'>
              {topicHighlights.map((topic) => (
                <div
                  key={topic}
                  className='rounded-xl border border-zinc-800 bg-zinc-900/70 px-3 py-2 text-sm text-zinc-200'
                >
                  {topic}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className='space-y-6'>
        <div className='flex items-end justify-between gap-4'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500'>
              Featured
            </p>
            <h2 className='mt-2 text-2xl font-semibold tracking-tight text-zinc-950'>
              Latest stories
            </h2>
          </div>
          <Link
            href='/articles'
            className='text-sm font-medium text-zinc-700 hover:text-zinc-950'
          >
            View all articles
          </Link>
        </div>

        <div className='grid gap-6 md:grid-cols-3'>
          {featuredStories.map((story) => (
            <article
              key={story.title}
              className='rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm'
            >
              <div className='mb-4 flex items-center justify-between gap-3'>
                <span className='rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600'>
                  {story.category}
                </span>
              </div>
              <h3 className='text-xl font-semibold tracking-tight text-zinc-950'>
                <Link href={story.href}>{story.title}</Link>
              </h3>
              <p className='mt-3 text-sm leading-6 text-zinc-600'>
                {story.excerpt}
              </p>
              <Link
                href={story.href}
                className='mt-5 inline-block text-sm font-medium text-zinc-800 hover:text-zinc-950'
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className='grid gap-6 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:grid-cols-[1.4fr_0.8fr] md:p-8'>
        <div>
          <p className='text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500'>
            Why this publication
          </p>
          <h2 className='mt-2 text-2xl font-semibold tracking-tight text-zinc-950'>
            Thoughtful reporting for difficult conversations.
          </h2>
          <p className='mt-4 max-w-2xl text-base leading-7 text-zinc-600'>
            We aim to make research, lived experience, and public discourse more
            accessible—so readers can understand the issues, recognize the
            patterns, and act with clarity.
          </p>
        </div>

        <div className='rounded-2xl bg-zinc-100 p-5'>
          <p className='text-sm font-medium text-zinc-700'>Explore</p>
          <ul className='mt-4 space-y-3 text-sm text-zinc-600'>
            <li>
              <Link href='/articles' className='hover:text-zinc-950'>
                Articles
              </Link>
            </li>
            <li>
              <Link href='/categories' className='hover:text-zinc-950'>
                Categories
              </Link>
            </li>
            <li>
              <Link href='/about' className='hover:text-zinc-950'>
                About
              </Link>
            </li>
            <li>
              <Link href='/contact' className='hover:text-zinc-950'>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
