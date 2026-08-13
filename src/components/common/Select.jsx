import { forwardRef, useId } from 'react';
import { MenuItem, Select as MuiSelect, FormControl, FormHelperText } from '@mui/material';
import { cn } from '@/utils/helpers';

const SIZE_HEIGHT = {
  sm: 32,
  md: 40,
  lg: 48,
};

/**
 * Single-select dropdown built on MUI's Select for robust keyboard
 * navigation and accessibility, restyled to match the app's Tailwind
 * design tokens.
 *
 * @param {object} props
 * @param {{label: string, value: string|number}[]} props.options
 * @param {string} [props.label]
 * @param {{message?: string}|string} [props.error]
 * @param {'sm'|'md'|'lg'} [props.size]
 */
const Select = forwardRef(
  (
    {
      label,
      options = [],
      helperText,
      error,
      size = 'md',
      required = false,
      disabled = false,
      placeholder = 'Select an option',
      className,
      id,
      ...rest
    },
    ref
  ) => {
    const autoId = useId();
    const inputId = id || autoId;
    const errorMessage = typeof error === 'string' ? error : error?.message;

    return (
      <FormControl fullWidth error={Boolean(errorMessage)} disabled={disabled} className={className}>
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            {label}
            {required && <span className="ml-0.5 text-danger">*</span>}
          </label>
        )}

        <MuiSelect
          inputRef={ref}
          id={inputId}
          displayEmpty
          required={required}
          sx={{
            height: SIZE_HEIGHT[size],
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
          }}
          renderValue={(selected) => {
            if (!selected && selected !== 0) {
              return <span className="text-slate-400">{placeholder}</span>;
            }
            return options.find((opt) => opt.value === selected)?.label ?? selected;
          }}
          className={cn('bg-white dark:bg-surface-dark-elevated')}
          {...rest}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </MuiSelect>

        {(errorMessage || helperText) && (
          <FormHelperText>{errorMessage || helperText}</FormHelperText>
        )}
      </FormControl>
    );
  }
);

Select.displayName = 'Select';

export default Select;
