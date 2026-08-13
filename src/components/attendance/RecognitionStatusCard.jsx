import { FiUserCheck, FiUserX, FiLoader } from 'react-icons/fi';
import Badge from '@/components/common/Badge';
import CircularProgress from '@/components/common/CircularProgress';
import { cn } from '@/utils/helpers';

const STATUS_CONFIG = {
  idle: { label: 'Awaiting verification', color: 'neutral' },
  verifying: { label: 'Verifying...', color: 'primary' },
  matched: { label: 'Identity verified', color: 'success' },
  unmatched: { label: 'No match found', color: 'danger' },
};

/**
 * Face-verification outcome card: status badge plus a confidence-
 * score ring when a match/no-match result is available.
 *
 * @param {object} props
 * @param {'idle'|'verifying'|'matched'|'unmatched'} [props.status]
 * @param {number} [props.confidence] - 0-100, shown once verified
 * @param {string} [props.studentName] - shown on a successful match
 */
const RecognitionStatusCard = ({ status = 'idle', confidence, studentName, className }) => {
  const config = STATUS_CONFIG[status];

  return (
    <div
      className={cn(
        'flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-card dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark',
        className
      )}
    >
      {status === 'verifying' ? (
        <FiLoader size={40} className="animate-spin text-primary" />
      ) : confidence != null ? (
        <CircularProgress
          value={confidence}
          color={status === 'matched' ? 'success' : 'danger'}
          size={84}
          strokeWidth={7}
        />
      ) : status === 'matched' ? (
        <FiUserCheck size={44} className="text-success" />
      ) : status === 'unmatched' ? (
        <FiUserX size={44} className="text-danger" />
      ) : (
        <FiUserCheck size={44} className="text-slate-300 dark:text-slate-600" />
      )}

      <Badge color={config.color}>{config.label}</Badge>

      {studentName && status === 'matched' && (
        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{studentName}</p>
      )}
    </div>
  );
};

export default RecognitionStatusCard;
