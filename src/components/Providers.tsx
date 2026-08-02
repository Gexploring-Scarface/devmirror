'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { HandlesProvider } from '@/hooks/useHandles';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000 * 15, // 15 mins
        refetchOnWindowFocus: true,
        retry: 2
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <HandlesProvider>
        {children}
      </HandlesProvider>
    </QueryClientProvider>
  );
}
