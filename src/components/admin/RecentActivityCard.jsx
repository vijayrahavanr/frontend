import { FiUserPlus, FiCheckCircle, FiBell, FiEdit2, FiCalendar } from 'react-icons/fi';
import { formatRelativeTime } from '@/utils/date.utils';
import { cn } from '@/utils/helpers';

const TYPE_CONFIG = {
  enrollment: { icon: FiUserPlus, className: 'bg-primary-50 text-primary dark:bg-primary-900/20' },
  attendance: { icon: FiCheckCircle, className: 'bg-success/10 text-success' },
  update: { icon: FiEdit2, className: 'bg-secondary-50 text-secondary dark:bg-secondary-900/20' },
  notification: { icon: FiBell, className: 'bg-slate-100 text-slate-500 dark:bg-slate-800' },
  schedule: { icon: FiCalendar, className: 'bg-warning/10 text-warning' },
};

/**
 * Vertical timeline of recent system-wide activity (new enrollments,
 * attendance milestones, record updates, etc). Shown on the Dashboard.
 *
 * @param {object} props
 * @param {{id: string|number, type: keyof typeof TYPE_CONFIG, title: string, timestamp: string}[]} props.activities
 */
const RecentActivityCard = ({ activities = [], className }) => (
  <ol className={cn('flex flex-col', className)}>
    {activities.map((activity, index) => {
      const config = TYPE_CONFIG[activity.type] || TYPE_CONFIG.notification;
      const Icon = config.icon;
      const isLast = index === activities.length - 1;

      return (
        <li key={activity.id} className="relative flex gap-3 pb-6 last:pb-0">
          {!isLast && (
            <span className="absolute left-4 top-9 h-full w-px bg-slate-200 dark:bg-slate-700" />
          )}
          <span
            className={cn(
              'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
              config.className
            )}
          >
            <Icon size={14} />
          </span>
          <div className="flex-1 pt-1">
            <p className="text-sm text-slate-700 dark:text-slate-200">{activity.title}</p>
            <p className="text-xs text-slate-400">{formatRelativeTime(activity.timestamp)}</p>
          </div>
        </li>
      );
    })}
  </ol>
);

export default RecentActivityCard;
