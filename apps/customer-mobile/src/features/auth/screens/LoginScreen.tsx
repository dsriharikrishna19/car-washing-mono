import React from 'react';
import {
    View, Text, ScrollView, TouchableOpacity,
    StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Alert,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppTextInput } from '@components/AppTextInput';
import { Button } from '@components/Button';
import { useAppDispatch, useAppSelector } from '@hooks/useAppDispatch';
import { loginThunk, clearError } from '@store/slices/authSlice';
import { useTheme } from '@hooks/useTheme';
import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACING } from '@utils/theme';
import type { AuthStackParamList } from '@navigation/AuthNavigator';

const schema = z.object({
    phone: z.string().min(10, 'Enter a valid phone number').max(13),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});
type FormValues = z.infer<typeof schema>;

export default function LoginScreen() {
    const nav = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
    const dispatch = useAppDispatch();
    const { isLoading, error } = useAppSelector((s) => s.auth);
    const { theme, isDark } = useTheme();

    const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: { phone: '', password: '' },
    });

    const onSubmit = async (values: FormValues) => {
        dispatch(clearError());
        const result = await dispatch(loginThunk({ phone: values.phone, password: values.password }));
        if (loginThunk.rejected.match(result)) {
            Alert.alert('Login Failed', result.payload as string);
        }
    };

    return (
        <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
                    {/* Header */}
                    <LinearGradient
                        colors={isDark ? [COLORS.carbon950, COLORS.carbon900] : [COLORS.primary900, COLORS.primary]}
                        style={styles.header}
                    >
                        <View style={styles.logoRow}>
                            <View style={styles.logoIcon}>
                                <Ionicons name="water" size={28} color={COLORS.white} />
                            </View>
                            <View>
                                <Text style={styles.appName}>Sparkle</Text>
                                <Text style={styles.tagline}>Premium Shine for Your Ride</Text>
                            </View>
                        </View>
                        <Text style={styles.heroText}>Welcome{'\n'}Back 👋</Text>
                    </LinearGradient>

                    {/* Form Card */}
                    <View style={[styles.card, { backgroundColor: theme.surface }]}>
                        <Text style={[styles.cardTitle, { color: theme.onBackground }]}>Sign In</Text>
                        <Text style={[styles.cardSub, { color: theme.onSurfaceVariant }]}>
                            Enter your credentials to continue
                        </Text>

                        <Controller
                            control={control}
                            name="phone"
                            render={({ field: { onChange, value } }) => (
                                <AppTextInput
                                    label="Phone Number"
                                    placeholder="+91 9876543210"
                                    keyboardType="phone-pad"
                                    leftIcon="call-outline"
                                    value={value}
                                    onChangeText={onChange}
                                    error={errors.phone?.message}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange, value } }) => (
                                <AppTextInput
                                    label="Password"
                                    placeholder="••••••••"
                                    isPassword
                                    leftIcon="lock-closed-outline"
                                    value={value}
                                    onChangeText={onChange}
                                    error={errors.password?.message}
                                />
                            )}
                        />

                        <TouchableOpacity onPress={() => nav.navigate('ForgotPassword')} style={styles.forgot}>
                            <Text style={[styles.forgotText, { color: COLORS.primary }]}>Forgot Password?</Text>
                        </TouchableOpacity>

                        <Button
                            label="Sign In"
                            onPress={handleSubmit(onSubmit)}
                            isLoading={isLoading}
                            fullWidth
                            size="lg"
                        />

                        <View style={styles.divider}>
                            <View style={[styles.dividerLine, { backgroundColor: theme.border }]} />
                            <Text style={[styles.dividerText, { color: theme.onSurfaceVariant }]}>or</Text>
                            <View style={[styles.dividerLine, { backgroundColor: theme.border }]} />
                        </View>

                        <View style={styles.signupRow}>
                            <Text style={[styles.signupText, { color: theme.onSurfaceVariant }]}>
                                Don't have an account?{' '}
                            </Text>
                            <TouchableOpacity onPress={() => nav.navigate('Signup')}>
                                <Text style={[styles.signupLink, { color: COLORS.primary }]}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1 },
    scroll: { flexGrow: 1 },
    header: {
        paddingTop: 60, paddingBottom: 50,
        paddingHorizontal: SPACING['2xl'],
    },
    logoRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: SPACING.xl },
    logoIcon: {
        width: 48, height: 48, borderRadius: 14,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center', justifyContent: 'center',
    },
    appName: { fontSize: FONT_SIZE['2xl'], fontWeight: FONT_WEIGHT.extrabold, color: COLORS.white },
    tagline: { fontSize: FONT_SIZE.xs, color: 'rgba(255,255,255,0.7)' },
    heroText: {
        fontSize: FONT_SIZE['4xl'], fontWeight: FONT_WEIGHT.extrabold,
        color: COLORS.white, lineHeight: 44,
    },
    card: {
        flex: 1, borderTopLeftRadius: 32, borderTopRightRadius: 32,
        marginTop: -24, padding: SPACING['2xl'],
    },
    cardTitle: { fontSize: FONT_SIZE['2xl'], fontWeight: FONT_WEIGHT.bold, marginBottom: 4 },
    cardSub: { fontSize: FONT_SIZE.sm, marginBottom: SPACING.xl },
    forgot: { alignSelf: 'flex-end', marginBottom: SPACING.base, marginTop: -4 },
    forgotText: { fontSize: FONT_SIZE.sm, fontWeight: FONT_WEIGHT.semibold },
    divider: { flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: SPACING.xl },
    dividerLine: { flex: 1, height: 1 },
    dividerText: { fontSize: FONT_SIZE.sm },
    signupRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    signupText: { fontSize: FONT_SIZE.sm },
    signupLink: { fontSize: FONT_SIZE.sm, fontWeight: FONT_WEIGHT.bold },
});
