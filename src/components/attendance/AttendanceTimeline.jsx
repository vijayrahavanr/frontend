import { FiCheckCircle, FiClock, FiXCircle } from 'react-icons/fi';
import { formatRelativeTime } from '@/utils/date.utils';
import { cn } from '@/utils/helpers';

const STATUS_CONFIG = {
  present: { icon: FiCheckCircle, className: 'bg-success/10 text-success' },
  late: { icon: FiClock, className: 'bg-warning/10 text-warning' },
  absent: { icon: FiXCircle, className: 'bg-danger/10 text-danger' },
};

/**
 * Live-updating timeline of attendance events (marked present/late/
 * absent), newest first. Used on the Live Attendance dashboard's
 * "recent feed" panel.
 *
 * @param {object} props
 * @param {{id: string|number, studentName: string, status: 'present'|'late'|'absent', method?: string, timestamp: string}[]} props.entries
 */
const AttendanceTimeline = ({ entries = [], className }) => (
  <ol className={cn('flex flex-col', className)}>
    {entries.map((entry, index) => {
      const config = STATUS_CONFIG[entry.status] || STATUS_CONFIG.present;
      const Icon = config.icon;
      const isLast = index === entries.length - 1;

      return (
        <li key={entry.id} className="relative flex gap-3 pb-5 last:pb-0">
          {!isLast && (
            <span className="absolute left-4 top-9 h-full w-px bg-slate-200 dark:bg-slate-700" />
          )}
          <span className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-full', config.className)}>
            <Icon size={14} />
          </span>
          <div className="flex-1 pt-1">
            <p className="text-sm text-slate-700 dark:text-slate-200">
              <span className="font-medium">{entry.studentName}</span> marked{' '}
              <span className="capitalize">{entry.status}</span>
              {entry.method && <span className="text-slate-400"> via {entry.method}</span>}
            </p>
            <p className="text-xs text-slate-400">{formatRelativeTime(entry.timestamp)}</p>
          </div>
        </li>
      );
    })}
  </ol>
);

export default AttendanceTimeline;
