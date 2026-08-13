import { motion } from 'framer-motion';
import { FiSun } from 'react-icons/fi';
import { formatDate } from '@/utils/date.utils';
import { cn } from '@/utils/helpers';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

/**
 * Gradient banner card greeting the faculty member by name, shown at
 * the top of the dashboard.
 *
 * @param {object} props
 * @param {string} props.name
 * @param {string} [props.subtitle]
 */
const FacultyWelcomeCard = ({ name, subtitle, action, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className={cn(
      'relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-secondary p-6 text-white shadow-lg',
      className
    )}
  >
    <div
      aria-hidden="true"
      className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"
    />
    <div className="relative flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <p className="flex items-center gap-1.5 text-sm text-white/80">
          <FiSun size={14} />
          {getGreeting()}, {formatDate(new Date(), 'dd MMM yyyy')}
        </p>
        <h2 className="mt-1 text-xl font-semibold sm:text-2xl">
          Welcome back, {name?.split(' ')[0] || 'Faculty'} 👋
        </h2>
        {subtitle && <p className="mt-1 text-sm text-white/80">{subtitle}</p>}
      </div>
      {action}
    </div>
  </motion.div>
);

export default FacultyWelcomeCard;
