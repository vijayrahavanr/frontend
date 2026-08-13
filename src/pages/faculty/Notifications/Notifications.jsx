import { useEffect } from 'react';
import { useNotifications } from '@/hooks/useNotifications';
import FacultyTopbar from '@/components/faculty/FacultyTopbar';
import NotificationCard from '@/components/faculty/NotificationCard';
import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button';
import EmptyState from '@/components/empty-state/EmptyState';
import ErrorState from '@/components/error/ErrorState';
import Skeleton from '@/components/common/Skeleton';

/**
 * Full notifications list — backed by the shared notificationSlice
 * via useNotifications (identical contract to the student module's
 * Notifications page, since notifications aren't role-specific).
 */
const Notifications = () => {
  const {
    notifications,
    unreadCount,
    loading,
    error,
    fetchNotifications,
    markRead,
    markAllRead,
    removeNotification,
  } = useNotifications();

  useEffect(() => {
    fetchNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <ErrorState description={error} onRetry={fetchNotifications} />;

  return (
    <div className="flex flex-col gap-6">
      <FacultyTopbar
        title="Notifications"
        subtitle={`${unreadCount} unread notification${unreadCount === 1 ? '' : 's'}`}
        actions={
          <Button variant="outlined" size="sm" onClick={markAllRead} disabled={unreadCount === 0}>
            Mark all as read
          </Button>
        }
      />

      {loading && !notifications.length ? (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-xl" />
          ))}
        </div>
      ) : notifications.length === 0 ? (
        <EmptyState title="You're all caught up" description="No notifications right now." />
      ) : (
        <div className="flex flex-col gap-2">
          {notifications.map((n) => (
            <div key={n.id} className="relative">
              {!n.read && (
                <Badge color="primary" className="absolute left-3 top-3 z-10">
                  New
                </Badge>
              )}
              <NotificationCard {...n} onClick={() => markRead(n.id)} />
              <button
                onClick={() => removeNotification(n.id)}
                className="absolute right-3 top-3 text-xs text-slate-400 hover:text-danger"
                aria-label="Delete notification"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
