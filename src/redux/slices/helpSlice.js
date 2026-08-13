import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import helpService from '@/services/helpService';
import supportService from '@/services/supportService';

const initialState = {
  articles: [],
  faqs: [],
  tickets: [],
  ticketDetails: null,
  loading: false,
  error: null,
  success: null,
};

const extractErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || 'Something went wrong. Please try again.';

// ---------------------------------------------------------------------------
// Thunks — help center
// ---------------------------------------------------------------------------

/** @param {{query?: string, category?: string}} [params] */
export const getHelpArticles = createAsyncThunk(
  'help/getHelpArticles',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await helpService.getArticles(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{query?: string, category?: string}} [params] */
export const getFAQs = createAsyncThunk('help/getFAQs', async (params, { rejectWithValue }) => {
  try {
    const { data } = await helpService.getFAQs(params);
    return data;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

/** @param {{category: string, rating: string, message: string}} payload */
export const submitFeedback = createAsyncThunk(
  'help/submitFeedback',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await helpService.submitFeedback(payload);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// ---------------------------------------------------------------------------
// Thunks — support tickets
// ---------------------------------------------------------------------------

/** @param {{page?: number, pageSize?: number, status?: string}} [params] */
export const getTickets = createAsyncThunk('help/getTickets', async (params, { rejectWithValue }) => {
  try {
    const { data } = await supportService.getTickets(params);
    return data;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

/** @param {string|number} id */
export const getTicketById = createAsyncThunk(
  'help/getTicketById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await supportService.getTicketById(id);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{subject: string, priority: string, description: string}} payload */
export const createTicket = createAsyncThunk(
  'help/createTicket',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await supportService.createTicket(payload);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{id: string|number, payload: {message: string}}} args */
export const replyToTicket = createAsyncThunk(
  'help/replyToTicket',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const { data } = await supportService.replyToTicket(id, payload);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{id: string|number, status: string}} args */
export const updateTicketStatus = createAsyncThunk(
  'help/updateTicketStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const { data } = await supportService.updateTicketStatus(id, { status });
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// ---------------------------------------------------------------------------
// Slice
// ---------------------------------------------------------------------------

const helpSlice = createSlice({
  name: 'help',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetHelpState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // getHelpArticles
      .addCase(getHelpArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHelpArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload ?? [];
      })
      .addCase(getHelpArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getFAQs
      .addCase(getFAQs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFAQs.fulfilled, (state, action) => {
        state.loading = false;
        state.faqs = action.payload ?? [];
      })
      .addCase(getFAQs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // submitFeedback
      .addCase(submitFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(submitFeedback.fulfilled, (state) => {
        state.loading = false;
        state.success = 'Feedback submitted successfully.';
      })
      .addCase(submitFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getTickets
      .addCase(getTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload?.items ?? action.payload ?? [];
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getTicketById
      .addCase(getTicketById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTicketById.fulfilled, (state, action) => {
        state.loading = false;
        state.ticketDetails = action.payload;
      })
      .addCase(getTicketById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // createTicket
      .addCase(createTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets.unshift(action.payload);
        state.success = 'Support ticket created successfully.';
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // replyToTicket
      .addCase(replyToTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(replyToTicket.fulfilled, (state, action) => {
        state.loading = false;
        if (state.ticketDetails) {
          state.ticketDetails.replies = [...(state.ticketDetails.replies ?? []), action.payload];
        }
      })
      .addCase(replyToTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // updateTicketStatus
      .addCase(updateTicketStatus.fulfilled, (state, action) => {
        const index = state.tickets.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.tickets[index] = action.payload;
        if (state.ticketDetails?.id === action.payload.id) state.ticketDetails = action.payload;
      })
      .addCase(updateTicketStatus.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearError, resetHelpState } = helpSlice.actions;

export const selectHelpArticles = (state) => state.help.articles;
export const selectFAQs = (state) => state.help.faqs;
export const selectTickets = (state) => state.help.tickets;
export const selectTicketDetails = (state) => state.help.ticketDetails;
export const selectHelpLoading = (state) => state.help.loading;
export const selectHelpError = (state) => state.help.error;
export const selectHelpSuccess = (state) => state.help.success;

export default helpSlice.reducer;
