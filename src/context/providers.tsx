import React, { FC } from 'react'
import { QueryProvider } from './query-context'

interface ProviderProps {
  children: JSX.Element | JSX.Element[]
}
export const Providers: FC<ProviderProps> = ({ children }) => {
  return <QueryProvider>{children}</QueryProvider>
}
