import React, { useEffect } from 'react';
import {
    View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { bookingStatusBadge } from '@components/Badge';
import { BookingCardSkeleton } from '@components/Skeleton';
import { useAppDispatch, useAppSelector } from '@hooks/useAppDispatch';
import { useTheme } from '@hooks/useTheme';
import { fetchBookingsThunk } from '@store/slices/bookingSlice';
import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SHADOW, SPACING } from '@utils/theme';
import type { Booking } from '@appTypes/index';
import type { HomeStackParamList } from '@navigation/HomeStackNavigator';

const MOCK_BOOKINGS: Booking[] = [
    {
        id: 'b1', userId: 'u1', serviceId: 's1',
        service: { id: 's1', name: 'Premium Exterior Wash', category: 'exterior_wash', description: '', price: 499, duration: 45, rating: 4.8, reviewCount: 200, imageUrl: '', addons: [], availableCarTypes: [], isFeatured: false, isActive: true },
        car: { id: 'c1', userId: 'u1', name: 'My Swift', brand: 'Maruti', model: 'Swift', type: 'hatchback', plateNumber: 'KA01AA1234', color: 'White' },
        address: { id: 'a1', userId: 'u1', label: 'Home', line1: '42 MG Road', city: 'Bangalore', state: 'Karnataka', pincode: '560001', latitude: 0, longitude: 0, isDefault: true },
        addons: [], status: 'completed', scheduledAt: '2026-03-01T10:00:00Z',
        totalAmount: 699, paymentMethod: 'upi', paymentStatus: 'paid', createdAt: '2026-03-01T09:00:00Z',
    },
    {
        id: 'b2', userId: 'u1', serviceId: 's2',
        service: { id: 's2', name: 'Interior Deep Clean', category: 'interior_cleaning', description: '', price: 799, duration: 90, rating: 4.6, reviewCount: 180, imageUrl: '', addons: [], availableCarTypes: [], isFeatured: false, isActive: true },
        car: { id: 'c1', userId: 'u1', name: 'My Swift', brand: 'Maruti', model: 'Swift', type: 'hatchback', plateNumber: 'KA01AA1234', color: 'White' },
        address: { id: 'a1', userId: 'u1', label: 'Home', line1: '42 MG Road', city: 'Bangalore', state: 'Karnataka', pincode: '560001', latitude: 0, longitude: 0, isDefault: true },
        addons: [], status: 'confirmed', scheduledAt: '2026-03-06T14:00:00Z',
        totalAmount: 799, paymentMethod: 'cash', paymentStatus: 'pending', createdAt: '2026-03-04T10:00:00Z',
    },
];

export default function BookingHistoryScreen() {
    const nav = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
    const dispatch = useAppDispatch();
    const { theme } = useTheme();
    const { history, isLoading } = useAppSelector((s) => s.booking);

    useEffect(() => { dispatch(fetchBookingsThunk()); }, [dispatch]);

    const data = history.length ? history : MOCK_BOOKINGS;

    const renderItem = ({ item }: { item: Booking }) => (
        <TouchableOpacity
            activeOpacity={0.85}
            style={[styles.card, { backgroundColor: theme.surface }, SHADOW.sm]}
            onPress={() => {
                if (item.status === 'in_progress' || item.status === 'partner_assigned' || item.status === 'partner_en_route') {
                    nav.navigate('BookingTracking', { bookingId: item.id });
                }
            }}
        >
            <LinearGradient colors={[COLORS.primary900, COLORS.primary600]} style={styles.icon}>
                <Text style={{ fontSize: 24 }}>🚗</Text>
            </LinearGradient>
            <View style={{ flex: 1 }}>
                <Text style={[styles.name, { color: theme.onBackground }]}>{item.service.name}</Text>
                <Text style={[styles.date, { color: theme.onSurfaceVariant }]}>
                    {new Date(item.scheduledAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </Text>
                <Text style={[styles.amount, { color: COLORS.primary }]}>₹{item.totalAmount}</Text>
            </View>
            <View style={{ alignItems: 'flex-end', gap: 8 }}>
                {bookingStatusBadge(item.status)}
                {item.status === 'completed' && (
                    <TouchableOpacity style={[styles.rebookBtn, { borderColor: COLORS.primary }]}
                        onPress={() => nav.navigate('ServiceDetail', { serviceId: item.serviceId })}>
                        <Text style={{ fontSize: FONT_SIZE.xs, color: COLORS.primary, fontWeight: FONT_WEIGHT.semibold }}>Rebook</Text>
                    </TouchableOpacity>
                )}
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: theme.onBackground }]}>My Bookings</Text>
            </View>
            {isLoading ? (
                <View style={{ padding: SPACING.base, gap: 12 }}>
                    {[1, 2, 3].map((k) => <BookingCardSkeleton key={k} />)}
                </View>
            ) : (
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.empty}>
                            <Text style={{ fontSize: 48 }}>📋</Text>
                            <Text style={[styles.emptyText, { color: theme.onSurfaceVariant }]}>No bookings yet</Text>
                        </View>
                    }
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1 },
    header: { paddingHorizontal: SPACING.base, paddingTop: SPACING.base, paddingBottom: SPACING.sm },
    title: { fontSize: FONT_SIZE.xl, fontWeight: FONT_WEIGHT.bold },
    list: { padding: SPACING.base, gap: 12 },
    card: { flexDirection: 'row', alignItems: 'center', gap: 12, borderRadius: RADIUS.xl, padding: SPACING.base },
    icon: { width: 56, height: 56, borderRadius: RADIUS.xl, alignItems: 'center', justifyContent: 'center' },
    name: { fontSize: FONT_SIZE.sm, fontWeight: FONT_WEIGHT.bold, marginBottom: 2 },
    date: { fontSize: FONT_SIZE.xs, marginBottom: 2 },
    amount: { fontSize: FONT_SIZE.sm, fontWeight: FONT_WEIGHT.bold },
    rebookBtn: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: RADIUS.full, borderWidth: 1 },
    empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, paddingTop: 100 },
    emptyText: { fontSize: FONT_SIZE.base },
});
