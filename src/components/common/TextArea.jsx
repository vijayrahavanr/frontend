import { forwardRef, useId } from 'react';
import { cn } from '@/utils/helpers';

/**
 * Multi-line text input. Mirrors Input's label/error/helperText API
 * so the two can be used interchangeably in forms.
 */
const TextArea = forwardRef(
  (
    {
      label,
      helperText,
      error,
      required = false,
      disabled = false,
      rows = 4,
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

        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          disabled={disabled}
          required={required}
          aria-invalid={Boolean(errorMessage)}
          aria-describedby={describedBy}
          className={cn(
            'w-full resize-y rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors',
            'placeholder:text-slate-400',
            'focus:border-primary focus:ring-2 focus:ring-primary-100',
            'disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400',
            'dark:bg-surface-dark-elevated dark:text-slate-100 dark:placeholder:text-slate-500 dark:disabled:bg-slate-800',
            errorMessage
              ? 'border-danger focus:border-danger focus:ring-danger/10'
              : 'border-slate-300 dark:border-slate-600',
            className
          )}
          {...rest}
        />

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

TextArea.displayName = 'TextArea';

export default TextArea;
