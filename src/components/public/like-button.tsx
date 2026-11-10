'use client';

import { useState, useTransition } from 'react';
import { toggleReactionAction } from '@/actions/engagement';

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

  return (
    <button
      className='text-sm font-medium underline-offset-4 hover:underline disabled:opacity-70'
      disabled={isPending}
      onClick={() => {
        setOptimisticLiked(!optimisticLiked);
        setOptimisticCount(optimisticCount + (optimisticLiked ? -1 : 1));
        startTransition(async () => {
          await toggleReactionAction(articleId);
        });
      }}
      type='button'
    >
      {optimisticLiked ? 'Liked' : 'Like'} · {optimisticCount}
    </button>
  );
}
