import { useMemo } from 'react';
import { eachDayOfInterval, format, subDays } from 'date-fns';
import { cn } from '@/utils/helpers';

const INTENSITY_CLASSES = [
  'bg-slate-100 dark:bg-slate-800', // 0: no data
  'bg-danger/20',
  'bg-warning/30',
  'bg-success/40',
  'bg-success/70',
  'bg-success', // 5: full attendance
];

/**
 * GitHub-style contribution heatmap showing attendance density per
 * day over a trailing window — used for the "Attendance Map" view
 * and analytics dashboards. Pure CSS grid, no mapping library.
 *
 * @param {object} props
 * @param {Record<string, number>} props.dataByDate - 'yyyy-MM-dd' -> percentage (0-100)
 * @param {number} [props.days] - trailing window size
 */
const AttendanceHeatmap = ({ dataByDate = {}, days = 84, className }) => {
  const cells = useMemo(() => {
    const interval = eachDayOfInterval({ start: subDays(new Date(), days - 1), end: new Date() });
    return interval.map((date) => {
      const key = format(date, 'yyyy-MM-dd');
      const percentage = dataByDate[key];
      const level =
        percentage == null
          ? 0
          : percentage >= 95
            ? 5
            : percentage >= 80
              ? 4
              : percentage >= 60
                ? 3
                : percentage >= 40
                  ? 2
                  : 1;
      return { key, date, percentage, level };
    });
  }, [dataByDate, days]);

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className="grid grid-flow-col grid-rows-7 gap-1 overflow-x-auto pb-1">
        {cells.map((cell) => (
          <div
            key={cell.key}
            title={`${format(cell.date, 'dd MMM yyyy')}${cell.percentage != null ? `: ${cell.percentage}%` : ': no data'}`}
            className={cn('h-3 w-3 rounded-[2px]', INTENSITY_CLASSES[cell.level])}
          />
        ))}
      </div>
      <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
        Less
        {INTENSITY_CLASSES.map((cls, i) => (
          <span key={i} className={cn('h-3 w-3 rounded-[2px]', cls)} />
        ))}
        More
      </div>
    </div>
  );
};

export default AttendanceHeatmap;
