import React from 'react';
import {
    TouchableOpacity,
    Text,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
    StyleSheet,
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { COLORS, RADIUS, FONT_SIZE, FONT_WEIGHT, SPACING } from '@utils/theme';
import { useTheme } from '@hooks/useTheme';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
    label: string;
    onPress: () => void;
    variant?: Variant;
    size?: Size;
    isLoading?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const Button: React.FC<ButtonProps> = ({
    label,
    onPress,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    disabled = false,
    fullWidth = false,
    style,
    textStyle,
    leftIcon,
    rightIcon,
}) => {
    const { theme } = useTheme();
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePressIn = () => {
        scale.value = withSpring(0.96, { damping: 15, stiffness: 400 });
    };
    const handlePressOut = () => {
        scale.value = withSpring(1, { damping: 15, stiffness: 400 });
    };

    const sizeStyles: Record<Size, ViewStyle> = {
        sm: { height: 36, paddingHorizontal: SPACING.md, borderRadius: RADIUS.lg },
        md: { height: 50, paddingHorizontal: SPACING.xl, borderRadius: RADIUS.xl },
        lg: { height: 58, paddingHorizontal: SPACING['2xl'], borderRadius: RADIUS['2xl'] },
    };

    const textSizes: Record<Size, number> = {
        sm: FONT_SIZE.sm,
        md: FONT_SIZE.base,
        lg: FONT_SIZE.lg,
    };

    const variantStyles: Record<Variant, { container: ViewStyle; text: TextStyle }> = {
        primary: {
            container: { backgroundColor: disabled ? COLORS.carbon400 : COLORS.primary },
            text: { color: COLORS.white },
        },
        secondary: {
            container: { backgroundColor: COLORS.spark },
            text: { color: COLORS.carbon900 },
        },
        outline: {
            container: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: COLORS.primary },
            text: { color: COLORS.primary },
        },
        ghost: {
            container: { backgroundColor: 'transparent' },
            text: { color: COLORS.primary },
        },
        danger: {
            container: { backgroundColor: COLORS.error },
            text: { color: COLORS.white },
        },
    };

    return (
        <AnimatedTouchable
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={0.85}
            disabled={disabled || isLoading}
            style={[
                styles.base,
                sizeStyles[size],
                variantStyles[variant].container,
                fullWidth && { width: '100%' },
                (disabled || isLoading) && { opacity: 0.6 },
                animatedStyle,
                style,
            ]}
        >
            {leftIcon && !isLoading && leftIcon}
            {isLoading ? (
                <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? COLORS.primary : COLORS.white} />
            ) : (
                <Text
                    style={[
                        styles.text,
                        { fontSize: textSizes[size], color: variantStyles[variant].text.color },
                        textStyle,
                    ]}
                >
                    {label}
                </Text>
            )}
            {rightIcon && !isLoading && rightIcon}
        </AnimatedTouchable>
    );
};

const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    text: {
        fontWeight: FONT_WEIGHT.semibold,
        letterSpacing: 0.2,
    },
});
