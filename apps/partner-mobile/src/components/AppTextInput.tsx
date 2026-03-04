import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    TextInputProps,
    ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@hooks/useTheme';
import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SPACING } from '@utils/theme';

interface AppTextInputProps extends TextInputProps {
    label?: string;
    error?: string;
    leftIcon?: React.ComponentProps<typeof Ionicons>['name'];
    rightIcon?: React.ReactNode;
    containerStyle?: ViewStyle;
}

export const AppTextInput: React.FC<AppTextInputProps> = ({
    label,
    error,
    leftIcon,
    rightIcon,
    containerStyle,
    secureTextEntry,
    onFocus,
    onBlur,
    ...props
}) => {
    const { theme } = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleFocus = (e: any) => {
        setIsFocused(true);
        onFocus?.(e);
    };

    const handleBlur = (e: any) => {
        setIsFocused(false);
        onBlur?.(e);
    };

    const isSecure = secureTextEntry && !isPasswordVisible;

    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={[styles.label, { color: theme.onSurfaceVariant }]}>{label}</Text>}
            <View
                style={[
                    styles.inputWrapper,
                    {
                        backgroundColor: theme.surfaceVariant,
                        borderColor: error ? COLORS.error : isFocused ? COLORS.primary : theme.border,
                        borderWidth: isFocused || error ? 1.5 : 1,
                    },
                ]}
            >
                {leftIcon && (
                    <Ionicons
                        name={leftIcon}
                        size={20}
                        color={error ? COLORS.error : isFocused ? COLORS.primary : theme.onSurfaceVariant}
                        style={styles.leftIcon}
                    />
                )}
                <TextInput
                    style={[styles.input, { color: theme.onSurface }]}
                    placeholderTextColor={theme.onSurfaceVariant}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    secureTextEntry={isSecure}
                    {...props}
                />
                {secureTextEntry ? (
                    <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.rightIcon}>
                        <Ionicons
                            name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                            size={20}
                            color={theme.onSurfaceVariant}
                        />
                    </TouchableOpacity>
                ) : (
                    rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>
                )}
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING.base,
        width: '100%',
    },
    label: {
        fontSize: FONT_SIZE.sm,
        fontWeight: FONT_WEIGHT.semibold,
        marginBottom: 6,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: RADIUS.lg,
        paddingHorizontal: 12,
        height: 52,
    },
    input: {
        flex: 1,
        height: '100%',
        fontSize: FONT_SIZE.base,
        paddingVertical: 0,
    },
    leftIcon: {
        marginRight: 10,
    },
    rightIcon: {
        marginLeft: 10,
    },
    errorText: {
        color: COLORS.error,
        fontSize: FONT_SIZE.xs,
        marginTop: 4,
        fontWeight: FONT_WEIGHT.medium,
    },
});
