import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SPACING } from '@utils/theme';
import type { BookingStatus } from '@appTypes/index';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'default';

interface BadgeProps {
    label: string;
    variant?: BadgeVariant;
}

const variantConfig: Record<BadgeVariant, { bg: string; text: string }> = {
    success: { bg: '#dcfce7', text: '#15803d' },
    warning: { bg: '#fef9c3', text: '#a16207' },
    error: { bg: '#fee2e2', text: '#b91c1c' },
    info: { bg: '#dbeafe', text: '#1e40af' },
    default: { bg: '#f1f5f9', text: '#475569' },
};

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'default' }) => {
    const config = variantConfig[variant];
    return (
        <View style={[styles.badge, { backgroundColor: config.bg }]}>
            <Text style={[styles.text, { color: config.text }]}>{label}</Text>
        </View>
    );
};

export const bookingStatusBadge = (status: BookingStatus): React.ReactElement => {
    const map: Record<BookingStatus, { label: string; variant: BadgeVariant }> = {
        pending: { label: 'Pending', variant: 'warning' },
        confirmed: { label: 'Confirmed', variant: 'info' },
        partner_assigned: { label: 'Partner Assigned', variant: 'info' },
        partner_en_route: { label: 'En Route', variant: 'info' },
        in_progress: { label: 'In Progress', variant: 'warning' },
        completed: { label: 'Completed', variant: 'success' },
        cancelled: { label: 'Cancelled', variant: 'error' },
    };
    const { label, variant } = map[status];
    return <Badge label={label} variant={variant} />;
};

const styles = StyleSheet.create({
    badge: {
        paddingHorizontal: SPACING.sm,
        paddingVertical: 4,
        borderRadius: RADIUS.full,
        alignSelf: 'flex-start',
    },
    text: {
        fontSize: FONT_SIZE.xs,
        fontWeight: FONT_WEIGHT.semibold,
        letterSpacing: 0.3,
    },
});
