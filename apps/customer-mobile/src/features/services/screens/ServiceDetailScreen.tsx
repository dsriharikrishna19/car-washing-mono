import React, { useEffect, useState } from 'react';
import {
    View, Text, StyleSheet, SafeAreaView, ScrollView,
    TouchableOpacity, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StarRating } from '@components/StarRating';
import { Button } from '@components/Button';
import { Badge } from '@components/Badge';
import { useAppDispatch, useAppSelector } from '@hooks/useAppDispatch';
import { useTheme } from '@hooks/useTheme';
import { fetchServiceByIdThunk } from '@store/slices/servicesSlice';
import { setCartService } from '@store/slices/bookingSlice';
import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SPACING } from '@utils/theme';
import type { HomeStackParamList } from '@navigation/HomeStackNavigator';

export default function ServiceDetailScreen() {
    const nav = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
    const route = useRoute<RouteProp<HomeStackParamList, 'ServiceDetail'>>();
    const dispatch = useAppDispatch();
    const { theme, isDark } = useTheme();
    const { selected: service, isLoading } = useAppSelector((s) => s.services);

    useEffect(() => {
        dispatch(fetchServiceByIdThunk(route.params.serviceId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [route.params.serviceId]);

    const handleBook = () => {
        if (!service) return;
        dispatch(setCartService(service.id));
        nav.navigate('Booking', { serviceId: service.id });
    };

    // Use mock if API not connected
    const s = service ?? MOCK_DETAIL;

    return (
        <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Hero */}
                <LinearGradient
                    colors={isDark ? [COLORS.carbon950, COLORS.carbon900] : [COLORS.primary900, COLORS.primary]}
                    style={styles.hero}
                >
                    <TouchableOpacity onPress={() => nav.goBack()} style={styles.back}>
                        <Ionicons name="arrow-back" size={22} color={COLORS.white} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 64, textAlign: 'center', marginBottom: SPACING.base }}>🚗</Text>
                    <Text style={styles.heroTitle}>{s.name}</Text>
                    <Text style={styles.heroCategory}>{s.category.replace(/_/g, ' ').toUpperCase()}</Text>
                </LinearGradient>

                <View style={[styles.content, { backgroundColor: theme.surface }]}>
                    {/* Rating + Price Row */}
                    <View style={styles.metaRow}>
                        <View style={styles.ratingBlock}>
                            <StarRating rating={s.rating} size={18} />
                            <Text style={[styles.ratingText, { color: theme.onSurfaceVariant }]}>
                                {s.rating.toFixed(1)} ({s.reviewCount} reviews)
                            </Text>
                        </View>
                        <View style={styles.priceBlock}>
                            <Text style={[styles.price, { color: COLORS.primary }]}>₹{s.price}</Text>
                            <Text style={[styles.duration, { color: theme.onSurfaceVariant }]}>{s.duration} min</Text>
                        </View>
                    </View>

                    {/* Description */}
                    <Text style={[styles.sectionTitle, { color: theme.onBackground }]}>About this service</Text>
                    <Text style={[styles.description, { color: theme.onSurfaceVariant }]}>{s.description}</Text>

                    {/* Compatible Car Types */}
                    <Text style={[styles.sectionTitle, { color: theme.onBackground }]}>Works with</Text>
                    <View style={styles.tagsRow}>
                        {s.availableCarTypes.map((type) => (
                            <View key={type} style={[styles.tag, { backgroundColor: theme.surfaceVariant }]}>
                                <Text style={[styles.tagText, { color: theme.onSurface }]}>
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </Text>
                            </View>
                        ))}
                    </View>

                    {/* Add-ons */}
                    {s.addons.length > 0 && (
                        <>
                            <Text style={[styles.sectionTitle, { color: theme.onBackground }]}>Popular Add-ons</Text>
                            {s.addons.map((addon) => (
                                <View key={addon.id} style={[styles.addonRow, { borderColor: theme.border }]}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={[styles.addonName, { color: theme.onBackground }]}>{addon.name}</Text>
                                        <Text style={[styles.addonDesc, { color: theme.onSurfaceVariant }]}>{addon.description}</Text>
                                    </View>
                                    <Text style={[styles.addonPrice, { color: COLORS.primary }]}>+₹{addon.price}</Text>
                                </View>
                            ))}
                        </>
                    )}
                </View>
            </ScrollView>

            {/* Book Button */}
            <View style={[styles.footer, { backgroundColor: theme.surface, borderTopColor: theme.border }]}>
                <View>
                    <Text style={[styles.footerPrice, { color: COLORS.primary }]}>₹{s.price}</Text>
                    <Text style={[styles.footerDuration, { color: theme.onSurfaceVariant }]}>{s.duration} min</Text>
                </View>
                <Button label="Book Now" onPress={handleBook} size="lg" style={{ flex: 1, maxWidth: 200 }} />
            </View>
        </SafeAreaView>
    );
}

