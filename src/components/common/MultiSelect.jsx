import { forwardRef, useId } from 'react';
import {
  MenuItem,
  Select as MuiSelect,
  FormControl,
  FormHelperText,
  Checkbox,
  ListItemText,
  Chip,
  Box,
} from '@mui/material';

/**
 * Multi-select dropdown with checkbox items and chip-rendered selection
 * summary. Value is expected/returned as an array.
 *
 * @param {object} props
 * @param {{label: string, value: string|number}[]} props.options
 * @param {(string|number)[]} props.value
 */
const MultiSelect = forwardRef(
  (
    {
      label,
      options = [],
      value = [],
      onChange,
      helperText,
      error,
      required = false,
      disabled = false,
      placeholder = 'Select options',
      className,
      id,
      ...rest
    },
    ref
  ) => {
    const autoId = useId();
    const inputId = id || autoId;
    const errorMessage = typeof error === 'string' ? error : error?.message;

    const labelFor = (val) => options.find((opt) => opt.value === val)?.label ?? val;

    return (
      <FormControl
        fullWidth
        error={Boolean(errorMessage)}
        disabled={disabled}
        className={className}
      >
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
          multiple
          displayEmpty
          value={value}
          onChange={onChange}
          sx={{ borderRadius: '0.5rem', fontSize: '0.875rem', minHeight: 40 }}
          renderValue={(selected) => {
            if (!selected.length) {
              return <span className="text-slate-400">{placeholder}</span>;
            }
            return (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((val) => (
                  <Chip key={val} label={labelFor(val)} size="small" />
                ))}
              </Box>
            );
          }}
          {...rest}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <Checkbox checked={value.includes(option.value)} size="small" />
              <ListItemText primary={option.label} />
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

MultiSelect.displayName = 'MultiSelect';

export default MultiSelect;
