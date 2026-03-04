import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import bookingReducer from './slices/bookingSlice';
import servicesReducer from './slices/servicesSlice';
import profileReducer from './slices/profileSlice';
import paymentsReducer from './slices/paymentsSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        booking: bookingReducer,
        services: servicesReducer,
        profile: profileReducer,
        payments: paymentsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['auth/login/fulfilled', 'auth/verifyOtp/fulfilled'],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
