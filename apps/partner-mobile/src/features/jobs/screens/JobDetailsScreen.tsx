import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Alert,
    Linking,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { Card } from '@components/Card';
import { Button } from '@components/Button';
import { Badge, jobStatusBadge } from '@components/Badge';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useTheme } from '@hooks/useTheme';
import { updateJobStatusThunk } from '@store/slices/jobsSlice';
import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SPACING } from '@utils/theme';
import type { Job } from '@appTypes/index';

export default function JobDetailsScreen() {
    const route = useRoute<RouteProp<{ params: { job: Job } }, 'params'>>();
    const nav = useNavigation();
    const dispatch = useAppDispatch();
    const { theme } = useTheme();
    const { job } = route.params;

    const [isLoading, setIsLoading] = useState(false);

    const onNavigate = () => {
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${job.address.latitude},${job.address.longitude}`;
        const label = job.address.line1;
        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`,
        });
        if (url) Linking.openURL(url);
    };

    const onCall = () => {
        Linking.openURL(`tel:${job.customerPhone}`);
    };

    const handleStatusUpdate = async (nextStatus: Job['status']) => {
        setIsLoading(true);
        const result = await dispatch(updateJobStatusThunk({ jobId: job.id, status: nextStatus }));
        setIsLoading(false);

        if (updateJobStatusThunk.fulfilled.match(result)) {
            Alert.alert('Status Updated', `Job status is now ${nextStatus.replace('_', ' ')}`);
            nav.goBack();
        }
    };

    const getActionButton = () => {
        switch (job.status) {
            case 'scheduled':
                return (
                    <Button
                        label="En Route to Customer"
                        onPress={() => handleStatusUpdate('partner_en_route')}
                        isLoading={isLoading}
                        fullWidth
                        leftIcon={<Ionicons name="car" size={20} color={COLORS.white} />}
                    />
                );
            case 'partner_en_route':
                return (
                    <Button
                        label="Reached & Start Service"
                        onPress={() => handleStatusUpdate('in_progress')}
                        isLoading={isLoading}
                        fullWidth
                        variant="success"
                        leftIcon={<Ionicons name="play" size={20} color={COLORS.white} />}
                    />
                );
            case 'in_progress':
                return (
                    <View style={{ gap: 12 }}>
                        <TouchableOpacity style={styles.photoPicker} activeOpacity={0.7}>
                            <Ionicons name="camera" size={32} color={COLORS.primary} />
                            <Text style={{ fontWeight: FONT_WEIGHT.bold, color: COLORS.primary, marginTop: 8 }}>
                                Upload Before/After Photos
                            </Text>
                        </TouchableOpacity>
                        <Button
                            label="Complete Service"
                            onPress={() => handleStatusUpdate('completed')}
                            isLoading={isLoading}
                            fullWidth
                            variant="success"
                            leftIcon={<Ionicons name="checkmark-circle" size={20} color={COLORS.white} />}
                        />
                    </View>
                );
            case 'completed':
                return <Badge label="Service Completed" variant="success" style={{ alignSelf: 'center' }} />;
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => nav.goBack()}>
                    <Ionicons name="arrow-back" size={24} color={theme.onBackground} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: theme.onBackground }]}>Job Details</Text>
                <TouchableOpacity onPress={onCall}>
                    <Ionicons name="call-outline" size={24} color={COLORS.primary} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Card style={styles.mainCard}>
                    <View style={styles.statusRow}>
                        {jobStatusBadge(job.status)}
                        <Text style={[styles.timeText, { color: theme.onSurfaceVariant }]}>
                            {new Date(job.scheduledAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })},
                            {new Date(job.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </Text>
                    </View>
                    <Text style={[styles.serviceName, { color: theme.onBackground }]}>{job.serviceName}</Text>
                    <View style={styles.priceRow}>
                        <Text style={[styles.priceLabel, { color: theme.onSurfaceVariant }]}>Your Earnings</Text>
                        <Text style={styles.priceValue}>₹{job.partnerEarnings}</Text>
                    </View>
                </Card>

                {/* Customer & Location */}
                <Text style={[styles.sectionTitle, { color: theme.onBackground }]}>Customer Information</Text>
                <Card variant="outlined" style={styles.infoCard}>
                    <View style={styles.row}>
                        <View style={styles.iconCircle}>
                            <Ionicons name="person" size={20} color={COLORS.primary} />
                        </View>
                        <View style={styles.infoText}>
                            <Text style={[styles.label, { color: theme.onSurfaceVariant }]}>Customer Name</Text>
                            <Text style={[styles.value, { color: theme.onBackground }]}>{job.customerName}</Text>
                        </View>
                    </View>
                    <View style={[styles.divider, { backgroundColor: theme.border }]} />
                    <View style={styles.row}>
                        <View style={styles.iconCircle}>
                            <Ionicons name="location" size={20} color={COLORS.primary} />
                        </View>
                        <View style={styles.infoText}>
                            <Text style={[styles.label, { color: theme.onSurfaceVariant }]}>Service Address</Text>
                            <Text style={[styles.value, { color: theme.onBackground }]}>{job.address.line1}</Text>
                        </View>
                        <TouchableOpacity style={styles.navBtn} onPress={onNavigate}>
                            <Ionicons name="navigate-outline" size={20} color={COLORS.white} />
                        </TouchableOpacity>
                    </View>
                </Card>

                {/* Car Details */}
                <Text style={[styles.sectionTitle, { color: theme.onBackground }]}>Vehicle Details</Text>
                <Card variant="outlined" style={styles.infoCard}>
                    <View style={styles.row}>
                        <View style={styles.iconCircle}>
                            <Ionicons name="car-sport" size={20} color={COLORS.primary} />
                        </View>
                        <View style={styles.infoText}>
                            <Text style={[styles.label, { color: theme.onSurfaceVariant }]}>Model</Text>
                            <Text style={[styles.value, { color: theme.onBackground }]}>{job.car.model}</Text>
                        </View>
                        <Badge label={job.car.type} variant="neutral" size="sm" />
                    </View>
                    <View style={[styles.divider, { backgroundColor: theme.border }]} />
                    <View style={styles.row}>
                        <View style={styles.iconCircle}>
                            <Ionicons name="barcode" size={20} color={COLORS.primary} />
                        </View>
                        <View style={styles.infoText}>
                            <Text style={[styles.label, { color: theme.onSurfaceVariant }]}>Plate Number</Text>
                            <Text style={[styles.value, { color: theme.onBackground }]}>{job.car.plateNumber}</Text>
                        </View>
                    </View>
                </Card>
            </ScrollView>

            {/* Sticky Bottom Actions */}
            <View style={[styles.footer, { backgroundColor: theme.surface, borderTopColor: theme.border }]}>
                {getActionButton()}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.base,
        paddingVertical: 12,
    },
    headerTitle: {
        fontSize: FONT_SIZE.lg,
        fontWeight: FONT_WEIGHT.bold,
    },
    scrollContent: {
        padding: SPACING.base,
        paddingBottom: 120,
    },
    mainCard: {
        padding: SPACING.lg,
        marginBottom: SPACING.xl,
        backgroundColor: COLORS.white,
    },
    statusRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    timeText: {
        fontSize: FONT_SIZE.xs,
        fontWeight: FONT_WEIGHT.medium,
    },
    serviceName: {
        fontSize: FONT_SIZE['2xl'],
        fontWeight: FONT_WEIGHT.bold,
        marginBottom: 16,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceLabel: {
        fontSize: FONT_SIZE.sm,
        fontWeight: FONT_WEIGHT.medium,
    },
    priceValue: {
        fontSize: FONT_SIZE.xl,
        fontWeight: FONT_WEIGHT.extrabold,
        color: COLORS.success,
    },
    sectionTitle: {
        fontSize: FONT_SIZE.base,
        fontWeight: FONT_WEIGHT.bold,
        marginBottom: 12,
        marginTop: 8,
    },
    infoCard: {
        padding: SPACING.base,
        marginBottom: SPACING.lg,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: COLORS.primary100,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    infoText: {
        flex: 1,
    },
    label: {
        fontSize: 10,
        fontWeight: FONT_WEIGHT.bold,
        textTransform: 'uppercase',
    },
    value: {
        fontSize: FONT_SIZE.sm,
        fontWeight: FONT_WEIGHT.semibold,
        marginTop: 2,
    },
    divider: {
        height: 1,
        marginVertical: 16,
    },
    navBtn: {
        width: 36,
        height: 36,
        borderRadius: RADIUS.md,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: SPACING.lg,
        borderTopWidth: 1,
    },
    photoPicker: {
        height: 120,
        borderRadius: RADIUS.lg,
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: COLORS.primary200,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary50,
    },
});
