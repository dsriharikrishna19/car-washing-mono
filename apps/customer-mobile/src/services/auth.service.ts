import apiClient from './api';
import type { ApiResponse, User } from '@appTypes/index';

export interface LoginPayload {
    phone: string;
    password: string;
}

export interface SignupPayload {
    name: string;
    email: string;
    phone: string;
    password: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
    user: User;
}

export const authService = {
    login: (data: LoginPayload) =>
        apiClient.post<ApiResponse<AuthTokens>>('/auth/login', data),

    signup: (data: SignupPayload) =>
        apiClient.post<ApiResponse<AuthTokens>>('/auth/register', data),

    sendOtp: (phone: string) =>
        apiClient.post<ApiResponse<{ message: string }>>('/auth/send-otp', { phone }),

    verifyOtp: (phone: string, otp: string) =>
        apiClient.post<ApiResponse<AuthTokens>>('/auth/verify-otp', { phone, otp }),

    forgotPassword: (phone: string) =>
        apiClient.post<ApiResponse<{ message: string }>>('/auth/forgot-password', { phone }),

    resetPassword: (token: string, newPassword: string) =>
        apiClient.post<ApiResponse<{ message: string }>>('/auth/reset-password', { token, newPassword }),

    refreshToken: (refreshToken: string) =>
        apiClient.post<ApiResponse<{ accessToken: string }>>('/auth/refresh', { refreshToken }),

    logout: () =>
        apiClient.post<ApiResponse<{ message: string }>>('/auth/logout'),
};
