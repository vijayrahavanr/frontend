import { motion } from 'framer-motion';
import Avatar from '@/components/common/Avatar';
import Badge from '@/components/common/Badge';
import { cn } from '@/utils/helpers';

/**
 * Fuller student profile summary card — avatar, name, roll number,
 * department/year, and a status badge. Used on the Dashboard and as
 * the header block of the Profile page.
 *
 * @param {object} props
 * @param {{name: string, rollNumber: string, department: string, year: string, avatarSrc?: string, status?: string}} props.student
 */
const StudentProfileCard = ({ student, action, className }) => (
  <motion.div
    whileHover={{ y: -2 }}
    className={cn(
      'flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark',
      className
    )}
  >
    <Avatar src={student?.avatarSrc} name={student?.name} size="xl" status="online" />
    <div className="min-w-0 flex-1">
      <div className="flex flex-wrap items-center gap-2">
        <p className="truncate text-base font-semibold text-slate-900 dark:text-white">
          {student?.name}
        </p>
        {student?.status && <Badge color="success">{student.status}</Badge>}
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Roll No. {student?.rollNumber} · {student?.department}
      </p>
      <p className="text-xs text-slate-400">{student?.year}</p>
    </div>
    {action}
  </motion.div>
);

export default StudentProfileCard;
