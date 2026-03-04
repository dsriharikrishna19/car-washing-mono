import apiClient from './api';
import type { ApiResponse, Booking } from '@appTypes/index';

export interface CreateBookingPayload {
    serviceId: string;
    carId: string;
    addressId: string;
    addonIds: string[];
    scheduledAt: string;
    paymentMethod: string;
}

export const bookingService = {
    create: (data: CreateBookingPayload) =>
        apiClient.post<ApiResponse<Booking>>('/bookings', data),

    getAll: (params?: { status?: string; page?: number }) =>
        apiClient.get<ApiResponse<Booking[]>>('/bookings', { params }),

    getById: (id: string) =>
        apiClient.get<ApiResponse<Booking>>(`/bookings/${id}`),

    cancel: (id: string, reason?: string) =>
        apiClient.patch<ApiResponse<Booking>>(`/bookings/${id}/cancel`, { reason }),

    rebook: (id: string) =>
        apiClient.post<ApiResponse<Booking>>(`/bookings/${id}/rebook`),

    getInvoice: (id: string) =>
        apiClient.get<ApiResponse<{ url: string }>>(`/bookings/${id}/invoice`),
};
