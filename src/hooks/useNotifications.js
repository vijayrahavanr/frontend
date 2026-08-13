import { useCallback } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { useAppSelector } from '../redux/hooks';
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  sendNotification,
  clearError,
  resetNotificationState,
  selectNotifications,
  selectUnreadCount,
  selectNotificationLoading,
  selectNotificationError,
  selectNotificationSuccess,
} from '@/redux/slices/notificationSlice';

/**
 * Encapsulates notification inbox state + actions behind one hook,
 * shared by every role (student/faculty/admin all read/mark/delete
 * the same way) plus an admin-only send/broadcast action.
 */
export const useNotifications = () => {
  const dispatch = useAppDispatch();

  const notifications = useAppSelector(selectNotifications);
  const unreadCount = useAppSelector(selectUnreadCount);
  const loading = useAppSelector(selectNotificationLoading);
  const error = useAppSelector(selectNotificationError);
  const success = useAppSelector(selectNotificationSuccess);

  const fetchNotifications = useCallback(
    (params) => dispatch(getNotifications(params)),
    [dispatch]
  );
  const markRead = useCallback((id) => dispatch(markAsRead(id)), [dispatch]);
  const markAllRead = useCallback(() => dispatch(markAllAsRead()), [dispatch]);
  const removeNotification = useCallback((id) => dispatch(deleteNotification(id)), [dispatch]);
  const send = useCallback((payload) => dispatch(sendNotification(payload)), [dispatch]);
  const resetError = useCallback(() => dispatch(clearError()), [dispatch]);
  const reset = useCallback(() => dispatch(resetNotificationState()), [dispatch]);

  return {
    // state
    notifications,
    unreadCount,
    loading,
    error,
    success,
    // actions
    fetchNotifications,
    markRead,
    markAllRead,
    removeNotification,
    send,
    resetError,
    reset,
  };
};

export default useNotifications;
