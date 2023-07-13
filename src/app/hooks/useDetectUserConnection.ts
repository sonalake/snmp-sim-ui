import { useState } from 'react';

import { useEventListener } from './useEventListener';

export const useDetectUserConnection = () => {
  const [isBrowserOnline, setisBrowserOnline] = useState(navigator.onLine);

  useEventListener('online', () => setisBrowserOnline(navigator.onLine));
  useEventListener('offline', () => setisBrowserOnline(navigator.onLine));

  return { isBrowserOnline };
};
