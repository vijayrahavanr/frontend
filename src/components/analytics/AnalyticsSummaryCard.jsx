import { motion } from 'framer-motion';
import { cn } from '@/utils/helpers';

/**
 * Executive-summary style card: a large headline stat with a short
 * supporting description. Used for the Analytics Dashboard's top
 * summary row.
 *
 * @param {object} props
 * @param {string} props.label
 * @param {string|number} props.value
 * @param {string} [props.description]
 * @param {React.ReactNode} [props.icon]
 */
const AnalyticsSummaryCard = ({ label, value, description, icon, className }) => (
  <motion.div
    whileHover={{ y: -2 }}
    className={cn(
      'flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark',
      className
    )}
  >
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
      {icon && <span className="text-primary">{icon}</span>}
    </div>
    <p className="text-3xl font-semibold text-slate-900 dark:text-white">{value}</p>
    {description && <p className="text-xs text-slate-400">{description}</p>}
  </motion.div>
);

export default AnalyticsSummaryCard;
