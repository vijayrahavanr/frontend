import Avatar from '@/components/common/Avatar';
import Badge from '@/components/common/Badge';
import { cn } from '@/utils/helpers';

/**
 * Faculty summary tile for analytics views — avatar, name,
 * attendance-marking consistency, and classes conducted.
 *
 * @param {object} props
 * @param {{name: string, avatarSrc?: string, attendanceRate: number, classesConducted: number}} props.faculty
 */
const FacultyInsightCard = ({ faculty, className }) => {
  const color = faculty.attendanceRate >= 75 ? 'success' : faculty.attendanceRate >= 50 ? 'warning' : 'danger';

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-surface-dark-elevated',
        className
      )}
    >
      <div className="flex items-center gap-3">
        <Avatar name={faculty.name} src={faculty.avatarSrc} size="sm" />
        <div>
          <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{faculty.name}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {faculty.classesConducted} classes conducted
          </p>
        </div>
      </div>
      <Badge color={color}>{faculty.attendanceRate}%</Badge>
    </div>
  );
};

export default FacultyInsightCard;
