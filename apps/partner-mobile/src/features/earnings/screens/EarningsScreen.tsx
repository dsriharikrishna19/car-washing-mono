import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@components/Card';
import { Badge } from '@components/Badge';
import { useAppDispatch, useAppSelector } from '@hooks/useAppDispatch';
import { useTheme } from '@hooks/useTheme';
import { fetchEarningsThunk, fetchPayoutsThunk } from '@store/slices/earningsSlice';
import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SPACING } from '@utils/theme';

const { width } = Dimensions.get('window');

export default function EarningsScreen() {
    const dispatch = useAppDispatch();
    const { theme } = useTheme();
    const { stats, payouts, isLoading } = useAppSelector((state) => state.earnings);
    const { user } = useAppSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchEarningsThunk());
        dispatch(fetchPayoutsThunk());
    }, [dispatch]);

    const weeklyData = [1200, 1800, 1400, 2100, 2450, 0, 0]; // Mon-Sun
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const maxVal = Math.max(...weeklyData, 3000);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.header}>
                <Text style={[styles.headerTitle, { color: theme.onBackground }]}>Earnings</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Wallet Card */}
                <Card style={styles.walletCard}>
                    <View style={styles.walletHeader}>
                        <Text style={styles.walletLabel}>Wallet Balance</Text>
                        <View style={styles.walletIcon}>
                            <Ionicons name="wallet" size={20} color={COLORS.white} />
                        </View>
                    </View>
                    <Text style={styles.walletValue}>₹{user?.walletBalance || '2,450.00'}</Text>
                    <TouchableOpacity style={styles.payoutBtn}>
                        <Text style={styles.payoutBtnText}>Request Payout</Text>
                        <Ionicons name="arrow-forward" size={16} color={COLORS.primary} />
                    </TouchableOpacity>
                </Card>

                {/* Quick Stats Row */}
                <View style={styles.statsRow}>
                    <Card style={styles.statBox} variant="outlined">
                        <Text style={[styles.statBoxLabel, { color: theme.onSurfaceVariant }]}>Today</Text>
                        <Text style={[styles.statBoxValue, { color: COLORS.success }]}>+₹2,450</Text>
                    </Card>
                    <Card style={styles.statBox} variant="outlined">
                        <Text style={[styles.statBoxLabel, { color: theme.onSurfaceVariant }]}>This Week</Text>
                        <Text style={[styles.statBoxValue, { color: COLORS.primary }]}>₹8,950</Text>
                    </Card>
                </View>

                {/* Weekly Chart Placeholder */}
                <Card style={styles.chartCard}>
                    <Text style={[styles.chartTitle, { color: theme.onBackground }]}>Weekly Performance</Text>
                    <View style={styles.chartContainer}>
                        {weeklyData.map((val, idx) => (
                            <View key={idx} style={styles.chartCol}>
                                <View style={styles.barContainer}>
                                    <View
                                        style={[
                                            styles.bar,
                                            {
                                                height: (val / maxVal) * 120,
                                                backgroundColor: idx === 4 ? COLORS.primary : COLORS.primary200
                                            }
                                        ]}
                                    />
                                </View>
                                <Text style={[styles.dayText, { color: theme.onSurfaceVariant }]}>{days[idx]}</Text>
                            </View>
                        ))}
                    </View>
                </Card>

                {/* Payout History */}
                <View style={styles.payoutHeader}>
                    <Text style={[styles.payoutTitle, { color: theme.onBackground }]}>Payout History</Text>
                    <TouchableOpacity><Text style={{ color: COLORS.primary, fontWeight: FONT_WEIGHT.bold }}>View All</Text></TouchableOpacity>
                </View>

                {payouts.length === 0 ? (
                    <Card variant="flat" style={styles.emptyCard}>
                        <Text style={{ color: theme.onSurfaceVariant }}>No payout history found</Text>
                    </Card>
                ) : (
                    payouts.map((p) => (
                        <Card key={p.id} variant="outlined" style={styles.historyItem}>
                            <View style={styles.historyIcon}>
                                <Ionicons name="arrow-down-outline" size={20} color={COLORS.success} />
                            </View>
                            <View style={styles.historyInfo}>
                                <Text style={[styles.historyLabel, { color: theme.onBackground }]}>Withdrawal to Bank</Text>
                                <Text style={[styles.historyDate, { color: theme.onSurfaceVariant }]}>
                                    {new Date(p.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </Text>
                            </View>
                            <View style={styles.historyAction}>
                                <Text style={[styles.historyValue, { color: theme.onBackground }]}>₹{p.amount}</Text>
                                <Badge label={p.status} variant={p.status === 'processed' ? 'success' : 'warning'} size="sm" />
                            </View>
                        </Card>
                    ))
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: SPACING.base,
        paddingVertical: SPACING.base,
    },
    headerTitle: {
        fontSize: FONT_SIZE['2xl'],
        fontWeight: FONT_WEIGHT.bold,
    },
    scrollContent: {
        padding: SPACING.base,
        paddingBottom: 40,
    },
    walletCard: {
        backgroundColor: COLORS.primary,
        padding: SPACING.xl,
        marginBottom: SPACING.xl,
    },
    walletHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    walletLabel: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: FONT_SIZE.sm,
        fontWeight: FONT_WEIGHT.medium,
    },
    walletIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    walletValue: {
        color: COLORS.white,
        fontSize: FONT_SIZE['4xl'],
        fontWeight: FONT_WEIGHT.extrabold,
        marginBottom: 20,
    },
    payoutBtn: {
        backgroundColor: COLORS.white,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: RADIUS.lg,
        gap: 8,
    },
    payoutBtnText: {
        color: COLORS.primary,
        fontWeight: FONT_WEIGHT.bold,
    },
    statsRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: SPACING.xl,
    },
    statBox: {
        flex: 1,
        padding: SPACING.base,
    },
    statBoxLabel: {
        fontSize: 10,
        fontWeight: FONT_WEIGHT.bold,
        textTransform: 'uppercase',
    },
    statBoxValue: {
        fontSize: FONT_SIZE.lg,
        fontWeight: FONT_WEIGHT.extrabold,
        marginTop: 4,
    },
    chartCard: {
        marginBottom: SPACING.xl,
    },
    chartTitle: {
        fontSize: FONT_SIZE.base,
        fontWeight: FONT_WEIGHT.bold,
        marginBottom: 20,
    },
    chartContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: 150,
    },
    chartCol: {
        alignItems: 'center',
        flex: 1,
    },
    barContainer: {
        height: 120,
        justifyContent: 'flex-end',
        width: 20,
    },
    bar: {
        width: '100%',
        borderRadius: 4,
    },
    dayText: {
        fontSize: 10,
        fontWeight: FONT_WEIGHT.bold,
        marginTop: 8,
    },
    payoutHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.base,
    },
    payoutTitle: {
        fontSize: FONT_SIZE.lg,
        fontWeight: FONT_WEIGHT.bold,
    },
    historyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        padding: 12,
    },
    historyIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.success50,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    historyInfo: {
        flex: 1,
    },
    historyLabel: {
        fontSize: FONT_SIZE.sm,
        fontWeight: FONT_WEIGHT.bold,
    },
    historyDate: {
        fontSize: 10,
        marginTop: 2,
    },
    historyAction: {
        alignItems: 'flex-end',
        gap: 4,
    },
    historyValue: {
        fontSize: FONT_SIZE.base,
        fontWeight: FONT_WEIGHT.bold,
    },
    emptyCard: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
