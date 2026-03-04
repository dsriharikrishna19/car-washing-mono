import React, { useRef, useState } from 'react';
import {
    View, Text, StyleSheet, SafeAreaView, TextInput,
    TouchableOpacity, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button } from '@components/Button';
import { useAppDispatch, useAppSelector } from '@hooks/useAppDispatch';
import { verifyOtpThunk, sendOtpThunk } from '@store/slices/authSlice';
import { useTheme } from '@hooks/useTheme';
import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACING, RADIUS } from '@utils/theme';
import type { AuthStackParamList } from '@navigation/AuthNavigator';

const OTP_LENGTH = 6;

export default function OTPScreen() {
    const nav = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
    const route = useRoute<RouteProp<AuthStackParamList, 'OTP'>>();
    const { phone } = route.params;
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector((s) => s.auth);
    const { theme, isDark } = useTheme();

    const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
    const inputs = useRef<(TextInput | null)[]>([]);

    const handleChange = (text: string, idx: number) => {
        const val = text.replace(/[^0-9]/g, '');
        const newOtp = [...otp];
        newOtp[idx] = val;
        setOtp(newOtp);
        if (val && idx < OTP_LENGTH - 1) inputs.current[idx + 1]?.focus();
    };

    const handleKeyPress = (key: string, idx: number) => {
        if (key === 'Backspace' && !otp[idx] && idx > 0) {
            inputs.current[idx - 1]?.focus();
        }
    };

    const handleVerify = async () => {
        const code = otp.join('');
        if (code.length < OTP_LENGTH) { Alert.alert('Please enter the full OTP'); return; }
        const result = await dispatch(verifyOtpThunk({ phone, otp: code }));
        if (verifyOtpThunk.rejected.match(result)) {
            Alert.alert('Invalid OTP', result.payload as string);
        }
    };

    const handleResend = () => {
        dispatch(sendOtpThunk(phone));
        setOtp(Array(OTP_LENGTH).fill(''));
        inputs.current[0]?.focus();
    };

    return (
        <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
            <LinearGradient
                colors={isDark ? [COLORS.carbon950, COLORS.carbon900] : [COLORS.primary900, COLORS.primary]}
                style={styles.header}
            >
                <TouchableOpacity onPress={() => nav.goBack()} style={styles.back}>
                    <Ionicons name="arrow-back" size={22} color={COLORS.white} />
                </TouchableOpacity>
                <Text style={styles.heroText}>Verify OTP 🔐</Text>
                <Text style={styles.heroSub}>Sent to {phone}</Text>
            </LinearGradient>

            <View style={[styles.card, { backgroundColor: theme.surface }]}>
                <Text style={[styles.title, { color: theme.onBackground }]}>Enter 6-digit code</Text>

                <View style={styles.otpRow}>
                    {Array.from({ length: OTP_LENGTH }, (_, i) => (
                        <TextInput
                            key={i}
                            ref={(ref) => { inputs.current[i] = ref; }}
                            style={[
                                styles.otpBox,
                                {
                                    backgroundColor: theme.surfaceVariant,
                                    borderColor: otp[i] ? COLORS.primary : theme.border,
                                    color: theme.onBackground,
                                },
                            ]}
                            maxLength={1}
                            keyboardType="number-pad"
                            value={otp[i]}
                            onChangeText={(t) => handleChange(t, i)}
                            onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, i)}
                            textAlign="center"
                        />
                    ))}
                </View>

                <Button label="Verify OTP" onPress={handleVerify} isLoading={isLoading} fullWidth size="lg" style={{ marginTop: SPACING.xl }} />

                <View style={styles.resendRow}>
                    <Text style={[styles.resendText, { color: theme.onSurfaceVariant }]}>Didn't receive it? </Text>
                    <TouchableOpacity onPress={handleResend}>
                        <Text style={[styles.resendLink, { color: COLORS.primary }]}>Resend OTP</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1 },
    header: { paddingTop: 60, paddingBottom: 50, paddingHorizontal: SPACING['2xl'] },
    back: {
        width: 40, height: 40, borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.15)',
        alignItems: 'center', justifyContent: 'center', marginBottom: SPACING.xl,
    },
    heroText: { fontSize: FONT_SIZE['3xl'], fontWeight: FONT_WEIGHT.extrabold, color: COLORS.white },
    heroSub: { fontSize: FONT_SIZE.sm, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
    card: {
        flex: 1, borderTopLeftRadius: 32, borderTopRightRadius: 32,
        marginTop: -24, padding: SPACING['2xl'],
    },
    title: { fontSize: FONT_SIZE.lg, fontWeight: FONT_WEIGHT.semibold, marginBottom: SPACING.xl, textAlign: 'center' },
    otpRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
    otpBox: {
        flex: 1, height: 56, borderRadius: RADIUS.xl, borderWidth: 1.5,
        fontSize: FONT_SIZE['2xl'], fontWeight: FONT_WEIGHT.bold,
    },
    resendRow: { flexDirection: 'row', justifyContent: 'center', marginTop: SPACING.xl },
    resendText: { fontSize: FONT_SIZE.sm },
    resendLink: { fontSize: FONT_SIZE.sm, fontWeight: FONT_WEIGHT.bold },
});
