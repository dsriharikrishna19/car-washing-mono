import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@hooks/useTheme';
import { RADIUS, SHADOW, SPACING } from '@utils/theme';

interface CardProps {
    children: React.ReactNode;
    style?: ViewStyle;
    variant?: 'elevated' | 'outlined' | 'flat';
    padding?: keyof typeof SPACING | number;
}

export const Card: React.FC<CardProps> = ({
    children,
    style,
    variant = 'elevated',
    padding = 'base',
}) => {
    const { theme } = useTheme();

    const p = typeof padding === 'string' ? SPACING[padding] : padding;

    const getVariantStyles = () => {
        switch (variant) {
            case 'outlined':
                return {
                    borderWidth: 1,
                    borderColor: theme.border,
                    backgroundColor: theme.surface,
                };
            case 'flat':
                return {
                    backgroundColor: theme.surfaceVariant,
                };
            default:
                return {
                    backgroundColor: theme.surface,
                    ...SHADOW.md,
                };
        }
    };

    return (
        <View style={[styles.base, getVariantStyles(), { padding: p }, style]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    base: {
        borderRadius: RADIUS.xl,
        overflow: 'hidden',
    },
});
