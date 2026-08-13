import { FiTrendingUp, FiTrendingDown, FiMinus } from 'react-icons/fi';
import { cn } from '@/utils/helpers';

/**
 * Compact KPI widget: label, value, and a trend arrow. Lighter-weight
 * than AnalyticsMetricCard (no icon badge) — used for dense KPI rows.
 *
 * @param {object} props
 * @param {string} props.label
 * @param {string|number} props.value
 * @param {number} [props.changePercent]
 */
const KPIWidget = ({ label, value, changePercent, className }) => {
  const Icon = changePercent > 0 ? FiTrendingUp : changePercent < 0 ? FiTrendingDown : FiMinus;
  const colorClass =
    changePercent > 0 ? 'text-success' : changePercent < 0 ? 'text-danger' : 'text-slate-400';

  return (
    <div className={cn('flex flex-col gap-1 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-surface-dark-elevated', className)}>
      <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
      <div className="flex items-center justify-between">
        <p className="text-xl font-semibold text-slate-900 dark:text-white">{value}</p>
        {changePercent != null && (
          <span className={cn('flex items-center gap-0.5 text-xs font-medium', colorClass)}>
            <Icon size={12} />
            {Math.abs(changePercent)}%
          </span>
        )}
      </div>
    </div>
  );
};

export default KPIWidget;
