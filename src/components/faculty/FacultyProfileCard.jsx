import { motion } from 'framer-motion';
import Avatar from '@/components/common/Avatar';
import Badge from '@/components/common/Badge';
import { cn } from '@/utils/helpers';

/**
 * Faculty profile summary card — avatar, name, designation/department,
 * and a status badge. Used on the Dashboard and as the header block
 * of the Profile page.
 *
 * @param {object} props
 * @param {{name: string, designation: string, department: string, avatarSrc?: string, status?: string}} props.faculty
 */
const FacultyProfileCard = ({ faculty, action, className }) => (
  <motion.div
    whileHover={{ y: -2 }}
    className={cn(
      'flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark',
      className
    )}
  >
    <Avatar src={faculty?.avatarSrc} name={faculty?.name} size="xl" status="online" />
    <div className="min-w-0 flex-1">
      <div className="flex flex-wrap items-center gap-2">
        <p className="truncate text-base font-semibold text-slate-900 dark:text-white">
          {faculty?.name}
        </p>
        {faculty?.status && <Badge color="success">{faculty.status}</Badge>}
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        {faculty?.designation} · {faculty?.department}
      </p>
    </div>
    {action}
  </motion.div>
);

export default FacultyProfileCard;
