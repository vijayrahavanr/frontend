import { FiX } from 'react-icons/fi';
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
 * Chip / tag element. Supports an optional leading icon, a selected
 * state (for filter chips), and a remove button.
 *
 * @param {object} props
 * @param {boolean} [props.selected]
 * @param {boolean} [props.disabled]
 * @param {() => void} [props.onRemove]
 * @param {() => void} [props.onClick]
 */
const Chip = ({
  children,
  icon,
  color = 'neutral',
  selected = false,
  disabled = false,
  onRemove,
  onClick,
  className,
  ...rest
}) => {
  const isInteractive = Boolean(onClick) && !disabled;

  return (
    <span
      role={onClick ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={!disabled ? onClick : undefined}
      onKeyDown={(e) => {
        if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      aria-pressed={onClick ? selected : undefined}
      aria-disabled={disabled}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors',
        COLOR_CLASSES[color],
        selected && 'ring-2 ring-primary-300',
        isInteractive && 'cursor-pointer hover:opacity-80',
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
      {...rest}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      {children}
      {onRemove && (
        <button
          type="button"
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          aria-label="Remove"
          className="ml-0.5 inline-flex rounded-full hover:opacity-70"
        >
          <FiX size={12} />
        </button>
      )}
    </span>
  );
};

export default Chip;
