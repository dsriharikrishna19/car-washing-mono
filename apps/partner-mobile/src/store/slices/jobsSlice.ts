import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiClient } from '@services/api';
import type { Job, JobStatus } from '@appTypes/index';

interface JobsState {
    todayJobs: Job[];
    upcomingJobs: Job[];
    activeJob: Job | null;
    isLoading: boolean;
    isUpdating: boolean;
    error: string | null;
}

const initialState: JobsState = {
    todayJobs: [
        {
            id: 'j1',
            customerId: 'u1',
            customerName: 'John Sparkle',
            customerPhone: '9876543210',
            address: {
                line1: '123, Sparkle Street',
                city: 'Bangalore',
                latitude: 12.9716,
                longitude: 77.5946,
            },
            car: {
                model: 'Honda City',
                type: 'sedan',
                plateNumber: 'KA-01-AB-1234',
            },
            serviceName: 'Premium Exterior Wash',
            price: 499,
            commission: 100,
            partnerEarnings: 399,
            status: 'scheduled',
            scheduledAt: new Date().toISOString(),
        },
    ],
    upcomingJobs: [],
    activeJob: null,
    isLoading: false,
    isUpdating: false,
    error: null,
};

export const fetchJobsThunk = createAsyncThunk(
    'jobs/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await apiClient.get<Job[]>('/jobs');
            return data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch jobs');
        }
    }
);

export const updateJobStatusThunk = createAsyncThunk(
    'jobs/updateStatus',
    async ({ jobId, status, beforeImages, afterImages }: { jobId: string; status: JobStatus; beforeImages?: string[]; afterImages?: string[] }, { rejectWithValue }) => {
        try {
            const { data } = await apiClient.patch<Job>(`/jobs/${jobId}/status`, { status, beforeImages, afterImages });
            return data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Failed to update job status');
        }
    }
);

const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        setActiveJob: (state, action: PayloadAction<Job | null>) => {
            state.activeJob = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobsThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchJobsThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.todayJobs = action.payload.filter(j =>
                    new Date(j.scheduledAt).toDateString() === new Date().toDateString()
                );
                state.upcomingJobs = action.payload.filter(j =>
                    new Date(j.scheduledAt).getTime() > new Date().getTime() &&
                    new Date(j.scheduledAt).toDateString() !== new Date().toDateString()
                );
            })
            .addCase(updateJobStatusThunk.fulfilled, (state, action) => {
                state.isUpdating = false;
                // Update job in lists
                const update = (jobs: Job[]) => jobs.map(j => j.id === action.payload.id ? action.payload : j);
                state.todayJobs = update(state.todayJobs);
                state.upcomingJobs = update(state.upcomingJobs);
                if (state.activeJob?.id === action.payload.id) {
                    state.activeJob = action.payload;
                }
            });
    },
});

export const { setActiveJob } = jobsSlice.actions;
export default jobsSlice.reducer;
