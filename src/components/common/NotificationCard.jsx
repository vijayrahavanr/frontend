import { motion } from 'framer-motion';
import { cn } from '@/utils/helpers';
import { formatRelativeTime } from '@/utils/date.utils';

const TYPE_DOT = {
  info: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
};

/**
 * Single notification row for a notification list/dropdown.
 *
 * @param {object} props
 * @param {string} props.title
 * @param {string} [props.message]
 * @param {string|Date} [props.timestamp]
 * @param {boolean} [props.read]
 * @param {'info'|'success'|'warning'|'danger'} [props.type]
 * @param {() => void} [props.onClick]
 */
const NotificationCard = ({
  title,
  message,
  timestamp,
  read = false,
  type = 'info',
  onClick,
  className,
}) => {
  return (
    <motion.div
      whileHover={{ x: 2 }}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      className={cn(
        'flex gap-3 rounded-xl p-3 transition-colors',
        onClick && 'cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800',
        !read && 'bg-primary-50/50 dark:bg-primary-900/10',
        className
      )}
    >
      <span className={cn('mt-1.5 h-2 w-2 shrink-0 rounded-full', TYPE_DOT[type])} />
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            'truncate text-sm',
            read
              ? 'text-slate-600 dark:text-slate-300'
              : 'font-semibold text-slate-800 dark:text-slate-100'
          )}
        >
          {title}
        </p>
        {message && (
          <p className="mt-0.5 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
            {message}
          </p>
        )}
        {timestamp && (
          <p className="mt-1 text-[11px] text-slate-400">{formatRelativeTime(timestamp)}</p>
        )}
      </div>
    </motion.div>
  );
};

export default NotificationCard;
