import React, { useState } from 'react';
import {
    View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AppTextInput } from '@components/AppTextInput';
import { StarRating } from '@components/StarRating';
import { ServiceCardSkeleton } from '@components/Skeleton';
import { useAppDispatch, useAppSelector } from '@hooks/useAppDispatch';
import { useTheme } from '@hooks/useTheme';
import { useDebounce } from '@hooks/useDebounce';
import { fetchServicesThunk, setSearchQuery } from '@store/slices/servicesSlice';
import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SHADOW, SPACING } from '@utils/theme';
import type { Service } from '@appTypes/index';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '@navigation/HomeStackNavigator';
import { LinearGradient } from 'expo-linear-gradient';

export default function SearchScreen() {
    const nav = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
    const dispatch = useAppDispatch();
    const { theme } = useTheme();
    const { list, isLoading, searchQuery } = useAppSelector((s) => s.services);

    const doSearch = useDebounce((q: string) => {
        dispatch(fetchServicesThunk({ search: q }));
    }, 400);

    const handleChange = (text: string) => {
        dispatch(setSearchQuery(text));
        doSearch(text);
    };

    const renderItem = ({ item }: { item: Service }) => (
        <TouchableOpacity
            onPress={() => nav.navigate('ServiceDetail', { serviceId: item.id })}
            activeOpacity={0.85}
            style={[styles.card, { backgroundColor: theme.surface }, SHADOW.sm]}
        >
            <LinearGradient colors={[COLORS.primary900, COLORS.primary600]} style={styles.img}>
                <Text style={{ fontSize: 28 }}>🚗</Text>
            </LinearGradient>
            <View style={{ flex: 1 }}>
                <Text style={[styles.name, { color: theme.onBackground }]}>{item.name}</Text>
                <View style={styles.ratingRow}>
                    <StarRating rating={item.rating} size={11} />
                    <Text style={[styles.ratingText, { color: theme.onSurfaceVariant }]}>{item.rating.toFixed(1)}</Text>
                </View>
                <Text style={[styles.duration, { color: theme.onSurfaceVariant }]}>{item.duration} min</Text>
            </View>
            <Text style={[styles.price, { color: COLORS.primary }]}>₹{item.price}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
            <View style={styles.headerRow}>
                <TouchableOpacity onPress={() => nav.goBack()} style={styles.back}>
                    <Ionicons name="arrow-back" size={22} color={theme.onBackground} />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <AppTextInput
                        placeholder="Search car wash services…"
                        leftIcon="search-outline"
                        value={searchQuery}
                        onChangeText={handleChange}
                        autoFocus
                        containerStyle={{ marginBottom: 0 }}
                    />
                </View>
            </View>

            {isLoading ? (
                <View style={{ padding: SPACING.base, gap: 12 }}>
                    {[1, 2, 3].map((k) => <ServiceCardSkeleton key={k} />)}
                </View>
            ) : list.length === 0 ? (
                <View style={styles.empty}>
                    <Text style={{ fontSize: 48 }}>🔍</Text>
                    <Text style={[styles.emptyText, { color: theme.onSurfaceVariant }]}>No services found</Text>
                </View>
            ) : (
                <FlatList
                    data={list}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1 },
    headerRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: SPACING.base, paddingTop: SPACING.base },
    back: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
    list: { padding: SPACING.base, gap: 12 },
    card: { flexDirection: 'row', alignItems: 'center', gap: 12, borderRadius: RADIUS.xl, padding: SPACING.base },
    img: { width: 64, height: 64, borderRadius: RADIUS.xl, alignItems: 'center', justifyContent: 'center' },
    name: { fontSize: FONT_SIZE.base, fontWeight: FONT_WEIGHT.bold, marginBottom: 2 },
    ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    ratingText: { fontSize: FONT_SIZE.xs },
    duration: { fontSize: FONT_SIZE.xs, marginTop: 2 },
    price: { fontSize: FONT_SIZE.lg, fontWeight: FONT_WEIGHT.bold },
    empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
    emptyText: { fontSize: FONT_SIZE.base },
});
