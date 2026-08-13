import { cn } from '@/utils/helpers';

/**
 * Simple divider. Supports horizontal (default) and vertical
 * orientation, plus an optional centered label for horizontal rules.
 *
 * @param {object} props
 * @param {'horizontal'|'vertical'} [props.orientation]
 * @param {React.ReactNode} [props.label]
 */
const Divider = ({ orientation = 'horizontal', label, className }) => {
  if (orientation === 'vertical') {
    return (
      <span
        role="separator"
        aria-orientation="vertical"
        className={cn('inline-block h-full w-px bg-slate-200 dark:bg-slate-700', className)}
      />
    );
  }

  if (label) {
    return (
      <div
        role="separator"
        className={cn('flex items-center gap-3 text-xs text-slate-400', className)}
      >
        <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
        {label}
        <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
      </div>
    );
  }

  return (
    <hr
      role="separator"
      className={cn('border-t border-slate-200 dark:border-slate-700', className)}
    />
  );
};

export default Divider;
