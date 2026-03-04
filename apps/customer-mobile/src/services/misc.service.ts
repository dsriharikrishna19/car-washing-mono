import apiClient from './api';
import type { ApiResponse, AppNotification, Review, PaymentTransaction } from '@appTypes/index';

export const notificationService = {
    getAll: () =>
        apiClient.get<ApiResponse<AppNotification[]>>('/notifications'),

    markRead: (id: string) =>
        apiClient.patch<ApiResponse<AppNotification>>(`/notifications/${id}/read`),

    markAllRead: () =>
        apiClient.patch<ApiResponse<{ message: string }>>('/notifications/read-all'),
};

export const reviewService = {
    create: (data: { bookingId: string; rating: number; comment?: string }) =>
        apiClient.post<ApiResponse<Review>>('/reviews', data),
};

export const paymentService = {
    getTransactions: () =>
        apiClient.get<ApiResponse<PaymentTransaction[]>>('/payments/transactions'),

    getWalletBalance: () =>
        apiClient.get<ApiResponse<{ balance: number }>>('/payments/wallet'),

    initiatePayment: (bookingId: string, method: string) =>
        apiClient.post<ApiResponse<{ paymentUrl?: string; transactionId: string }>>('/payments/initiate', {
            bookingId,
            method,
        }),
};
