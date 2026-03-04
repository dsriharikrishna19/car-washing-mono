import React from 'react';
import {
    View, Text, StyleSheet, SafeAreaView, ScrollView,
    TouchableOpacity, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button } from '@components/Button';
import { useAppDispatch, useAppSelector } from '@hooks/useAppDispatch';
import { useTheme } from '@hooks/useTheme';
import { createBookingThunk } from '@store/slices/bookingSlice';
import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SHADOW, SPACING } from '@utils/theme';
import type { HomeStackParamList } from '@navigation/HomeStackNavigator';

export default function BookingConfirmScreen() {
    const nav = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
    const dispatch = useAppDispatch();
    const { theme, isDark } = useTheme();
    const cart = useAppSelector((s) => s.booking.cart);
    const { isCreating } = useAppSelector((s) => s.booking);

    const ADDONS_PRICE = 300; // mock
    const SERVICE_PRICE = 499; // mock
    const TOTAL = SERVICE_PRICE + ADDONS_PRICE;

    const handleConfirm = async () => {
        const result = await dispatch(createBookingThunk({
            serviceId: cart.serviceId ?? '',
            carId: cart.carId ?? '',
            addressId: cart.addressId ?? '',
            addonIds: cart.selectedAddonIds,
            scheduledAt: cart.scheduledAt ?? new Date().toISOString(),
            paymentMethod: cart.paymentMethod,
        }));
        if (createBookingThunk.fulfilled.match(result)) {
            nav.navigate('BookingTracking', { bookingId: result.payload.id });
        } else {
            // For demo (no backend) navigate to tracking with mock
            nav.navigate('BookingTracking', { bookingId: 'demo-booking-1' });
        }
    };

    const rows = [
        { label: 'Service', value: 'Premium Exterior Wash' },
        { label: 'Car Type', value: cart.carId ?? 'Sedan' },
        { label: 'Schedule', value: cart.scheduledAt ?? 'Today, 10:00 AM' },
        { label: 'Address', value: cart.addressId ? 'Home' : 'Home' },
        { label: 'Payment', value: cart.paymentMethod.toUpperCase() },
        { label: 'Add-ons', value: cart.selectedAddonIds.length ? `${cart.selectedAddonIds.length} selected` : 'None' },
    ];

    return (
        <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => nav.goBack()} style={styles.back}>
                    <Ionicons name="arrow-back" size={22} color={theme.onBackground} />
                </TouchableOpacity>
                <Text style={[styles.title, { color: theme.onBackground }]}>Review Booking</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <LinearGradient
                    colors={isDark ? [COLORS.carbon900, COLORS.carbon800] : [COLORS.primary50, COLORS.carbon50]}
                    style={[styles.summaryCard, SHADOW.md]}
                >
                    <Text style={[styles.sectionTitle, { color: theme.onBackground }]}>Booking Summary</Text>
                    {rows.map(({ label, value }) => (
                        <View key={label} style={styles.row}>
                            <Text style={[styles.rowLabel, { color: theme.onSurfaceVariant }]}>{label}</Text>
                            <Text style={[styles.rowValue, { color: theme.onBackground }]}>{value}</Text>
                        </View>
                    ))}

                    <View style={[styles.divider, { backgroundColor: theme.border }]} />

                    <View style={styles.row}>
                        <Text style={[styles.rowLabel, { color: theme.onSurfaceVariant }]}>Service</Text>
                        <Text style={[styles.rowValue, { color: theme.onBackground }]}>₹{SERVICE_PRICE}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={[styles.rowLabel, { color: theme.onSurfaceVariant }]}>Add-ons</Text>
                        <Text style={[styles.rowValue, { color: theme.onBackground }]}>₹{ADDONS_PRICE}</Text>
                    </View>
                    <View style={[styles.row, styles.totalRow]}>
                        <Text style={[styles.totalLabel, { color: theme.onBackground }]}>Total</Text>
                        <Text style={[styles.totalPrice, { color: COLORS.primary }]}>₹{TOTAL}</Text>
                    </View>
                </LinearGradient>

                <View style={[styles.trustRow, { backgroundColor: theme.surface }, SHADOW.sm]}>
                    <Ionicons name="shield-checkmark" size={20} color={COLORS.success} />
                    <Text style={[styles.trustText, { color: theme.onSurfaceVariant }]}>
                        Safe & insured service by Sparkle Pro Partner
                    </Text>
                </View>
            </ScrollView>

            <View style={[styles.footer, { backgroundColor: theme.surface, borderTopColor: theme.border }]}>
                <Button label={`Confirm & Pay ₹${TOTAL}`} onPress={handleConfirm} isLoading={isCreating} fullWidth size="lg" />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING.base, paddingTop: SPACING.base, gap: 12 },
    back: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
    title: { flex: 1, fontSize: FONT_SIZE.lg, fontWeight: FONT_WEIGHT.bold },
    content: { padding: SPACING.base, gap: 12, paddingBottom: 120 },
    summaryCard: { borderRadius: RADIUS['2xl'], padding: SPACING.base },
    sectionTitle: { fontSize: FONT_SIZE.base, fontWeight: FONT_WEIGHT.bold, marginBottom: SPACING.base },
    row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
    rowLabel: { fontSize: FONT_SIZE.sm },
    rowValue: { fontSize: FONT_SIZE.sm, fontWeight: FONT_WEIGHT.semibold, maxWidth: '60%', textAlign: 'right' },
    divider: { height: 1, marginVertical: SPACING.sm },
    totalRow: { paddingTop: SPACING.sm },
    totalLabel: { fontSize: FONT_SIZE.base, fontWeight: FONT_WEIGHT.bold },
    totalPrice: { fontSize: FONT_SIZE.xl, fontWeight: FONT_WEIGHT.extrabold },
    trustRow: { flexDirection: 'row', alignItems: 'center', gap: 8, borderRadius: RADIUS.xl, padding: SPACING.md },
    trustText: { fontSize: FONT_SIZE.xs, flex: 1 },
    footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: SPACING.base, paddingBottom: 28, borderTopWidth: 1 },
});
