import { FiMessageSquare } from 'react-icons/fi';
import TicketStatusBadge from './TicketStatusBadge';
import Badge from '@/components/common/Badge';
import { formatRelativeTime } from '@/utils/date.utils';
import { cn } from '@/utils/helpers';

const PRIORITY_COLOR = { high: 'danger', medium: 'warning', low: 'neutral' };

/**
 * Support-ticket summary tile — subject, priority, status, and last
 * update time.
 *
 * @param {object} props
 * @param {{id: string|number, subject: string, priority: 'high'|'medium'|'low', status: string, replyCount?: number, updatedAt: string}} props.ticket
 * @param {() => void} [props.onClick]
 */
const TicketCard = ({ ticket, onClick, className }) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'flex w-full flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4 text-left transition-colors hover:border-primary-200 dark:border-slate-700 dark:bg-surface-dark-elevated',
      className
    )}
  >
    <div className="flex items-start justify-between gap-2">
      <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{ticket.subject}</p>
      <TicketStatusBadge status={ticket.status} />
    </div>
    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
      <Badge color={PRIORITY_COLOR[ticket.priority]}>{ticket.priority} priority</Badge>
      {ticket.replyCount != null && (
        <span className="flex items-center gap-1">
          <FiMessageSquare size={12} /> {ticket.replyCount}
        </span>
      )}
      <span>Updated {formatRelativeTime(ticket.updatedAt)}</span>
    </div>
  </button>
);

export default TicketCard;
