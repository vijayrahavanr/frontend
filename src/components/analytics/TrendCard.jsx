import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import LineChart from '@/components/charts/LineChart';
import { cn } from '@/utils/helpers';

/**
 * Compact trend summary: current value, period-over-period change,
 * and a small inline line chart. Used on Trend Analysis and the
 * dashboard's overview rows.
 *
 * @param {object} props
 * @param {string} props.label
 * @param {string|number} props.value
 * @param {number} [props.changePercent]
 * @param {string[]} [props.sparklineLabels]
 * @param {number[]} [props.sparklineData]
 */
const TrendCard = ({ label, value, changePercent, sparklineLabels = [], sparklineData = [], className }) => {
  const isPositive = (changePercent ?? 0) >= 0;

  return (
    <div
      className={cn(
        'flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
          <p className="text-2xl font-semibold text-slate-900 dark:text-white">{value}</p>
        </div>
        {changePercent != null && (
          <span
            className={cn(
              'flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium',
              isPositive ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
            )}
          >
            {isPositive ? <FiTrendingUp size={12} /> : <FiTrendingDown size={12} />}
            {Math.abs(changePercent)}%
          </span>
        )}
      </div>

      {sparklineData.length > 0 && (
        <LineChart
          labels={sparklineLabels}
          datasets={[{ label, data: sparklineData, pointRadius: 0, borderWidth: 2 }]}
          height={64}
          options={{
            plugins: { legend: { display: false } },
            scales: { x: { display: false }, y: { display: false } },
          }}
        />
      )}
    </div>
  );
};

export default TrendCard;
