import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiClient } from '@services/api';
import type { Partner, AuthResponse } from '@appTypes/index';

interface AuthState {
    user: Partner | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: {
        id: 'p1',
        name: 'Sparkle Partner',
        email: 'partner@sparkle.com',
        phone: '9876543210',
        profileStatus: 'active',
        rating: 4.9,
        totalJobs: 156,
        walletBalance: 4500,
    },
    token: 'mock-partner-token',
    isAuthenticated: true,
    isLoading: false,
    error: null,
};

export const loginThunk = createAsyncThunk(
    'auth/login',
    async (phone: string, { rejectWithValue }) => {
        try {
            const { data } = await apiClient.post<AuthResponse>('/auth/login', { phone });
            await AsyncStorage.setItem('partner_token', data.token);
            return data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Login failed');
        }
    }
);

export const verifyOTPThunk = createAsyncThunk(
    'auth/verifyOTP',
    async ({ phone, otp }: { phone: string; otp: string }, { rejectWithValue }) => {
        try {
            const { data } = await apiClient.post<AuthResponse>('/auth/verify-otp', { phone, otp });
            await AsyncStorage.setItem('partner_token', data.token);
            return data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Verification failed');
        }
    }
);

export const logoutThunk = createAsyncThunk('auth/logout', async () => {
    await AsyncStorage.multiRemove(['partner_token', 'partner_refresh_token']);
    return null;
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<{ user: Partner; token: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                // Logic for login fulfilled (wait for OTP)
            })
            .addCase(verifyOTPThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.partner;
                state.token = action.payload.token;
                state.isAuthenticated = true;
            })
            .addCase(verifyOTPThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(logoutThunk.fulfilled, (state) => {
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
            });
    },
});

export const { setAuth, clearError } = authSlice.actions;
export default authSlice.reducer;
