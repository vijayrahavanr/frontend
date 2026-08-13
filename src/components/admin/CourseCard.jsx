import { motion } from 'framer-motion';
import { FiBookOpen, FiLayers } from 'react-icons/fi';
import Badge from '@/components/common/Badge';
import { cn } from '@/utils/helpers';

/**
 * Course summary tile: name, code, department, duration, and
 * subject count.
 *
 * @param {object} props
 * @param {{id: string|number, code: string, name: string, department: string, duration: string, subjectCount: number}} props.course
 * @param {React.ReactNode} [props.action]
 */
const CourseCard = ({ course, action, className }) => (
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
      <Badge color="neutral">{course.subjectCount} subjects</Badge>
    </div>

    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{course.code}</p>
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{course.name}</h3>
      <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
        <FiLayers size={12} />
        {course.department} · {course.duration}
      </p>
    </div>

    {action && <div className="border-t border-slate-100 pt-3 dark:border-slate-700">{action}</div>}
  </motion.div>
);

export default CourseCard;
