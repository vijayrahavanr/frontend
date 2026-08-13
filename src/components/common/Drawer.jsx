import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { cn } from '@/utils/helpers';

const SIZE_CLASSES = {
  sm: 'max-w-xs',
  md: 'max-w-sm',
  lg: 'max-w-md',
  xl: 'max-w-lg',
};

const SIDE_VARIANTS = {
  right: { hidden: { x: '100%' }, visible: { x: 0 } },
  left: { hidden: { x: '-100%' }, visible: { x: 0 } },
};

/**
 * Slide-in panel anchored to the left or right edge of the viewport.
 * Same ESC / backdrop-close behavior as Modal.
 *
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {'left'|'right'} [props.side]
 * @param {'sm'|'md'|'lg'|'xl'} [props.size]
 */
const Drawer = ({
  open,
  onClose,
  side = 'right',
  size = 'md',
  title,
  children,
  footer,
  closeOnBackdrop = true,
  className,
}) => {
  useEffect(() => {
    if (!open) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={closeOnBackdrop ? onClose : undefined}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={SIDE_VARIANTS[side]}
            transition={{ type: 'tween', duration: 0.25, ease: 'easeInOut' }}
            className={cn(
              'relative z-10 flex h-full w-full flex-col bg-white shadow-2xl dark:bg-surface-dark-elevated',
              SIZE_CLASSES[size],
              side === 'right' ? 'ml-auto' : 'mr-auto',
              className
            )}
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-700">
              {title && (
                <h2 className="text-base font-semibold text-slate-900 dark:text-white">{title}</h2>
              )}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close panel"
                className="ml-auto rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
              {children}
            </div>

            {footer && (
              <div className="flex items-center justify-end gap-2 border-t border-slate-100 px-5 py-4 dark:border-slate-700">
                {footer}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Drawer;
