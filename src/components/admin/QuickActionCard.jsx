import { motion } from 'framer-motion';
import { cn } from '@/utils/helpers';

/**
 * Clickable icon+label tile for dashboard shortcuts (Add Student,
 * Send Notification, View Reports, etc). Mirrors student/faculty's
 * QuickActionCard.
 *
 * @param {object} props
 * @param {React.ReactNode} props.icon
 * @param {string} props.label
 * @param {() => void} [props.onClick]
 */
const QuickActionCard = ({ icon, label, onClick, className }) => (
  <motion.button
    type="button"
    onClick={onClick}
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.97 }}
    className={cn(
      'flex flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-card transition-shadow hover:shadow-lg',
      'dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark',
      className
    )}
  >
    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white">
      {icon}
    </span>
    <span className="text-xs font-medium text-slate-700 dark:text-slate-200">{label}</span>
  </motion.button>
);

export default QuickActionCard;
