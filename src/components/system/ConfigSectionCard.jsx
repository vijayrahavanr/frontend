import { cn } from '@/utils/helpers';

/**
 * Section shell for configuration pages — icon, title, description,
 * and a body slot for form fields/rows. Used by System/Application/
 * Security/Email/Notification Configuration pages.
 *
 * @param {object} props
 * @param {React.ReactNode} [props.icon]
 * @param {string} props.title
 * @param {string} [props.description]
 * @param {React.ReactNode} [props.action]
 */
const ConfigSectionCard = ({ icon, title, description, action, children, className }) => (
  <div
    className={cn(
      'rounded-2xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark',
      className
    )}
  >
    <div className="mb-4 flex items-start justify-between gap-3">
      <div className="flex items-start gap-3">
        {icon && (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary dark:bg-primary-900/20">
            {icon}
          </span>
        )}
        <div>
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
          {description && (
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{description}</p>
          )}
        </div>
      </div>
      {action}
    </div>
    <div className="flex flex-col gap-4">{children}</div>
  </div>
);

export default ConfigSectionCard;
