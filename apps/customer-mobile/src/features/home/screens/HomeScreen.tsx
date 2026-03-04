import React, { useEffect, useCallback } from 'react';
import {
    View, Text, ScrollView, StyleSheet, SafeAreaView,
    TouchableOpacity, FlatList, Image, RefreshControl, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SectionHeader } from '@components/SectionHeader';
import { StarRating } from '@components/StarRating';
import { ServiceCardSkeleton } from '@components/Skeleton';
import { Badge } from '@components/Badge';
import { useAppDispatch, useAppSelector } from '@hooks/useAppDispatch';
import { useTheme } from '@hooks/useTheme';
import { fetchFeaturedThunk, fetchServicesThunk } from '@store/slices/servicesSlice';
import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SHADOW, SPACING } from '@utils/theme';
import type { Service, ServiceCategory } from '@appTypes/index';
import type { HomeStackParamList } from '@navigation/HomeStackNavigator';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.62;

const CATEGORIES: { key: ServiceCategory; label: string; icon: string; color: string }[] = [
    { key: 'exterior_wash', label: 'Exterior', icon: '💧', color: '#dbeafe' },
    { key: 'interior_cleaning', label: 'Interior', icon: '✨', color: '#fef9c3' },
    { key: 'full_detailing', label: 'Detailing', icon: '🌟', color: '#dcfce7' },
    { key: 'ceramic_coating', label: 'Ceramic', icon: '🛡️', color: '#f3e8ff' },
    { key: 'engine_cleaning', label: 'Engine', icon: '⚙️', color: '#ffedd5' },
];

const MOCK_OFFERS = [
    { id: '1', title: '30% OFF', subtitle: 'First Booking', colors: [COLORS.primary, COLORS.primary600] as [string, string] },
    { id: '2', title: 'FREE Wax', subtitle: 'With Full Detailing', colors: [COLORS.spark600, COLORS.spark] as [string, string] },
    { id: '3', title: 'FLAT ₹200', subtitle: 'Weekend Special', colors: ['#7c3aed', '#a855f7'] as [string, string] },
];

