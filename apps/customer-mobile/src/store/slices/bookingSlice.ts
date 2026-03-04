import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { Booking, BookingStatus } from '@appTypes/index';
import { bookingService, CreateBookingPayload } from '@services/booking.service';

interface BookingCart {
    serviceId: string | null;
    carId: string | null;
    addressId: string | null;
    selectedAddonIds: string[];
    scheduledAt: string | null;
    paymentMethod: string;
}

interface BookingState {
    history: Booking[];
    active: Booking | null;
    cart: BookingCart;
    isLoading: boolean;
    isCreating: boolean;
    error: string | null;
}

const initialCart: BookingCart = {
    serviceId: null,
    carId: null,
    addressId: null,
    selectedAddonIds: [],
    scheduledAt: null,
    paymentMethod: 'cash',
};

const initialState: BookingState = {
    history: [
        {
            id: 'b1',
            userId: 'mock-id-123',
            serviceId: 's1',
            service: {
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
            car: {
                id: 'c1',
                userId: 'mock-id-123',
                name: 'My Sedan',
                brand: 'Honda',
                model: 'City',
                type: 'sedan',
                plateNumber: 'KA-01-AB-1234',
                color: 'Black',
            },
            address: {
                id: 'a1',
                userId: 'mock-id-123',
                label: 'Home',
                line1: '123, Sparkle Street',
                city: 'Bangalore',
                state: 'Karnataka',
                pincode: '560001',
                latitude: 12.9716,
                longitude: 77.5946,
                isDefault: true,
            },
            addons: [],
            status: 'completed',
            scheduledAt: new Date(Date.now() - 86400000 * 2).toISOString(),
            completedAt: new Date(Date.now() - 86400000 * 2 + 3600000).toISOString(),
            totalAmount: 499,
            paymentMethod: 'upi',
            paymentStatus: 'paid',
            createdAt: new Date(Date.now() - 86400000 * 2 - 3600000).toISOString(),
        },
    ],
    active: null,
    cart: initialCart,
    isLoading: false,
    isCreating: false,
    error: null,
};

export const createBookingThunk = createAsyncThunk(
    'booking/create',
    async (payload: CreateBookingPayload, { rejectWithValue }) => {
        try {
            const { data } = await bookingService.create(payload);
            return data.data;
        } catch (err: unknown) {
            const msg = (err as { response?: { data?: { message?: string } } })
                ?.response?.data?.message ?? 'Booking failed';
            return rejectWithValue(msg);
        }
    },
);

export const fetchBookingsThunk = createAsyncThunk(
    'booking/fetchAll',
    async (params: { status?: string } | undefined, { rejectWithValue }) => {
        try {
            const { data } = await bookingService.getAll(params);
            return data.data;
        } catch {
            return rejectWithValue('Failed to load bookings');
        }
    },
);

export const fetchBookingByIdThunk = createAsyncThunk(
    'booking/fetchById',
    async (id: string, { rejectWithValue }) => {
        try {
            const { data } = await bookingService.getById(id);
            return data.data;
        } catch {
            return rejectWithValue('Failed to load booking');
        }
    },
);

export const cancelBookingThunk = createAsyncThunk(
    'booking/cancel',
    async ({ id, reason }: { id: string; reason?: string }, { rejectWithValue }) => {
        try {
            const { data } = await bookingService.cancel(id, reason);
            return data.data;
        } catch {
            return rejectWithValue('Failed to cancel booking');
        }
    },
);

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        setCartService(state, action: PayloadAction<string>) {
            state.cart.serviceId = action.payload;
        },
        setCartCar(state, action: PayloadAction<string>) {
            state.cart.carId = action.payload;
        },
        setCartAddress(state, action: PayloadAction<string>) {
            state.cart.addressId = action.payload;
        },
        toggleCartAddon(state, action: PayloadAction<string>) {
            const id = action.payload;
            const idx = state.cart.selectedAddonIds.indexOf(id);
            if (idx >= 0) state.cart.selectedAddonIds.splice(idx, 1);
            else state.cart.selectedAddonIds.push(id);
        },
        setScheduledAt(state, action: PayloadAction<string>) {
            state.cart.scheduledAt = action.payload;
        },
        setPaymentMethod(state, action: PayloadAction<string>) {
            state.cart.paymentMethod = action.payload;
        },
        resetCart(state) {
            state.cart = initialCart;
        },
        updateActiveStatus(state, action: PayloadAction<BookingStatus>) {
            if (state.active) state.active.status = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createBookingThunk.pending, (state) => { state.isCreating = true; state.error = null; });
        builder.addCase(createBookingThunk.fulfilled, (state, { payload }) => {
            state.isCreating = false;
            state.active = payload;
            state.cart = initialCart;
        });
        builder.addCase(createBookingThunk.rejected, (state, { payload }) => {
            state.isCreating = false; state.error = payload as string;
        });

        builder.addCase(fetchBookingsThunk.pending, (state) => { state.isLoading = true; });
        builder.addCase(fetchBookingsThunk.fulfilled, (state, { payload }) => {
            state.isLoading = false; state.history = payload;
        });
        builder.addCase(fetchBookingsThunk.rejected, (state, { payload }) => {
            state.isLoading = false; state.error = payload as string;
        });

        builder.addCase(fetchBookingByIdThunk.fulfilled, (state, { payload }) => {
            state.active = payload;
        });

        builder.addCase(cancelBookingThunk.fulfilled, (state, { payload }) => {
            const idx = state.history.findIndex((b) => b.id === payload.id);
            if (idx >= 0) state.history[idx] = payload;
            if (state.active?.id === payload.id) state.active = payload;
        });
    },
});

export const {
    setCartService, setCartCar, setCartAddress, toggleCartAddon,
    setScheduledAt, setPaymentMethod, resetCart, updateActiveStatus,
} = bookingSlice.actions;
export default bookingSlice.reducer;
