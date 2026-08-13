import ProgressBar from '@/components/common/ProgressBar';
import Badge from '@/components/common/Badge';
import { cn } from '@/utils/helpers';

/**
 * Shows progress toward a minimum required attendance percentage
 * (e.g. "75% required to sit exams"), with a status badge.
 *
 * @param {object} props
 * @param {number} props.current
 * @param {number} [props.required]
 */
const AttendanceProgressCard = ({ current, required = 75, className }) => {
  const isSafe = current >= required;
  const buffer = Math.abs(current - required).toFixed(1);

  return (
    <div
      className={cn(
        'flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
          Attendance Requirement
        </p>
        <Badge color={isSafe ? 'success' : 'danger'}>{isSafe ? 'On track' : 'At risk'}</Badge>
      </div>

      <ProgressBar value={current} color={isSafe ? 'success' : 'danger'} showLabel />

      <p className="text-xs text-slate-500 dark:text-slate-400">
        {isSafe
          ? `You're ${buffer}% above the ${required}% requirement.`
          : `You're ${buffer}% below the ${required}% requirement — attend upcoming classes.`}
      </p>
    </div>
  );
};

export default AttendanceProgressCard;
