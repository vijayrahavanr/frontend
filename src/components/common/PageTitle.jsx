import { cn } from '@/utils/helpers';

/**
 * Reusable page/section heading with an optional description and
 * trailing action slot. Used standalone or composed inside
 * layout/Header/HeaderTitle.
 *
 * @param {object} props
 * @param {string} props.title
 * @param {string} [props.description]
 * @param {React.ReactNode} [props.action]
 */
const PageTitle = ({ title, description, action, className }) => (
  <div className={cn('flex flex-wrap items-start justify-between gap-3', className)}>
    <div>
      <h1 className="text-xl font-semibold text-slate-900 dark:text-white sm:text-2xl">
        {title}
      </h1>
      {description && (
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>
      )}
    </div>
    {action}
  </div>
);

export default PageTitle;
