import React, { useCallback } from 'react';
import {
    TouchableOpacity,
    Text,
    ActivityIndicator,
    StyleSheet,
    ViewStyle,
    TextStyle,
    Animated,
} from 'react-native';
import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SPACING } from '@utils/theme';

interface ButtonProps {
    label: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    disabled?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    style?: ViewStyle;
    textStyle?: TextStyle;
    fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    label,
    onPress,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    disabled = false,
    leftIcon,
    rightIcon,
    style,
    textStyle,
    fullWidth = false,
}) => {
    const animatedScale = new Animated.Value(1);

    const onPressIn = useCallback(() => {
        Animated.spring(animatedScale, {
            toValue: 0.96,
            useNativeDriver: true,
        }).start();
    }, [animatedScale]);

    const onPressOut = useCallback(() => {
        Animated.spring(animatedScale, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    }, [animatedScale]);

    const getVariantStyles = () => {
        switch (variant) {
            case 'secondary': return { backgroundColor: COLORS.carbon200 };
            case 'outline': return { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: COLORS.primary };
            case 'ghost': return { backgroundColor: 'transparent' };
            case 'success': return { backgroundColor: COLORS.success };
            case 'danger': return { backgroundColor: COLORS.error };
            default: return { backgroundColor: COLORS.primary };
        }
    };

    const getTextStyles = () => {
        switch (variant) {
            case 'secondary': return { color: COLORS.carbon900 };
            case 'outline': return { color: COLORS.primary };
            case 'ghost': return { color: COLORS.primary };
            default: return { color: COLORS.white };
        }
    };

    const getSizeStyles = () => {
        switch (size) {
            case 'sm': return { paddingVertical: 8, paddingHorizontal: 16 };
            case 'lg': return { paddingVertical: 16, paddingHorizontal: 32 };
            default: return { paddingVertical: 12, paddingHorizontal: 24 };
        }
    };

    return (
        <Animated.View style={{ transform: [{ scale: animatedScale }], width: fullWidth ? '100%' : 'auto' }}>
            <TouchableOpacity
                onPress={onPress}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                disabled={disabled || isLoading}
                activeOpacity={1}
                style={[
                    styles.base,
                    getVariantStyles(),
                    getSizeStyles(),
                    disabled && styles.disabled,
                    style,
                ]}
            >
                {isLoading ? (
                    <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? COLORS.primary : COLORS.white} />
                ) : (
                    <>
                        {leftIcon && <Animated.View style={styles.iconLeft}>{leftIcon}</Animated.View>}
                        <Text style={[styles.text, getTextStyles(), textStyle]}>
                            {label}
                        </Text>
                        {rightIcon && <Animated.View style={styles.iconRight}>{rightIcon}</Animated.View>}
                    </>
                )}
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    base: {
        borderRadius: RADIUS.lg,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: FONT_SIZE.base,
        fontWeight: FONT_WEIGHT.bold,
    },
    disabled: {
        opacity: 0.5,
    },
    iconLeft: {
        marginRight: 8,
    },
    iconRight: {
        marginLeft: 8,
    },
});
