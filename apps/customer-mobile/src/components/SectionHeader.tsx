import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@hooks/useTheme';
import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACING } from '@utils/theme';

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    onSeeAll?: () => void;
    seeAllLabel?: string;
    style?: import('react-native').ViewStyle;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
    title,
    subtitle,
    onSeeAll,
    seeAllLabel = 'See All',
    style,
}) => {
    const { theme } = useTheme();
    return (
        <View style={[styles.row, style]}>
            <View style={{ flex: 1 }}>
                <Text style={[styles.title, { color: theme.onBackground }]}>{title}</Text>
                {subtitle && (
                    <Text style={[styles.subtitle, { color: theme.onSurfaceVariant }]}>{subtitle}</Text>
                )}
            </View>
            {onSeeAll && (
                <TouchableOpacity onPress={onSeeAll} style={styles.seeAll} activeOpacity={0.7}>
                    <Text style={styles.seeAllText}>{seeAllLabel}</Text>
                    <Ionicons name="chevron-forward" size={14} color={COLORS.primary} />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.base,
        paddingHorizontal: SPACING.base,
    },
    title: {
        fontSize: FONT_SIZE.lg,
        fontWeight: FONT_WEIGHT.bold,
        letterSpacing: -0.3,
    },
    subtitle: {
        fontSize: FONT_SIZE.xs,
        marginTop: 2,
    },
    seeAll: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
    seeAllText: {
        fontSize: FONT_SIZE.sm,
        fontWeight: FONT_WEIGHT.semibold,
        color: COLORS.primary,
    },
});
