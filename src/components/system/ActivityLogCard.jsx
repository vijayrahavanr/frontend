import Avatar from '@/components/common/Avatar';
import { formatRelativeTime } from '@/utils/date.utils';
import { cn } from '@/utils/helpers';

/**
 * Single user-activity entry (page views, feature usage, session
 * events) — lighter weight than AuditLogCard, which is for
 * security/data-changing actions specifically.
 *
 * @param {object} props
 * @param {{id: string|number, user: string, avatarSrc?: string, activity: string, timestamp: string}} props.entry
 */
const ActivityLogCard = ({ entry, className }) => (
  <div
    className={cn(
      'flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-surface-dark-elevated',
      className
    )}
  >
    <Avatar name={entry.user} src={entry.avatarSrc} size="sm" />
    <div className="min-w-0 flex-1">
      <p className="text-sm text-slate-700 dark:text-slate-200">
        <span className="font-medium">{entry.user}</span> {entry.activity}
      </p>
      <p className="text-xs text-slate-400">{formatRelativeTime(entry.timestamp)}</p>
    </div>
  </div>
);

export default ActivityLogCard;
