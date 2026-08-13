import { motion } from 'framer-motion';
import { cn } from '@/utils/helpers';
import CircularProgress from './CircularProgress';
import Skeleton from './Skeleton';

/**
 * Card summarizing an individual's or a course's attendance rate.
 *
 * @param {object} props
 * @param {string} props.title
 * @param {number} props.percentage - 0-100
 * @param {number} [props.present]
 * @param {number} [props.total]
 * @param {boolean} [props.loading]
 */
const AttendanceCard = ({ title, percentage = 0, present, total, loading = false, className }) => {
  const color = percentage >= 75 ? 'success' : percentage >= 50 ? 'warning' : 'danger';

  if (loading) {
    return (
      <div
        className={cn(
          'flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-700 dark:bg-surface-dark-elevated',
          className
        )}
      >
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={cn(
        'flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition-shadow hover:shadow-lg',
        'dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark',
        className
      )}
    >
      <CircularProgress value={percentage} color={color} size={64} />
      <div>
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</p>
        {typeof present === 'number' && typeof total === 'number' && (
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {present} / {total} sessions attended
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default AttendanceCard;
