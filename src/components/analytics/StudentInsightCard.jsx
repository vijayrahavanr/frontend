import Avatar from '@/components/common/Avatar';
import Badge from '@/components/common/Badge';
import { cn } from '@/utils/helpers';

/**
 * Student summary tile for ranking lists (Top Performing / Low
 * Attendance) — avatar, name, and a metric badge, with an optional
 * rank number.
 *
 * @param {object} props
 * @param {{name: string, rollNumber: string, avatarSrc?: string, value: number, valueLabel?: string}} props.student
 * @param {number} [props.rank]
 */
const StudentInsightCard = ({ student, rank, className }) => {
  const color = student.value >= 75 ? 'success' : student.value >= 50 ? 'warning' : 'danger';

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-surface-dark-elevated',
        className
      )}
    >
      <div className="flex items-center gap-3">
        {rank != null && (
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            {rank}
          </span>
        )}
        <Avatar name={student.name} src={student.avatarSrc} size="sm" />
        <div>
          <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{student.name}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Roll No. {student.rollNumber}</p>
        </div>
      </div>
      <Badge color={color}>
        {student.value}
        {student.valueLabel || '%'}
      </Badge>
    </div>
  );
};

export default StudentInsightCard;
