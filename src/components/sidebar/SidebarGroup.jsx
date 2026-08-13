import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { cn } from '@/utils/helpers';
import SidebarItem from './SidebarItem';

/**
 * Collapsible group of SidebarItems (nested menu). Automatically
 * hidden/collapsed-friendly: when the sidebar itself is collapsed to
 * icon-only, the group falls back to showing just its icon.
 *
 * @param {object} props
 * @param {string} props.label
 * @param {React.ReactNode} [props.icon]
 * @param {{label: string, to: string}[]} props.items
 * @param {boolean} [props.collapsed] - sidebar-level collapsed state
 * @param {boolean} [props.defaultOpen]
 */
const SidebarGroup = ({ label, icon, items = [], collapsed = false, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);

  if (collapsed) {
    return (
      <div className="flex flex-col gap-1">
        {items.map((item) => (
          <SidebarItem key={item.to} {...item} collapsed />
        ))}
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
      >
        {icon && <span className="flex shrink-0 text-lg">{icon}</span>}
        <span className="flex-1 truncate text-left">{label}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <FiChevronDown size={14} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn('overflow-hidden')}
          >
            <div className="flex flex-col gap-1 py-1">
              {items.map((item) => (
                <SidebarItem key={item.to} {...item} nested />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SidebarGroup;
