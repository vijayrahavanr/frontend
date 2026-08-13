import { forwardRef, useId } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/helpers';

/**
 * Animated toggle switch. Behaves like a checkbox — pass `checked`
 * and `onChange` (works directly with React Hook Form's `register`).
 */
const Switch = forwardRef(
  ({ label, checked, disabled = false, className, id, onChange, ...rest }, ref) => {
    const autoId = useId();
    const inputId = id || autoId;

    return (
      <label
        htmlFor={inputId}
        className={cn(
          'inline-flex select-none items-center gap-2',
          disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
        )}
      >
        <span className="relative inline-flex h-6 w-11 shrink-0 items-center">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            role="switch"
            aria-checked={checked}
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            className="peer sr-only"
            {...rest}
          />
          <span
            className={cn(
              'absolute inset-0 rounded-full transition-colors',
              checked ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600',
              'peer-focus-visible:ring-2 peer-focus-visible:ring-primary-100'
            )}
          />
          <motion.span
            layout
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className={cn(
              'relative z-10 h-4 w-4 rounded-full bg-white shadow',
              checked ? 'ml-6' : 'ml-1'
            )}
          />
        </span>
        {label && (
          <span className="text-sm text-slate-700 dark:text-slate-200">{label}</span>
        )}
      </label>
    );
  }
);

Switch.displayName = 'Switch';

export default Switch;
