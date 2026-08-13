import { forwardRef, useId } from 'react';
import { FiCalendar } from 'react-icons/fi';
import { cn } from '@/utils/helpers';

/**
 * Date picker built on the native `<input type="date">` for full
 * accessibility and mobile support without an extra dependency.
 * Value/onChange follow the native input contract ("yyyy-MM-dd").
 */
const DatePicker = forwardRef(
  (
    {
      label,
      helperText,
      error,
      required = false,
      disabled = false,
      min,
      max,
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
      <div className="flex w-full flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            {label}
            {required && <span className="ml-0.5 text-danger">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          <span className="pointer-events-none absolute left-3 text-slate-400">
            <FiCalendar size={16} />
          </span>
          <input
            ref={ref}
            id={inputId}
            type="date"
            min={min}
            max={max}
            disabled={disabled}
            required={required}
            aria-invalid={Boolean(errorMessage)}
            className={cn(
              'h-10 w-full rounded-lg border bg-white pl-9 pr-3 text-sm text-slate-900 outline-none transition-colors',
              'focus:border-primary focus:ring-2 focus:ring-primary-100',
              'disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400',
              'dark:bg-surface-dark-elevated dark:text-slate-100 dark:disabled:bg-slate-800',
              'dark:[color-scheme:dark]',
              errorMessage
                ? 'border-danger focus:border-danger focus:ring-danger/10'
                : 'border-slate-300 dark:border-slate-600',
              className
            )}
            {...rest}
          />
        </div>

        {errorMessage ? (
          <p role="alert" className="text-xs text-danger">
            {errorMessage}
          </p>
        ) : (
          helperText && (
            <p className="text-xs text-slate-500 dark:text-slate-400">{helperText}</p>
          )
        )}
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';

export default DatePicker;
