import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { User, Car, Address } from '@appTypes/index';
import { profileService } from '@services/profile.service';

interface ProfileState {
    user: User | null;
    cars: Car[];
    addresses: Address[];
    isLoading: boolean;
    isCarsLoading: boolean;
    isAddressLoading: boolean;
    error: string | null;
}

const initialState: ProfileState = {
    user: null,
    cars: [],
    addresses: [],
    isLoading: false,
    isCarsLoading: false,
    isAddressLoading: false,
    error: null,
};

export const fetchProfileThunk = createAsyncThunk('profile/fetch', async (_, { rejectWithValue }) => {
    try {
        const { data } = await profileService.getProfile();
        return data.data;
    } catch { return rejectWithValue('Failed to load profile'); }
});

export const updateProfileThunk = createAsyncThunk(
    'profile/update', async (payload: Partial<User>, { rejectWithValue }) => {
        try {
            const { data } = await profileService.updateProfile(payload);
            return data.data;
        } catch { return rejectWithValue('Failed to update profile'); }
    }
);

export const fetchCarsThunk = createAsyncThunk('profile/fetchCars', async (_, { rejectWithValue }) => {
    try {
        const { data } = await profileService.getCars();
        return data.data;
    } catch { return rejectWithValue('Failed to load cars'); }
});

export const addCarThunk = createAsyncThunk(
    'profile/addCar', async (payload: Omit<Car, 'id' | 'userId'>, { rejectWithValue }) => {
        try {
            const { data } = await profileService.addCar(payload);
            return data.data;
        } catch { return rejectWithValue('Failed to add car'); }
    }
);

export const deleteCarThunk = createAsyncThunk(
    'profile/deleteCar', async (id: string, { rejectWithValue }) => {
        try {
            await profileService.deleteCar(id);
            return id;
        } catch { return rejectWithValue('Failed to delete car'); }
    }
);

export const fetchAddressesThunk = createAsyncThunk('profile/fetchAddresses', async (_, { rejectWithValue }) => {
    try {
        const { data } = await profileService.getAddresses();
        return data.data;
    } catch { return rejectWithValue('Failed to load addresses'); }
});

export const addAddressThunk = createAsyncThunk(
    'profile/addAddress', async (payload: Omit<Address, 'id' | 'userId'>, { rejectWithValue }) => {
        try {
            const { data } = await profileService.addAddress(payload);
            return data.data;
        } catch { return rejectWithValue('Failed to add address'); }
    }
);

export const deleteAddressThunk = createAsyncThunk(
    'profile/deleteAddress', async (id: string, { rejectWithValue }) => {
        try {
            await profileService.deleteAddress(id);
            return id;
        } catch { return rejectWithValue('Failed to delete address'); }
    }
);

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        clearProfileError(state) { state.error = null; },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProfileThunk.pending, (state) => { state.isLoading = true; });
        builder.addCase(fetchProfileThunk.fulfilled, (state, { payload }) => { state.isLoading = false; state.user = payload; });
        builder.addCase(fetchProfileThunk.rejected, (state, { payload }) => { state.isLoading = false; state.error = payload as string; });

        builder.addCase(updateProfileThunk.fulfilled, (state, { payload }) => { state.user = payload; });

        builder.addCase(fetchCarsThunk.pending, (state) => { state.isCarsLoading = true; });
        builder.addCase(fetchCarsThunk.fulfilled, (state, { payload }) => { state.isCarsLoading = false; state.cars = payload; });
        builder.addCase(fetchCarsThunk.rejected, (state) => { state.isCarsLoading = false; });

        builder.addCase(addCarThunk.fulfilled, (state, { payload }) => { state.cars.push(payload); });
        builder.addCase(deleteCarThunk.fulfilled, (state, { payload }) => {
            state.cars = state.cars.filter((c) => c.id !== payload);
        });

        builder.addCase(fetchAddressesThunk.pending, (state) => { state.isAddressLoading = true; });
        builder.addCase(fetchAddressesThunk.fulfilled, (state, { payload }) => { state.isAddressLoading = false; state.addresses = payload; });
        builder.addCase(fetchAddressesThunk.rejected, (state) => { state.isAddressLoading = false; });

        builder.addCase(addAddressThunk.fulfilled, (state, { payload }) => { state.addresses.push(payload); });
        builder.addCase(deleteAddressThunk.fulfilled, (state, { payload }) => {
            state.addresses = state.addresses.filter((a) => a.id !== payload);
        });
    },
});

export const { clearProfileError } = profileSlice.actions;
export default profileSlice.reducer;
