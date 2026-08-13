import { motion } from 'framer-motion';
import Avatar from '@/components/common/Avatar';
import Badge from '@/components/common/Badge';
import { formatTime } from '@/utils/date.utils';
import { cn } from '@/utils/helpers';

const STATUS_COLOR = { present: 'success', late: 'warning', absent: 'danger' };

/**
 * A single live-monitor entry: student, method (QR/Face/Manual),
 * status, and timestamp — animates in as new scans arrive.
 *
 * @param {object} props
 * @param {{id: string|number, name: string, avatarSrc?: string, method: string, status: 'present'|'late'|'absent', timestamp: string}} props.entry
 */
const LiveAttendanceCard = ({ entry, className }) => (
  <motion.div
    initial={{ opacity: 0, x: -8 }}
    animate={{ opacity: 1, x: 0 }}
    className={cn(
      'flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-surface-dark-elevated',
      className
    )}
  >
    <div className="flex items-center gap-3">
      <Avatar name={entry.name} src={entry.avatarSrc} size="sm" />
      <div>
        <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{entry.name}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {entry.method} · {formatTime(entry.timestamp)}
        </p>
      </div>
    </div>
    <Badge color={STATUS_COLOR[entry.status]}>{entry.status}</Badge>
  </motion.div>
);

export default LiveAttendanceCard;
