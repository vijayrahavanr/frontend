import CircularProgress from '@/components/common/CircularProgress';
import { cn } from '@/utils/helpers';

/**
 * Overall attendance summary: a percentage ring plus present/absent/
 * late counts. Used on the Dashboard and at the top of the
 * Attendance page.
 *
 * @param {object} props
 * @param {number} props.percentage
 * @param {number} props.present
 * @param {number} props.absent
 * @param {number} [props.late]
 */
const AttendanceSummaryCard = ({ percentage, present, absent, late = 0, className }) => {
  const color = percentage >= 75 ? 'success' : percentage >= 50 ? 'warning' : 'danger';

  return (
    <div
      className={cn(
        'flex items-center gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark',
        className
      )}
    >
      <CircularProgress value={percentage} color={color} size={84} strokeWidth={8} />
      <div className="flex flex-1 flex-col gap-2">
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
          Overall Attendance
        </p>
        <div className="flex gap-4 text-xs">
          <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <span className="h-2 w-2 rounded-full bg-success" /> Present {present}
          </span>
          <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <span className="h-2 w-2 rounded-full bg-danger" /> Absent {absent}
          </span>
          {late > 0 && (
            <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
              <span className="h-2 w-2 rounded-full bg-warning" /> Late {late}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceSummaryCard;
