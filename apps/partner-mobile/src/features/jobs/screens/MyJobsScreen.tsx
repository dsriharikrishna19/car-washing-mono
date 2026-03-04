import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@components/Card';
import { Badge, jobStatusBadge } from '@components/Badge';
import { useAppDispatch, useAppSelector } from '@hooks/useAppDispatch';
import { useTheme } from '@hooks/useTheme';
import { fetchJobsThunk } from '@store/slices/jobsSlice';
import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SHADOW, SPACING } from '@utils/theme';
import type { Job } from '@appTypes/index';

export default function MyJobsScreen() {
    const dispatch = useAppDispatch();
    const { theme } = useTheme();
    const { todayJobs, upcomingJobs, isLoading } = useAppSelector((state) => state.jobs);
    const [activeTab, setActiveTab] = useState<'today' | 'upcoming'>('today');
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await dispatch(fetchJobsThunk());
        setRefreshing(false);
    };

    useEffect(() => {
        dispatch(fetchJobsThunk());
    }, [dispatch]);

    const renderJobItem = ({ item }: { item: Job }) => (
        <TouchableOpacity activeOpacity={0.8} style={styles.cardContainer}>
            <Card variant="outlined" style={styles.card}>
                <View style={styles.cardHeader}>
                    <View style={styles.timeBox}>
                        <Ionicons name="time-outline" size={16} color={COLORS.primary} />
                        <Text style={[styles.timeText, { color: theme.onBackground }]}>
                            {new Date(item.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </Text>
                    </View>
                    {jobStatusBadge(item.status)}
                </View>

                <View style={styles.cardBody}>
                    <View style={styles.customerInfo}>
                        <Text style={[styles.customerName, { color: theme.onBackground }]}>{item.customerName}</Text>
                        <Text style={[styles.serviceName, { color: theme.onSurfaceVariant }]}>{item.serviceName}</Text>
                    </View>
                    <View style={styles.earningsInfo}>
                        <Text style={[styles.earningsLabel, { color: theme.onSurfaceVariant }]}>Earnings</Text>
                        <Text style={[styles.earningsValue, { color: COLORS.success }]}>₹{item.partnerEarnings}</Text>
                    </View>
                </View>

                <View style={[styles.divider, { backgroundColor: theme.border }]} />

                <View style={styles.cardFooter}>
                    <View style={styles.carInfo}>
                        <Ionicons name="car-outline" size={16} color={theme.onSurfaceVariant} />
                        <Text style={[styles.carText, { color: theme.onSurfaceVariant }]}>
                            {item.car.model} • {item.car.plateNumber}
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.detailsBtn}>
                        <Text style={{ color: COLORS.primary, fontWeight: FONT_WEIGHT.bold }}>Details</Text>
                        <Ionicons name="chevron-forward" size={16} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>
            </Card>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.header}>
                <Text style={[styles.headerTitle, { color: theme.onBackground }]}>My Bookings</Text>
            </View>

            <View style={[styles.tabBar, { backgroundColor: theme.surfaceVariant }]}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'today' && [styles.activeTab, { backgroundColor: theme.surface }]]}
                    onPress={() => setActiveTab('today')}
                >
                    <Text style={[styles.tabText, { color: activeTab === 'today' ? COLORS.primary : theme.onSurfaceVariant }]}>
                        Today ({todayJobs.length})
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'upcoming' && [styles.activeTab, { backgroundColor: theme.surface }]]}
                    onPress={() => setActiveTab('upcoming')}
                >
                    <Text style={[styles.tabText, { color: activeTab === 'upcoming' ? COLORS.primary : theme.onSurfaceVariant }]}>
                        Upcoming ({upcomingJobs.length})
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={activeTab === 'today' ? todayJobs : upcomingJobs}
                renderItem={renderJobItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="documents-outline" size={64} color={theme.onSurfaceVariant} />
                        <Text style={[styles.emptyTitle, { color: theme.onBackground }]}>No Jobs Found</Text>
                        <Text style={[styles.emptySubtitle, { color: theme.onSurfaceVariant }]}>
                            {activeTab === 'today' ? "You don't have any jobs for today" : "No upcoming jobs scheduled"}
                        </Text>
                    </View>
                }
            />
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
    tabBar: {
        flexDirection: 'row',
        marginHorizontal: SPACING.base,
        padding: 4,
        borderRadius: RADIUS.lg,
        marginBottom: SPACING.base,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: RADIUS.md,
    },
    activeTab: {
        ...SHADOW.sm,
    },
    tabText: {
        fontSize: FONT_SIZE.sm,
        fontWeight: FONT_WEIGHT.bold,
    },
    listContent: {
        padding: SPACING.base,
        paddingBottom: 40,
    },
    cardContainer: {
        marginBottom: SPACING.base,
    },
    card: {
        padding: SPACING.base,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    timeBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    timeText: {
        fontSize: FONT_SIZE.sm,
        fontWeight: FONT_WEIGHT.bold,
    },
    cardBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    customerInfo: {
        flex: 1,
    },
    customerName: {
        fontSize: FONT_SIZE.base,
        fontWeight: FONT_WEIGHT.bold,
    },
    serviceName: {
        fontSize: FONT_SIZE.xs,
        marginTop: 2,
    },
    earningsInfo: {
        alignItems: 'flex-end',
    },
    earningsLabel: {
        fontSize: 10,
        fontWeight: FONT_WEIGHT.bold,
        textTransform: 'uppercase',
    },
    earningsValue: {
        fontSize: FONT_SIZE.lg,
        fontWeight: FONT_WEIGHT.extrabold,
        marginTop: 2,
    },
    divider: {
        height: 1,
        width: '100%',
        marginBottom: 16,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    carInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    carText: {
        fontSize: FONT_SIZE.xs,
    },
    detailsBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    emptyContainer: {
        marginTop: 100,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    emptyTitle: {
        fontSize: FONT_SIZE.xl,
        fontWeight: FONT_WEIGHT.bold,
        marginTop: 16,
    },
    emptySubtitle: {
        fontSize: FONT_SIZE.sm,
        textAlign: 'center',
        marginTop: 8,
        lineHeight: 20,
    },
});
