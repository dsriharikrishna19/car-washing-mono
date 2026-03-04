import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@appTypes/index';
import { authService, LoginPayload, SignupPayload } from '@services/auth.service';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    otpSent: boolean;
}

const initialState: AuthState = {
    user: {
        id: 'mock-id-123',
        name: 'John Sparkle',
        email: 'john@example.com',
        phone: '9876543210',
        role: 'customer',
        createdAt: new Date().toISOString()
    } as User,
    accessToken: 'mock-access-token',
    refreshToken: 'mock-refresh-token',
    isAuthenticated: true,
    isLoading: false,
    error: null,
    otpSent: false,
};

// ─── Thunks ──────────────────────────────────────────────────────────────────
export const loginThunk = createAsyncThunk(
    'auth/login',
    async (payload: LoginPayload, { rejectWithValue }) => {
        try {
            const { data } = await authService.login(payload);
            const tokens = data.data;
            await AsyncStorage.setItem('refreshToken', tokens.refreshToken);
            return tokens;
        } catch (err: unknown) {
            const msg = (err as { response?: { data?: { message?: string } } })
                ?.response?.data?.message ?? 'Login failed';
            return rejectWithValue(msg);
        }
    },
);

export const signupThunk = createAsyncThunk(
    'auth/signup',
    async (payload: SignupPayload, { rejectWithValue }) => {
        try {
            const { data } = await authService.signup(payload);
            return data.data;
        } catch (err: unknown) {
            const msg = (err as { response?: { data?: { message?: string } } })
                ?.response?.data?.message ?? 'Signup failed';
            return rejectWithValue(msg);
        }
    },
);

export const sendOtpThunk = createAsyncThunk(
    'auth/sendOtp',
    async (phone: string, { rejectWithValue }) => {
        try {
            const { data } = await authService.sendOtp(phone);
            return data.data.message;
        } catch (err: unknown) {
            const msg = (err as { response?: { data?: { message?: string } } })
                ?.response?.data?.message ?? 'Failed to send OTP';
            return rejectWithValue(msg);
        }
    },
);

export const verifyOtpThunk = createAsyncThunk(
    'auth/verifyOtp',
    async ({ phone, otp }: { phone: string; otp: string }, { rejectWithValue }) => {
        try {
            const { data } = await authService.verifyOtp(phone, otp);
            const tokens = data.data;
            await AsyncStorage.setItem('refreshToken', tokens.refreshToken);
            return tokens;
        } catch (err: unknown) {
            const msg = (err as { response?: { data?: { message?: string } } })
                ?.response?.data?.message ?? 'OTP verification failed';
            return rejectWithValue(msg);
        }
    },
);

export const refreshTokenThunk = createAsyncThunk(
    'auth/refreshToken',
    async (_, { getState, rejectWithValue }) => {
        try {
            const storedToken = await AsyncStorage.getItem('refreshToken');
            if (!storedToken) return rejectWithValue('No refresh token');
            const { data } = await authService.refreshToken(storedToken);
            return { accessToken: data.data.accessToken };
        } catch (err: unknown) {
            return rejectWithValue('Token refresh failed');
        }
    },
);

// ─── Slice ────────────────────────────────────────────────────────────────────
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
            state.error = null;
            AsyncStorage.removeItem('refreshToken');
        },
        clearError(state) {
            state.error = null;
        },
        setTokens(state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.isAuthenticated = true;
        },
    },
    extraReducers: (builder) => {
        // Login
        builder.addCase(loginThunk.pending, (state) => { state.isLoading = true; state.error = null; });
        builder.addCase(loginThunk.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.user = payload.user;
            state.accessToken = payload.accessToken;
            state.refreshToken = payload.refreshToken;
            state.isAuthenticated = true;
        });
        builder.addCase(loginThunk.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.error = payload as string;
        });
        // Signup
        builder.addCase(signupThunk.pending, (state) => { state.isLoading = true; state.error = null; });
        builder.addCase(signupThunk.fulfilled, (state) => { state.isLoading = false; state.otpSent = true; });
        builder.addCase(signupThunk.rejected, (state, { payload }) => {
            state.isLoading = false; state.error = payload as string;
        });
        // OTP
        builder.addCase(sendOtpThunk.pending, (state) => { state.isLoading = true; state.error = null; });
        builder.addCase(sendOtpThunk.fulfilled, (state) => { state.isLoading = false; state.otpSent = true; });
        builder.addCase(sendOtpThunk.rejected, (state, { payload }) => {
            state.isLoading = false; state.error = payload as string;
        });
        builder.addCase(verifyOtpThunk.pending, (state) => { state.isLoading = true; state.error = null; });
        builder.addCase(verifyOtpThunk.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.user = payload.user;
            state.accessToken = payload.accessToken;
            state.refreshToken = payload.refreshToken;
            state.isAuthenticated = true;
        });
        builder.addCase(verifyOtpThunk.rejected, (state, { payload }) => {
            state.isLoading = false; state.error = payload as string;
        });
        // Refresh token
        builder.addCase(refreshTokenThunk.fulfilled, (state, { payload }) => {
            state.accessToken = payload.accessToken;
        });
        builder.addCase(refreshTokenThunk.rejected, (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.accessToken = null;
        });
    },
});

export const { logout, clearError, setTokens } = authSlice.actions;
export default authSlice.reducer;