const MOCK_DETAIL = {
    id: '1', name: 'Premium Exterior Wash', category: 'exterior_wash' as const,
    description: 'Our premium exterior wash uses foam cannon technology and pH-balanced shampoo for a thorough clean without scratching. Includes wheel cleaning, tire dressing, and streak-free glass polish.',
    price: 499, duration: 45, rating: 4.8, reviewCount: 234,
    imageUrl: '', addons: [
        { id: 'a1', name: 'Wax Coat', description: 'Extra shine & protection', price: 200, duration: 15 },
        { id: 'a2', name: 'Tyre Polish', description: 'Brand new tyre look', price: 100, duration: 10 },
    ],
    availableCarTypes: ['hatchback', 'sedan', 'suv'] as any[],
    isFeatured: true, isActive: true,
};

const styles = StyleSheet.create({
    safe: { flex: 1 },
    hero: { paddingTop: 60, paddingBottom: SPACING['2xl'], paddingHorizontal: SPACING.base },
    back: {
        width: 40, height: 40, borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.15)',
        alignItems: 'center', justifyContent: 'center', marginBottom: SPACING.xl,
    },
    heroTitle: { fontSize: FONT_SIZE['2xl'], fontWeight: FONT_WEIGHT.extrabold, color: COLORS.white, textAlign: 'center' },
    heroCategory: { fontSize: FONT_SIZE.xs, color: 'rgba(255,255,255,0.7)', textAlign: 'center', letterSpacing: 1.5, marginTop: 4 },
    content: { borderTopLeftRadius: 28, borderTopRightRadius: 28, marginTop: -20, padding: SPACING.base, paddingBottom: 120 },
    metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.xl },
    ratingBlock: { gap: 4 },
    ratingText: { fontSize: FONT_SIZE.xs },
    priceBlock: { alignItems: 'flex-end' },
    price: { fontSize: FONT_SIZE['2xl'], fontWeight: FONT_WEIGHT.extrabold },
    duration: { fontSize: FONT_SIZE.sm },
    sectionTitle: { fontSize: FONT_SIZE.base, fontWeight: FONT_WEIGHT.bold, marginTop: SPACING.xl, marginBottom: SPACING.sm },
    description: { fontSize: FONT_SIZE.sm, lineHeight: 22 },
    tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    tag: { paddingHorizontal: SPACING.sm, paddingVertical: 4, borderRadius: RADIUS.full },
    tagText: { fontSize: FONT_SIZE.xs, fontWeight: FONT_WEIGHT.medium },
    addonRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: SPACING.sm, borderBottomWidth: 1, gap: 12 },
    addonName: { fontSize: FONT_SIZE.sm, fontWeight: FONT_WEIGHT.semibold },
    addonDesc: { fontSize: FONT_SIZE.xs, marginTop: 2 },
    addonPrice: { fontSize: FONT_SIZE.base, fontWeight: FONT_WEIGHT.bold },
    footer: {
        position: 'absolute', bottom: 0, left: 0, right: 0,
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: SPACING.base, paddingVertical: SPACING.base,
        borderTopWidth: 1, paddingBottom: 32,
    },
    footerPrice: { fontSize: FONT_SIZE.xl, fontWeight: FONT_WEIGHT.extrabold },
    footerDuration: { fontSize: FONT_SIZE.xs },
});
