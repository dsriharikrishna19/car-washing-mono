import { useColorScheme } from 'react-native';
import { DARK_THEME, LIGHT_THEME, AppTheme } from '@utils/theme';

export const useTheme = (): { theme: AppTheme; isDark: boolean } => {
    const scheme = useColorScheme();
    const isDark = scheme === 'dark';
    return { theme: isDark ? DARK_THEME : LIGHT_THEME, isDark };
};
