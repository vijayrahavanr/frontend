import { FiClock, FiMapPin, FiUsers, FiEdit2, FiTrash2 } from 'react-icons/fi';
import IconButton from '@/components/common/IconButton';
import { cn } from '@/utils/helpers';

/**
 * Admin-facing timetable entry row — subject, time, room, section,
 * with edit/delete actions (unlike the read-only student/faculty
 * TimetableCard variants).
 *
 * @param {object} props
 * @param {{subject: string, time: string, room: string, section: string, faculty: string}} props.period
 * @param {() => void} [props.onEdit]
 * @param {() => void} [props.onDelete]
 */
const TimetableCard = ({ period, onEdit, onDelete, className }) => (
  <div
    className={cn(
      'flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-surface-dark-elevated',
      className
    )}
  >
    <div className="flex w-20 shrink-0 flex-col items-start text-xs text-slate-500 dark:text-slate-400">
      <span className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-200">
        <FiClock size={12} />
        {period.time}
      </span>
    </div>

    <div className="min-w-0 flex-1">
      <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
        {period.subject}
      </p>
      <div className="mt-0.5 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1">
          <FiMapPin size={11} /> {period.room}
        </span>
        <span className="flex items-center gap-1">
          <FiUsers size={11} /> Section {period.section}
        </span>
        {period.faculty && <span>{period.faculty}</span>}
      </div>
    </div>

    <div className="flex shrink-0 gap-1">
      {onEdit && (
        <IconButton icon={<FiEdit2 size={14} />} aria-label="Edit period" size="sm" variant="ghost" onClick={onEdit} />
      )}
      {onDelete && (
        <IconButton icon={<FiTrash2 size={14} />} aria-label="Delete period" size="sm" variant="ghost" onClick={onDelete} />
      )}
    </div>
  </div>
);

export default TimetableCard;
