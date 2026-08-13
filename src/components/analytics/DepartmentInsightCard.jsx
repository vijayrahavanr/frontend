import { FiLayers } from 'react-icons/fi';
import Badge from '@/components/common/Badge';
import { cn } from '@/utils/helpers';

/**
 * Department summary tile for analytics views — name, attendance
 * rate, and student/faculty counts in one compact card.
 *
 * @param {object} props
 * @param {{name: string, attendance: number, studentCount: number, facultyCount: number}} props.department
 */
const DepartmentInsightCard = ({ department, className }) => {
  const color = department.attendance >= 75 ? 'success' : department.attendance >= 50 ? 'warning' : 'danger';

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-surface-dark-elevated',
        className
      )}
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary dark:bg-primary-900/20">
          <FiLayers size={16} />
        </span>
        <div>
          <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{department.name}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {department.studentCount} students · {department.facultyCount} faculty
          </p>
        </div>
      </div>
      <Badge color={color}>{department.attendance}%</Badge>
    </div>
  );
};

export default DepartmentInsightCard;
