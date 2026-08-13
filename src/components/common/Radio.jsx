import { forwardRef, useId } from 'react';
import { cn } from '@/utils/helpers';

/**
 * Styled radio input with label. Group multiple Radios with the same
 * `name` prop for exclusive selection.
 */
const Radio = forwardRef(
  ({ label, error, disabled = false, className, id, ...rest }, ref) => {
    const autoId = useId();
    const inputId = id || autoId;
    const errorMessage = typeof error === 'string' ? error : error?.message;

    return (
      <div className="flex flex-col gap-1">
        <label
          htmlFor={inputId}
          className={cn(
            'inline-flex select-none items-center gap-2 text-sm text-slate-700 dark:text-slate-200',
            disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
          )}
        >
          <input
            ref={ref}
            id={inputId}
            type="radio"
            disabled={disabled}
            aria-invalid={Boolean(errorMessage)}
            className={cn(
              'h-4 w-4 border-slate-300 text-primary accent-primary',
              'focus:ring-2 focus:ring-primary-100 focus-visible:outline-none',
              'disabled:cursor-not-allowed dark:border-slate-600',
              className
            )}
            {...rest}
          />
          {label}
        </label>
        {errorMessage && (
          <p role="alert" className="text-xs text-danger">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';

export default Radio;
