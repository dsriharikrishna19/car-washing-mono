import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    StatusBar,
    RefreshControl,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StatusToggle } from '@components/StatusToggle';
import { Card } from '@components/Card';
import { Badge } from '@components/Badge';
import { useAppDispatch, useAppSelector } from '@hooks/useAppDispatch';
import { useTheme } from '@hooks/useTheme';
import { fetchJobsThunk } from '@store/slices/jobsSlice';
import { toggleAvailabilityThunk } from '@store/slices/availabilitySlice';
import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SHADOW, SPACING } from '@utils/theme';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
    const dispatch = useAppDispatch();
    const { theme, isDark } = useTheme();
    const { isOnline, isUpdating } = useAppSelector((state) => state.availability);
    const { todayJobs, isLoading } = useAppSelector((state) => state.jobs);
    const { user } = useAppSelector((state) => state.auth);

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await dispatch(fetchJobsThunk());
        setRefreshing(false);
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchJobsThunk());
    }, [dispatch]);

    const stats = {
        todayEarnings: 2450,
        completed: todayJobs.filter(j => j.status === 'completed').length,
        pending: todayJobs.filter(j => j.status === 'scheduled').length,
    };

    const activeJob = todayJobs.find(j => ['partner_en_route', 'in_progress'].includes(j.status));

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <StatusBar barStyle="light-content" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.white} />}
            >
                {/* Header BG */}
                <LinearGradient
                    colors={[COLORS.primary900, COLORS.primary600]}
                    style={styles.header}
                >
                    <View style={styles.headerTop}>
                        <View>
                            <Text style={styles.greeting}>Hello, {user?.name || 'Partner'} 👋</Text>
                            <Text style={styles.headerTitle}>Dashboard</Text>
                        </View>
                        <TouchableOpacity style={styles.notifBtn}>
                            <Ionicons name="notifications-outline" size={24} color={COLORS.white} />
                            <View style={styles.notifDot} />
                        </TouchableOpacity>
                    </View>

                    {/* Availability Toggle */}
                    <StatusToggle
                        isOnline={isOnline}
                        onToggle={(status) => dispatch(toggleAvailabilityThunk(status))}
                        isLoading={isUpdating}
                        style={styles.toggle}
                    />
                </LinearGradient>

                <View style={styles.content}>
                    {/* Stats Bar */}
                    <View style={styles.statsRow}>
                        <Card style={styles.statCard} padding={12}>
                            <Text style={[styles.statValue, { color: COLORS.success }]}>₹{stats.todayEarnings}</Text>
                            <Text style={[styles.statLabel, { color: theme.onSurfaceVariant }]}>Earnings</Text>
                        </Card>
                        <Card style={styles.statCard} padding={12}>
                            <Text style={[styles.statValue, { color: COLORS.primary }]}>{stats.completed}</Text>
                            <Text style={[styles.statLabel, { color: theme.onSurfaceVariant }]}>Completed</Text>
                        </Card>
                        <Card style={styles.statCard} padding={12}>
                            <Text style={[styles.statValue, { color: COLORS.warning }]}>{stats.pending}</Text>
                            <Text style={[styles.statLabel, { color: theme.onSurfaceVariant }]}>Pending</Text>
                        </Card>
                    </View>

                    {/* Active Job Callout */}
                    {activeJob && (
                        <TouchableOpacity activeOpacity={0.9} style={styles.activeJobContainer}>
                            <LinearGradient
                                colors={['#fbbf24', '#f59e0b']}
                                style={styles.activeJobCard}
                            >
                                <View style={styles.activeJobHeader}>
                                    <View style={styles.activeJobBadge}>
                                        <Text style={styles.activeJobBadgeText}>ACTIVE JOB</Text>
                                    </View>
                                    <Text style={styles.activeJobTime}>{new Date(activeJob.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                                </View>
                                <Text style={styles.activeJobTitle}>{activeJob.serviceName}</Text>
                                <Text style={styles.activeJobAddr}>{activeJob.address.line1}</Text>
                                <View style={styles.activeJobFooter}>
                                    <View style={styles.activeJobIcon}>
                                        <Ionicons name="navigate" size={16} color={COLORS.white} />
                                        <Text style={styles.activeJobFooterText}>Navigate</Text>
                                    </View>
                                    <Ionicons name="arrow-forward-circle" size={32} color={COLORS.white} />
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    )}

                    {/* Today's Schedule */}
                    <View style={styles.sectionHeader}>
                        <Text style={[styles.sectionTitle, { color: theme.onBackground }]}>Today's Schedule</Text>
                        <TouchableOpacity><Text style={{ color: COLORS.primary, fontWeight: FONT_WEIGHT.bold }}>View All</Text></TouchableOpacity>
                    </View>

                    {todayJobs.length === 0 ? (
                        <Card variant="flat" style={styles.emptyCard}>
                            <Ionicons name="calendar-outline" size={48} color={theme.onSurfaceVariant} />
                            <Text style={[styles.emptyText, { color: theme.onSurfaceVariant }]}>No jobs scheduled for today</Text>
                        </Card>
                    ) : (
                        todayJobs.map((job) => (
                            <Card key={job.id} style={styles.jobCard} variant="outlined">
                                <View style={styles.jobTimeBox}>
                                    <Text style={[styles.jobTime, { color: theme.onBackground }]}>{new Date(job.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                                    <View style={[styles.timeDot, { backgroundColor: job.status === 'completed' ? COLORS.success : COLORS.primary }]} />
                                </View>
                                <View style={styles.jobInfo}>
                                    <Text style={[styles.jobName, { color: theme.onBackground }]}>{job.customerName}</Text>
                                    <Text style={[styles.jobService, { color: theme.onSurfaceVariant }]}>{job.serviceName}</Text>
                                    <Text style={[styles.jobAddress, { color: theme.onSurfaceVariant }]} numberOfLines={1}>{job.address.line1}</Text>
                                </View>
                                <View style={styles.jobAction}>
                                    <Badge
                                        label={job.status}
                                        variant={job.status === 'completed' ? 'success' : job.status === 'scheduled' ? 'primary' : 'warning'}
                                        size="sm"
                                    />
                                    <Text style={[styles.jobPrice, { color: COLORS.success }]}>+₹{job.partnerEarnings}</Text>
                                </View>
                            </Card>
                        ))
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: 60,
        paddingBottom: 80,
        paddingHorizontal: SPACING.base,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
    greeting: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: FONT_SIZE.sm,
        fontWeight: FONT_WEIGHT.medium,
    },
    headerTitle: {
        color: COLORS.white,
        fontSize: FONT_SIZE['3xl'],
        fontWeight: FONT_WEIGHT.extrabold,
    },
    notifBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    notifDot: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.error,
        borderWidth: 1.5,
        borderColor: '#1e3a8a',
    },
    toggle: {
        position: 'absolute',
        bottom: -30,
        left: SPACING.base,
        right: SPACING.base,
    },
    content: {
        marginTop: 40,
        paddingHorizontal: SPACING.base,
        paddingBottom: 40,
    },
    statsRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: SPACING.xl,
    },
    statCard: {
        flex: 1,
        alignItems: 'center',
    },
    statValue: {
        fontSize: FONT_SIZE.lg,
        fontWeight: FONT_WEIGHT.extrabold,
    },
    statLabel: {
        fontSize: 10,
        fontWeight: FONT_WEIGHT.bold,
        textTransform: 'uppercase',
        marginTop: 2,
    },
    activeJobContainer: {
        marginBottom: SPACING.xl,
    },
    activeJobCard: {
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        ...SHADOW.lg,
    },
    activeJobHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    activeJobBadge: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: RADIUS.sm,
    },
    activeJobBadgeText: {
        color: COLORS.white,
        fontSize: 10,
        fontWeight: FONT_WEIGHT.extrabold,
    },
    activeJobTime: {
        color: COLORS.white,
        fontSize: FONT_SIZE.sm,
        fontWeight: FONT_WEIGHT.bold,
    },
    activeJobTitle: {
        color: COLORS.white,
        fontSize: FONT_SIZE.xl,
        fontWeight: FONT_WEIGHT.bold,
    },
    activeJobAddr: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: FONT_SIZE.sm,
        marginTop: 4,
    },
    activeJobFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
    },
    activeJobIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: RADIUS.full,
    },
    activeJobFooterText: {
        color: COLORS.white,
        fontSize: FONT_SIZE.xs,
        fontWeight: FONT_WEIGHT.bold,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.base,
    },
    sectionTitle: {
        fontSize: FONT_SIZE.lg,
        fontWeight: FONT_WEIGHT.bold,
    },
    emptyCard: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 160,
        gap: 12,
    },
    emptyText: {
        fontSize: FONT_SIZE.sm,
    },
    jobCard: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    jobTimeBox: {
        alignItems: 'center',
        marginRight: 12,
        width: 60,
    },
    jobTime: {
        fontSize: FONT_SIZE.xs,
        fontWeight: FONT_WEIGHT.bold,
    },
    timeDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginTop: 6,
    },
    jobInfo: {
        flex: 1,
    },
    jobName: {
        fontSize: FONT_SIZE.sm,
        fontWeight: FONT_WEIGHT.bold,
    },
    jobService: {
        fontSize: 10,
        marginTop: 2,
    },
    jobAddress: {
        fontSize: 10,
        marginTop: 2,
    },
    jobAction: {
        alignItems: 'flex-end',
        gap: 8,
    },
    jobPrice: {
        fontSize: FONT_SIZE.sm,
        fontWeight: FONT_WEIGHT.extrabold,
    },
});
