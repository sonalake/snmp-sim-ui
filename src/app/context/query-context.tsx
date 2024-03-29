import { FC, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AxiosError } from 'axios';

import { ErrorToast } from 'app/components';

interface QueryProviderProps {
  children: ReactNode;
}

const queryConfig = {
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
      retry: (failureCount: number, error: unknown) => {
        if (error instanceof AxiosError) {
          if (error.response?.status === 404) return false;
          if (error.response?.status === 401) return false;
          else if (failureCount < 2) return true;
        }
        return false;
      }
    },
    mutations: {
      onError: (err: unknown) => {
        ErrorToast(err);
      }
    }
  }
};

export const QueryProvider: FC<QueryProviderProps> = ({ children }) => {
  const queryClient = new QueryClient(queryConfig);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  );
};
