import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppSelector } from '@hooks/useAppDispatch';
import { AuthNavigator } from './AuthNavigator';
import { MainTabNavigator } from './MainTabNavigator';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
    const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);

    return (
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
            {isAuthenticated ? (
                <Stack.Screen name="Main" component={MainTabNavigator} />
            ) : (
                <Stack.Screen name="Auth" component={AuthNavigator} />
            )}
        </Stack.Navigator>
    );
};
