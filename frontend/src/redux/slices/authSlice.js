import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

// Async Thunk: Check Auth on App Load
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    if (!token) return rejectWithValue("No token found");

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp && decoded.exp < currentTime) {
        localStorage.removeItem("token");
        return rejectWithValue("Token expired");
      }

      return { user: decoded, token };
    } catch (error) {
      localStorage.removeItem("token");
      return rejectWithValue("Invalid token");
    }
  }
);

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: false,
  loading: true,
  error: null,
  viewMode: "user", // Default to user, will be set to 'admin' on login if role is admin
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload;
      try {
        state.user = jwtDecode(action.payload);
        state.isAuthenticated = true;
        state.error = null;
        // Set viewMode to admin if role is admin
        if (state.user.role === "admin") {
            state.viewMode = "admin";
        } else {
            state.viewMode = "user";
        }
        localStorage.setItem("token", action.payload);
      } catch (e) {
        state.user = null;
        state.isAuthenticated = false;
        state.error = "Invalid token received";
      }
      state.loading = false;
    },
    toggleViewMode: (state) => {
        state.viewMode = state.viewMode === "admin" ? "user" : "admin";
    },
    setViewMode: (state, action) => {
        state.viewMode = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.viewMode = "user";
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        
        // Restore viewMode logic could go here, but for now default to admin for admins on reload if we want
        // Or keep it simple: if admin, default to admin view on hard refresh
        if (state.user.role === 'admin') {
             state.viewMode = 'admin'; 
        } else {
             state.viewMode = 'user';
        }

        state.loading = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
      });
  },
});

export const { loginSuccess, logout, toggleViewMode, setViewMode } = authSlice.actions;

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectViewMode = (state) => state.auth.viewMode;

export default authSlice.reducer;
