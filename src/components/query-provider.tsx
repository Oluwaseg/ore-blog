'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { Toaster } from 'sonner';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        closeButton
        position='top-right'
        richColors
        theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      />
      {process.env.NODE_ENV === 'development' ? (
        <ReactQueryDevtools initialIsOpen={false} />
      ) : null}
    </QueryClientProvider>
  );
}
