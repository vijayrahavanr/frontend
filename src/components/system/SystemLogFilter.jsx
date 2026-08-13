import Select from '@/components/common/Select';
import DatePicker from '@/components/common/DatePicker';
import SearchInput from '@/components/common/SearchInput';
import { cn } from '@/utils/helpers';

/**
 * Shared filter bar for Audit Logs / Activity Logs pages: search,
 * action/type filter, and a date filter.
 *
 * @param {object} props
 * @param {string} props.query
 * @param {(value: string) => void} props.onQueryChange
 * @param {{label: string, value: string}[]} props.typeOptions
 * @param {string} props.type
 * @param {(value: string) => void} props.onTypeChange
 * @param {string} props.date
 * @param {(value: string) => void} props.onDateChange
 */
const SystemLogFilter = ({ query, onQueryChange, typeOptions, type, onTypeChange, date, onDateChange, className }) => (
  <div className={cn('flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-surface-dark-elevated sm:flex-row sm:items-end', className)}>
    <SearchInput value={query} onChange={(e) => onQueryChange(e.target.value)} className="w-full sm:max-w-xs" />
    <div className="w-full sm:w-48">
      <Select label="Type" options={typeOptions} value={type} onChange={(e) => onTypeChange(e.target.value)} />
    </div>
    <div className="w-full sm:w-44">
      <DatePicker label="Date" value={date} onChange={(e) => onDateChange(e.target.value)} />
    </div>
  </div>
);

export default SystemLogFilter;
