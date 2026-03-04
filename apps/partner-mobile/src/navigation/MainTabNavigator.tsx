import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DashboardScreen from '@features/jobs/screens/DashboardScreen';
import MyJobsScreen from '@features/jobs/screens/MyJobsScreen';
import EarningsScreen from '@features/earnings/screens/EarningsScreen';
import ProfileScreen from '@features/profile/screens/ProfileScreen';
import { useTheme } from '@hooks/useTheme';
import { COLORS, RADIUS } from '@utils/theme';

export type MainTabParamList = {
    Dashboard: undefined;
    Jobs: undefined;
    Earnings: undefined;
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
                tabBarIcon: ({ color, size, focused }) => {
                    let iconName: React.ComponentProps<typeof Ionicons>['name'];

                    if (route.name === 'Dashboard') {
                        iconName = focused ? 'speedometer' : 'speedometer-outline';
                    } else if (route.name === 'Jobs') {
                        iconName = focused ? 'briefcase' : 'briefcase-outline';
                    } else if (route.name === 'Earnings') {
                        iconName = focused ? 'wallet' : 'wallet-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    } else {
                        iconName = 'help-circle';
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
            <Tab.Screen name="Dashboard" component={DashboardScreen} />
            <Tab.Screen name="Jobs" component={MyJobsScreen} />
            <Tab.Screen name="Earnings" component={EarningsScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};
