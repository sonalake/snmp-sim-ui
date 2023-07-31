import { useEffect, useState } from 'react';

export const useDetectUserConnection = () => {
  const [isBrowserOnline, setIsBrowserOnline] = useState(navigator.onLine);

  const setOnline = () => setIsBrowserOnline(true);
  const setOffline = () => setIsBrowserOnline(false);

  useEffect(() => {
    window.addEventListener('online', setOnline);
    window.addEventListener('offline', setOffline);

    return () => {
      window.removeEventListener('online', setOnline);
      window.removeEventListener('offline', setOffline);
    };
  }, []);

  return { isBrowserOnline };
};
