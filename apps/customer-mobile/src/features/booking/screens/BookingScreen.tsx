import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, SafeAreaView, ScrollView,
    TouchableOpacity, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button } from '@components/Button';
import { useAppDispatch, useAppSelector } from '@hooks/useAppDispatch';
import { useTheme } from '@hooks/useTheme';
import {
    setCartCar, setCartAddress, toggleCartAddon, setScheduledAt,
    setPaymentMethod,
} from '@store/slices/bookingSlice';
import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SHADOW, SPACING } from '@utils/theme';
import type { HomeStackParamList } from '@navigation/HomeStackNavigator';
import type { CarType } from '@appTypes/index';

const STEPS = ['Car', 'Add-ons', 'Schedule', 'Address', 'Payment'];

const CAR_TYPES: { type: CarType; icon: string; label: string }[] = [
    { type: 'hatchback', icon: '🚗', label: 'Hatchback' },
    { type: 'sedan', icon: '🚙', label: 'Sedan' },
    { type: 'suv', icon: '🚐', label: 'SUV' },
    { type: 'muv', icon: '🚌', label: 'MUV' },
    { type: 'luxury', icon: '🏎️', label: 'Luxury' },
];

const PAYMENT_OPTS = [
    { id: 'upi', icon: '📱', label: 'UPI' },
    { id: 'card', icon: '💳', label: 'Card' },
    { id: 'wallet', icon: '👛', label: 'Wallet' },
    { id: 'cash', icon: '💵', label: 'Cash' },
];

const MOCK_ADDONS = [
    { id: 'a1', name: 'Wax Coat', description: 'Extra shine & paint protection', price: 200, duration: 15 },
    { id: 'a2', name: 'Tyre Polish', description: 'Brand new tyre look', price: 100, duration: 10 },
    { id: 'a3', name: 'AC Cleaning', description: 'Freshen up your AC vents', price: 150, duration: 20 },
];

