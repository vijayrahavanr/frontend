import { motion } from 'framer-motion';
import { FiBookOpen, FiUser } from 'react-icons/fi';
import ProgressBar from '@/components/common/ProgressBar';
import { cn } from '@/utils/helpers';

/**
 * Subject tile: code/name, faculty, and that subject's attendance
 * progress bar. Used on the Subjects and Attendance pages.
 *
 * @param {object} props
 * @param {{code: string, name: string, faculty: string, attendance: number, credits?: number}} props.subject
 */
const SubjectCard = ({ subject, className }) => {
  const color = subject.attendance >= 75 ? 'success' : subject.attendance >= 50 ? 'warning' : 'danger';

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
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary dark:bg-primary-900/20">
          <FiBookOpen size={18} />
        </span>
        {subject.credits && (
          <span className="text-xs text-slate-400">{subject.credits} credits</span>
        )}
      </div>

      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          {subject.code}
        </p>
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
          {subject.name}
        </h3>
        <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <FiUser size={12} />
          {subject.faculty}
        </p>
      </div>

      <ProgressBar value={subject.attendance} color={color} showLabel label="Attendance" />
    </motion.div>
  );
};

export default SubjectCard;
