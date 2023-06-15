import { AxiosError } from 'axios'
import React, { FC, ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { errorToast } from '../components/Toasts/toasts'

interface QueryProviderProps {
  children: ReactNode
}

const queryConfig = {
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
      retry: (failureCount: number, error: unknown) => {
        if (error instanceof AxiosError) {
          if (error.response?.status === 404) return false
          if (error.response?.status === 401) return false
          else if (failureCount < 2) return true
        }
        return false
      },
    },
    mutations: {
      onError: (err: unknown) => {
        errorToast(err)
      },
    },
  },
}

export const QueryProvider: FC<QueryProviderProps> = ({ children }) => {
  const queryClient = new QueryClient(queryConfig)

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
