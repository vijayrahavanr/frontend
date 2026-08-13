import { FiCalendar } from 'react-icons/fi';
import Avatar from '@/components/common/Avatar';
import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button';
import { formatDate } from '@/utils/date.utils';
import { cn } from '@/utils/helpers';

const STATUS_COLOR = { approved: 'success', pending: 'warning', rejected: 'danger' };

/**
 * A student's leave request, as reviewed by faculty. Shows
 * approve/reject actions when pending; otherwise just the status.
 *
 * @param {object} props
 * @param {{id: string|number, studentName: string, avatarSrc?: string, type: string, startDate: string, endDate: string, reason: string, status: 'approved'|'pending'|'rejected'}} props.leave
 * @param {() => void} [props.onApprove]
 * @param {() => void} [props.onReject]
 * @param {() => void} [props.onClick]
 */
const LeaveRequestCard = ({ leave, onApprove, onReject, onClick, className }) => (
  <div
    onClick={onClick}
    className={cn(
      'flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-surface-dark-elevated',
      onClick && 'cursor-pointer hover:border-primary-200',
      className
    )}
  >
    <div className="flex items-start justify-between gap-2">
      <div className="flex items-center gap-3">
        <Avatar src={leave.avatarSrc} name={leave.studentName} size="sm" />
        <div>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            {leave.studentName}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{leave.type}</p>
        </div>
      </div>
      <Badge color={STATUS_COLOR[leave.status]}>{leave.status}</Badge>
    </div>

    <p className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
      <FiCalendar size={12} />
      {formatDate(leave.startDate)} – {formatDate(leave.endDate)}
    </p>
    <p className="text-xs text-slate-500 dark:text-slate-400">{leave.reason}</p>

    {leave.status === 'pending' && (onApprove || onReject) && (
      <div className="flex justify-end gap-2 pt-1" onClick={(e) => e.stopPropagation()}>
        {onReject && (
          <Button variant="outlined" size="sm" onClick={onReject}>
            Reject
          </Button>
        )}
        {onApprove && (
          <Button variant="success" size="sm" onClick={onApprove}>
            Approve
          </Button>
        )}
      </div>
    )}
  </div>
);

export default LeaveRequestCard;
