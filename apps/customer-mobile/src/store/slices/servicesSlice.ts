import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { Service } from '@appTypes/index';
import { servicesService } from '@services/services.service';

interface ServicesState {
    list: Service[];
    featured: Service[];
    nearby: Service[];
    selected: Service | null;
    isLoading: boolean;
    isFeaturedLoading: boolean;
    error: string | null;
    searchQuery: string;
    selectedCategory: string | null;
}

const initialState: ServicesState = {
    list: [
        {
            id: 's1',
            name: 'Exterior Magic',
            category: 'exterior_wash',
            description: 'Foam bath, touchless dry, tire glaze, and window shine for a mirror finish.',
            price: 499,
            duration: 30,
            rating: 4.8,
            reviewCount: 120,
            imageUrl: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=800',
            addons: [],
            availableCarTypes: ['hatchback', 'sedan', 'suv'],
            isFeatured: true,
            isActive: true,
        },
        {
            id: 's2',
            name: 'Elite Care',
            category: 'full_detailing',
            description: 'The ultimate restoration. Interior, exterior, and engine bay restoration.',
            price: 1299,
            duration: 90,
            rating: 4.9,
            reviewCount: 85,
            imageUrl: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=800',
            addons: [],
            availableCarTypes: ['hatchback', 'sedan', 'suv', 'luxury'],
            isFeatured: true,
            isActive: true,
        },
    ],
    featured: [
        {
            id: 's2',
            name: 'Elite Care',
            category: 'full_detailing',
            description: 'The ultimate restoration. Interior, exterior, and engine bay restoration.',
            price: 1299,
            duration: 90,
            rating: 4.9,
            reviewCount: 85,
            imageUrl: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=800',
            addons: [],
            availableCarTypes: ['hatchback', 'sedan', 'suv', 'luxury'],
            isFeatured: true,
            isActive: true,
        },
    ],
    nearby: [],
    selected: null,
    isLoading: false,
    isFeaturedLoading: false,
    error: null,
    searchQuery: '',
    selectedCategory: null,
};

export const fetchServicesThunk = createAsyncThunk(
    'services/fetchAll',
    async (params: { category?: string; search?: string; page?: number } | undefined, { rejectWithValue }) => {
        try {
            const { data } = await servicesService.getAll(params);
            return data.data;
        } catch (err: unknown) {
            return rejectWithValue('Failed to fetch services');
        }
    },
);

export const fetchFeaturedThunk = createAsyncThunk(
    'services/fetchFeatured',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await servicesService.getFeatured();
            return data.data;
        } catch {
            return rejectWithValue('Failed to fetch featured services');
        }
    },
);

export const fetchNearbyThunk = createAsyncThunk(
    'services/fetchNearby',
    async ({ lat, lng }: { lat: number; lng: number }, { rejectWithValue }) => {
        try {
            const { data } = await servicesService.getNearby(lat, lng);
            return data.data;
        } catch {
            return rejectWithValue('Failed to fetch nearby services');
        }
    },
);

export const fetchServiceByIdThunk = createAsyncThunk(
    'services/fetchById',
    async (id: string, { rejectWithValue }) => {
        try {
            const { data } = await servicesService.getById(id);
            return data.data;
        } catch {
            return rejectWithValue('Failed to fetch service');
        }
    },
);

const servicesSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload;
        },
        setSelectedCategory(state, action: PayloadAction<string | null>) {
            state.selectedCategory = action.payload;
        },
        clearSelectedService(state) {
            state.selected = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchServicesThunk.pending, (state) => { state.isLoading = true; state.error = null; });
        builder.addCase(fetchServicesThunk.fulfilled, (state, { payload }) => {
            state.isLoading = false; state.list = payload;
        });
        builder.addCase(fetchServicesThunk.rejected, (state, { payload }) => {
            state.isLoading = false; state.error = payload as string;
        });

        builder.addCase(fetchFeaturedThunk.pending, (state) => { state.isFeaturedLoading = true; });
        builder.addCase(fetchFeaturedThunk.fulfilled, (state, { payload }) => {
            state.isFeaturedLoading = false; state.featured = payload;
        });
        builder.addCase(fetchFeaturedThunk.rejected, (state) => { state.isFeaturedLoading = false; });

        builder.addCase(fetchNearbyThunk.fulfilled, (state, { payload }) => { state.nearby = payload; });

        builder.addCase(fetchServiceByIdThunk.pending, (state) => { state.isLoading = true; });
        builder.addCase(fetchServiceByIdThunk.fulfilled, (state, { payload }) => {
            state.isLoading = false; state.selected = payload;
        });
        builder.addCase(fetchServiceByIdThunk.rejected, (state, { payload }) => {
            state.isLoading = false; state.error = payload as string;
        });
    },
});

export const { setSearchQuery, setSelectedCategory, clearSelectedService } = servicesSlice.actions;
export default servicesSlice.reducer;
