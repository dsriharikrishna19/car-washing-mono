import React, { useEffect } from 'react';
import {
    View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@hooks/useTheme';
import { notificationService } from '@services/misc.service';
import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SHADOW, SPACING } from '@utils/theme';
import type { AppNotification, NotificationType } from '@appTypes/index';

const MOCK_NOTIFICATIONS: AppNotification[] = [
    { id: 'n1', userId: 'u1', type: 'booking', title: 'Booking Confirmed ✅', body: 'Your Premium Exterior Wash is confirmed for Today, 10 AM.', isRead: false, createdAt: new Date(Date.now() - 5 * 60000).toISOString() },
    { id: 'n2', userId: 'u1', type: 'offer', title: '30% OFF Today Only! 🎉', body: 'Use code SPARKLE30 on your next booking.', isRead: false, createdAt: new Date(Date.now() - 60 * 60000).toISOString() },
    { id: 'n3', userId: 'u1', type: 'booking', title: 'Wash Completed 🌟', body: 'Your car is sparkling clean! Rate your experience.', isRead: true, createdAt: new Date(Date.now() - 3 * 3600000).toISOString() },
    { id: 'n4', userId: 'u1', type: 'promotion', title: 'New: Ceramic Coating', body: 'Book ceramic coating this month and get free wax.', isRead: true, createdAt: new Date(Date.now() - 86400000).toISOString() },
];

const typeConfig: Record<NotificationType, { icon: React.ComponentProps<typeof Ionicons>['name']; color: string; bg: string }> = {
    booking: { icon: 'calendar', color: COLORS.primary, bg: `${COLORS.primary}18` },
    offer: { icon: 'pricetag', color: COLORS.success, bg: '#dcfce7' },
    promotion: { icon: 'megaphone', color: COLORS.spark, bg: '#fef9c3' },
    system: { icon: 'information-circle', color: COLORS.carbon500, bg: '#f1f5f9' },
};

function timeAgo(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
}

export default function NotificationsScreen() {
    const { theme } = useTheme();
    const [notifications, setNotifications] = React.useState<AppNotification[]>(MOCK_NOTIFICATIONS);

    useEffect(() => {
        notificationService.getAll().then((res) => {
            if (res.data.data.length) setNotifications(res.data.data);
        }).catch(() => { });
    }, []);

    const renderItem = ({ item }: { item: AppNotification }) => {
        const config = typeConfig[item.type];
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                style={[
                    styles.card,
                    { backgroundColor: item.isRead ? theme.surface : `${COLORS.primary}08` },
                    SHADOW.sm,
                ]}
                onPress={() => {
                    notificationService.markRead(item.id).catch(() => { });
                    setNotifications((prev) => prev.map((n) => n.id === item.id ? { ...n, isRead: true } : n));
                }}
            >
                <View style={[styles.iconBox, { backgroundColor: config.bg }]}>
                    <Ionicons name={config.icon} size={20} color={config.color} />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={[styles.notifTitle, { color: theme.onBackground, fontWeight: item.isRead ? FONT_WEIGHT.medium : FONT_WEIGHT.bold }]}>
                        {item.title}
                    </Text>
                    <Text style={[styles.notifBody, { color: theme.onSurfaceVariant }]} numberOfLines={2}>
                        {item.body}
                    </Text>
                    <Text style={[styles.notifTime, { color: theme.onSurfaceVariant }]}>{timeAgo(item.createdAt)}</Text>
                </View>
                {!item.isRead && <View style={styles.unreadDot} />}
            </TouchableOpacity>
        );
    };

    const unreadCount = notifications.filter((n) => !n.isRead).length;

    return (
        <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: theme.onBackground }]}>Notifications</Text>
                {unreadCount > 0 && (
                    <TouchableOpacity
                        onPress={() => {
                            notificationService.markAllRead().catch(() => { });
                            setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
                        }}
                    >
                        <Text style={[styles.markAll, { color: COLORS.primary }]}>Mark all read</Text>
                    </TouchableOpacity>
                )}
            </View>
            <FlatList
                data={notifications}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={{ fontSize: 48 }}>🔔</Text>
                        <Text style={[styles.emptyText, { color: theme.onSurfaceVariant }]}>No notifications yet</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SPACING.base, paddingTop: SPACING.base, paddingBottom: SPACING.sm },
    title: { fontSize: FONT_SIZE.xl, fontWeight: FONT_WEIGHT.bold },
    markAll: { fontSize: FONT_SIZE.sm, fontWeight: FONT_WEIGHT.semibold },
    list: { padding: SPACING.base, gap: 10 },
    card: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, borderRadius: RADIUS.xl, padding: SPACING.base },
    iconBox: { width: 44, height: 44, borderRadius: RADIUS.xl, alignItems: 'center', justifyContent: 'center', marginTop: 2 },
    notifTitle: { fontSize: FONT_SIZE.sm, marginBottom: 2 },
    notifBody: { fontSize: FONT_SIZE.xs, lineHeight: 18 },
    notifTime: { fontSize: FONT_SIZE.xs, marginTop: 4 },
    unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.primary, marginTop: 6 },
    empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, paddingTop: 100 },
    emptyText: { fontSize: FONT_SIZE.base },
});
