export const COLORS = {
    primary: '#1e40af',
    primary50: '#eff6ff',
    primary600: '#2563eb',
    primary900: '#1e3a8a',

    success: '#059669',
    success50: '#ecfdf5',
    success600: '#10b981',

    warning: '#d97706',
    warning50: '#fffbeb',

    error: '#dc2626',
    error50: '#fef2f2',
    error700: '#b91c1c',

    primary100: '#dbeafe',
    primary200: '#bfdbfe',
    primary500: '#3b82f6',
    primary700: '#1d4ed8',

    success700: '#047857',
    warning700: '#b45309',

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
    carbon950: '#020617',

    white: '#ffffff',
    black: '#000000',
    transparent: 'transparent',
};

export const SPACING = {
    xs: 4,
    sm: 8,
    base: 16,
    md: 20,
    lg: 24,
    xl: 32,
    '2xl': 40,
    '3xl': 48,
};

export const FONT_SIZE = {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
};

export const FONT_WEIGHT = {
    light: '300' as const,
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
};

export const RADIUS = {
    sm: 4,
    md: 6,
    base: 8,
    lg: 12,
    xl: 16,
    '2xl': 24,
    full: 9999,
};

export const SHADOW = {
    sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 1,
    },
    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
};

export const LIGHT_THEME = {
    background: COLORS.carbon50,
    surface: COLORS.white,
    surfaceVariant: COLORS.carbon100,
    primary: COLORS.primary,
    onPrimary: COLORS.white,
    onBackground: COLORS.carbon900,
    onSurface: COLORS.carbon800,
    onSurfaceVariant: COLORS.carbon600,
    border: COLORS.carbon200,
    success: COLORS.success,
    error: COLORS.error,
    warning: COLORS.warning,
};

export const DARK_THEME = {
    background: COLORS.carbon950,
    surface: COLORS.carbon900,
    surfaceVariant: COLORS.carbon800,
    primary: COLORS.primary500, // adjust for dark
    onPrimary: COLORS.white,
    onBackground: COLORS.carbon50,
    onSurface: COLORS.carbon100,
    onSurfaceVariant: COLORS.carbon400,
    border: COLORS.carbon800,
    success: COLORS.success600,
    error: COLORS.error,
    warning: COLORS.warning,
};
