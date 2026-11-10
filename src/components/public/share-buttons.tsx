'use client';

import { Icon } from '@iconify/react';
import { Check, Link as LinkIcon, Share2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ShareButtons({ title }: { title: string }) {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);

      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access may be unavailable in some browsers.
      setCopied(false);
    }
  };

  if (!url) return null;

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: 'X',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      label: 'Share on X',
      icon: <Icon icon='ri:twitter-x-fill' className='size-4' />,
    },
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      label: 'Share on Facebook',
      icon: <Icon icon='ri:facebook-fill' className='size-4' />,
    },
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      label: 'Share on LinkedIn',
      icon: <Icon icon='ri:linkedin-fill' className='size-4' />,
    },
    {
      name: 'WhatsApp',
      href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
      label: 'Share on WhatsApp',
      icon: <Icon icon='ri:whatsapp-fill' className='size-4' />,
    },
  ];

  return (
    <div className='flex flex-wrap items-center gap-3'>
      <div className='flex items-center gap-2 text-sm font-medium text-muted-foreground'>
        <Share2 size={16} />
        <span>Share this article</span>
      </div>

      <div className='flex flex-wrap items-center gap-2'>
        {shareLinks.map((item) => (
          <a
            key={item.name}
            href={item.href}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={item.label}
            title={item.label}
            className='
              inline-flex size-10 items-center justify-center
              rounded-full border border-border
              bg-background text-muted-foreground
              transition-all duration-200
              hover:border-primary/30 hover:bg-accent
              hover:text-primary hover:-translate-y-0.5
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-ring
            '
          >
            {item.icon}
          </a>
        ))}

        <button
          type='button'
          onClick={copyLink}
          aria-label={copied ? 'Link copied' : 'Copy article link'}
          title={copied ? 'Copied!' : 'Copy link'}
          className={`
            inline-flex size-10 items-center justify-center
            rounded-full border border-border
            transition-all duration-200
            hover:-translate-y-0.5
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-ring
            ${
              copied
                ? 'border-primary/30 bg-accent text-primary'
                : 'bg-background text-muted-foreground hover:border-primary/30 hover:bg-accent hover:text-primary'
            }
          `}
        >
          {copied ? <Check size={17} /> : <LinkIcon size={17} />}
        </button>
      </div>
    </div>
  );
}
