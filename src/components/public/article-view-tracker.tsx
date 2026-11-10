'use client';

import { recordArticleView } from '@/actions/views';
import { useEffect } from 'react';

export function ArticleViewTracker({ articleId }: { articleId: string }) {
  useEffect(() => {
    void recordArticleView(articleId).catch(() => undefined);
  }, [articleId]);

  return null;
}
