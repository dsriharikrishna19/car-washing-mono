import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@components/Card';
import { useAppDispatch, useAppSelector } from '@hooks/useAppDispatch';
import { useTheme } from '@hooks/useTheme';
import { logoutThunk } from '@store/slices/authSlice';
import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SPACING, SHADOW } from '@utils/theme';

export default function ProfileScreen() {
    const dispatch = useAppDispatch();
    const { theme, isDark } = useTheme();
    const { user } = useAppSelector((state) => state.auth);

    const handleLogout = () => {
        Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Sign Out', style: 'destructive', onPress: () => dispatch(logoutThunk()) },
        ]);
    };

    const menuItems = [
        { id: 'personal', icon: 'person-outline', label: 'Personal Information', color: COLORS.primary },
        { id: 'docs', icon: 'document-text-outline', label: 'Verify Documents', color: COLORS.warning },
        { id: 'settings', icon: 'settings-outline', label: 'App Settings', color: COLORS.carbon600 },
        { id: 'support', icon: 'headset-outline', label: 'Partner Support', color: COLORS.success },
        { id: 'legal', icon: 'information-circle-outline', label: 'Legal & Privacy', color: COLORS.carbon600 },
    ];

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Profile Header */}
                <View style={styles.header}>
                    <View style={styles.avatarContainer}>
                        <View style={[styles.avatar, { backgroundColor: COLORS.primary100 }]}>
                            <Text style={styles.avatarText}>{user?.name?.charAt(0) || 'P'}</Text>
                        </View>
                        <TouchableOpacity style={styles.editBtn}>
                            <Ionicons name="camera" size={16} color={COLORS.white} />
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.name, { color: theme.onBackground }]}>{user?.name || 'Partner Name'}</Text>
                    <Text style={[styles.phone, { color: theme.onSurfaceVariant }]}>+91 {user?.phone || '9876543210'}</Text>

                    <View style={styles.statusBadge}>
                        <View style={[styles.statusDot, { backgroundColor: COLORS.success }]} />
                        <Text style={styles.statusText}>VERIFIED PARTNER</Text>
                    </View>
                </View>

                {/* Stats Summary */}
                <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                        <Text style={[styles.statValue, { color: theme.onBackground }]}>4.8</Text>
                        <Text style={[styles.statLabel, { color: theme.onSurfaceVariant }]}>Rating</Text>
                    </View>
                    <View style={[styles.statDivider, { backgroundColor: theme.border }]} />
                    <View style={styles.statItem}>
                        <Text style={[styles.statValue, { color: theme.onBackground }]}>124</Text>
                        <Text style={[styles.statLabel, { color: theme.onSurfaceVariant }]}>Jobs</Text>
                    </View>
                    <View style={[styles.statDivider, { backgroundColor: theme.border }]} />
                    <View style={styles.statItem}>
                        <Text style={[styles.statValue, { color: theme.onBackground }]}>2y</Text>
                        <Text style={[styles.statLabel, { color: theme.onSurfaceVariant }]}>Exp</Text>
                    </View>
                </View>

                {/* Menu Items */}
                <View style={styles.menuContainer}>
                    {menuItems.map((item) => (
                        <TouchableOpacity key={item.id} style={[styles.menuItem, { borderBottomColor: theme.border }]}>
                            <View style={[styles.menuIconContainer, { backgroundColor: item.color + '15' }]}>
                                <Ionicons name={item.icon as any} size={22} color={item.color} />
                            </View>
                            <Text style={[styles.menuLabel, { color: theme.onSurface }]}>{item.label}</Text>
                            <Ionicons name="chevron-forward" size={20} color={theme.onSurfaceVariant} />
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={22} color={COLORS.error} />
                    <Text style={styles.logoutText}>Sign Out</Text>
                </TouchableOpacity>

                <Text style={styles.versionText}>Sparkle Partner v1.0.0</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    header: {
        alignItems: 'center',
        paddingVertical: SPACING['2xl'],
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        ...SHADOW.md,
    },
    avatarText: {
        fontSize: 40,
        fontWeight: FONT_WEIGHT.bold,
        color: COLORS.primary,
    },
    editBtn: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: COLORS.white,
    },
    name: {
        fontSize: FONT_SIZE.xl,
        fontWeight: FONT_WEIGHT.bold,
    },
    phone: {
        fontSize: FONT_SIZE.sm,
        marginTop: 4,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.success50,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: RADIUS.full,
        marginTop: 12,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 8,
    },
    statusText: {
        color: COLORS.success,
        fontSize: 10,
        fontWeight: FONT_WEIGHT.extrabold,
        letterSpacing: 0.5,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingVertical: SPACING.lg,
        marginHorizontal: SPACING.xl,
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        ...SHADOW.sm,
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: FONT_SIZE.lg,
        fontWeight: FONT_WEIGHT.bold,
    },
    statLabel: {
        fontSize: FONT_SIZE.xs,
        marginTop: 4,
    },
    statDivider: {
        height: 30,
        width: 1,
    },
    menuContainer: {
        marginTop: SPACING.xl,
        paddingHorizontal: SPACING.base,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
    },
    menuIconContainer: {
        width: 44,
        height: 44,
        borderRadius: RADIUS.lg,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    menuLabel: {
        flex: 1,
        fontSize: FONT_SIZE.base,
        fontWeight: FONT_WEIGHT.medium,
    },
    logoutBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        gap: 10,
    },
    logoutText: {
        color: COLORS.error,
        fontSize: FONT_SIZE.base,
        fontWeight: FONT_WEIGHT.bold,
    },
    versionText: {
        textAlign: 'center',
        color: COLORS.carbon400,
        fontSize: 10,
        marginTop: 20,
        textTransform: 'uppercase',
    },
});
