// ─── User ────────────────────────────────────────────────────────────────────
export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    createdAt: string;
}

// ─── Car ─────────────────────────────────────────────────────────────────────
export type CarType = 'hatchback' | 'sedan' | 'suv' | 'muv' | 'luxury';

export interface Car {
    id: string;
    userId: string;
    name: string;
    brand: string;
    model: string;
    type: CarType;
    plateNumber: string;
    color: string;
}

// ─── Address ─────────────────────────────────────────────────────────────────
export interface Address {
    id: string;
    userId: string;
    label: string; // Home, Office, Other
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
    latitude: number;
    longitude: number;
    isDefault: boolean;
}

// ─── Service ─────────────────────────────────────────────────────────────────
export type ServiceCategory =
    | 'exterior_wash'
    | 'interior_cleaning'
    | 'full_detailing'
    | 'ceramic_coating'
    | 'engine_cleaning';

export interface ServiceAddon {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: number; // minutes
}

export interface Service {
    id: string;
    name: string;
    category: ServiceCategory;
    description: string;
    price: number;
    duration: number;
    rating: number;
    reviewCount: number;
    imageUrl: string;
    addons: ServiceAddon[];
    availableCarTypes: CarType[];
    isFeatured: boolean;
    isActive: boolean;
}

// ─── Partner ─────────────────────────────────────────────────────────────────
export interface Partner {
    id: string;
    name: string;
    avatar?: string;
    rating: number;
    totalJobs: number;
    phone: string;
    latitude?: number;
    longitude?: number;
    estimatedArrival?: number; // minutes
}

// ─── Booking ─────────────────────────────────────────────────────────────────
export type BookingStatus =
    | 'pending'
    | 'confirmed'
    | 'partner_assigned'
    | 'partner_en_route'
    | 'in_progress'
    | 'completed'
    | 'cancelled';

export type PaymentMethod = 'upi' | 'card' | 'wallet' | 'cash';

export interface BookingAddon {
    addonId: string;
    name: string;
    price: number;
}

export interface Booking {
    id: string;
    userId: string;
    serviceId: string;
    service: Service;
    car: Car;
    address: Address;
    partner?: Partner;
    addons: BookingAddon[];
    status: BookingStatus;
    scheduledAt: string;
    completedAt?: string;
    totalAmount: number;
    paymentMethod: PaymentMethod;
    paymentStatus: 'pending' | 'paid' | 'refunded';
    invoiceUrl?: string;
    createdAt: string;
}

// ─── Notifications ────────────────────────────────────────────────────────────
export type NotificationType = 'booking' | 'offer' | 'promotion' | 'system';

export interface AppNotification {
    id: string;
    userId: string;
    type: NotificationType;
    title: string;
    body: string;
    isRead: boolean;
    data?: Record<string, string>;
    createdAt: string;
}

// ─── Review ───────────────────────────────────────────────────────────────────
export interface Review {
    id: string;
    bookingId: string;
    userId: string;
    partnerId: string;
    rating: number;
    comment?: string;
    createdAt: string;
}

// ─── Payment ─────────────────────────────────────────────────────────────────
export interface PaymentTransaction {
    id: string;
    bookingId: string;
    amount: number;
    method: PaymentMethod;
    status: 'pending' | 'success' | 'failed' | 'refunded';
    transactionRef?: string;
    createdAt: string;
}

// ─── API Response ─────────────────────────────────────────────────────────────
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    error?: string;
}

export interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    total: number;
    page: number;
    limit: number;
}
