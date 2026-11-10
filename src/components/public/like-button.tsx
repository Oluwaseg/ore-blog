'use client';

import { toggleReactionAction } from '@/actions/engagement';
import { Heart } from 'lucide-react';
import { useState, useTransition } from 'react';

export function LikeButton({
  articleId,
  liked,
  count,
}: {
  articleId: string;
  liked: boolean;
  count: number;
}) {
  const [isPending, startTransition] = useTransition();
  const [optimisticLiked, setOptimisticLiked] = useState(liked);
  const [optimisticCount, setOptimisticCount] = useState(count);

  const handleLike = () => {
    const previousLiked = optimisticLiked;
    const previousCount = optimisticCount;
    const nextLiked = !previousLiked;

    // Optimistic UI update
    setOptimisticLiked(nextLiked);
    setOptimisticCount(previousCount + (nextLiked ? 1 : -1));

    startTransition(async () => {
      try {
        await toggleReactionAction(articleId);
      } catch {
        // Restore previous state if the action fails
        setOptimisticLiked(previousLiked);
        setOptimisticCount(previousCount);
      }
    });
  };

  return (
    <button
      type='button'
      onClick={handleLike}
      disabled={isPending}
      aria-label={`${optimisticLiked ? 'Unlike' : 'Like'} this article. ${optimisticCount} likes`}
      aria-pressed={optimisticLiked}
      className={`
        group inline-flex items-center gap-2
        rounded-full border border-border
        px-4 py-2
        text-sm font-medium
        transition-all duration-200
        hover:bg-accent hover:text-accent-foreground
        active:scale-95
        disabled:cursor-not-allowed disabled:opacity-60
        ${optimisticLiked ? 'bg-accent text-accent-foreground' : 'bg-background text-foreground'}
      `}
    >
      <Heart
        size={17}
        strokeWidth={1.8}
        className={`
          transition-all duration-200
          group-hover:scale-110
          ${optimisticLiked ? 'fill-current text-primary' : ''}
        `}
      />

      <span>{optimisticLiked ? 'Liked' : 'Like'}</span>

      <span className='border-l border-current/20 pl-2 tabular-nums'>
        {optimisticCount}
      </span>
    </button>
  );
}
