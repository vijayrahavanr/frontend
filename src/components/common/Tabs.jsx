import { motion } from 'framer-motion';
import { cn } from '@/utils/helpers';

/**
 * Horizontal tab list with an animated sliding underline.
 * Fully controlled — pass `value` and `onChange`.
 *
 * @param {object} props
 * @param {{label: string, value: string, icon?: React.ReactNode, disabled?: boolean}[]} props.tabs
 * @param {string} props.value
 * @param {(value: string) => void} props.onChange
 */
const Tabs = ({ tabs = [], value, onChange, className }) => {
  return (
    <div
      role="tablist"
      className={cn('flex gap-1 border-b border-slate-200 dark:border-slate-700', className)}
    >
      {tabs.map((tab) => {
        const isActive = tab.value === value;
        return (
          <button
            key={tab.value}
            role="tab"
            type="button"
            aria-selected={isActive}
            disabled={tab.disabled}
            onClick={() => onChange(tab.value)}
            className={cn(
              'relative flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200 rounded-t-md',
              isActive
                ? 'text-primary'
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200',
              tab.disabled && 'cursor-not-allowed opacity-50'
            )}
          >
            {tab.icon}
            {tab.label}
            {isActive && (
              <motion.span
                layoutId="tabs-underline"
                className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
