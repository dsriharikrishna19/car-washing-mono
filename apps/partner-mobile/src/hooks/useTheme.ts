import { useColorScheme } from 'react-native';
import { LIGHT_THEME, DARK_THEME } from '@utils/theme';

export const useTheme = () => {
    const scheme = useColorScheme();
    const isDark = scheme === 'dark';
    const theme = isDark ? DARK_THEME : LIGHT_THEME;

    return {
        theme,
        isDark,
        scheme,
    };
};
