import { motion } from 'framer-motion';
import { cn } from '@/utils/helpers';
import Skeleton from './Skeleton';

/**
 * Compact statistic card: big number, label, icon, and optional trend.
 * Used for top-of-dashboard KPI rows.
 *
 * @param {object} props
 * @param {string} props.label
 * @param {string|number} props.value
 * @param {React.ReactNode} [props.icon]
 * @param {{ value: string, direction: 'up'|'down' }} [props.trend]
 * @param {boolean} [props.loading]
 * @param {string} [props.iconColorClass] - override the icon badge's background/text color classes
 */
const StatCard = ({ label, value, icon, trend, loading = false, iconColorClass, className }) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      className={cn(
        'flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition-shadow hover:shadow-lg',
        'dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark',
        className
      )}
    >
      <div className="flex flex-col gap-1">
        <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
        {loading ? (
          <Skeleton className="h-7 w-20" />
        ) : (
          <p className="text-2xl font-semibold text-slate-900 dark:text-white">{value}</p>
        )}
        {trend && !loading && (
          <span
            className={cn(
              'text-xs font-medium',
              trend.direction === 'up' ? 'text-success' : 'text-danger'
            )}
          >
            {trend.direction === 'up' ? '▲' : '▼'} {trend.value}
          </span>
        )}
      </div>
      {icon && (
        <span
          className={cn(
            'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl',
            iconColorClass || 'bg-primary-50 text-primary dark:bg-primary-900/20'
          )}
        >
          {icon}
        </span>
      )}
    </motion.div>
  );
};

export default StatCard;
