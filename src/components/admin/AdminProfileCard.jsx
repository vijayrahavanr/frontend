import { motion } from 'framer-motion';
import Avatar from '@/components/common/Avatar';
import Badge from '@/components/common/Badge';
import { cn } from '@/utils/helpers';

/**
 * Admin profile summary card — avatar, name, role/access level, and a
 * status badge. Used on the Dashboard and as the header block of the
 * Profile page.
 *
 * @param {object} props
 * @param {{name: string, role: string, accessLevel?: string, avatarSrc?: string, status?: string}} props.admin
 */
const AdminProfileCard = ({ admin, action, className }) => (
  <motion.div
    whileHover={{ y: -2 }}
    className={cn(
      'flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark',
      className
    )}
  >
    <Avatar src={admin?.avatarSrc} name={admin?.name} size="xl" status="online" />
    <div className="min-w-0 flex-1">
      <div className="flex flex-wrap items-center gap-2">
        <p className="truncate text-base font-semibold text-slate-900 dark:text-white">
          {admin?.name}
        </p>
        {admin?.status && <Badge color="success">{admin.status}</Badge>}
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        {admin?.role} {admin?.accessLevel ? `· ${admin.accessLevel}` : ''}
      </p>
    </div>
    {action}
  </motion.div>
);

export default AdminProfileCard;
