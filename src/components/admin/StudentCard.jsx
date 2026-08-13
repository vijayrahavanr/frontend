import { motion } from 'framer-motion';
import Avatar from '@/components/common/Avatar';
import Badge from '@/components/common/Badge';
import { cn } from '@/utils/helpers';

/**
 * Compact student summary tile for admin grid/list views — avatar,
 * name, roll number, department, and status.
 *
 * @param {object} props
 * @param {{id: string|number, name: string, rollNumber: string, department: string, avatarSrc?: string, status?: string}} props.student
 * @param {React.ReactNode} [props.action]
 */
const StudentCard = ({ student, action, className }) => (
  <motion.div
    whileHover={{ y: -2 }}
    className={cn(
      'flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-card transition-shadow hover:shadow-lg',
      'dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark',
      className
    )}
  >
    <Avatar src={student.avatarSrc} name={student.name} size="md" />
    <div className="min-w-0 flex-1">
      <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
        {student.name}
      </p>
      <p className="truncate text-xs text-slate-500 dark:text-slate-400">
        {student.rollNumber} · {student.department}
      </p>
    </div>
    {student.status && <Badge color={student.status === 'Active' ? 'success' : 'neutral'}>{student.status}</Badge>}
    {action}
  </motion.div>
);

export default StudentCard;
