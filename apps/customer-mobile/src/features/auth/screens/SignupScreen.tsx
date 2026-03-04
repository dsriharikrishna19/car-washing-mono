import React from 'react';
import {
    View, Text, ScrollView, TouchableOpacity, StyleSheet,
    SafeAreaView, KeyboardAvoidingView, Platform, Alert,
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
import { signupThunk, clearError } from '@store/slices/authSlice';
import { useTheme } from '@hooks/useTheme';
import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACING } from '@utils/theme';
import type { AuthStackParamList } from '@navigation/AuthNavigator';

const schema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Enter a valid email'),
    phone: z.string().min(10, 'Enter a valid phone number').max(13),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});
type FormValues = z.infer<typeof schema>;

export default function SignupScreen() {
    const nav = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector((s) => s.auth);
    const { theme, isDark } = useTheme();

    const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (values: FormValues) => {
        dispatch(clearError());
        const result = await dispatch(signupThunk({
            name: values.name, email: values.email,
            phone: values.phone, password: values.password,
        }));
        if (signupThunk.fulfilled.match(result)) {
            nav.navigate('OTP', { phone: values.phone, mode: 'signup' });
        } else {
            Alert.alert('Signup Failed', result.payload as string);
        }
    };

    return (
        <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
                    <LinearGradient
                        colors={isDark ? [COLORS.carbon950, COLORS.carbon900] : [COLORS.primary900, COLORS.primary]}
                        style={styles.header}
                    >
                        <TouchableOpacity onPress={() => nav.goBack()} style={styles.back}>
                            <Ionicons name="arrow-back" size={22} color={COLORS.white} />
                        </TouchableOpacity>
                        <Text style={styles.heroText}>Create Account ✨</Text>
                        <Text style={styles.heroSub}>Join Sparkle for premium car care</Text>
                    </LinearGradient>

                    <View style={[styles.card, { backgroundColor: theme.surface }]}>
                        <Controller control={control} name="name"
                            render={({ field }) => (
                                <AppTextInput label="Full Name" placeholder="John Smith" leftIcon="person-outline"
                                    value={field.value} onChangeText={field.onChange} error={errors.name?.message} />
                            )} />
                        <Controller control={control} name="email"
                            render={({ field }) => (
                                <AppTextInput label="Email" placeholder="john@email.com" leftIcon="mail-outline"
                                    keyboardType="email-address" autoCapitalize="none"
                                    value={field.value} onChangeText={field.onChange} error={errors.email?.message} />
                            )} />
                        <Controller control={control} name="phone"
                            render={({ field }) => (
                                <AppTextInput label="Phone Number" placeholder="+91 9876543210" leftIcon="call-outline"
                                    keyboardType="phone-pad"
                                    value={field.value} onChangeText={field.onChange} error={errors.phone?.message} />
                            )} />
                        <Controller control={control} name="password"
                            render={({ field }) => (
                                <AppTextInput label="Password" placeholder="Min 8 characters" isPassword leftIcon="lock-closed-outline"
                                    value={field.value} onChangeText={field.onChange} error={errors.password?.message} />
                            )} />
                        <Controller control={control} name="confirmPassword"
                            render={({ field }) => (
                                <AppTextInput label="Confirm Password" placeholder="••••••••" isPassword leftIcon="lock-closed-outline"
                                    value={field.value} onChangeText={field.onChange} error={errors.confirmPassword?.message} />
                            )} />

                        <Button label="Create Account" onPress={handleSubmit(onSubmit)} isLoading={isLoading} fullWidth size="lg" style={{ marginTop: 8 }} />

                        <View style={styles.loginRow}>
                            <Text style={[styles.loginText, { color: theme.onSurfaceVariant }]}>Already have an account? </Text>
                            <TouchableOpacity onPress={() => nav.navigate('Login')}>
                                <Text style={[styles.loginLink, { color: COLORS.primary }]}>Sign In</Text>
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
    loginRow: { flexDirection: 'row', justifyContent: 'center', marginTop: SPACING.xl },
    loginText: { fontSize: FONT_SIZE.sm },
    loginLink: { fontSize: FONT_SIZE.sm, fontWeight: FONT_WEIGHT.bold },
});
