import SearchInput from '@/components/common/SearchInput';

/**
 * Thin wrapper over SearchInput so attendance pages share the same
 * default placeholder/width without repeating it everywhere.
 */
const AttendanceSearch = ({ value, onChange, placeholder = 'Search by name, ID, or subject...', className }) => (
  <SearchInput value={value} onChange={onChange} placeholder={placeholder} className={className} />
);

export default AttendanceSearch;
