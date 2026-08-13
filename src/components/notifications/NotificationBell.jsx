import { useState } from 'react';
import { FiBell } from 'react-icons/fi';
import Popover from '../common/Popover';
import NotificationCard from '../common/NotificationCard';
import EmptyState from '../empty-state/EmptyState';
import { cn } from '@/utils/helpers';

/**
 * Notification trigger for the navbar: bell icon with an unread-count
 * badge, opening a Popover list of NotificationCard items.
 *
 * @param {object} props
 * @param {{id: string|number, title: string, message?: string, timestamp?: string, read?: boolean, type?: string}[]} props.notifications
 * @param {(notification: object) => void} [props.onSelect]
 * @param {() => void} [props.onViewAll]
 */
const NotificationBell = ({ notifications = [], onSelect, onViewAll, className }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      <button
        type="button"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        aria-label={`Notifications${unreadCount ? ` (${unreadCount} unread)` : ''}`}
        aria-haspopup="menu"
        aria-expanded={open}
        className={cn(
          'relative flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
          className
        )}
      >
        <FiBell size={18} />
        {unreadCount > 0 && (
          <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-danger ring-2 ring-white dark:ring-surface-dark" />
        )}
      </button>

      <Popover
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <div className="flex max-h-96 w-80 flex-col">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-700">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
              Notifications
            </p>
            {onViewAll && (
              <button type="button" onClick={onViewAll} className="text-xs text-primary hover:underline">
                View all
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-2">
            {notifications.length === 0 ? (
              <EmptyState title="No notifications" compact />
            ) : (
              notifications.map((n) => (
                <NotificationCard
                  key={n.id}
                  title={n.title}
                  message={n.message}
                  timestamp={n.timestamp}
                  read={n.read}
                  type={n.type}
                  onClick={() => {
                    onSelect?.(n);
                    setAnchorEl(null);
                  }}
                />
              ))
            )}
          </div>
        </div>
      </Popover>
    </>
  );
};

export default NotificationBell;
