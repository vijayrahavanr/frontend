import { motion } from 'framer-motion';
import { FiUsers, FiBookOpen } from 'react-icons/fi';
import { cn } from '@/utils/helpers';
import Badge from './Badge';
import Skeleton from './Skeleton';

/**
 * Card summarizing a course: code, title, instructor, and enrolled
 * student count. Used in course listing grids.
 *
 * @param {object} props
 * @param {string} props.code
 * @param {string} props.title
 * @param {string} [props.instructor]
 * @param {number} [props.studentCount]
 * @param {string} [props.status] - e.g. "Active", "Archived"
 * @param {boolean} [props.loading]
 */
const CourseCard = ({
  code,
  title,
  instructor,
  studentCount,
  status,
  action,
  loading = false,
  className,
}) => {
  if (loading) {
    return (
      <div
        className={cn(
          'rounded-2xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-700 dark:bg-surface-dark-elevated',
          className
        )}
      >
        <Skeleton className="h-4 w-16" />
        <Skeleton className="mt-3 h-5 w-40" />
        <Skeleton className="mt-4 h-3 w-24" />
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className={cn(
        'flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition-shadow hover:shadow-lg',
        'dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-50 text-secondary dark:bg-secondary-900/20">
          <FiBookOpen size={18} />
        </span>
        {status && <Badge color={status === 'Active' ? 'success' : 'neutral'}>{status}</Badge>}
      </div>

      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{code}</p>
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
        {instructor && (
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{instructor}</p>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-700">
        {typeof studentCount === 'number' && (
          <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <FiUsers size={14} />
            {studentCount} students
          </span>
        )}
        {action}
      </div>
    </motion.div>
  );
};

export default CourseCard;