export default function BookingScreen() {
    const nav = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
    const dispatch = useAppDispatch();
    const { theme } = useTheme();
    const cart = useAppSelector((s) => s.booking.cart);
    const { addresses, cars } = useAppSelector((s) => s.profile);

    const [step, setStep] = useState(0);
    const [selectedCar, setSelectedCar] = useState<CarType | null>(null);
    const [selectedPayment, setSelectedPayment] = useState('cash');

    const goNext = () => {
        if (step === 0 && !selectedCar) { Alert.alert('Select a car type'); return; }
        if (step < STEPS.length - 1) setStep((s) => s + 1);
        else handleConfirm();
    };

    const handleConfirm = () => {
        if (!cart.scheduledAt) { Alert.alert('Please select a date & time'); return; }
        dispatch(setPaymentMethod(selectedPayment));
        nav.navigate('BookingConfirm');
    };

    const renderStep = () => {
        switch (step) {
            case 0: return (
                <View style={styles.stepContent}>
                    <Text style={[styles.stepLabel, { color: theme.onBackground }]}>Choose your car type</Text>
                    <View style={styles.carGrid}>
                        {CAR_TYPES.map((c) => (
                            <TouchableOpacity
                                key={c.type}
                                onPress={() => { setSelectedCar(c.type); dispatch(setCartCar(c.type)); }}
                                style={[
                                    styles.carCard,
                                    { backgroundColor: theme.surface, borderColor: selectedCar === c.type ? COLORS.primary : theme.border },
                                    SHADOW.sm,
                                ]}
                                activeOpacity={0.7}
                            >
                                <Text style={{ fontSize: 36 }}>{c.icon}</Text>
                                <Text style={[styles.carLabel, { color: selectedCar === c.type ? COLORS.primary : theme.onBackground }]}>
                                    {c.label}
                                </Text>
                                {selectedCar === c.type && <Ionicons name="checkmark-circle" size={18} color={COLORS.primary} style={styles.check} />}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            );
            case 1: return (
                <View style={styles.stepContent}>
                    <Text style={[styles.stepLabel, { color: theme.onBackground }]}>Select add-ons</Text>
                    {MOCK_ADDONS.map((addon) => {
                        const selected = cart.selectedAddonIds.includes(addon.id);
                        return (
                            <TouchableOpacity
                                key={addon.id}
                                onPress={() => dispatch(toggleCartAddon(addon.id))}
                                style={[
                                    styles.addonRow,
                                    { backgroundColor: theme.surface, borderColor: selected ? COLORS.primary : theme.border },
                                ]}
                                activeOpacity={0.7}
                            >
                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.addonName, { color: theme.onBackground }]}>{addon.name}</Text>
                                    <Text style={[styles.addonDesc, { color: theme.onSurfaceVariant }]}>{addon.description}</Text>
                                </View>
                                <Text style={[styles.addonPrice, { color: COLORS.primary }]}>+₹{addon.price}</Text>
                                {selected && <Ionicons name="checkmark-circle" size={22} color={COLORS.primary} style={{ marginLeft: 8 }} />}
                            </TouchableOpacity>
                        );
                    })}
                </View>
            );
            case 2: return (
                <View style={styles.stepContent}>
                    <Text style={[styles.stepLabel, { color: theme.onBackground }]}>Choose date & time</Text>
                    {['Today, 10:00 AM', 'Today, 2:00 PM', 'Tomorrow, 9:00 AM', 'Tomorrow, 3:00 PM'].map((slot) => {
                        const selected = cart.scheduledAt === slot;
                        return (
                            <TouchableOpacity
                                key={slot}
                                onPress={() => dispatch(setScheduledAt(slot))}
                                style={[
                                    styles.slotRow,
                                    { backgroundColor: theme.surface, borderColor: selected ? COLORS.primary : theme.border },
                                ]}
                                activeOpacity={0.7}
                            >
                                <Ionicons name="time-outline" size={18} color={selected ? COLORS.primary : theme.onSurfaceVariant} />
                                <Text style={[styles.slotText, { color: selected ? COLORS.primary : theme.onBackground }]}>{slot}</Text>
                                {selected && <Ionicons name="checkmark-circle" size={18} color={COLORS.primary} style={{ marginLeft: 'auto' }} />}
                            </TouchableOpacity>
                        );
                    })}
                </View>
            );
            case 3: return (
                <View style={styles.stepContent}>
                    <Text style={[styles.stepLabel, { color: theme.onBackground }]}>Select address</Text>
                    {(addresses.length ? addresses : MOCK_ADDRESSES).map((addr) => {
                        const selected = cart.addressId === addr.id;
                        return (
                            <TouchableOpacity
                                key={addr.id}
                                onPress={() => dispatch(setCartAddress(addr.id))}
                                style={[
                                    styles.addrRow,
                                    { backgroundColor: theme.surface, borderColor: selected ? COLORS.primary : theme.border },
                                ]}
                                activeOpacity={0.7}
                            >
                                <Ionicons name="location-outline" size={20} color={selected ? COLORS.primary : theme.onSurfaceVariant} />
                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.addrLabel, { color: theme.onBackground }]}>{addr.label}</Text>
                                    <Text style={[styles.addrText, { color: theme.onSurfaceVariant }]}>{addr.line1}, {addr.city}</Text>
                                </View>
                                {selected && <Ionicons name="checkmark-circle" size={18} color={COLORS.primary} />}
                            </TouchableOpacity>
                        );
                    })}
                </View>
            );
            case 4: return (
                <View style={styles.stepContent}>
                    <Text style={[styles.stepLabel, { color: theme.onBackground }]}>Payment method</Text>
                    <View style={styles.payGrid}>
                        {PAYMENT_OPTS.map((p) => (
                            <TouchableOpacity
                                key={p.id}
                                onPress={() => setSelectedPayment(p.id)}
                                style={[
                                    styles.payCard,
                                    { backgroundColor: theme.surface, borderColor: selectedPayment === p.id ? COLORS.primary : theme.border },
                                    SHADOW.sm,
                                ]}
                                activeOpacity={0.7}
                            >
                                <Text style={{ fontSize: 32 }}>{p.icon}</Text>
                                <Text style={[styles.payLabel, { color: selectedPayment === p.id ? COLORS.primary : theme.onBackground }]}>
                                    {p.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            );
            default: return null;
        }
    };

    return (
        <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => step > 0 ? setStep(s => s - 1) : nav.goBack()} style={styles.back}>
                    <Ionicons name="arrow-back" size={22} color={theme.onBackground} />
                </TouchableOpacity>
                <Text style={[styles.title, { color: theme.onBackground }]}>Book Service</Text>
                <Text style={[styles.stepCounter, { color: theme.onSurfaceVariant }]}>{step + 1}/{STEPS.length}</Text>
            </View>

            {/* Step Indicator */}
            <View style={styles.dots}>
                {STEPS.map((_, i) => (
                    <View
                        key={i}
                        style={[
                            styles.dot,
                            { backgroundColor: i <= step ? COLORS.primary : theme.border },
                            i === step && { width: 24 },
                        ]}
                    />
                ))}
            </View>
            <Text style={[styles.stepName, { color: theme.onSurfaceVariant }]}>{STEPS[step]}</Text>

            <ScrollView showsVerticalScrollIndicator={false}>
                {renderStep()}
            </ScrollView>

            <View style={[styles.footer, { backgroundColor: theme.surface, borderTopColor: theme.border }]}>
                <Button
                    label={step < STEPS.length - 1 ? `Next: ${STEPS[step + 1]}` : 'Review Booking'}
                    onPress={goNext}
                    fullWidth size="lg"
                    rightIcon={<Ionicons name="arrow-forward" size={18} color={COLORS.white} />}
                />
            </View>
        </SafeAreaView>
    );
}

const MOCK_ADDRESSES = [
    { id: 'a1', label: '🏠 Home', line1: '42 MG Road', city: 'Bangalore', userId: '', line2: '', state: '', pincode: '', latitude: 0, longitude: 0, isDefault: true },
    { id: 'a2', label: '🏢 Office', line1: 'Prestige Tech Park', city: 'Bangalore', userId: '', line2: '', state: '', pincode: '', latitude: 0, longitude: 0, isDefault: false },
];

const styles = StyleSheet.create({
    safe: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING.base, paddingTop: SPACING.base, gap: 12 },
    back: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
    title: { flex: 1, fontSize: FONT_SIZE.lg, fontWeight: FONT_WEIGHT.bold },
    stepCounter: { fontSize: FONT_SIZE.sm },
    dots: { flexDirection: 'row', gap: 6, paddingHorizontal: SPACING.base, paddingTop: SPACING.base },
    dot: { height: 6, width: 6, borderRadius: 3 },
    stepName: { fontSize: FONT_SIZE.xs, fontWeight: FONT_WEIGHT.semibold, paddingHorizontal: SPACING.base, marginTop: 4, marginBottom: SPACING.sm, letterSpacing: 0.5, textTransform: 'uppercase' },
    stepContent: { paddingHorizontal: SPACING.base, paddingBottom: 100 },
    stepLabel: { fontSize: FONT_SIZE.xl, fontWeight: FONT_WEIGHT.bold, marginBottom: SPACING.base },
    carGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
    carCard: {
        width: '47%', paddingVertical: SPACING.base, borderRadius: RADIUS.xl,
        alignItems: 'center', gap: 6, borderWidth: 1.5, position: 'relative',
    },
    carLabel: { fontSize: FONT_SIZE.sm, fontWeight: FONT_WEIGHT.semibold },
    check: { position: 'absolute', top: 8, right: 8 },
    addonRow: {
        flexDirection: 'row', alignItems: 'center', gap: 12,
        borderRadius: RADIUS.xl, padding: SPACING.base, marginBottom: 10, borderWidth: 1.5,
    },
    addonName: { fontSize: FONT_SIZE.sm, fontWeight: FONT_WEIGHT.semibold },
    addonDesc: { fontSize: FONT_SIZE.xs, marginTop: 2 },
    addonPrice: { fontSize: FONT_SIZE.base, fontWeight: FONT_WEIGHT.bold },
    slotRow: {
        flexDirection: 'row', alignItems: 'center', gap: 10,
        borderRadius: RADIUS.xl, padding: SPACING.base, marginBottom: 10, borderWidth: 1.5,
    },
    slotText: { fontSize: FONT_SIZE.base, fontWeight: FONT_WEIGHT.medium },
    addrRow: {
        flexDirection: 'row', alignItems: 'center', gap: 10,
        borderRadius: RADIUS.xl, padding: SPACING.base, marginBottom: 10, borderWidth: 1.5,
    },
    addrLabel: { fontSize: FONT_SIZE.sm, fontWeight: FONT_WEIGHT.semibold },
    addrText: { fontSize: FONT_SIZE.xs, marginTop: 2 },
    payGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
    payCard: {
        width: '47%', paddingVertical: SPACING.lg, borderRadius: RADIUS.xl,
        alignItems: 'center', gap: 6, borderWidth: 1.5,
    },
    payLabel: { fontSize: FONT_SIZE.sm, fontWeight: FONT_WEIGHT.semibold },
    footer: {
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: SPACING.base, paddingBottom: 28, borderTopWidth: 1,
    },
});
