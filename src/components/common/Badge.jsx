import { cn } from '@/utils/helpers';

const COLOR_CLASSES = {
  primary: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300',
  secondary: 'bg-secondary-100 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-300',
  success: 'bg-success/10 text-success-700 dark:bg-success/20 dark:text-success',
  danger: 'bg-danger/10 text-danger-700 dark:bg-danger/20 dark:text-danger',
  warning: 'bg-warning/10 text-warning-700 dark:bg-warning/20 dark:text-warning',
  neutral: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
};

/**
 * Small status/count indicator. Two modes:
 * - `dot`: a small colored dot (e.g. attached to an Avatar or icon)
 * - default: a pill with text/number content
 *
 * @param {object} props
 * @param {keyof typeof COLOR_CLASSES} [props.color]
 * @param {boolean} [props.dot]
 */
const Badge = ({ children, color = 'neutral', dot = false, className, ...rest }) => {
  if (dot) {
    return (
      <span
        role="status"
        className={cn('inline-block h-2.5 w-2.5 rounded-full', COLOR_CLASSES[color], className)}
        {...rest}
      />
    );
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
        COLOR_CLASSES[color],
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
};

export default Badge;
