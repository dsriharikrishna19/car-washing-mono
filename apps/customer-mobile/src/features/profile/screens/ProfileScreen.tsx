import React, { useEffect } from 'react';
import {
    View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@hooks/useTheme';
import { useAppDispatch, useAppSelector } from '@hooks/useAppDispatch';
import { logout } from '@store/slices/authSlice';
import { fetchProfileThunk } from '@store/slices/profileSlice';
import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SHADOW, SPACING } from '@utils/theme';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen() {
    const dispatch = useAppDispatch();
    const nav = useNavigation<any>();
    const { theme, isDark } = useTheme();
    const { user } = useAppSelector((s) => s.auth);
    const { cars, addresses } = useAppSelector((s) => s.profile);

    useEffect(() => { dispatch(fetchProfileThunk()); }, [dispatch]);

    const handleLogout = () => {
        Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Sign Out', style: 'destructive', onPress: () => dispatch(logout()) },
        ]);
    };

    const MenuItem = ({ icon, label, sub, onPress, danger = false }: {
        icon: React.ComponentProps<typeof Ionicons>['name']; label: string; sub?: string;
        onPress: () => void; danger?: boolean;
    }) => (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}
            style={[styles.menuItem, { backgroundColor: theme.surface }, SHADOW.sm]}>
            <View style={[styles.menuIcon, { backgroundColor: danger ? '#fee2e2' : `${COLORS.primary}18` }]}>
                <Ionicons name={icon} size={20} color={danger ? COLORS.error : COLORS.primary} />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={[styles.menuLabel, { color: danger ? COLORS.error : theme.onBackground }]}>{label}</Text>
                {sub && <Text style={[styles.menuSub, { color: theme.onSurfaceVariant }]}>{sub}</Text>}
            </View>
            {!danger && <Ionicons name="chevron-forward" size={16} color={theme.onSurfaceVariant} />}
        </TouchableOpacity>
    );

    const mockUser = user ?? { name: 'John Smith', email: 'john@email.com', phone: '+91 9876543210' };

    return (
        <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Avatar Header */}
                <LinearGradient
                    colors={isDark ? [COLORS.carbon950, COLORS.carbon900] : [COLORS.primary900, COLORS.primary]}
                    style={styles.header}
                >
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatar}>
                            <Text style={{ fontSize: 36 }}>👤</Text>
                        </View>
                        <TouchableOpacity style={styles.editBtn}>
                            <Ionicons name="pencil" size={14} color={COLORS.white} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.name}>{mockUser.name}</Text>
                    <Text style={styles.phone}>{mockUser.phone}</Text>
                    <Text style={styles.email}>{mockUser.email}</Text>
                </LinearGradient>

                {/* Quick Stats */}
                <View style={[styles.statsCard, { backgroundColor: theme.surface }, SHADOW.sm]}>
                    {[
                        { label: 'Bookings', value: '12' },
                        { label: 'Cars', value: String(cars.length || 1) },
                        { label: 'Addresses', value: String(addresses.length || 2) },
                    ].map(({ label, value }) => (
                        <View key={label} style={styles.statItem}>
                            <Text style={[styles.statValue, { color: COLORS.primary }]}>{value}</Text>
                            <Text style={[styles.statLabel, { color: theme.onSurfaceVariant }]}>{label}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.onSurfaceVariant }]}>ACCOUNT</Text>
                    <MenuItem icon="person-outline" label="Edit Profile" sub="Update your details" onPress={() => { }} />
                    <MenuItem icon="car-outline" label="My Cars" sub={`${cars.length || 1} cars registered`} onPress={() => { }} />
                    <MenuItem icon="location-outline" label="My Addresses" sub={`${addresses.length || 2} saved addresses`} onPress={() => { }} />
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.onSurfaceVariant }]}>PREFERENCES</Text>
                    <MenuItem icon="notifications-outline" label="Notifications" sub="Booking & offer alerts" onPress={() => { }} />
                    <MenuItem icon="moon-outline" label="Dark Mode" sub={isDark ? 'On' : 'Off'} onPress={() => { }} />
                    <MenuItem icon="shield-outline" label="Privacy & Security" onPress={() => { }} />
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.onSurfaceVariant }]}>SUPPORT</Text>
                    <MenuItem icon="help-circle-outline" label="Help & FAQ" onPress={() => { }} />
                    <MenuItem icon="star-outline" label="Rate the App" onPress={() => { }} />
                    <MenuItem icon="information-circle-outline" label="About Sparkle" sub="v1.0.0" onPress={() => { }} />
                </View>

                <View style={styles.section}>
                    <MenuItem icon="log-out-outline" label="Sign Out" onPress={handleLogout} danger />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1 },
    header: { paddingTop: 60, paddingBottom: 28, alignItems: 'center', gap: 4 },
    avatarContainer: { position: 'relative', marginBottom: SPACING.sm },
    avatar: {
        width: 90, height: 90, borderRadius: 45,
        backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center',
    },
    editBtn: {
        position: 'absolute', bottom: 0, right: 0,
        width: 28, height: 28, borderRadius: 14,
        backgroundColor: COLORS.spark, alignItems: 'center', justifyContent: 'center',
    },
    name: { fontSize: FONT_SIZE.xl, fontWeight: FONT_WEIGHT.bold, color: COLORS.white },
    phone: { fontSize: FONT_SIZE.sm, color: 'rgba(255,255,255,0.8)' },
    email: { fontSize: FONT_SIZE.xs, color: 'rgba(255,255,255,0.6)' },
    statsCard: {
        flexDirection: 'row', marginHorizontal: SPACING.base,
        marginTop: -20, borderRadius: RADIUS.xl, padding: SPACING.base,
    },
    statItem: { flex: 1, alignItems: 'center', gap: 2 },
    statValue: { fontSize: FONT_SIZE.xl, fontWeight: FONT_WEIGHT.extrabold },
    statLabel: { fontSize: FONT_SIZE.xs },
    section: { paddingHorizontal: SPACING.base, paddingTop: SPACING.base, gap: 8 },
    sectionTitle: { fontSize: FONT_SIZE.xs, fontWeight: FONT_WEIGHT.bold, letterSpacing: 1, marginBottom: 4 },
    menuItem: { flexDirection: 'row', alignItems: 'center', gap: 12, borderRadius: RADIUS.xl, padding: SPACING.base },
    menuIcon: { width: 40, height: 40, borderRadius: RADIUS.lg, alignItems: 'center', justifyContent: 'center' },
    menuLabel: { fontSize: FONT_SIZE.sm, fontWeight: FONT_WEIGHT.semibold },
    menuSub: { fontSize: FONT_SIZE.xs, marginTop: 1 },
});
