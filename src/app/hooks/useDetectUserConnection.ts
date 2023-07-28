import { useState } from 'react';

import { useEventListener } from './useEventListener';

export const useDetectUserConnection = () => {
  const [isBrowserOnline, setIsBrowserOnline] = useState(navigator.onLine);

  useEventListener('online', () => setIsBrowserOnline(navigator.onLine));
  useEventListener('offline', () => setIsBrowserOnline(navigator.onLine));

  return { isBrowserOnline };
};
