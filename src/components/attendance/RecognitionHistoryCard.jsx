import Avatar from '@/components/common/Avatar';
import Badge from '@/components/common/Badge';
import { formatDateTime } from '@/utils/date.utils';
import { cn } from '@/utils/helpers';

const STATUS_COLOR = { matched: 'success', unmatched: 'danger' };

/**
 * Single face-recognition attempt row for a history list — subject,
 * timestamp, confidence, and outcome badge.
 *
 * @param {object} props
 * @param {{name: string, avatarSrc?: string, subject?: string, timestamp: string, confidence?: number, status: 'matched'|'unmatched'}} props.entry
 */
const RecognitionHistoryCard = ({ entry, className }) => (
  <div
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
          {entry.subject ? `${entry.subject} · ` : ''}
          {formatDateTime(entry.timestamp)}
        </p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      {entry.confidence != null && (
        <span className="text-xs text-slate-400">{entry.confidence}%</span>
      )}
      <Badge color={STATUS_COLOR[entry.status]}>{entry.status}</Badge>
    </div>
  </div>
);

export default RecognitionHistoryCard;
