import React, { useEffect, useRef } from 'react';
import {
    View, Text, StyleSheet, SafeAreaView, ScrollView,
    TouchableOpacity, Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '@hooks/useTheme';
import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SHADOW, SPACING } from '@utils/theme';
import type { HomeStackParamList } from '@navigation/HomeStackNavigator';
import type { BookingStatus } from '@appTypes/index';

const TRACKING_STEPS: { status: BookingStatus; label: string; icon: string; desc: string }[] = [
    { status: 'confirmed', label: 'Confirmed', icon: 'checkmark-circle', desc: 'Your booking is confirmed' },
    { status: 'partner_assigned', label: 'Partner Assigned', icon: 'person', desc: 'Deepak S. is your partner' },
    { status: 'partner_en_route', label: 'En Route', icon: 'car', desc: 'Partner is heading to you' },
    { status: 'in_progress', label: 'In Progress', icon: 'water', desc: 'Wash in progress…' },
    { status: 'completed', label: 'Completed', icon: 'star', desc: 'Your car is sparkling!' },
];

export default function BookingTrackingScreen() {
    const nav = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
    const { theme, isDark } = useTheme();

    // Mock: simulate status progression for demo
    const [currentStep, setCurrentStep] = React.useState(1);
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, { toValue: 1.2, duration: 800, useNativeDriver: true }),
                Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
            ])
        ).start();
    }, [pulseAnim]);

    // Advance step every 3 seconds for demo
    useEffect(() => {
        if (currentStep >= TRACKING_STEPS.length - 1) return;
        const t = setTimeout(() => setCurrentStep((s) => Math.min(s + 1, TRACKING_STEPS.length - 1)), 3000);
        return () => clearTimeout(t);
    }, [currentStep]);

    const isCompleted = currentStep === TRACKING_STEPS.length - 1;

    return (
        <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => nav.goBack()} style={styles.back}>
                    <Ionicons name="arrow-back" size={22} color={theme.onBackground} />
                </TouchableOpacity>
                <Text style={[styles.title, { color: theme.onBackground }]}>Live Tracking</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Status Hero */}
                <LinearGradient
                    colors={isCompleted
                        ? [COLORS.success, '#15803d']
                        : isDark ? [COLORS.carbon900, COLORS.carbon800] : [COLORS.primary, COLORS.primary600]}
                    style={styles.hero}
                >
                    <Animated.View style={[styles.pulseOuter, { transform: [{ scale: pulseAnim }] }]}>
                        <View style={styles.pulseInner}>
                            <Ionicons
                                name={TRACKING_STEPS[currentStep].icon as any}
                                size={40}
                                color={COLORS.white}
                            />
                        </View>
                    </Animated.View>
                    <Text style={styles.statusLabel}>{TRACKING_STEPS[currentStep].label}</Text>
                    <Text style={styles.statusDesc}>{TRACKING_STEPS[currentStep].desc}</Text>
                    {!isCompleted && (
                        <Text style={styles.eta}>Estimated time: ~{(TRACKING_STEPS.length - currentStep) * 8} min</Text>
                    )}
                </LinearGradient>

                {/* Partner Card */}
                <View style={[styles.partnerCard, { backgroundColor: theme.surface }, SHADOW.sm]}>
                    <View style={styles.partnerAvatar}>
                        <Text style={{ fontSize: 28 }}>👨‍🔧</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={[styles.partnerName, { color: theme.onBackground }]}>Deepak Sharma</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                            <Ionicons name="star" size={12} color={COLORS.spark} />
                            <Text style={[styles.partnerRating, { color: theme.onSurfaceVariant }]}>4.9 · 340 jobs</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={[styles.callBtn, { backgroundColor: COLORS.success }]}
                        onPress={() => { }}>
                        <Ionicons name="call" size={18} color={COLORS.white} />
                    </TouchableOpacity>
                </View>

                {/* Timeline */}
                <View style={[styles.timelineCard, { backgroundColor: theme.surface }, SHADOW.sm]}>
                    <Text style={[styles.timelineTitle, { color: theme.onBackground }]}>Booking Progress</Text>
                    {TRACKING_STEPS.map((step, idx) => {
                        const done = idx <= currentStep;
                        const active = idx === currentStep;
                        return (
                            <View key={step.status} style={styles.timelineRow}>
                                <View style={styles.timelineLeft}>
                                    <View style={[
                                        styles.timelineDot,
                                        done
                                            ? { backgroundColor: COLORS.primary }
                                            : { backgroundColor: theme.border },
                                        active && { backgroundColor: COLORS.spark },
                                    ]}>
                                        {done && <Ionicons name="checkmark" size={10} color={COLORS.white} />}
                                    </View>
                                    {idx < TRACKING_STEPS.length - 1 && (
                                        <View style={[styles.timelineLine, { backgroundColor: idx < currentStep ? COLORS.primary : theme.border }]} />
                                    )}
                                </View>
                                <View style={styles.timelineContent}>
                                    <Text style={[styles.timelineStepLabel, {
                                        color: active ? COLORS.primary : done ? theme.onBackground : theme.onSurfaceVariant,
                                        fontWeight: active ? FONT_WEIGHT.bold : FONT_WEIGHT.medium,
                                    }]}>{step.label}</Text>
                                    {active && <Text style={[styles.timelineDesc, { color: theme.onSurfaceVariant }]}>{step.desc}</Text>}
                                </View>
                            </View>
                        );
                    })}
                </View>

                {isCompleted && (
                    <View style={{ paddingHorizontal: SPACING.base }}>
                        <TouchableOpacity
                            onPress={() => nav.navigate('RateReview', { bookingId: 'demo-booking-1' })}
                            style={[styles.reviewBtn, { backgroundColor: COLORS.spark }]}
                            activeOpacity={0.8}
                        >
                            <Ionicons name="star-outline" size={20} color={COLORS.carbon900} />
                            <Text style={styles.reviewBtnText}>Rate your experience</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING.base, paddingTop: SPACING.base, gap: 12 },
    back: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
    title: { flex: 1, fontSize: FONT_SIZE.lg, fontWeight: FONT_WEIGHT.bold },
    content: { gap: 16, padding: SPACING.base, paddingBottom: 40 },
    hero: { borderRadius: RADIUS['2xl'], padding: SPACING['2xl'], alignItems: 'center', gap: 8 },
    pulseOuter: {
        width: 88, height: 88, borderRadius: 44,
        backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center',
    },
    pulseInner: {
        width: 64, height: 64, borderRadius: 32,
        backgroundColor: 'rgba(255,255,255,0.3)', alignItems: 'center', justifyContent: 'center',
    },
    statusLabel: { fontSize: FONT_SIZE.xl, fontWeight: FONT_WEIGHT.bold, color: COLORS.white },
    statusDesc: { fontSize: FONT_SIZE.sm, color: 'rgba(255,255,255,0.8)' },
    eta: { fontSize: FONT_SIZE.xs, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
    partnerCard: { flexDirection: 'row', alignItems: 'center', gap: 12, borderRadius: RADIUS.xl, padding: SPACING.base },
    partnerAvatar: {
        width: 50, height: 50, borderRadius: 25,
        backgroundColor: '#f1f5f9', alignItems: 'center', justifyContent: 'center',
    },
    partnerName: { fontSize: FONT_SIZE.base, fontWeight: FONT_WEIGHT.bold },
    partnerRating: { fontSize: FONT_SIZE.xs },
    callBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
    timelineCard: { borderRadius: RADIUS.xl, padding: SPACING.base },
    timelineTitle: { fontSize: FONT_SIZE.base, fontWeight: FONT_WEIGHT.bold, marginBottom: SPACING.base },
    timelineRow: { flexDirection: 'row', gap: 12, marginBottom: 4 },
    timelineLeft: { alignItems: 'center', width: 22 },
    timelineDot: { width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
    timelineLine: { width: 2, flex: 1, marginVertical: 3 },
    timelineContent: { flex: 1, paddingBottom: SPACING.base },
    timelineStepLabel: { fontSize: FONT_SIZE.sm },
    timelineDesc: { fontSize: FONT_SIZE.xs, marginTop: 2 },
    reviewBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: RADIUS.xl, padding: SPACING.base },
    reviewBtnText: { fontSize: FONT_SIZE.base, fontWeight: FONT_WEIGHT.bold, color: COLORS.carbon900 },
});
