import React from 'react';
import {
    View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@components/Button';
import { useAppDispatch, useAppSelector } from '@hooks/useAppDispatch';
import { useTheme } from '@hooks/useTheme';
import { setPaymentMethod } from '@store/slices/bookingSlice';
import { initiatePaymentThunk } from '@store/slices/paymentsSlice';
import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SHADOW, SPACING } from '@utils/theme';

const PAYMENT_METHODS = [
    { id: 'upi', label: 'UPI', icon: '📱', sub: 'Google Pay, PhonePe, Paytm' },
    { id: 'card', label: 'Credit / Debit Card', icon: '💳', sub: 'Visa, Mastercard, RuPay' },
    { id: 'wallet', label: 'Sparkle Wallet', icon: '👛', sub: 'Balance: ₹250' },
    { id: 'cash', label: 'Cash on Service', icon: '💵', sub: 'Pay directly to the partner' },
];

export default function PaymentScreen() {
    const nav = useNavigation<any>();
    const dispatch = useAppDispatch();
    const { theme } = useTheme();
    const cart = useAppSelector((s) => s.booking.cart);
    const { isProcessing } = useAppSelector((s) => s.payments);
    const [selected, setSelected] = React.useState(cart.paymentMethod ?? 'cash');

    const handlePay = async () => {
        dispatch(setPaymentMethod(selected));
        const result = await dispatch(initiatePaymentThunk({ bookingId: 'demo-booking', method: selected }));
        if (initiatePaymentThunk.fulfilled.match(result)) {
            Alert.alert('Payment Successful 🎉', 'Your booking is confirmed!', [
                { text: 'Track Booking', onPress: () => nav.navigate('BookingTracking', { bookingId: 'demo' }) },
            ]);
        } else {
            Alert.alert('Payment Initiated', 'Redirecting to payment gateway...');
        }
    };

    return (
        <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => nav.goBack()} style={styles.back}>
                    <Ionicons name="arrow-back" size={22} color={theme.onBackground} />
                </TouchableOpacity>
                <Text style={[styles.title, { color: theme.onBackground }]}>Secure Payment</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Amount */}
                <View style={[styles.amountCard, { backgroundColor: COLORS.primary }]}>
                    <Text style={styles.amountLabel}>Total Amount</Text>
                    <Text style={styles.amount}>₹799</Text>
                    <Text style={styles.amountSub}>Premium Exterior Wash</Text>
                </View>

                <Text style={[styles.sectionTitle, { color: theme.onBackground }]}>Select Payment Method</Text>

                {PAYMENT_METHODS.map((method) => (
                    <TouchableOpacity
                        key={method.id}
                        onPress={() => setSelected(method.id)}
                        style={[
                            styles.methodCard,
                            { backgroundColor: theme.surface, borderColor: selected === method.id ? COLORS.primary : theme.border },
                            SHADOW.sm,
                        ]}
                        activeOpacity={0.75}
                    >
                        <Text style={{ fontSize: 32 }}>{method.icon}</Text>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.methodLabel, { color: theme.onBackground }]}>{method.label}</Text>
                            <Text style={[styles.methodSub, { color: theme.onSurfaceVariant }]}>{method.sub}</Text>
                        </View>
                        <View style={[
                            styles.radio,
                            { borderColor: selected === method.id ? COLORS.primary : theme.border },
                        ]}>
                            {selected === method.id && <View style={styles.radioInner} />}
                        </View>
                    </TouchableOpacity>
                ))}

                <View style={styles.securityRow}>
                    <Ionicons name="lock-closed" size={14} color={COLORS.success} />
                    <Text style={[styles.securityText, { color: theme.onSurfaceVariant }]}>
                        256-bit SSL encrypted · PCI DSS compliant
                    </Text>
                </View>

                <Button label={`Pay ₹799 Securely`} onPress={handlePay} isLoading={isProcessing} fullWidth size="lg" />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING.base, paddingTop: SPACING.base, gap: 12 },
    back: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
    title: { flex: 1, fontSize: FONT_SIZE.lg, fontWeight: FONT_WEIGHT.bold },
    content: { padding: SPACING.base, gap: 16, paddingBottom: 40 },
    amountCard: { borderRadius: RADIUS['2xl'], padding: SPACING.xl, alignItems: 'center', gap: 4 },
    amountLabel: { fontSize: FONT_SIZE.sm, color: 'rgba(255,255,255,0.7)' },
    amount: { fontSize: FONT_SIZE['4xl'], fontWeight: FONT_WEIGHT.extrabold, color: COLORS.white },
    amountSub: { fontSize: FONT_SIZE.xs, color: 'rgba(255,255,255,0.7)' },
    sectionTitle: { fontSize: FONT_SIZE.base, fontWeight: FONT_WEIGHT.bold },
    methodCard: { flexDirection: 'row', alignItems: 'center', gap: 12, borderRadius: RADIUS.xl, padding: SPACING.base, borderWidth: 1.5 },
    methodLabel: { fontSize: FONT_SIZE.sm, fontWeight: FONT_WEIGHT.semibold },
    methodSub: { fontSize: FONT_SIZE.xs, marginTop: 2 },
    radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
    radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.primary },
    securityRow: { flexDirection: 'row', alignItems: 'center', gap: 6, justifyContent: 'center' },
    securityText: { fontSize: FONT_SIZE.xs },
});
