import Avatar from '@/components/common/Avatar';
import { cn } from '@/utils/helpers';

const STATUS_OPTIONS = [
  { value: 'present', label: 'Present', activeClass: 'bg-success text-white' },
  { value: 'absent', label: 'Absent', activeClass: 'bg-danger text-white' },
  { value: 'late', label: 'Late', activeClass: 'bg-warning text-white' },
];

/**
 * One student's row in the Mark Attendance list: avatar, name/roll
 * number, and a three-way present/absent/late toggle.
 *
 * @param {object} props
 * @param {{id: string|number, name: string, rollNumber: string, avatarSrc?: string}} props.student
 * @param {'present'|'absent'|'late'|null} props.status
 * @param {(status: string) => void} props.onStatusChange
 */
const StudentAttendanceCard = ({ student, status, onStatusChange, className }) => (
  <div
    className={cn(
      'flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between dark:border-slate-700 dark:bg-surface-dark-elevated',
      className
    )}
  >
    <div className="flex items-center gap-3">
      <Avatar src={student.avatarSrc} name={student.name} size="sm" />
      <div>
        <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{student.name}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">Roll No. {student.rollNumber}</p>
      </div>
    </div>

    <div role="radiogroup" aria-label={`Attendance status for ${student.name}`} className="flex gap-1.5">
      {STATUS_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={status === option.value}
          onClick={() => onStatusChange(option.value)}
          className={cn(
            'rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
            status === option.value
              ? option.activeClass
              : 'bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  </div>
);

export default StudentAttendanceCard;
