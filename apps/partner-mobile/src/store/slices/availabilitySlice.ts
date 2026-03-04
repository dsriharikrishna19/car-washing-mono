import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiClient } from '@services/api';

interface AvailabilityState {
    isOnline: boolean;
    isUpdating: boolean;
    lastSync: string | null;
    error: string | null;
}

const initialState: AvailabilityState = {
    isOnline: false,
    isUpdating: false,
    lastSync: null,
    error: null,
};

export const toggleAvailabilityThunk = createAsyncThunk(
    'availability/toggle',
    async (status: boolean, { rejectWithValue }) => {
        try {
            const { data } = await apiClient.post<{ online: boolean }>('/availability/toggle', { online: status });
            return data.online;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Failed to update availability');
        }
    }
);

const availabilitySlice = createSlice({
    name: 'availability',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(toggleAvailabilityThunk.pending, (state) => {
                state.isUpdating = true;
            })
            .addCase(toggleAvailabilityThunk.fulfilled, (state, action) => {
                state.isUpdating = false;
                state.isOnline = action.payload;
                state.lastSync = new Date().toISOString();
            })
            .addCase(toggleAvailabilityThunk.rejected, (state, action) => {
                state.isUpdating = false;
                state.error = action.payload as string;
            });
    },
});

export default availabilitySlice.reducer;
