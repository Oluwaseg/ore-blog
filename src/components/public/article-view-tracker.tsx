'use client';

import { recordArticleView } from '@/actions/views';
import { useEffect, useRef } from 'react';

export function ArticleViewTracker({ articleId }: { articleId: string }) {
  const trackedArticleId = useRef<string | null>(null);

  useEffect(() => {
    if (trackedArticleId.current === articleId) {
      return;
    }

    trackedArticleId.current = articleId;
    void recordArticleView(articleId).catch(() => undefined);
  }, [articleId]);

  return null;
}
