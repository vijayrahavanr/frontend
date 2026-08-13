import { useEffect, useState } from 'react';

/**
 * Tracks browser connectivity via the online/offline events. Used by
 * OfflineBanner; also useful directly for disabling submit buttons
 * or skipping polling while offline.
 */
export const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(
    typeof navigator === 'undefined' ? true : navigator.onLine
  );

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  return isOnline;
};

export default useOnlineStatus;
