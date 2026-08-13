import DatePicker from '@/components/common/DatePicker';
import { cn } from '@/utils/helpers';

/**
 * Paired start/end date picker for filtering analytics by a custom
 * date range.
 *
 * @param {object} props
 * @param {string} props.startDate
 * @param {string} props.endDate
 * @param {(range: {startDate: string, endDate: string}) => void} props.onChange
 */
const DateRangeFilter = ({ startDate, endDate, onChange, className }) => (
  <div className={cn('flex w-full gap-3 sm:w-auto', className)}>
    <div className="w-full sm:w-40">
      <DatePicker
        label="From"
        value={startDate}
        max={endDate || undefined}
        onChange={(e) => onChange({ startDate: e.target.value, endDate })}
      />
    </div>
    <div className="w-full sm:w-40">
      <DatePicker
        label="To"
        value={endDate}
        min={startDate || undefined}
        onChange={(e) => onChange({ startDate, endDate: e.target.value })}
      />
    </div>
  </div>
);

export default DateRangeFilter;
