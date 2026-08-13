import { motion } from 'framer-motion';
import { cn } from '@/utils/helpers';

const COLOR_HEX = {
  primary: '#2563EB',
  secondary: '#14B8A6',
  success: '#22C55E',
  danger: '#EF4444',
  warning: '#F59E0B',
};

/**
 * SVG-based circular progress ring with an optional centered label.
 * Distinct from the indeterminate spinner in loaders/Spinner —
 * this communicates a specific determinate percentage.
 *
 * @param {object} props
 * @param {number} props.value - 0-100
 * @param {number} [props.size] - px
 * @param {number} [props.strokeWidth]
 * @param {keyof typeof COLOR_HEX} [props.color]
 * @param {boolean} [props.showLabel]
 */
const CircularProgress = ({
  value = 0,
  size = 64,
  strokeWidth = 6,
  color = 'primary',
  showLabel = true,
  className,
}) => {
  const clamped = Math.min(100, Math.max(0, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-slate-100 dark:stroke-slate-800"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={COLOR_HEX[color]}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </svg>
      {showLabel && (
        <span className="absolute text-sm font-semibold text-slate-700 dark:text-slate-100">
          {Math.round(clamped)}%
        </span>
      )}
    </div>
  );
};

export default CircularProgress;
