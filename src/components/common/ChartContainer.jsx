import { cn } from '@/utils/helpers';
import Skeleton from './Skeleton';
import EmptyState from '../empty-state/EmptyState';
import ErrorState from '../error/ErrorState';

/**
 * Card shell for chart components (Chart.js/react-chartjs-2 charts
 * are dropped in as `children`). Handles the loading/empty/error
 * states so individual chart components stay focused on rendering
 * data.
 *
 * @param {object} props
 * @param {string} [props.title]
 * @param {string} [props.subtitle]
 * @param {React.ReactNode} [props.action]
 * @param {boolean} [props.loading]
 * @param {boolean} [props.isEmpty]
 * @param {string|null} [props.error]
 * @param {() => void} [props.onRetry]
 * @param {number|string} [props.height]
 */
const ChartContainer = ({
  title,
  subtitle,
  action,
  loading = false,
  isEmpty = false,
  error = null,
  onRetry,
  height = 280,
  children,
  className,
}) => (
  <div
    className={cn(
      'rounded-2xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark',
      className
    )}
  >
    {(title || action) && (
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          {title && (
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
          )}
          {subtitle && (
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
          )}
        </div>
        {action}
      </div>
    )}

    <div style={{ height }} className="relative w-full">
      {loading ? (
        <Skeleton className="h-full w-full" />
      ) : error ? (
        <ErrorState description={error} onRetry={onRetry} />
      ) : isEmpty ? (
        <EmptyState title="No data to display" compact />
      ) : (
        children
      )}
    </div>
  </div>
);

export default ChartContainer;
