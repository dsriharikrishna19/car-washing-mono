import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
    SafeAreaView,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@components/Button';
import { AppTextInput } from '@components/AppTextInput';
import { useTheme } from '@hooks/useTheme';
import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SPACING } from '@utils/theme';

const onboardingSchema = z.object({
    fullName: z.string().min(3, 'Full name is required'),
    phone: z.string().min(10, '10-digit phone number is required').max(10),
    experience: z.string().min(1, 'Experience is required'),
    specialization: z.string().min(3, 'Specialization is required'),
});

type OnboardingFormData = z.infer<typeof onboardingSchema>;

export default function OnboardingScreen() {
    const nav = useNavigation();
    const { theme } = useTheme();
    const [step, setStep] = useState(1);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<OnboardingFormData>({
        resolver: zodResolver(onboardingSchema),
        defaultValues: { fullName: '', phone: '', experience: '', specialization: '' },
    });

    const onSubmit = (data: OnboardingFormData) => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            Alert.alert(
                'Application Submitted',
                'Thank you for applying. We will verify your documents and get back to you within 24-48 hours.',
                [{ text: 'Great!', onPress: () => nav.goBack() }]
            );
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <View style={styles.stepContainer}>
                        <Text style={[styles.sectionTitle, { color: theme.onBackground }]}>Personal Details</Text>
                        <Controller
                            control={control}
                            name="fullName"
                            render={({ field: { onChange, value } }) => (
                                <AppTextInput
                                    label="Full Name"
                                    placeholder="As per ID proof"
                                    onChangeText={onChange}
                                    value={value}
                                    error={errors.fullName?.message}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="phone"
                            render={({ field: { onChange, value } }) => (
                                <AppTextInput
                                    label="Phone Number"
                                    placeholder="Active WhatsApp number"
                                    keyboardType="phone-pad"
                                    onChangeText={onChange}
                                    value={value}
                                    error={errors.phone?.message}
                                />
                            )}
                        />
                    </View>
                );
            case 2:
                return (
                    <View style={styles.stepContainer}>
                        <Text style={[styles.sectionTitle, { color: theme.onBackground }]}>Professional Details</Text>
                        <Controller
                            control={control}
                            name="experience"
                            render={({ field: { onChange, value } }) => (
                                <AppTextInput
                                    label="Years of Experience"
                                    placeholder="e.g. 3"
                                    keyboardType="numeric"
                                    onChangeText={onChange}
                                    value={value}
                                    error={errors.experience?.message}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="specialization"
                            render={({ field: { onChange, value } }) => (
                                <AppTextInput
                                    label="Specializations"
                                    placeholder="e.g. Ceramic Coating, Interior Deep Clean"
                                    onChangeText={onChange}
                                    value={value}
                                    error={errors.specialization?.message}
                                />
                            )}
                        />
                    </View>
                );
            case 3:
                return (
                    <View style={styles.stepContainer}>
                        <Text style={[styles.sectionTitle, { color: theme.onBackground }]}>Upload Documents</Text>
                        <Text style={[styles.docDesc, { color: theme.onSurfaceVariant }]}>
                            Please upload clear photos of your official documents for verification.
                        </Text>

                        <TouchableOpacity style={[styles.uploadBox, { backgroundColor: theme.surfaceVariant, borderColor: theme.border }]}>
                            <Ionicons name="cloud-upload-outline" size={32} color={COLORS.primary} />
                            <Text style={[styles.uploadLabel, { color: theme.onSurface }]}>ID Proof (Aadhar/PAN)</Text>
                            <Text style={[styles.uploadHint, { color: theme.onSurfaceVariant }]}>PNG, JPG up to 5MB</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.uploadBox, { backgroundColor: theme.surfaceVariant, borderColor: theme.border, marginTop: 16 }]}>
                            <Ionicons name="card-outline" size={32} color={COLORS.primary} />
                            <Text style={[styles.uploadLabel, { color: theme.onSurface }]}>Driving License</Text>
                            <Text style={[styles.uploadHint, { color: theme.onSurfaceVariant }]}>Clear photo of both sides</Text>
                        </TouchableOpacity>
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => step > 1 ? setStep(step - 1) : nav.goBack()}>
                    <Ionicons name="arrow-back" size={24} color={theme.onBackground} />
                </TouchableOpacity>
                <Text style={[styles.title, { color: theme.onBackground }]}>Partner Application</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.progressContainer}>
                {[1, 2, 3].map((i) => (
                    <View
                        key={i}
                        style={[
                            styles.progressBar,
                            { backgroundColor: i <= step ? COLORS.primary : theme.border },
                        ]}
                    />
                ))}
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={[styles.headerText, { color: theme.onBackground }]}>
                    Step {step} of 3
                </Text>
                <Text style={[styles.headerDesc, { color: theme.onSurfaceVariant }]}>
                    {step === 1 ? 'Start with your basic info' : step === 2 ? 'Tell us about your work' : 'Verify your identity'}
                </Text>

                {renderStep()}

                <View style={styles.footer}>
                    <Button
                        label={step === 3 ? 'Submit Application' : 'Continue'}
                        onPress={handleSubmit(onSubmit)}
                        fullWidth
                        size="lg"
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.base,
        paddingTop: 10,
        height: 60,
    },
    title: {
        fontSize: FONT_SIZE.lg,
        fontWeight: FONT_WEIGHT.bold,
    },
    progressContainer: {
        flexDirection: 'row',
        paddingHorizontal: SPACING.base,
        gap: 8,
        marginTop: 10,
    },
    progressBar: {
        flex: 1,
        height: 4,
        borderRadius: 2,
    },
    scrollContent: {
        padding: SPACING.base,
        paddingBottom: 40,
    },
    headerText: {
        fontSize: FONT_SIZE.xs,
        fontWeight: FONT_WEIGHT.bold,
        marginTop: 20,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    headerDesc: {
        fontSize: FONT_SIZE['2xl'],
        fontWeight: FONT_WEIGHT.bold,
        marginTop: 4,
        marginBottom: 30,
    },
    stepContainer: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: FONT_SIZE.lg,
        fontWeight: FONT_WEIGHT.bold,
        marginBottom: 20,
    },
    footer: {
        marginTop: 40,
    },
    docDesc: {
        fontSize: FONT_SIZE.sm,
        marginBottom: 20,
        lineHeight: 22,
    },
    uploadBox: {
        height: 160,
        borderRadius: RADIUS.xl,
        borderWidth: 2,
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    uploadLabel: {
        fontSize: FONT_SIZE.base,
        fontWeight: FONT_WEIGHT.bold,
        marginTop: 12,
    },
    uploadHint: {
        fontSize: FONT_SIZE.xs,
        marginTop: 4,
    },
});
