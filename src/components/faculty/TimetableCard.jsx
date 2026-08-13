import { FiClock, FiMapPin, FiUsers } from 'react-icons/fi';
import { cn } from '@/utils/helpers';

/**
 * One timetable period row: time, subject, room, and section. A
 * colored left border indicates whether the period is current, past,
 * or upcoming.
 *
 * @param {object} props
 * @param {{time: string, subject: string, room: string, section: string}} props.period
 * @param {'current'|'past'|'upcoming'} [props.state]
 */
const TimetableCard = ({ period, state = 'upcoming', className }) => (
  <div
    className={cn(
      'flex items-center gap-4 rounded-xl border-l-4 bg-white p-4 shadow-sm dark:bg-surface-dark-elevated',
      state === 'current' && 'border-primary bg-primary-50/50 dark:bg-primary-900/10',
      state === 'past' && 'border-slate-200 opacity-60 dark:border-slate-700',
      state === 'upcoming' && 'border-slate-200 dark:border-slate-700',
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
          <FiMapPin size={11} />
          {period.room}
        </span>
        <span className="flex items-center gap-1">
          <FiUsers size={11} />
          Section {period.section}
        </span>
      </div>
    </div>
  </div>
);

export default TimetableCard;
