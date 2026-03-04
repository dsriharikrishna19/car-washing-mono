import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '@services/api';
import type { EarningStats, Payout } from '@appTypes/index';

interface EarningsState {
    stats: EarningStats | null;
    payouts: Payout[];
    isLoading: boolean;
    error: string | null;
}

const initialState: EarningsState = {
    stats: {
        daily: 1200,
        weekly: 8500,
        monthly: 35000,
        todayCount: 3,
    },
    payouts: [
        {
            id: 'p1',
            amount: 5000,
            status: 'processed',
            date: new Date(Date.now() - 86400000 * 3).toISOString(),
        },
    ],
    isLoading: false,
    error: null,
};

export const fetchEarningsThunk = createAsyncThunk(
    'earnings/fetchStats',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await apiClient.get<EarningStats>('/earnings/stats');
            return data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch earnings');
        }
    }
);

export const fetchPayoutsThunk = createAsyncThunk(
    'earnings/fetchPayouts',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await apiClient.get<Payout[]>('/earnings/payouts');
            return data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch payouts');
        }
    }
);

const earningsSlice = createSlice({
    name: 'earnings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEarningsThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchEarningsThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.stats = action.payload;
            })
            .addCase(fetchPayoutsThunk.fulfilled, (state, action) => {
                state.payouts = action.payload;
            });
    },
});

export default earningsSlice.reducer;
