import ProgressBar from '@/components/common/ProgressBar';
import { cn } from '@/utils/helpers';

/**
 * A single row of the attendance analytics breakdown (a department,
 * class, or subject) — label plus a percentage bar.
 *
 * @param {object} props
 * @param {string} props.label
 * @param {number} props.percentage
 * @param {string} [props.meta] - e.g. "412 students"
 */
const AttendanceAnalyticsCard = ({ label, percentage, meta, className }) => {
  const color = percentage >= 75 ? 'success' : percentage >= 50 ? 'warning' : 'danger';

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-slate-700 dark:text-slate-200">{label}</span>
        <span className="text-xs text-slate-400">{meta}</span>
      </div>
      <ProgressBar value={percentage} color={color} showLabel />
    </div>
  );
};

export default AttendanceAnalyticsCard;
