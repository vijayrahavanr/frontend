import { FiCheckCircle, FiXCircle, FiAlertTriangle, FiInfo, FiX } from 'react-icons/fi';
import { cn } from '@/utils/helpers';

const TYPE_CONFIG = {
  success: {
    icon: FiCheckCircle,
    className: 'bg-success/10 text-success-700 border-success/20 dark:text-success',
  },
  error: {
    icon: FiXCircle,
    className: 'bg-danger/10 text-danger-700 border-danger/20 dark:text-danger',
  },
  warning: {
    icon: FiAlertTriangle,
    className: 'bg-warning/10 text-warning-700 border-warning/20 dark:text-warning',
  },
  info: {
    icon: FiInfo,
    className: 'bg-primary-50 text-primary-700 border-primary-100 dark:text-primary-300',
  },
};

/**
 * Inline alert box for form-level or section-level feedback
 * (success/error/warning/info messages).
 *
 * @param {object} props
 * @param {'success'|'error'|'warning'|'info'} [props.type]
 * @param {string} [props.title]
 * @param {() => void} [props.onDismiss]
 */
const Alert = ({ type = 'info', title, children, onDismiss, className }) => {
  const { icon: Icon, className: typeClass } = TYPE_CONFIG[type];

  return (
    <div
      role="alert"
      className={cn('flex items-start gap-3 rounded-xl border p-4 text-sm', typeClass, className)}
    >
      <Icon size={18} className="mt-0.5 shrink-0" />
      <div className="flex-1">
        {title && <p className="font-medium">{title}</p>}
        {children && <div className={cn(title && 'mt-0.5 text-xs opacity-90')}>{children}</div>}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss alert"
          className="shrink-0 opacity-70 hover:opacity-100"
        >
          <FiX size={16} />
        </button>
      )}
    </div>
  );
};

export default Alert;
