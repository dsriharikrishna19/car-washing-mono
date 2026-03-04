import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button } from '@components/Button';
import { useAppDispatch, useAppSelector } from '@hooks/useAppDispatch';
import { verifyOTPThunk, loginThunk } from '@store/slices/authSlice';
import { useTheme } from '@hooks/useTheme';
import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SPACING } from '@utils/theme';
import type { AuthStackParamList } from '@navigation/AuthNavigator';

export default function OTPScreen() {
    const nav = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
    const route = useRoute<RouteProp<AuthStackParamList, 'OTP'>>();
    const dispatch = useAppDispatch();
    const { theme } = useTheme();
    const { isLoading, error } = useAppSelector((state) => state.auth);

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(30);
    const inputRefs = useRef<TextInput[]>([]);

    const { phone } = route.params;

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (text: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text.length !== 0 && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const onVerify = async () => {
        const otpString = otp.join('');
        if (otpString.length === 6) {
            const result = await dispatch(verifyOTPThunk({ phone, otp: otpString }));
            if (verifyOTPThunk.fulfilled.match(result)) {
                // Automatically check if onboarded or redirect to Dashboard if active
                // For demo, we just assume next state
            }
        }
    };

    const onResend = () => {
        if (timer === 0) {
            dispatch(loginThunk(phone));
            setTimer(30);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <TouchableOpacity style={styles.backBtn} onPress={() => nav.goBack()}>
                    <Ionicons name="arrow-back" size={24} color={theme.onBackground} />
                </TouchableOpacity>

                <Text style={[styles.title, { color: theme.onBackground }]}>Verify OTP</Text>
                <Text style={[styles.subtitle, { color: theme.onSurfaceVariant }]}>
                    Enter the 6-digit code sent to +91 {phone}
                </Text>

                <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(ref) => {
                                inputRefs.current[index] = ref as TextInput;
                            }}
                            style={[
                                styles.otpInput,
                                {
                                    backgroundColor: theme.surfaceVariant,
                                    borderColor: digit ? COLORS.primary : theme.border,
                                    color: theme.onSurface,
                                },
                            ]}
                            keyboardType="number-pad"
                            maxLength={1}
                            value={digit}
                            onChangeText={(text) => handleChange(text, index)}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                        />
                    ))}
                </View>

                {error && <Text style={styles.errorText}>{error as string}</Text>}

                <View style={styles.resendContainer}>
                    <Text style={[styles.resendText, { color: theme.onSurfaceVariant }]}>
                        Did't receive code?{' '}
                    </Text>
                    <TouchableOpacity onPress={onResend} disabled={timer > 0}>
                        <Text style={[styles.resendLink, { color: timer === 0 ? COLORS.primary : theme.onSurfaceVariant }]}>
                            {timer > 0 ? `Resend in ${timer}s` : 'Resend Code'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <Button
                    label="Verify & Continue"
                    onPress={onVerify}
                    isLoading={isLoading}
                    disabled={otp.join('').length < 6}
                    fullWidth
                    style={{ marginTop: SPACING.xl }}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: SPACING.xl,
        paddingTop: 60,
    },
    backBtn: {
        marginBottom: SPACING.xl,
        alignSelf: 'flex-start',
    },
    title: {
        fontSize: FONT_SIZE['3xl'],
        fontWeight: FONT_WEIGHT.bold,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: FONT_SIZE.base,
        marginBottom: SPACING['3xl'],
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SPACING.xl,
    },
    otpInput: {
        width: 48,
        height: 56,
        borderRadius: RADIUS.lg,
        borderWidth: 1.5,
        textAlign: 'center',
        fontSize: FONT_SIZE.xl,
        fontWeight: FONT_WEIGHT.bold,
    },
    errorText: {
        color: COLORS.error,
        fontSize: FONT_SIZE.sm,
        textAlign: 'center',
        marginBottom: SPACING.base,
    },
    resendContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: SPACING.base,
    },
    resendText: {
        fontSize: FONT_SIZE.sm,
    },
    resendLink: {
        fontSize: FONT_SIZE.sm,
        fontWeight: FONT_WEIGHT.bold,
    },
});
