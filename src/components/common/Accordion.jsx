import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { cn } from '@/utils/helpers';

/**
 * Single accordion item. Compose multiple inside a parent `<div>` for
 * a full accordion group (each item manages its own open state,
 * so nothing forces exclusive/single-open behavior — pass a shared
 * `openId`/`onToggle` pair from the parent if that's desired).
 *
 * @param {object} props
 * @param {string} props.title
 * @param {boolean} [props.defaultOpen]
 */
const Accordion = ({ title, children, defaultOpen = false, className }) => {
  const [open, setOpen] = useState(defaultOpen);
  const contentId = `accordion-content-${title?.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className={cn('rounded-xl border border-slate-200 dark:border-slate-700', className)}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls={contentId}
        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200 dark:text-slate-100"
      >
        {title}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <FiChevronDown />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={contentId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="border-t border-slate-200 px-4 py-3 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordion;
