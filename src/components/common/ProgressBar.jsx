import { motion } from 'framer-motion';
import { cn } from '@/utils/helpers';

const COLOR_CLASSES = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  success: 'bg-success',
  danger: 'bg-danger',
  warning: 'bg-warning',
};

/**
 * Animated linear progress bar.
 *
 * @param {object} props
 * @param {number} props.value - 0-100
 * @param {keyof typeof COLOR_CLASSES} [props.color]
 * @param {boolean} [props.showLabel]
 */
const ProgressBar = ({ value = 0, color = 'primary', showLabel = false, className, label }) => {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={cn('w-full', className)}>
      {(showLabel || label) && (
        <div className="mb-1 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>{label}</span>
          {showLabel && <span>{Math.round(clamped)}%</span>}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={cn('h-full rounded-full', COLOR_CLASSES[color])}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
