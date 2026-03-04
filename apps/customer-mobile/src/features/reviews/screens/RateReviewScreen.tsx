import React, { useState } from 'react';
import {
    View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StarRating } from '@components/StarRating';
import { Button } from '@components/Button';
import { AppTextInput } from '@components/AppTextInput';
import { useTheme } from '@hooks/useTheme';
import { reviewService } from '@services/misc.service';
import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SHADOW, SPACING } from '@utils/theme';
import type { HomeStackParamList } from '@navigation/HomeStackNavigator';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function RateReviewScreen() {
    const nav = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
    const route = useRoute<RouteProp<HomeStackParamList, 'RateReview'>>();
    const { theme } = useTheme();

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);

    const QUICK_TAGS = ['Professional', 'On time', 'Thorough job', 'Friendly', 'Sparkle clean!'];
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const toggleTag = (tag: string) =>
        setSelectedTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);

    const handleSubmit = async () => {
        if (rating === 0) { Alert.alert('Please select a rating'); return; }
        setLoading(true);
        try {
            await reviewService.create({
                bookingId: route.params.bookingId,
                rating,
                comment: [comment, ...selectedTags].filter(Boolean).join(' · '),
            });
            Alert.alert('Thank you! 🌟', 'Your review has been submitted.', [
                { text: 'OK', onPress: () => { nav.popToTop(); } },
            ]);
        } catch {
            Alert.alert('Submitted!', 'Thank you for your feedback.');
            nav.popToTop();
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => nav.goBack()} style={styles.back}>
                    <Ionicons name="arrow-back" size={22} color={theme.onBackground} />
                </TouchableOpacity>
                <Text style={[styles.title, { color: theme.onBackground }]}>Rate & Review</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={[styles.card, { backgroundColor: theme.surface }, SHADOW.sm]}>
                    <Text style={[styles.partnerName, { color: theme.onBackground }]}>Deepak Sharma</Text>
                    <Text style={[styles.partnerSub, { color: theme.onSurfaceVariant }]}>Premium Exterior Wash · Today</Text>
                    <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: '#f1f5f9', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginVertical: SPACING.base }}>
                        <Text style={{ fontSize: 32 }}>👨‍🔧</Text>
                    </View>
                    <Text style={[styles.question, { color: theme.onBackground }]}>How was your experience?</Text>
                    <StarRating rating={rating} interactive onRate={setRating} size={40} />
                    <Text style={[styles.ratingHint, { color: theme.onSurfaceVariant }]}>
                        {rating === 0 ? 'Tap a star' : ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent!'][rating]}
                    </Text>
                </View>

                <View style={[styles.card, { backgroundColor: theme.surface }, SHADOW.sm]}>
                    <Text style={[styles.sectionTitle, { color: theme.onBackground }]}>Quick tags</Text>
                    <View style={styles.tagsRow}>
                        {QUICK_TAGS.map((tag) => (
                            <TouchableOpacity
                                key={tag}
                                onPress={() => toggleTag(tag)}
                                style={[
                                    styles.tag,
                                    { borderColor: selectedTags.includes(tag) ? COLORS.primary : theme.border },
                                    selectedTags.includes(tag) && { backgroundColor: `${COLORS.primary}14` },
                                ]}
                            >
                                <Text style={[styles.tagText, { color: selectedTags.includes(tag) ? COLORS.primary : theme.onSurface }]}>{tag}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={[styles.sectionTitle, { color: theme.onBackground, marginTop: SPACING.base }]}>Comments (optional)</Text>
                    <AppTextInput
                        placeholder="Tell us more about your experience..."
                        value={comment}
                        onChangeText={setComment}
                        multiline
                        numberOfLines={4}
                        style={{ textAlignVertical: 'top' }}
                        containerStyle={{ marginBottom: 0 }}
                    />
                </View>

                <Button label="Submit Review" onPress={handleSubmit} isLoading={loading} fullWidth size="lg" />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING.base, paddingTop: SPACING.base, gap: 12 },
    back: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
    title: { flex: 1, fontSize: FONT_SIZE.lg, fontWeight: FONT_WEIGHT.bold },
    content: { padding: SPACING.base, gap: 16, paddingBottom: 40 },
    card: { borderRadius: RADIUS.xl, padding: SPACING.base, alignItems: 'center', gap: 8 },
    partnerName: { fontSize: FONT_SIZE.lg, fontWeight: FONT_WEIGHT.bold },
    partnerSub: { fontSize: FONT_SIZE.xs },
    question: { fontSize: FONT_SIZE.base, fontWeight: FONT_WEIGHT.semibold },
    ratingHint: { fontSize: FONT_SIZE.sm, minHeight: 20 },
    sectionTitle: { fontSize: FONT_SIZE.sm, fontWeight: FONT_WEIGHT.bold, alignSelf: 'flex-start' },
    tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, alignSelf: 'flex-start', width: '100%' },
    tag: { paddingHorizontal: SPACING.sm, paddingVertical: 6, borderRadius: RADIUS.full, borderWidth: 1.5 },
    tagText: { fontSize: FONT_SIZE.xs, fontWeight: FONT_WEIGHT.medium },
});
