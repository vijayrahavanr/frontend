import { motion } from 'framer-motion';
import { cn } from '@/utils/helpers';

const VARIANT_CLASSES = {
  present: 'bg-success/10 text-success',
  absent: 'bg-danger/10 text-danger',
  late: 'bg-warning/10 text-warning',
  total: 'bg-primary-50 text-primary dark:bg-primary-900/20',
};

/**
 * Single live-status tile (Present / Absent / Late / Total) for the
 * Live Attendance dashboard.
 *
 * @param {object} props
 * @param {'present'|'absent'|'late'|'total'} props.variant
 * @param {string} props.label
 * @param {number|string} props.value
 * @param {React.ReactNode} [props.icon]
 */
const AttendanceStatusCard = ({ variant, label, value, icon, className }) => (
  <motion.div
    whileHover={{ y: -2 }}
    className={cn(
      'flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-card dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark',
      className
    )}
  >
    {icon && (
      <span className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl', VARIANT_CLASSES[variant])}>
        {icon}
      </span>
    )}
    <div>
      <p className="text-xl font-semibold text-slate-900 dark:text-white">{value}</p>
      <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
    </div>
  </motion.div>
);

export default AttendanceStatusCard;
