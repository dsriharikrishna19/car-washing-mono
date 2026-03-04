import React, { useRef, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
    ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SHADOW, SPACING } from '@utils/theme';

interface StatusToggleProps {
    isOnline: boolean;
    onToggle: (status: boolean) => void;
    isLoading?: boolean;
    style?: ViewStyle;
}

export const StatusToggle: React.FC<StatusToggleProps> = ({
    isOnline,
    onToggle,
    isLoading = false,
    style,
}) => {
    const animatedValue = useRef(new Animated.Value(isOnline ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: isOnline ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [isOnline, animatedValue]);

    const backgroundColor = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [COLORS.carbon200, COLORS.success],
    });

    const translateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [4, 40],
    });

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => !isLoading && onToggle(!isOnline)}
            style={[styles.container, style]}
        >
            <View style={styles.info}>
                <Text style={[styles.statusText, { color: isOnline ? COLORS.success : COLORS.carbon600 }]}>
                    {isOnline ? 'ONLINE' : 'OFFLINE'}
                </Text>
                <Text style={styles.hintText}>
                    {isOnline ? 'You are visible for jobs' : 'Go online to receive jobs'}
                </Text>
            </View>
            <Animated.View style={[styles.switchTrack, { backgroundColor }]}>
                <Animated.View style={[styles.switchThumb, { transform: [{ translateX }] }, SHADOW.sm]}>
                    {isLoading ? (
                        <View style={styles.loaderLine} />
                    ) : (
                        <Ionicons
                            name={isOnline ? 'radio-button-on' : 'radio-button-off'}
                            size={14}
                            color={isOnline ? COLORS.success : COLORS.carbon400}
                        />
                    )}
                </Animated.View>
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.white,
        padding: SPACING.base,
        borderRadius: RADIUS.xl,
        ...SHADOW.md,
    },
    info: {
        flex: 1,
    },
    statusText: {
        fontSize: FONT_SIZE.base,
        fontWeight: FONT_WEIGHT.extrabold,
        letterSpacing: 1,
    },
    hintText: {
        fontSize: FONT_SIZE.xs,
        color: COLORS.carbon500,
        marginTop: 2,
    },
    switchTrack: {
        width: 72,
        height: 36,
        borderRadius: 18,
        padding: 4,
        justifyContent: 'center',
    },
    switchThumb: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loaderLine: {
        width: 14,
        height: 2,
        backgroundColor: COLORS.primary,
        borderRadius: 1,
    },
});
