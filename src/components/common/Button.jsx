import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/helpers';
import Spinner from '@/components/loading/Spinner';

const VARIANT_CLASSES = {
  primary:
    'bg-primary text-white hover:bg-primary-700 focus-visible:ring-primary-300 disabled:bg-primary-200',
  secondary:
    'bg-secondary text-white hover:bg-secondary-700 focus-visible:ring-secondary-300 disabled:bg-secondary-200',
  success:
    'bg-success text-white hover:bg-success-700 focus-visible:ring-success/40 disabled:bg-success/40',
  danger:
    'bg-danger text-white hover:bg-danger-700 focus-visible:ring-danger/40 disabled:bg-danger/40',
  warning:
    'bg-warning text-white hover:bg-warning-700 focus-visible:ring-warning/40 disabled:bg-warning/40',
  outlined:
    'border border-slate-300 text-slate-700 bg-transparent hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800',
  text: 'bg-transparent text-primary hover:bg-primary-50 dark:hover:bg-primary-900/20',
  gradient:
    'text-white bg-gradient-to-r from-primary to-secondary hover:opacity-90 focus-visible:ring-primary-300',
  ghost:
    'bg-transparent text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
};

const SIZE_CLASSES = {
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2.5',
};

/**
 * Universal button component.
 *
 * @param {object} props
 * @param {'primary'|'secondary'|'success'|'danger'|'warning'|'outlined'|'text'|'gradient'|'ghost'} [props.variant]
 * @param {'sm'|'md'|'lg'} [props.size]
 * @param {boolean} [props.loading]
 * @param {boolean} [props.disabled]
 * @param {boolean} [props.fullWidth]
 * @param {React.ReactNode} [props.startIcon]
 * @param {React.ReactNode} [props.endIcon]
 */
const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      fullWidth = false,
      startIcon,
      endIcon,
      className,
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
        aria-disabled={isDisabled}
        aria-busy={loading}
        whileTap={!isDisabled ? { scale: 0.97 } : undefined}
        whileHover={!isDisabled ? { scale: 1.01 } : undefined}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-60',
          VARIANT_CLASSES[variant],
          SIZE_CLASSES[size],
          fullWidth && 'w-full',
          className
        )}
        {...rest}
      >
        {loading ? (
          <Spinner size={size === 'lg' ? 20 : 16} />
        ) : (
          startIcon && <span className="inline-flex shrink-0">{startIcon}</span>
        )}
        {children && <span className={loading ? 'opacity-80' : undefined}>{children}</span>}
        {!loading && endIcon && <span className="inline-flex shrink-0">{endIcon}</span>}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
