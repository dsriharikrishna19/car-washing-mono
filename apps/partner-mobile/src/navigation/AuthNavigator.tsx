import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@features/auth/screens/LoginScreen';
import OTPScreen from '@features/auth/screens/OTPScreen';
import OnboardingScreen from '@features/auth/screens/OnboardingScreen';

export type AuthStackParamList = {
    Login: undefined;
    OTP: { phone: string };
    Onboarding: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    </Stack.Navigator>
);
