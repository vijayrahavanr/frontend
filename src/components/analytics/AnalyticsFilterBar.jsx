import Select from '@/components/common/Select';
import DateRangeFilter from './DateRangeFilter';
import { cn } from '@/utils/helpers';

/**
 * Reusable multi-filter bar for analytics pages. Renders only the
 * filters passed in via `filters`, plus an optional date-range
 * filter, so each page controls its own filter set without
 * duplicating the layout.
 *
 * @param {object} props
 * @param {{key: string, label: string, options: {label: string, value: string}[], value: string, onChange: (value: string) => void}[]} props.filters
 * @param {{startDate: string, endDate: string, onChange: (range: {startDate: string, endDate: string}) => void}} [props.dateRange]
 */
const AnalyticsFilterBar = ({ filters = [], dateRange, className }) => (
  <div className={cn('flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-surface-dark-elevated sm:flex-row sm:flex-wrap sm:items-end', className)}>
    {dateRange && <DateRangeFilter {...dateRange} />}
    {filters.map((filter) => (
      <div key={filter.key} className="w-full sm:w-48">
        <Select
          label={filter.label}
          options={filter.options}
          value={filter.value}
          onChange={(e) => filter.onChange(e.target.value)}
        />
      </div>
    ))}
  </div>
);

export default AnalyticsFilterBar;
