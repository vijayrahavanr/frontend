import { motion } from 'framer-motion';
import { cn } from '@/utils/helpers';
import ProgressBar from './ProgressBar';
import Skeleton from './Skeleton';

/**
 * KPI card that shows a metric alongside progress toward a target
 * (e.g. "Attendance this month: 82% of 90% goal").
 *
 * @param {object} props
 * @param {string} props.title
 * @param {number} props.value - 0-100
 * @param {string} [props.subtitle]
 * @param {boolean} [props.loading]
 */
const MetricCard = ({ title, value, subtitle, icon, loading = false, className }) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={cn(
        'flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-card',
        'dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{title}</p>
        {icon && <span className="text-primary">{icon}</span>}
      </div>

      {loading ? (
        <Skeleton className="h-2 w-full" />
      ) : (
        <ProgressBar value={value} showLabel />
      )}

      {subtitle && !loading && (
        <p className="text-xs text-slate-400">{subtitle}</p>
      )}
    </motion.div>
  );
};

export default MetricCard;
