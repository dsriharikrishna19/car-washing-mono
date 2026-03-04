import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button } from '@components/Button';
import { AppTextInput } from '@components/AppTextInput';
import { useAppDispatch, useAppSelector } from '@hooks/useAppDispatch';
import { loginThunk } from '@store/slices/authSlice';
import { useTheme } from '@hooks/useTheme';
import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SPACING } from '@utils/theme';
import type { AuthStackParamList } from '@navigation/AuthNavigator';

const loginSchema = z.object({
    phone: z.string().min(10, 'Phone number must be 10 digits').max(10, 'Phone number must be 10 digits'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginScreen() {
    const nav = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
    const dispatch = useAppDispatch();
    const { theme } = useTheme();
    const { isLoading, error } = useAppSelector((state) => state.auth);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: { phone: '' },
    });

    const onSubmit = async (data: LoginFormData) => {
        const result = await dispatch(loginThunk(data.phone));
        if (loginThunk.fulfilled.match(result)) {
            nav.navigate('OTP', { phone: data.phone });
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <StatusBar barStyle="light-content" />
            <LinearGradient
                colors={[COLORS.primary900, COLORS.primary600]}
                style={styles.header}
            >
                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>Sparkle Partner</Text>
                    <Text style={styles.headerSubtitle}>Professional Car Detailing Platform</Text>
                </View>
            </LinearGradient>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={[styles.formCard, { backgroundColor: theme.surface }]}>
                        <Text style={[styles.formTitle, { color: theme.onBackground }]}>Welcome Back</Text>
                        <Text style={[styles.formDesc, { color: theme.onSurfaceVariant }]}>
                            Enter your registered phone number to access your account.
                        </Text>

                        <Controller
                            control={control}
                            name="phone"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <AppTextInput
                                    label="Phone Number"
                                    placeholder="Enter 10-digit number"
                                    keyboardType="phone-pad"
                                    maxLength={10}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    error={errors.phone?.message || (error as string)}
                                    leftIcon="call-outline"
                                />
                            )}
                        />

                        <Button
                            label="Get OTP"
                            onPress={handleSubmit(onSubmit)}
                            isLoading={isLoading}
                            fullWidth
                            style={{ marginTop: SPACING.md }}
                        />

                        <View style={styles.footer}>
                            <Text style={[styles.footerText, { color: theme.onSurfaceVariant }]}>
                                New here?{' '}
                            </Text>
                            <Text style={[styles.footerLink, { color: COLORS.primary }]} onPress={() => nav.navigate('Onboarding')}>
                                Apply as a Partner
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 300,
        justifyContent: 'center',
        paddingHorizontal: SPACING.xl,
        borderBottomLeftRadius: 60,
    },
    headerContent: {
        paddingTop: 40,
    },
    headerTitle: {
        fontSize: FONT_SIZE['4xl'],
        fontWeight: FONT_WEIGHT.extrabold,
        color: COLORS.white,
    },
    headerSubtitle: {
        fontSize: FONT_SIZE.base,
        color: 'rgba(255, 255, 255, 0.8)',
        marginTop: 8,
    },
    keyboardView: {
        flex: 1,
        marginTop: -60,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: SPACING.base,
    },
    formCard: {
        borderRadius: RADIUS['2xl'],
        padding: SPACING.xl,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
    },
    formTitle: {
        fontSize: FONT_SIZE['2xl'],
        fontWeight: FONT_WEIGHT.bold,
        marginBottom: 8,
    },
    formDesc: {
        fontSize: FONT_SIZE.sm,
        lineHeight: 20,
        marginBottom: SPACING.xl,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: SPACING.xl,
    },
    footerText: {
        fontSize: FONT_SIZE.sm,
    },
    footerLink: {
        fontSize: FONT_SIZE.sm,
        fontWeight: FONT_WEIGHT.bold,
    },
});