export default function HomeScreen() {
    const nav = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
    const dispatch = useAppDispatch();
    const { theme, isDark } = useTheme();
    const { featured, list, isFeaturedLoading, isLoading } = useAppSelector((s) => s.services);
    const { user } = useAppSelector((s) => s.auth);

    const [refreshing, setRefreshing] = React.useState(false);

    const load = useCallback(() => {
        dispatch(fetchFeaturedThunk());
        dispatch(fetchServicesThunk());
    }, [dispatch]);

    useEffect(() => { load(); }, [load]);

    const onRefresh = async () => {
        setRefreshing(true);
        await Promise.all([dispatch(fetchFeaturedThunk()), dispatch(fetchServicesThunk())]);
        setRefreshing(false);
    };

    const renderServiceCard = ({ item }: { item: Service }) => (
        <TouchableOpacity
            onPress={() => nav.navigate('ServiceDetail', { serviceId: item.id })}
            activeOpacity={0.85}
            style={[styles.serviceCard, { width: CARD_WIDTH, backgroundColor: theme.surface }, SHADOW.md]}
        >
            <View style={styles.serviceImagePlaceholder}>
                <LinearGradient colors={[COLORS.primary900, COLORS.primary600]} style={styles.serviceImageGrad}>
                    <Text style={{ fontSize: 40 }}>🚗</Text>
                </LinearGradient>
                {item.isFeatured && (
                    <View style={styles.featuredBadge}>
                        <Text style={styles.featuredText}>⭐ Featured</Text>
                    </View>
                )}
            </View>
            <View style={styles.serviceInfo}>
                <Text style={[styles.serviceName, { color: theme.onBackground }]} numberOfLines={1}>
                    {item.name}
                </Text>
                <View style={styles.serviceRatingRow}>
                    <StarRating rating={item.rating} size={12} />
                    <Text style={[styles.serviceRatingText, { color: theme.onSurfaceVariant }]}>
                        {item.rating.toFixed(1)} ({item.reviewCount})
                    </Text>
                </View>
                <View style={styles.servicePriceRow}>
                    <Text style={[styles.servicePrice, { color: COLORS.primary }]}>₹{item.price}</Text>
                    <Text style={[styles.serviceDuration, { color: theme.onSurfaceVariant }]}>
                        {item.duration} min
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}
            >
                {/* Header */}
                <LinearGradient
                    colors={isDark ? [COLORS.carbon950, COLORS.carbon900] : [COLORS.primary900, COLORS.primary]}
                    style={styles.header}
                >
                    <View style={styles.headerTop}>
                        <View>
                            <Text style={styles.greeting}>Good {getGreeting()} 👋</Text>
                            <Text style={styles.userName}>{user?.name ?? 'Car Lover'}</Text>
                        </View>
                        <TouchableOpacity style={styles.notifBtn}>
                            <Ionicons name="notifications-outline" size={22} color={COLORS.white} />
                            <View style={styles.notifDot} />
                        </TouchableOpacity>
                    </View>

                    {/* Search Bar */}
                    <TouchableOpacity
                        onPress={() => nav.navigate('Search')}
                        style={[styles.searchBar, { backgroundColor: 'rgba(255,255,255,0.12)' }]}
                        activeOpacity={0.8}
                    >
                        <Ionicons name="search-outline" size={18} color="rgba(255,255,255,0.7)" />
                        <Text style={styles.searchPlaceholder}>Search car wash services…</Text>
                    </TouchableOpacity>
                </LinearGradient>

                <View style={{ paddingBottom: 24 }}>
                    {/* Offers Carousel */}
                    <View style={styles.offersSection}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.offersScroll}>
                            {MOCK_OFFERS.map((offer) => (
                                <LinearGradient key={offer.id} colors={offer.colors} style={styles.offerCard}>
                                    <Text style={styles.offerTitle}>{offer.title}</Text>
                                    <Text style={styles.offerSub}>{offer.subtitle}</Text>
                                    <View style={styles.offerBtn}>
                                        <Text style={styles.offerBtnText}>Grab Now →</Text>
                                    </View>
                                </LinearGradient>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Categories */}
                    <SectionHeader title="Categories" subtitle="What do you need?" />
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
                        {CATEGORIES.map((cat) => (
                            <TouchableOpacity
                                key={cat.key}
                                activeOpacity={0.7}
                                style={[styles.categoryChip, { backgroundColor: cat.color }]}
                                onPress={() => nav.navigate('Search')}
                            >
                                <Text style={styles.categoryIcon}>{cat.icon}</Text>
                                <Text style={[styles.categoryLabel, { color: COLORS.carbon900 }]}>{cat.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Featured Services */}
                    <SectionHeader
                        title="Featured Services"
                        subtitle="Hand-picked for you"
                        onSeeAll={() => nav.navigate('Search')}
                    />
                    {isFeaturedLoading ? (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.listScroll}>
                            {[1, 2, 3].map((k) => <ServiceCardSkeleton key={k} />)}
                        </ScrollView>
                    ) : (
                        <FlatList
                            data={featured.length ? featured : MOCK_SERVICES}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={renderServiceCard}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={styles.listScroll}
                        />
                    )}

                    {/* All Services */}
                    <SectionHeader
                        title="All Services"
                        subtitle="Near you"
                        onSeeAll={() => nav.navigate('Search')}
                        style={{ marginTop: SPACING.lg }}
                    />
                    {isLoading ? (
                        <View style={{ paddingHorizontal: SPACING.base, gap: 12 }}>
                            {[1, 2].map((k) => (
                                <View key={k} style={[styles.allServiceCard, { backgroundColor: theme.surface }, SHADOW.sm]}>
                                    <View style={styles.allServiceImg} />
                                    <View style={{ flex: 1, gap: 8 }}>
                                        <View style={{ height: 14, width: '70%', backgroundColor: theme.border, borderRadius: 6 }} />
                                        <View style={{ height: 12, width: '50%', backgroundColor: theme.border, borderRadius: 6 }} />
                                        <View style={{ height: 12, width: '40%', backgroundColor: theme.border, borderRadius: 6 }} />
                                    </View>
                                </View>
                            ))}
                        </View>
                    ) : (
                        <View style={{ paddingHorizontal: SPACING.base, gap: 12 }}>
                            {(list.length ? list : MOCK_SERVICES).map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    onPress={() => nav.navigate('ServiceDetail', { serviceId: item.id })}
                                    style={[styles.allServiceCard, { backgroundColor: theme.surface }, SHADOW.sm]}
                                    activeOpacity={0.85}
                                >
                                    <LinearGradient colors={[COLORS.primary900, COLORS.primary600]} style={styles.allServiceImg}>
                                        <Text style={{ fontSize: 28 }}>🚗</Text>
                                    </LinearGradient>
                                    <View style={{ flex: 1 }}>
                                        <Text style={[styles.serviceName, { color: theme.onBackground }]}>{item.name}</Text>
                                        <View style={styles.serviceRatingRow}>
                                            <StarRating rating={item.rating} size={11} />
                                            <Text style={[styles.serviceRatingText, { color: theme.onSurfaceVariant }]}>
                                                {item.rating.toFixed(1)}
                                            </Text>
                                        </View>
                                        <Text style={[styles.serviceDuration, { color: theme.onSurfaceVariant }]}>{item.duration} min · {formatCategory(item.category)}</Text>
                                    </View>
                                    <View style={{ alignItems: 'flex-end', gap: 6 }}>
                                        <Text style={[styles.servicePrice, { color: COLORS.primary }]}>₹{item.price}</Text>
                                        <View style={[styles.bookBtn, { backgroundColor: COLORS.primary }]}>
                                            <Text style={styles.bookBtnText}>Book</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

function getGreeting() {
    const h = new Date().getHours();
    if (h < 12) return 'Morning';
    if (h < 17) return 'Afternoon';
    return 'Evening';
}

function formatCategory(cat: ServiceCategory): string {
    return cat.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

// Mock data until backend is connected
const MOCK_SERVICES: Service[] = [
    {
        id: '1', name: 'Premium Exterior Wash', category: 'exterior_wash',
        description: 'Complete exterior cleaning with foam wash, rinse, and hand dry.',
        price: 499, duration: 45, rating: 4.8, reviewCount: 234,
        imageUrl: '', addons: [], availableCarTypes: ['hatchback', 'sedan', 'suv'],
        isFeatured: true, isActive: true,
    },
    {
        id: '2', name: 'Interior Deep Clean', category: 'interior_cleaning',
        description: 'Thorough interior vacuuming, seat shampooing, and dashboard polish.',
        price: 799, duration: 90, rating: 4.6, reviewCount: 189,
        imageUrl: '', addons: [], availableCarTypes: ['hatchback', 'sedan', 'suv', 'muv'],
        isFeatured: true, isActive: true,
    },
    {
        id: '3', name: 'Full Detailing Package', category: 'full_detailing',
        description: 'Complete inside-out detailing for that showroom finish.',
        price: 1999, duration: 180, rating: 4.9, reviewCount: 312,
        imageUrl: '', addons: [], availableCarTypes: ['sedan', 'suv', 'luxury'],
        isFeatured: false, isActive: true,
    },
    {
        id: '4', name: 'Ceramic Coating', category: 'ceramic_coating',
        description: 'Long lasting ceramic protection for your car\'s paint.',
        price: 4999, duration: 240, rating: 4.7, reviewCount: 98,
        imageUrl: '', addons: [], availableCarTypes: ['sedan', 'suv', 'luxury'],
        isFeatured: false, isActive: true,
    },
];

const styles = StyleSheet.create({
    safe: { flex: 1 },
    header: { paddingTop: 60, paddingBottom: 32, paddingHorizontal: SPACING.base },
    headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: SPACING.base },
    greeting: { fontSize: FONT_SIZE.sm, color: 'rgba(255,255,255,0.7)' },
    userName: { fontSize: FONT_SIZE.xl, fontWeight: FONT_WEIGHT.bold, color: COLORS.white },
    notifBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' },
    notifDot: { position: 'absolute', top: 9, right: 9, width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.spark, borderWidth: 1.5, borderColor: COLORS.white },
    searchBar: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: SPACING.base, height: 46, borderRadius: RADIUS['2xl'] },
    searchPlaceholder: { color: 'rgba(255,255,255,0.6)', fontSize: FONT_SIZE.sm },
    offersSection: { marginTop: SPACING.base },
    offersScroll: { paddingHorizontal: SPACING.base, gap: 12 },
    offerCard: {
        width: width * 0.7, borderRadius: RADIUS['2xl'], padding: SPACING.base,
        marginBottom: SPACING.base,
    },
    offerTitle: { fontSize: FONT_SIZE['2xl'], fontWeight: FONT_WEIGHT.extrabold, color: COLORS.white },
    offerSub: { fontSize: FONT_SIZE.sm, color: 'rgba(255,255,255,0.8)', marginBottom: SPACING.sm },
    offerBtn: { backgroundColor: 'rgba(255,255,255,0.2)', alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6, borderRadius: RADIUS.full },
    offerBtnText: { fontSize: FONT_SIZE.xs, color: COLORS.white, fontWeight: FONT_WEIGHT.bold },
    categoriesScroll: { paddingHorizontal: SPACING.base, gap: 10, paddingBottom: SPACING.base },
    categoryChip: { alignItems: 'center', paddingHorizontal: SPACING.base, paddingVertical: SPACING.sm, borderRadius: RADIUS.xl, gap: 4, minWidth: 80 },
    categoryIcon: { fontSize: 22 },
    categoryLabel: { fontSize: FONT_SIZE.xs, fontWeight: FONT_WEIGHT.semibold },
    listScroll: { paddingHorizontal: SPACING.base, gap: 12, paddingBottom: SPACING.sm },
    serviceCard: { borderRadius: RADIUS.xl, overflow: 'hidden', marginBottom: 4 },
    serviceImagePlaceholder: { height: 130, position: 'relative' },
    serviceImageGrad: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    featuredBadge: {
        position: 'absolute', top: 8, left: 8,
        backgroundColor: 'rgba(0,0,0,0.4)', paddingHorizontal: 8,
        paddingVertical: 3, borderRadius: RADIUS.full,
    },
    featuredText: { fontSize: 10, color: COLORS.white, fontWeight: FONT_WEIGHT.semibold },
    serviceInfo: { padding: 10, gap: 4 },
    serviceName: { fontSize: FONT_SIZE.sm, fontWeight: FONT_WEIGHT.bold },
    serviceRatingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    serviceRatingText: { fontSize: FONT_SIZE.xs },
    servicePriceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    servicePrice: { fontSize: FONT_SIZE.base, fontWeight: FONT_WEIGHT.bold },
    serviceDuration: { fontSize: FONT_SIZE.xs },
    allServiceCard: {
        flexDirection: 'row', alignItems: 'center', gap: 12,
        borderRadius: RADIUS.xl, padding: SPACING.base,
    },
    allServiceImg: { width: 70, height: 70, borderRadius: RADIUS.xl, alignItems: 'center', justifyContent: 'center' },
    bookBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: RADIUS.lg },
    bookBtnText: { fontSize: FONT_SIZE.xs, fontWeight: FONT_WEIGHT.bold, color: COLORS.white },
});
