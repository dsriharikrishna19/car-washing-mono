export type ProfileStatus = 'pending_onboarding' | 'document_verification' | 'active' | 'suspended';
export type JobStatus = 'scheduled' | 'partner_en_route' | 'in_progress' | 'completed' | 'cancelled' | 'rejected';
export type CarType = 'hatchback' | 'sedan' | 'suv' | 'muv' | 'luxury';

export interface Partner {
    id: string;
    name: string;
    email: string;
    phone: string;
    profileStatus: ProfileStatus;
    rating: number;
    totalJobs: number;
    walletBalance: number;
    onboardingData?: OnboardingData;
}

export interface OnboardingData {
    idProofUrl?: string;
    licenseUrl?: string;
    experienceYears: number;
    specializations: string[];
}

export interface Job {
    id: string;
    customerId: string;
    customerName: string;
    customerPhone: string;
    address: {
        line1: string;
        city: string;
        latitude: number;
        longitude: number;
    };
    car: {
        model: string;
        type: CarType;
        plateNumber: string;
    };
    serviceName: string;
    price: number;
    commission: number;
    partnerEarnings: number;
    status: JobStatus;
    scheduledAt: string;
    startedAt?: string;
    completedAt?: string;
    beforeImages?: string[];
    afterImages?: string[];
}

export interface EarningStats {
    daily: number;
    weekly: number;
    monthly: number;
    todayCount: number;
}

export interface Payout {
    id: string;
    amount: number;
    status: 'pending' | 'processed' | 'failed';
    date: string;
}

export interface PartnerState {
    isOnline: boolean;
    lastLocation?: {
        latitude: number;
        longitude: number;
    };
}

export interface APIResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

export interface AuthResponse {
    token: string;
    partner: Partner;
}
