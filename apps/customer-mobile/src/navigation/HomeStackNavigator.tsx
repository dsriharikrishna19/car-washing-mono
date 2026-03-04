import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import HomeScreen from '@features/home/screens/HomeScreen';
import SearchScreen from '@features/home/screens/SearchScreen';
import ServiceDetailScreen from '@features/services/screens/ServiceDetailScreen';
import BookingScreen from '@features/booking/screens/BookingScreen';
import BookingConfirmScreen from '@features/booking/screens/BookingConfirmScreen';
import BookingTrackingScreen from '@features/booking/screens/BookingTrackingScreen';
import PaymentScreen from '@features/payments/screens/PaymentScreen';
import RateReviewScreen from '@features/reviews/screens/RateReviewScreen';

export type HomeStackParamList = {
    HomeMain: undefined;
    Search: undefined;
    ServiceDetail: { serviceId: string };
    Booking: { serviceId: string };
    BookingConfirm: undefined;
    BookingTracking: { bookingId: string };
    Payment: { bookingId: string };
    RateReview: { bookingId: string };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStackNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeMain" component={HomeScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
        <Stack.Screen name="Booking" component={BookingScreen} />
        <Stack.Screen name="BookingConfirm" component={BookingConfirmScreen} />
        <Stack.Screen name="BookingTracking" component={BookingTrackingScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="RateReview" component={RateReviewScreen} />
    </Stack.Navigator>
);
