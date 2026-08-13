import Select from '@/components/common/Select';
import DatePicker from '@/components/common/DatePicker';
import { cn } from '@/utils/helpers';

/**
 * Reusable filter bar for attendance logs/analytics pages. Renders
 * only the filters that are passed in via `filters`, so each page
 * controls its own filter set without duplicating the layout.
 *
 * @param {object} props
 * @param {{key: string, label: string, type: 'select'|'date', options?: {label: string, value: string}[], value: string, onChange: (value: string) => void}[]} props.filters
 */
const AttendanceFilter = ({ filters = [], className }) => (
  <div className={cn('grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4', className)}>
    {filters.map((filter) =>
      filter.type === 'date' ? (
        <DatePicker
          key={filter.key}
          label={filter.label}
          value={filter.value}
          onChange={(e) => filter.onChange(e.target.value)}
        />
      ) : (
        <Select
          key={filter.key}
          label={filter.label}
          options={filter.options}
          value={filter.value}
          onChange={(e) => filter.onChange(e.target.value)}
        />
      )
    )}
  </div>
);

export default AttendanceFilter;
