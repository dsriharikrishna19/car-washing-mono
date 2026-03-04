import React, { useEffect } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
    interpolateColor,
} from 'react-native-reanimated';
import { useTheme } from '@hooks/useTheme';
import { RADIUS } from '@utils/theme';

interface SkeletonProps {
    width?: number | `${number}%`;
    height?: number;
    borderRadius?: number;
    style?: ViewStyle;
}

export const Skeleton: React.FC<SkeletonProps> = ({
    width = '100%',
    height = 16,
    borderRadius = RADIUS.md,
    style,
}) => {
    const { theme, isDark } = useTheme();
    const shimmer = useSharedValue(0);

    useEffect(() => {
        shimmer.value = withRepeat(withTiming(1, { duration: 900 }), -1, true);
    }, [shimmer]);

    const animStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(
            shimmer.value,
            [0, 1],
            isDark
                ? ['#1e293b', '#334155']
                : ['#e2e8f0', '#f1f5f9'],
        ),
    }));

    return (
        <Animated.View style={[{ width, height, borderRadius }, animStyle, style]} />
    );
};

export const ServiceCardSkeleton: React.FC = () => {
    const { theme } = useTheme();
    return (
        <View style={[styles.cardSkeleton, { backgroundColor: theme.surface }]}>
            <Skeleton height={140} borderRadius={RADIUS.xl} />
            <View style={{ padding: 12, gap: 8 }}>
                <Skeleton height={14} width="75%" />
                <Skeleton height={12} width="50%" />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Skeleton height={14} width={60} />
                    <Skeleton height={14} width={80} />
                </View>
            </View>
        </View>
    );
};

export const BookingCardSkeleton: React.FC = () => {
    const { theme } = useTheme();
    return (
        <View style={[styles.bookingCardSkeleton, { backgroundColor: theme.surface }]}>
            <View style={{ gap: 10, flex: 1 }}>
                <Skeleton height={16} width="60%" />
                <Skeleton height={12} width="40%" />
                <Skeleton height={12} width="50%" />
            </View>
            <Skeleton width={70} height={28} borderRadius={RADIUS.full} />
        </View>
    );
};

const styles = StyleSheet.create({
    cardSkeleton: {
        borderRadius: RADIUS.xl,
        overflow: 'hidden',
        width: 200,
        marginRight: 12,
    },
    bookingCardSkeleton: {
        borderRadius: RADIUS.xl,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
});
