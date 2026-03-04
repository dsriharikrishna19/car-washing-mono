import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SPACING } from '@utils/theme';

export type BadgeVariant = 'primary' | 'success' | 'warning' | 'error' | 'neutral';

interface BadgeProps {
    label: string;
    variant?: BadgeVariant;
    style?: ViewStyle;
    textStyle?: TextStyle;
    size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
    label,
    variant = 'neutral',
    style,
    textStyle,
    size = 'md',
}) => {
    const getVariantStyles = () => {
        switch (variant) {
            case 'primary': return { backgroundColor: COLORS.primary100, color: COLORS.primary700 };
            case 'success': return { backgroundColor: '#d1fae5', color: COLORS.success700 };
            case 'warning': return { backgroundColor: '#fef3c7', color: COLORS.warning700 };
            case 'error': return { backgroundColor: '#fee2e2', color: COLORS.error700 };
            default: return { backgroundColor: COLORS.carbon200, color: COLORS.carbon700 };
        }
    };

    const v = getVariantStyles();

    return (
        <View style={[
            styles.base,
            { backgroundColor: v.backgroundColor },
            size === 'sm' && styles.sm,
            style
        ]}>
            <Text style={[
                styles.text,
                { color: v.color },
                size === 'sm' && styles.smText,
                textStyle
            ]}>
                {label}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    base: {
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: RADIUS.full,
    },
    sm: {
        paddingHorizontal: 8,
        paddingVertical: 2,
    },
    text: {
        fontSize: FONT_SIZE.xs,
        fontWeight: FONT_WEIGHT.bold,
        textTransform: 'uppercase',
    },
    smText: {
        fontSize: 10,
    },
});

// Helper for job status badges
export const jobStatusBadge = (status: string) => {
    switch (status) {
        case 'scheduled': return <Badge label="Scheduled" variant="primary" />;
        case 'partner_en_route': return <Badge label="En Route" variant="warning" />;
        case 'in_progress': return <Badge label="In Progress" variant="success" />;
        case 'completed': return <Badge label="Completed" variant="success" />;
        case 'cancelled': return <Badge label="Cancelled" variant="error" />;
        case 'rejected': return <Badge label="Rejected" variant="error" />;
        default: return <Badge label={status} />;
    }
};
