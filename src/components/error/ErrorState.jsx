import { FiAlertTriangle } from 'react-icons/fi';
import { cn } from '@/utils/helpers';
import Button from '../common/Button';

/**
 * Error panel shown when a request/section fails to load, with an
 * optional retry action.
 *
 * @param {object} props
 * @param {string} [props.title]
 * @param {string} [props.description]
 * @param {() => void} [props.onRetry]
 */
const ErrorState = ({
  title = 'Something went wrong',
  description = 'Please try again in a moment.',
  onRetry,
  className,
}) => (
  <div
    role="alert"
    className={cn('flex flex-col items-center justify-center gap-2 py-12 text-center', className)}
  >
    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-danger/10 text-danger">
      <FiAlertTriangle size={22} />
    </span>
    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{title}</p>
    {description && (
      <p className="max-w-xs text-xs text-slate-500 dark:text-slate-400">{description}</p>
    )}
    {onRetry && (
      <Button variant="outlined" size="sm" className="mt-2" onClick={onRetry}>
        Try again
      </Button>
    )}
  </div>
);

export default ErrorState;
