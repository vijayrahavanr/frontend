import { forwardRef, useId } from 'react';
import { cn } from '@/utils/helpers';

const SIZE_CLASSES = {
  sm: 'h-8 text-sm px-2.5',
  md: 'h-10 text-sm px-3',
  lg: 'h-12 text-base px-4',
};

/**
 * Base text input. Forwards its ref so it plugs directly into
 * React Hook Form's `register()`, and mirrors RHF's error shape
 * via the `error` prop (pass `errors.fieldName` from formState).
 *
 * @param {object} props
 * @param {string} [props.label]
 * @param {string} [props.helperText]
 * @param {{message?: string}|string} [props.error]
 * @param {'sm'|'md'|'lg'} [props.size]
 * @param {React.ReactNode} [props.prefixIcon]
 * @param {React.ReactNode} [props.suffixIcon]
 * @param {boolean} [props.required]
 */
const Input = forwardRef(
  (
    {
      label,
      helperText,
      error,
      size = 'md',
      prefixIcon,
      suffixIcon,
      required = false,
      disabled = false,
      className,
      id,
      ...rest
    },
    ref
  ) => {
    const autoId = useId();
    const inputId = id || autoId;
    const errorMessage = typeof error === 'string' ? error : error?.message;
    const describedBy = errorMessage
      ? `${inputId}-error`
      : helperText
        ? `${inputId}-helper`
        : undefined;

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
          {prefixIcon && (
            <span className="pointer-events-none absolute left-3 flex items-center text-slate-400">
              {prefixIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={Boolean(errorMessage)}
            aria-describedby={describedBy}
            required={required}
            className={cn(
              'w-full rounded-lg border bg-white text-slate-900 outline-none transition-colors',
              'placeholder:text-slate-400',
              'focus:border-primary focus:ring-2 focus:ring-primary-100',
              'disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400',
              'dark:bg-surface-dark-elevated dark:text-slate-100 dark:placeholder:text-slate-500',
              'dark:disabled:bg-slate-800',
              errorMessage
                ? 'border-danger focus:border-danger focus:ring-danger/10'
                : 'border-slate-300 dark:border-slate-600',
              prefixIcon && 'pl-9',
              suffixIcon && 'pr-9',
              SIZE_CLASSES[size],
              className
            )}
            {...rest}
          />

          {suffixIcon && (
            <span className="absolute right-3 flex items-center text-slate-400">
              {suffixIcon}
            </span>
          )}
        </div>

        {errorMessage ? (
          <p id={`${inputId}-error`} role="alert" className="text-xs text-danger">
            {errorMessage}
          </p>
        ) : (
          helperText && (
            <p id={`${inputId}-helper`} className="text-xs text-slate-500 dark:text-slate-400">
              {helperText}
            </p>
          )
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
