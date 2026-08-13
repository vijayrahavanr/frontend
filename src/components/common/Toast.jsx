import toast from 'react-hot-toast';
import { FiCheckCircle, FiXCircle, FiAlertTriangle, FiInfo, FiX } from 'react-icons/fi';
import { cn } from '@/utils/helpers';

const TYPE_CONFIG = {
  success: { icon: FiCheckCircle, iconClass: 'text-success' },
  error: { icon: FiXCircle, iconClass: 'text-danger' },
  warning: { icon: FiAlertTriangle, iconClass: 'text-warning' },
  info: { icon: FiInfo, iconClass: 'text-primary' },
};

/**
 * Custom toast body used with react-hot-toast's `toast.custom()`.
 * Provides a consistent card look across the app instead of the
 * library's default plain toast.
 *
 * Usage: toast.custom((t) => <Toast t={t} type="success" title="Saved" />)
 */
const Toast = ({ t, type = 'info', title, description }) => {
  const { icon: Icon, iconClass } = TYPE_CONFIG[type];

  return (
    <div
      role="status"
      className={cn(
        'flex w-full max-w-sm items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-lg dark:border-slate-700 dark:bg-surface-dark-elevated',
        t?.visible ? 'animate-fadeIn' : 'opacity-0'
      )}
    >
      <Icon size={20} className={cn('mt-0.5 shrink-0', iconClass)} />
      <div className="flex-1">
        {title && <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</p>}
        {description && (
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={() => toast.dismiss(t?.id)}
        aria-label="Dismiss notification"
        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
      >
        <FiX size={16} />
      </button>
    </div>
  );
};

export default Toast;
