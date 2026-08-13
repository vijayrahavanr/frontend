import SearchInput from '@/components/common/SearchInput';
import { cn } from '@/utils/helpers';

/**
 * Header-scoped search field. Thin wrapper over SearchInput so the
 * header's search box can carry header-specific default width/styling
 * without every Header consumer repeating those classes.
 */
const HeaderSearch = ({ value, onChange, placeholder = 'Search...', className, ...rest }) => (
  <SearchInput
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={cn('w-full sm:w-64', className)}
    {...rest}
  />
);

export default HeaderSearch;
