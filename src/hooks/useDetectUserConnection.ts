import { useState } from 'react'
import { useEventListener } from './useEventListener'

export const useDetectUserConnection = () => {
  const [isUserOnline, setIsUserOnline] = useState(navigator.onLine)

  useEventListener('online', () => setIsUserOnline(navigator.onLine))
  useEventListener('offline', () => setIsUserOnline(navigator.onLine))

  return { isUserOnline }
}
