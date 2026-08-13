import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/helpers';
import Spinner from '@/components/loading/Spinner';

const VARIANT_CLASSES = {
  primary: 'bg-primary text-white hover:bg-primary-700',
  secondary: 'bg-secondary text-white hover:bg-secondary-700',
  outlined: 'border border-slate-300 text-slate-600 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800',
  ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
};

const SIZE_CLASSES = {
  sm: 'h-8 w-8 text-base',
  md: 'h-10 w-10 text-lg',
  lg: 'h-12 w-12 text-xl',
};

/**
 * Icon-only button. Requires an accessible `aria-label` since there is
 * no visible text content.
 */
const IconButton = forwardRef(
  (
    {
      icon,
      variant = 'ghost',
      size = 'md',
      loading = false,
      disabled = false,
      className,
      'aria-label': ariaLabel,
      type = 'button',
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <motion.button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-label={ariaLabel}
        aria-busy={loading}
        whileTap={!isDisabled ? { scale: 0.92 } : undefined}
        className={cn(
          'inline-flex items-center justify-center rounded-full transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-1',
          'disabled:cursor-not-allowed disabled:opacity-60',
          VARIANT_CLASSES[variant],
          SIZE_CLASSES[size],
          className
        )}
        {...rest}
      >
        {loading ? <Spinner size={16} /> : icon}
      </motion.button>
    );
  }
);

IconButton.displayName = 'IconButton';

export default IconButton;
