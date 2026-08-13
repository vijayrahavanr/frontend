import { cn } from '@/utils/helpers';
import Spinner from './Spinner';

/**
 * Generic loading placeholder for a section/panel — centers a spinner
 * and optional message within a minimum height container.
 *
 * @param {object} props
 * @param {string} [props.message]
 * @param {number|string} [props.minHeight]
 */
const Loading = ({ message = 'Loading...', minHeight = 160, className }) => (
  <div
    role="status"
    aria-live="polite"
    style={{ minHeight }}
    className={cn('flex w-full flex-col items-center justify-center gap-3', className)}
  >
    <Spinner size="md" />
    {message && <p className="text-sm text-slate-500 dark:text-slate-400">{message}</p>}
  </div>
);

export default Loading;
