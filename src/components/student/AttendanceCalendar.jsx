import { useMemo, useState } from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isToday,
  addMonths,
  subMonths,
} from 'date-fns';
import IconButton from '@/components/common/IconButton';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { cn } from '@/utils/helpers';

const STATUS_CLASSES = {
  present: 'bg-success/15 text-success-700 dark:text-success',
  absent: 'bg-danger/15 text-danger-700 dark:text-danger',
  late: 'bg-warning/15 text-warning-700 dark:text-warning',
  holiday: 'bg-slate-100 text-slate-400 dark:bg-slate-800',
};

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

/**
 * Month calendar with each day cell tinted by attendance status.
 *
 * @param {object} props
 * @param {Record<string, 'present'|'absent'|'late'|'holiday'>} props.statusByDate - keyed by 'yyyy-MM-dd'
 */
const AttendanceCalendar = ({ statusByDate = {}, className }) => {
  const [month, setMonth] = useState(new Date());

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(month));
    const end = endOfWeek(endOfMonth(month));
    return eachDayOfInterval({ start, end });
  }, [month]);

  return (
    <div
      className={cn(
        'rounded-2xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark',
        className
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
          {format(month, 'MMMM yyyy')}
        </p>
        <div className="flex gap-1">
          <IconButton
            icon={<FiChevronLeft size={16} />}
            aria-label="Previous month"
            size="sm"
            variant="ghost"
            onClick={() => setMonth((m) => subMonths(m, 1))}
          />
          <IconButton
            icon={<FiChevronRight size={16} />}
            aria-label="Next month"
            size="sm"
            variant="ghost"
            onClick={() => setMonth((m) => addMonths(m, 1))}
          />
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-medium text-slate-400">
        {WEEKDAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {days.map((day) => {
          const key = format(day, 'yyyy-MM-dd');
          const status = statusByDate[key];
          return (
            <div
              key={key}
              className={cn(
                'flex h-9 items-center justify-center rounded-lg text-xs font-medium',
                !isSameMonth(day, month) && 'text-slate-300 dark:text-slate-700',
                status && STATUS_CLASSES[status],
                isToday(day) && 'ring-2 ring-primary'
              )}
            >
              {format(day, 'd')}
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap gap-3 text-[11px] text-slate-500 dark:text-slate-400">
        {Object.entries(STATUS_CLASSES).map(([status]) => (
          <span key={status} className="flex items-center gap-1.5 capitalize">
            <span className={cn('h-2.5 w-2.5 rounded-full', STATUS_CLASSES[status])} />
            {status}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AttendanceCalendar;
