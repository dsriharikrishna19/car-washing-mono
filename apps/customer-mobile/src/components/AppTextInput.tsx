import React, { useState } from 'react';
import {
    View,
    TextInput as RNTextInput,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInputProps,
    ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@hooks/useTheme';
import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SPACING } from '@utils/theme';

interface AppTextInputProps extends TextInputProps {
    label?: string;
    error?: string;
    hint?: string;
    leftIcon?: React.ComponentProps<typeof Ionicons>['name'];
    rightIcon?: React.ComponentProps<typeof Ionicons>['name'];
    onRightIconPress?: () => void;
    containerStyle?: ViewStyle;
    isPassword?: boolean;
}

export const AppTextInput: React.FC<AppTextInputProps> = ({
    label,
    error,
    hint,
    leftIcon,
    rightIcon,
    onRightIconPress,
    containerStyle,
    isPassword = false,
    ...props
}) => {
    const { theme } = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const borderColor = error
        ? COLORS.error
        : isFocused
            ? COLORS.primary
            : theme.border;

    return (
        <View style={[styles.container, containerStyle]}>
            {label && (
                <Text style={[styles.label, { color: theme.onSurface }]}>{label}</Text>
            )}
            <View
                style={[
                    styles.inputWrapper,
                    {
                        backgroundColor: theme.surfaceVariant,
                        borderColor,
                        borderWidth: isFocused || error ? 1.5 : 1,
                    },
                ]}
            >
                {leftIcon && (
                    <Ionicons
                        name={leftIcon}
                        size={18}
                        color={isFocused ? COLORS.primary : theme.onSurfaceVariant}
                        style={styles.leftIcon}
                    />
                )}
                <RNTextInput
                    style={[
                        styles.input,
                        {
                            color: theme.onBackground,
                            flex: 1,
                        },
                    ]}
                    placeholderTextColor={theme.onSurfaceVariant}
                    secureTextEntry={isPassword && !showPassword}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...props}
                />
                {(isPassword || rightIcon) && (
                    <TouchableOpacity
                        onPress={isPassword ? () => setShowPassword((v) => !v) : onRightIconPress}
                        style={styles.rightIcon}
                    >
                        <Ionicons
                            name={
                                isPassword
                                    ? showPassword
                                        ? 'eye-off-outline'
                                        : 'eye-outline'
                                    : (rightIcon as React.ComponentProps<typeof Ionicons>['name'])
                            }
                            size={18}
                            color={theme.onSurfaceVariant}
                        />
                    </TouchableOpacity>
                )}
            </View>
            {error && <Text style={styles.error}>{error}</Text>}
            {hint && !error && <Text style={[styles.hint, { color: theme.onSurfaceVariant }]}>{hint}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { marginBottom: SPACING.md },
    label: {
        fontSize: FONT_SIZE.sm,
        fontWeight: FONT_WEIGHT.semibold,
        marginBottom: 6,
        letterSpacing: 0.2,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: RADIUS.xl,
        paddingHorizontal: SPACING.base,
        height: 52,
    },
    input: {
        fontSize: FONT_SIZE.base,
        paddingVertical: 0,
    },
    leftIcon: { marginRight: 8 },
    rightIcon: { paddingLeft: 8 },
    error: {
        fontSize: FONT_SIZE.xs,
        color: COLORS.error,
        marginTop: 4,
        marginLeft: 4,
    },
    hint: {
        fontSize: FONT_SIZE.xs,
        marginTop: 4,
        marginLeft: 4,
    },
});
