import { forwardRef } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import Input from './Input';

/**
 * Search field with a leading search icon and a trailing clear button
 * that appears once there's a value. Controlled component — pass
 * `value` and `onChange` as usual.
 */
const SearchInput = forwardRef(({ value, onChange, onClear, placeholder = 'Search...', ...props }, ref) => {
  const handleClear = () => {
    onChange?.({ target: { value: '' } });
    onClear?.();
  };

  return (
    <Input
      ref={ref}
      type="search"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      prefixIcon={<FiSearch size={16} />}
      suffixIcon={
        value ? (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <FiX size={16} />
          </button>
        ) : undefined
      }
      {...props}
    />
  );
});

SearchInput.displayName = 'SearchInput';

export default SearchInput;
