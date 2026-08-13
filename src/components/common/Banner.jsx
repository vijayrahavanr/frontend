import { AnimatePresence, motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { cn } from '@/utils/helpers';

const TYPE_CLASSES = {
  info: 'bg-primary text-white',
  success: 'bg-success text-white',
  warning: 'bg-warning text-white',
  danger: 'bg-danger text-white',
  neutral: 'bg-slate-800 text-white dark:bg-slate-700',
};

/**
 * Full-width banner for page/app-level announcements (maintenance
 * notices, feature callouts, degraded-service warnings).
 *
 * @param {object} props
 * @param {boolean} props.open
 * @param {'info'|'success'|'warning'|'danger'|'neutral'} [props.type]
 * @param {() => void} [props.onDismiss]
 * @param {React.ReactNode} [props.action]
 */
const Banner = ({ open, type = 'info', children, action, onDismiss, className }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden"
      >
        <div
          role="status"
          className={cn(
            'flex w-full items-center justify-center gap-4 px-4 py-2.5 text-center text-sm font-medium',
            TYPE_CLASSES[type],
            className
          )}
        >
          <span>{children}</span>
          {action}
          {onDismiss && (
            <button
              type="button"
              onClick={onDismiss}
              aria-label="Dismiss banner"
              className="opacity-80 hover:opacity-100"
            >
              <FiX size={16} />
            </button>
          )}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default Banner;
