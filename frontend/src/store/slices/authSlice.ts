import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface LoginCredentials {
  email: string;
  password: string;
}

interface User {
  id: string;
  email: string;
  fullName: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
};

// Tạo async thunk cho login
export const login = createAsyncThunk("auth/login", async (credentials: LoginCredentials, { rejectWithValue }) => {
  try {
    // Tạm thời mock API call
    // Sau này sẽ thay bằng call API thật
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock response
    const response = {
      user: {
        id: "1",
        email: credentials.email,
        fullName: "User Test",
      },
      token: "mock_token_123",
    };

    // Lưu token vào localStorage
    localStorage.setItem("token", response.token);

    return response;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Đăng nhập thất bại");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
