import { cn } from '@/utils/helpers';

const SPACING_CLASSES = {
  sm: 'py-4',
  md: 'py-6',
  lg: 'py-10',
};

/**
 * Vertical rhythm wrapper for grouping page content into sections,
 * with an optional heading/description pair.
 *
 * @param {object} props
 * @param {string} [props.title]
 * @param {string} [props.description]
 * @param {'sm'|'md'|'lg'} [props.spacing]
 */
const Section = ({ title, description, action, children, spacing = 'md', className }) => (
  <section className={cn(SPACING_CLASSES[spacing], className)}>
    {(title || action) && (
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          {title && (
            <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100">{title}</h2>
          )}
          {description && (
            <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{description}</p>
          )}
        </div>
        {action}
      </div>
    )}
    {children}
  </section>
);

export default Section;
