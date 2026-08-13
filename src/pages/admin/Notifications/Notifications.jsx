import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSend } from 'react-icons/fi';
import { useNotifications } from '@/hooks/useNotifications';
import AdminTopbar from '@/components/admin/AdminTopbar';
import NotificationCard from '@/components/admin/NotificationCard';
import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button';
import EmptyState from '@/components/empty-state/EmptyState';
import ErrorState from '@/components/error/ErrorState';
import Skeleton from '@/components/common/Skeleton';

/**
 * Admin notification inbox — backed by the shared notificationSlice
 * via useNotifications, with a shortcut to compose a new broadcast.
 */
const Notifications = () => {
  const { notifications, unreadCount, loading, error, fetchNotifications, markRead } = useNotifications();

  useEffect(() => {
    fetchNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <ErrorState description={error} onRetry={fetchNotifications} />;

  return (
    <div className="flex flex-col gap-6">
      <AdminTopbar
        title="Notifications"
        subtitle={`${unreadCount} unread notification${unreadCount === 1 ? '' : 's'}`}
        actions={
          <Link to="/admin/notifications/send">
            <Button size="sm" startIcon={<FiSend size={14} />}>
              Send Notification
            </Button>
          </Link>
        }
      />

      {loading && !notifications.length ? (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-xl" />
          ))}
        </div>
      ) : notifications.length === 0 ? (
        <EmptyState title="No notifications" />
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
