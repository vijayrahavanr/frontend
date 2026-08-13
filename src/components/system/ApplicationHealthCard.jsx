import ProgressBar from '@/components/common/ProgressBar';
import { cn } from '@/utils/helpers';

/**
 * Resource usage gauge (CPU/Memory/Disk/API response time) for the
 * Application Health page.
 *
 * @param {object} props
 * @param {string} props.label
 * @param {number} props.value - 0-100
 * @param {string} [props.meta] - e.g. "1.2GB / 4GB"
 */
const ApplicationHealthCard = ({ label, value, meta, className }) => {
  const color = value >= 90 ? 'danger' : value >= 75 ? 'warning' : 'success';

  return (
    <div
      className={cn(
        'flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark',
        className
      )}
    >
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-slate-700 dark:text-slate-200">{label}</span>
        <span className="text-xs text-slate-400">{meta}</span>
      </div>
      <ProgressBar value={value} color={color} showLabel />
    </div>
  );
};

export default ApplicationHealthCard;
