import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { PaymentTransaction } from '@appTypes/index';
import { paymentService } from '@services/misc.service';

interface PaymentsState {
    transactions: PaymentTransaction[];
    walletBalance: number;
    isLoading: boolean;
    isProcessing: boolean;
    error: string | null;
}

const initialState: PaymentsState = {
    transactions: [],
    walletBalance: 0,
    isLoading: false,
    isProcessing: false,
    error: null,
};

export const fetchTransactionsThunk = createAsyncThunk('payments/fetchTransactions', async (_, { rejectWithValue }) => {
    try {
        const { data } = await paymentService.getTransactions();
        return data.data;
    } catch { return rejectWithValue('Failed to load transactions'); }
});

export const fetchWalletBalanceThunk = createAsyncThunk('payments/fetchWallet', async (_, { rejectWithValue }) => {
    try {
        const { data } = await paymentService.getWalletBalance();
        return data.data.balance;
    } catch { return rejectWithValue('Failed to load wallet'); }
});

export const initiatePaymentThunk = createAsyncThunk(
    'payments/initiate',
    async ({ bookingId, method }: { bookingId: string; method: string }, { rejectWithValue }) => {
        try {
            const { data } = await paymentService.initiatePayment(bookingId, method);
            return data.data;
        } catch { return rejectWithValue('Payment failed'); }
    }
);

const paymentsSlice = createSlice({
    name: 'payments',
    initialState,
    reducers: {
        clearPaymentError(state) { state.error = null; },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTransactionsThunk.pending, (state) => { state.isLoading = true; });
        builder.addCase(fetchTransactionsThunk.fulfilled, (state, { payload }) => {
            state.isLoading = false; state.transactions = payload;
        });
        builder.addCase(fetchTransactionsThunk.rejected, (state, { payload }) => {
            state.isLoading = false; state.error = payload as string;
        });

        builder.addCase(fetchWalletBalanceThunk.fulfilled, (state, { payload }) => {
            state.walletBalance = payload;
        });

        builder.addCase(initiatePaymentThunk.pending, (state) => { state.isProcessing = true; state.error = null; });
        builder.addCase(initiatePaymentThunk.fulfilled, (state) => { state.isProcessing = false; });
        builder.addCase(initiatePaymentThunk.rejected, (state, { payload }) => {
            state.isProcessing = false; state.error = payload as string;
        });
    },
});

export const { clearPaymentError } = paymentsSlice.actions;
export default paymentsSlice.reducer;
