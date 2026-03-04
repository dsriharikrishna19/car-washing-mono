import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@utils/theme';

interface StarRatingProps {
    rating: number;
    maxRating?: number;
    size?: number;
    interactive?: boolean;
    onRate?: (rating: number) => void;
}

export const StarRating: React.FC<StarRatingProps> = ({
    rating,
    maxRating = 5,
    size = 20,
    interactive = false,
    onRate,
}) => {
    return (
        <View style={styles.row}>
            {Array.from({ length: maxRating }, (_, i) => {
                const filled = i < Math.floor(rating);
                const half = !filled && i < rating;
                const iconName: React.ComponentProps<typeof Ionicons>['name'] = filled
                    ? 'star'
                    : half
                        ? 'star-half'
                        : 'star-outline';

                return (
                    <TouchableOpacity
                        key={i}
                        disabled={!interactive}
                        onPress={() => onRate?.(i + 1)}
                        activeOpacity={0.7}
                    >
                        <Ionicons
                            name={iconName}
                            size={size}
                            color={filled || half ? COLORS.spark : COLORS.carbon300}
                        />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    row: { flexDirection: 'row', gap: 2 },
});
