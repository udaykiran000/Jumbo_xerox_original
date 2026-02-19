import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Async Thunk for Fetching Stats
export const fetchDashboardStats = createAsyncThunk(
  'dashboard/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      console.log("[REDUX] Fetching Dashboard Stats...");
      const { data } = await api.get('/admin/stats');
      return data;
    } catch (error) {
      console.error("[REDUX] Fetch Failed", error);
      return rejectWithValue(error.response?.data || "Fetch failed");
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    stats: null,
    notifications: {
      pendingOrders: 0,
      unreadMessages: 0,
      pendingShipments: 0,
      fileCleanup: 0,
    },
    loading: false,
    error: null,
  },
  reducers: {
    // Optimistic Updates (Optional, can add later)
    decrementPendingOrders: (state) => {
      if (state.notifications.pendingOrders > 0) state.notifications.pendingOrders--;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
        // Ensure notifications object exists, fallback to default
        state.notifications = action.payload.notifications || {
             pendingOrders: 0,
             unreadMessages: 0,
             pendingShipments: 0,
             fileCleanup: 0,
        };
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { decrementPendingOrders } = dashboardSlice.actions;

export const selectNotifications = (state) => state.dashboard.notifications;
export const selectDashboardLoading = (state) => state.dashboard.loading;
export const selectDashboardStats = (state) => state.dashboard.stats;

export default dashboardSlice.reducer;
