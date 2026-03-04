import apiClient from './api';
import type { ApiResponse, User, Car, Address } from '@appTypes/index';

export const profileService = {
    getProfile: () =>
        apiClient.get<ApiResponse<User>>('/profile'),

    updateProfile: (data: Partial<User>) =>
        apiClient.patch<ApiResponse<User>>('/profile', data),

    // Cars
    getCars: () =>
        apiClient.get<ApiResponse<Car[]>>('/profile/cars'),

    addCar: (data: Omit<Car, 'id' | 'userId'>) =>
        apiClient.post<ApiResponse<Car>>('/profile/cars', data),

    updateCar: (id: string, data: Partial<Car>) =>
        apiClient.patch<ApiResponse<Car>>(`/profile/cars/${id}`, data),

    deleteCar: (id: string) =>
        apiClient.delete<ApiResponse<{ message: string }>>(`/profile/cars/${id}`),

    // Addresses
    getAddresses: () =>
        apiClient.get<ApiResponse<Address[]>>('/profile/addresses'),

    addAddress: (data: Omit<Address, 'id' | 'userId'>) =>
        apiClient.post<ApiResponse<Address>>('/profile/addresses', data),

    updateAddress: (id: string, data: Partial<Address>) =>
        apiClient.patch<ApiResponse<Address>>(`/profile/addresses/${id}`, data),

    deleteAddress: (id: string) =>
        apiClient.delete<ApiResponse<{ message: string }>>(`/profile/addresses/${id}`),

    setDefaultAddress: (id: string) =>
        apiClient.patch<ApiResponse<Address>>(`/profile/addresses/${id}/default`),
};
