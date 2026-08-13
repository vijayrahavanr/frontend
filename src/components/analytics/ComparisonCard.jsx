import ProgressBar from '@/components/common/ProgressBar';
import { cn } from '@/utils/helpers';

/**
 * Ranked comparison list (departments, faculty, students, courses,
 * subjects) — each row a label plus a percentage bar, sorted by the
 * caller.
 *
 * @param {object} props
 * @param {string} props.title
 * @param {{label: string, value: number, meta?: string}[]} props.items
 */
const ComparisonCard = ({ title, items = [], className }) => (
  <div
    className={cn(
      'rounded-2xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark',
      className
    )}
  >
    {title && (
      <p className="mb-4 text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</p>
    )}
    <div className="flex flex-col gap-4">
      {items.map((item) => {
        const color = item.value >= 75 ? 'success' : item.value >= 50 ? 'warning' : 'danger';
        return (
          <div key={item.label} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-slate-700 dark:text-slate-200">{item.label}</span>
              <span className="text-xs text-slate-400">{item.meta}</span>
            </div>
            <ProgressBar value={item.value} color={color} showLabel />
          </div>
        );
      })}
    </div>
  </div>
);

export default ComparisonCard;
