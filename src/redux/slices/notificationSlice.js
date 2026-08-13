import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import notificationService from '@/services/notificationService';

const initialState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,
  success: null,
};

const extractErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || 'Something went wrong. Please try again.';

const countUnread = (notifications) => notifications.filter((n) => !n.read).length;

// ---------------------------------------------------------------------------
// Thunks
// ---------------------------------------------------------------------------

/** @param {{page?: number, pageSize?: number, unreadOnly?: boolean}} [params] */
export const getNotifications = createAsyncThunk(
  'notification/getNotifications',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await notificationService.getNotifications(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {string|number} id */
export const markAsRead = createAsyncThunk(
  'notification/markAsRead',
  async (id, { rejectWithValue }) => {
    try {
      await notificationService.markAsRead(id);
      return id;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const markAllAsRead = createAsyncThunk(
  'notification/markAllAsRead',
  async (_, { rejectWithValue }) => {
    try {
      await notificationService.markAllAsRead();
      return true;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {string|number} id */
export const deleteNotification = createAsyncThunk(
  'notification/deleteNotification',
  async (id, { rejectWithValue }) => {
    try {
      await notificationService.deleteNotification(id);
      return id;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{title: string, message: string, priority?: string, audience?: string[]}} payload */
export const sendNotification = createAsyncThunk(
  'notification/sendNotification',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await notificationService.sendNotification(payload);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// ---------------------------------------------------------------------------
// Slice
// ---------------------------------------------------------------------------

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetNotificationState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // getNotifications
      .addCase(getNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload?.items ?? action.payload ?? [];
        state.unreadCount = countUnread(state.notifications);
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // markAsRead — optimistic-friendly: just flips the local flag
      .addCase(markAsRead.fulfilled, (state, action) => {
        const notification = state.notifications.find((n) => n.id === action.payload);
        if (notification) notification.read = true;
        state.unreadCount = countUnread(state.notifications);
      })
      .addCase(markAsRead.rejected, (state, action) => {
        state.error = action.payload;
      })

      // markAllAsRead
      .addCase(markAllAsRead.fulfilled, (state) => {
        state.notifications = state.notifications.map((n) => ({ ...n, read: true }));
        state.unreadCount = 0;
      })
      .addCase(markAllAsRead.rejected, (state, action) => {
        state.error = action.payload;
      })

      // deleteNotification
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.notifications = state.notifications.filter((n) => n.id !== action.payload);
        state.unreadCount = countUnread(state.notifications);
      })
      .addCase(deleteNotification.rejected, (state, action) => {
        state.error = action.payload;
      })

      // sendNotification (admin)
      .addCase(sendNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(sendNotification.fulfilled, (state) => {
        state.loading = false;
        state.success = 'Notification sent successfully.';
      })
      .addCase(sendNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, resetNotificationState } = notificationSlice.actions;

export const selectNotifications = (state) => state.notification.notifications;
export const selectUnreadCount = (state) => state.notification.unreadCount;
export const selectNotificationLoading = (state) => state.notification.loading;
export const selectNotificationError = (state) => state.notification.error;
export const selectNotificationSuccess = (state) => state.notification.success;

export default notificationSlice.reducer;
