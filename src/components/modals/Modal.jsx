import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { cn } from '@/utils/helpers';

const SIZE_CLASSES = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Base modal dialog. Portal-rendered, closes on ESC and backdrop
 * click, traps scroll on the body while open.
 *
 * Focus management: moves focus into the dialog on open, traps
 * Tab/Shift+Tab within it while open (screen-reader and keyboard
 * users can't tab out to content hidden behind the backdrop), and
 * restores focus to whatever triggered the modal on close.
 *
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {string} [props.title]
 * @param {'sm'|'md'|'lg'|'xl'} [props.size]
 * @param {boolean} [props.closeOnBackdrop]
 */
const Modal = ({
  open,
  onClose,
  title,
  size = 'md',
  closeOnBackdrop = true,
  children,
  footer,
  className,
}) => {
  const dialogRef = useRef(null);
  const triggerElementRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    triggerElementRef.current = document.activeElement;
    document.body.style.overflow = 'hidden';

    // Move focus into the dialog once it's mounted (next tick, so
    // the portal content actually exists in the DOM).
    const focusTimer = setTimeout(() => {
      const first = dialogRef.current?.querySelector(FOCUSABLE_SELECTOR);
      (first || dialogRef.current)?.focus();
    }, 0);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = Array.from(dialogRef.current.querySelectorAll(FOCUSABLE_SELECTOR));
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      // Return focus to whatever opened the modal (e.g. the button
      // that triggered it), so keyboard users aren't dropped back at
      // the top of the page.
      triggerElementRef.current?.focus?.();
    };
  }, [open, onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
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
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className={cn(
              'relative z-10 w-full rounded-2xl bg-white p-6 shadow-2xl dark:bg-surface-dark-elevated',
              SIZE_CLASSES[size],
              className
            )}
          >
            {(title || true) && (
              <div className="mb-4 flex items-start justify-between gap-4">
                {title && (
                  <h2
                    id="modal-title"
                    className="text-lg font-semibold text-slate-900 dark:text-white"
                  >
                    {title}
                  </h2>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close dialog"
                  className="ml-auto rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                >
                  <FiX size={18} />
                </button>
              </div>
            )}

            <div className="text-sm text-slate-600 dark:text-slate-300">{children}</div>

            {footer && (
              <div className="mt-6 flex items-center justify-end gap-2">{footer}</div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;
