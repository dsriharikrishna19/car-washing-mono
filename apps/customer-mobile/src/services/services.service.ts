import apiClient from './api';
import type { ApiResponse, Service, PaginatedResponse } from '@appTypes/index';

export const servicesService = {
    getAll: (params?: { category?: string; search?: string; page?: number }) =>
        apiClient.get<PaginatedResponse<Service>>('/services', { params }),

    getFeatured: () =>
        apiClient.get<ApiResponse<Service[]>>('/services/featured'),

    getNearby: (latitude: number, longitude: number, radius?: number) =>
        apiClient.get<ApiResponse<Service[]>>('/services/nearby', {
            params: { latitude, longitude, radius: radius ?? 10 },
        }),

    getById: (id: string) =>
        apiClient.get<ApiResponse<Service>>(`/services/${id}`),

    getCategories: () =>
        apiClient.get<ApiResponse<{ id: string; name: string; icon: string }[]>>('/services/categories'),
};
