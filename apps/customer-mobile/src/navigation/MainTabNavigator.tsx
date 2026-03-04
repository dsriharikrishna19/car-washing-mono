import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HomeStackNavigator } from './HomeStackNavigator';
import BookingHistoryScreen from '@features/booking/screens/BookingHistoryScreen';
import ProfileScreen from '@features/profile/screens/ProfileScreen';
import NotificationsScreen from '@features/notifications/screens/NotificationsScreen';
import { useTheme } from '@hooks/useTheme';
import { COLORS, RADIUS } from '@utils/theme';

export type MainTabParamList = {
    Home: undefined;
    Bookings: undefined;
    Notifications: undefined;
    Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator = () => {
    const { theme, isDark } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: true,
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: theme.onSurfaceVariant,
                tabBarStyle: {
                    backgroundColor: theme.surface,
                    borderTopColor: theme.border,
                    borderTopWidth: 1,
                    height: Platform.OS === 'ios' ? 92 : 72,
                    paddingBottom: Platform.OS === 'ios' ? 32 : 12,
                    paddingTop: 12,
                    elevation: 10,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -4 },
                    shadowOpacity: 0.08,
                    shadowRadius: 12,
                },
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '600',
                    marginTop: -2,
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: React.ComponentProps<typeof Ionicons>['name'];
                    switch (route.name) {
                        case 'Home':
                            iconName = focused ? 'home' : 'home-outline';
                            break;
                        case 'Bookings':
                            iconName = focused ? 'calendar' : 'calendar-outline';
                            break;
                        case 'Notifications':
                            iconName = focused ? 'notifications' : 'notifications-outline';
                            break;
                        case 'Profile':
                            iconName = focused ? 'person' : 'person-outline';
                            break;
                        default:
                            iconName = 'home-outline';
                    }
                    return (
                        <View
                            style={[
                                {
                                    width: 48,
                                    height: 32,
                                    borderRadius: RADIUS.lg,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                },
                                focused && { backgroundColor: `${COLORS.primary}15` },
                            ]}
                        >
                            <Ionicons name={iconName} size={24} color={color} />
                        </View>
                    );
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeStackNavigator} />
            <Tab.Screen name="Bookings" component={BookingHistoryScreen} />
            <Tab.Screen name="Notifications" component={NotificationsScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};
