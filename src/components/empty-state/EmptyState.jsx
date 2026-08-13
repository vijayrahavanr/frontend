import { FiInbox } from 'react-icons/fi';
import { cn } from '@/utils/helpers';

/**
 * Generic empty-state panel: icon, title, description, and an
 * optional call-to-action. Used inside cards, tables, and lists
 * whenever there's genuinely nothing to show.
 *
 * @param {object} props
 * @param {string} [props.title]
 * @param {string} [props.description]
 * @param {React.ReactNode} [props.icon]
 * @param {React.ReactNode} [props.action]
 * @param {boolean} [props.compact]
 */
const EmptyState = ({
  title = 'Nothing to show',
  description,
  icon,
  action,
  compact = false,
  className,
}) => (
  <div
    className={cn(
      'flex flex-col items-center justify-center gap-2 text-center',
      compact ? 'py-6' : 'py-12',
      className
    )}
  >
    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800">
      {icon || <FiInbox size={22} />}
    </span>
    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{title}</p>
    {description && (
      <p className="max-w-xs text-xs text-slate-500 dark:text-slate-400">{description}</p>
    )}
    {action && <div className="mt-2">{action}</div>}
  </div>
);

export default EmptyState;
