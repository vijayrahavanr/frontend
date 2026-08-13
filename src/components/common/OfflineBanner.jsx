import { AnimatePresence, motion } from 'framer-motion';
import { FiWifiOff } from 'react-icons/fi';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';

/**
 * Fixed top banner shown whenever the browser goes offline. Mounted
 * once at the app root (see App.jsx) — every page benefits without
 * wiring anything per-page.
 *
 * `role="status"` + `aria-live="polite"` so screen readers announce
 * the connectivity change without interrupting whatever the user is
 * doing.
 */
const OfflineBanner = () => {
  const isOnline = useOnlineStatus();

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-x-0 top-0 z-[60] flex items-center justify-center gap-2 bg-danger px-4 py-2 text-center text-sm font-medium text-white"
        >
          <FiWifiOff size={15} aria-hidden="true" />
          You&apos;re offline. Some features may not work until your connection is restored.
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OfflineBanner;
