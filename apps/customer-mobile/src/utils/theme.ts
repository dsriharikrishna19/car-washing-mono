export const COLORS = {
    // Primary — Electric Blue
    primary50: '#eff6ff',
    primary100: '#dbeafe',
    primary200: '#bfdbfe',
    primary300: '#93c5fd',
    primary400: '#60a5fa',
    primary: '#0A84FF',
    primary600: '#0066CC',
    primary700: '#0052a3',
    primary800: '#003d7a',
    primary900: '#00274d',

    // Spark Yellow
    spark50: '#fffbeb',
    spark100: '#fef3c7',
    spark: '#F5A623',
    spark600: '#d97706',
    spark700: '#b45309',

    // Carbon — Dark Backgrounds
    carbon50: '#f8fafc',
    carbon100: '#f1f5f9',
    carbon200: '#e2e8f0',
    carbon300: '#cbd5e1',
    carbon400: '#94a3b8',
    carbon500: '#64748b',
    carbon600: '#475569',
    carbon700: '#334155',
    carbon800: '#1e293b',
    carbon900: '#0f172a',
    carbon950: '#080c14',

    // Semantic
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',

    // Base
    white: '#FFFFFF',
    black: '#000000',
    transparent: 'transparent',
};

export const LIGHT_THEME = {
    background: COLORS.carbon50,
    surface: COLORS.white,
    surfaceVariant: COLORS.carbon100,
    onBackground: COLORS.carbon900,
    onSurface: COLORS.carbon800,
    onSurfaceVariant: COLORS.carbon500,
    border: COLORS.carbon200,
    primary: COLORS.primary,
    onPrimary: COLORS.white,
    accent: COLORS.spark,
    onAccent: COLORS.white,
    error: COLORS.error,
    success: COLORS.success,
    warning: COLORS.warning,
    shadow: 'rgba(0, 0, 0, 0.08)',
    overlay: 'rgba(0, 0, 0, 0.4)',
};

export const DARK_THEME = {
    background: COLORS.carbon950,
    surface: COLORS.carbon900,
    surfaceVariant: COLORS.carbon800,
    onBackground: COLORS.carbon50,
    onSurface: COLORS.carbon100,
    onSurfaceVariant: COLORS.carbon400,
    border: COLORS.carbon700,
    primary: '#3a9eff',
    onPrimary: COLORS.white,
    accent: COLORS.spark,
    onAccent: COLORS.carbon900,
    error: '#f87171',
    success: '#4ade80',
    warning: '#fbbf24',
    shadow: 'rgba(0, 0, 0, 0.3)',
    overlay: 'rgba(0, 0, 0, 0.6)',
};

export type AppTheme = typeof LIGHT_THEME;

export const SPACING = {
    xs: 4,
    sm: 8,
    md: 12,
    base: 16,
    lg: 20,
    xl: 24,
    '2xl': 32,
    '3xl': 40,
    '4xl': 48,
    '5xl': 64,
};

export const FONT_SIZE = {
    xs: 11,
    sm: 13,
    base: 15,
    lg: 17,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 34,
    '5xl': 40,
};

export const FONT_WEIGHT = {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
};

export const RADIUS = {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 20,
    '3xl': 24,
    full: 9999,
};

export const SHADOW = {
    sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
    },
    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.14,
        shadowRadius: 20,
        elevation: 10,
    },
};
