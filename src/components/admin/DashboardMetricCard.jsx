import { motion } from 'framer-motion';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import { cn } from '@/utils/helpers';

/**
 * Dashboard metric tile with a period-over-period trend indicator —
 * distinct from AdminStatCard (which is a flat KPI number): this one
 * emphasizes the change, e.g. "Student Growth: 1,240 (+4.2% this term)".
 *
 * @param {object} props
 * @param {string} props.label
 * @param {string|number} props.value
 * @param {number} [props.changePercent] - positive or negative
 * @param {string} [props.periodLabel]
 * @param {React.ReactNode} [props.icon]
 */
const DashboardMetricCard = ({ label, value, changePercent, periodLabel = 'vs last term', icon, className }) => {
  const isPositive = (changePercent ?? 0) >= 0;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={cn(
        'flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{label}</p>
        {icon && <span className="text-primary">{icon}</span>}
      </div>

      <p className="text-2xl font-semibold text-slate-900 dark:text-white">{value}</p>

      {changePercent != null && (
        <div className="flex items-center gap-1.5 text-xs">
          <span
            className={cn(
              'flex items-center gap-1 font-medium',
              isPositive ? 'text-success' : 'text-danger'
            )}
          >
            {isPositive ? <FiTrendingUp size={12} /> : <FiTrendingDown size={12} />}
            {Math.abs(changePercent)}%
          </span>
          <span className="text-slate-400">{periodLabel}</span>
        </div>
      )}
    </motion.div>
  );
};

export default DashboardMetricCard;
