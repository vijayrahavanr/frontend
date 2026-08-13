import { motion } from 'framer-motion';
import { FiBookOpen, FiUsers } from 'react-icons/fi';
import Badge from '@/components/common/Badge';
import { cn } from '@/utils/helpers';

/**
 * Assigned-subject tile: code/name, semester/section, credits, and
 * enrolled student count. Used on the Subjects and Dashboard pages.
 *
 * @param {object} props
 * @param {{code: string, name: string, semester: string, section: string, credits: number, studentCount: number}} props.subject
 */
const SubjectCard = ({ subject, action, className }) => (
  <motion.div
    whileHover={{ y: -3 }}
    className={cn(
      'flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition-shadow hover:shadow-lg',
      'dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark',
      className
    )}
  >
    <div className="flex items-start justify-between">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary dark:bg-primary-900/20">
        <FiBookOpen size={18} />
      </span>
      <Badge color="neutral">{subject.credits} credits</Badge>
    </div>

    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{subject.code}</p>
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{subject.name}</h3>
      <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
        Semester {subject.semester} · Section {subject.section}
      </p>
    </div>

    <div className="flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-700">
      <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
        <FiUsers size={14} />
        {subject.studentCount} students
      </span>
      {action}
    </div>
  </motion.div>
);

export default SubjectCard;
