import { FiCalendar } from 'react-icons/fi';
import Badge from '@/components/common/Badge';
import { formatDate } from '@/utils/date.utils';
import { cn } from '@/utils/helpers';

const STATUS_COLOR = {
  approved: 'success',
  pending: 'warning',
  rejected: 'danger',
};

/**
 * Single leave application summary — type, date range, reason, and
 * status badge. Used in leave history lists.
 *
 * @param {object} props
 * @param {{type: string, startDate: string, endDate: string, reason: string, status: 'approved'|'pending'|'rejected', appliedOn?: string}} props.leave
 */
const LeaveCard = ({ leave, className }) => (
  <div
    className={cn(
      'flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-surface-dark-elevated',
      className
    )}
  >
    <div className="flex items-start justify-between gap-2">
      <div>
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{leave.type}</p>
        <p className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <FiCalendar size={12} />
          {formatDate(leave.startDate)} – {formatDate(leave.endDate)}
        </p>
      </div>
      <Badge color={STATUS_COLOR[leave.status]}>{leave.status}</Badge>
    </div>
    <p className="text-xs text-slate-500 dark:text-slate-400">{leave.reason}</p>
    {leave.appliedOn && (
      <p className="text-[11px] text-slate-400">Applied on {formatDate(leave.appliedOn)}</p>
    )}
  </div>
);

export default LeaveCard;
