import { FiCheckCircle, FiAlertTriangle, FiInfo } from 'react-icons/fi';
import { cn } from '@/utils/helpers';

const TYPE_CONFIG = {
  positive: { icon: FiCheckCircle, className: 'bg-success/10 text-success' },
  warning: { icon: FiAlertTriangle, className: 'bg-warning/10 text-warning' },
  info: { icon: FiInfo, className: 'bg-primary-50 text-primary dark:bg-primary-900/20' },
};

/**
 * Narrative "insight" card — a short auto-generated observation about
 * attendance data (e.g. "Attendance improved 4% this month"), with a
 * type-colored icon. Used on the Attendance Analytics page to
 * surface takeaways above the raw charts.
 *
 * @param {object} props
 * @param {'positive'|'warning'|'info'} [props.type]
 * @param {string} props.text
 */
const AttendanceInsightCard = ({ type = 'info', text, className }) => {
  const config = TYPE_CONFIG[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-surface-dark-elevated',
        className
      )}
    >
      <span className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-full', config.className)}>
        <Icon size={15} />
      </span>
      <p className="text-sm text-slate-600 dark:text-slate-300">{text}</p>
    </div>
  );
};

export default AttendanceInsightCard;
