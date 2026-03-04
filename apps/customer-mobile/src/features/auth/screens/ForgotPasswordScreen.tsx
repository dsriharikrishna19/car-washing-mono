import React from 'react';
import {
    View, Text, StyleSheet, SafeAreaView,
    TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AppTextInput } from '@components/AppTextInput';
import { Button } from '@components/Button';
import { useTheme } from '@hooks/useTheme';
import { authService } from '@services/auth.service';
import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACING } from '@utils/theme';

const schema = z.object({
    phone: z.string().min(10, 'Enter a valid phone number'),
});
type FormValues = z.infer<typeof schema>;

export default function ForgotPasswordScreen() {
    const nav = useNavigation();
    const { theme, isDark } = useTheme();
    const [loading, setLoading] = React.useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async ({ phone }: FormValues) => {
        setLoading(true);
        try {
            await authService.forgotPassword(phone);
            Alert.alert('OTP Sent', `We've sent a reset OTP to ${phone}`);
            (nav as any).navigate('OTP', { phone, mode: 'forgot' });
        } catch {
            Alert.alert('Error', 'Failed to send OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.scroll}>
                    <LinearGradient
                        colors={isDark ? [COLORS.carbon950, COLORS.carbon900] : [COLORS.primary900, COLORS.primary]}
                        style={styles.header}
                    >
                        <TouchableOpacity onPress={() => nav.goBack()} style={styles.back}>
                            <Ionicons name="arrow-back" size={22} color={COLORS.white} />
                        </TouchableOpacity>
                        <Text style={styles.heroText}>Forgot Password? 🔑</Text>
                        <Text style={styles.heroSub}>We'll send an OTP to reset it</Text>
                    </LinearGradient>

                    <View style={[styles.card, { backgroundColor: theme.surface }]}>
                        <Controller control={control} name="phone"
                            render={({ field }) => (
                                <AppTextInput label="Phone Number" placeholder="+91 9876543210"
                                    leftIcon="call-outline" keyboardType="phone-pad"
                                    value={field.value} onChangeText={field.onChange}
                                    error={errors.phone?.message} />
                            )} />
                        <Button label="Send OTP" onPress={handleSubmit(onSubmit)} isLoading={loading} fullWidth size="lg" />
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
});
