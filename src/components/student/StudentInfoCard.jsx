import { cn } from '@/utils/helpers';

/**
 * Labeled key/value list inside a card — used for the Profile page's
 * Academic Details / Contact Details / Guardian Details sections.
 *
 * @param {object} props
 * @param {string} props.title
 * @param {React.ReactNode} [props.icon]
 * @param {{label: string, value: string}[]} props.fields
 * @param {React.ReactNode} [props.action]
 */
const StudentInfoCard = ({ title, icon, fields = [], action, className }) => (
  <div
    className={cn(
      'rounded-2xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark',
      className
    )}
  >
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon && <span className="text-primary">{icon}</span>}
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
      </div>
      {action}
    </div>

    <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {fields.map((field) => (
        <div key={field.label}>
          <dt className="text-xs text-slate-400">{field.label}</dt>
          <dd className="mt-0.5 text-sm font-medium text-slate-700 dark:text-slate-200">
            {field.value || '—'}
          </dd>
        </div>
      ))}
    </dl>
  </div>
);

export default StudentInfoCard;
