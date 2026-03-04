/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './App.tsx', './index.ts'],
    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            colors: {
                // Sparkle automotive palette
                primary: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#0A84FF', // Electric Blue
                    600: '#0066CC',
                    700: '#0052a3',
                    800: '#003d7a',
                    900: '#00274d',
                    950: '#001833',
                },
                spark: {
                    50: '#fffbeb',
                    100: '#fef3c7',
                    200: '#fde68a',
                    300: '#fcd34d',
                    400: '#fbbf24',
                    500: '#F5A623', // Spark Yellow
                    600: '#d97706',
                    700: '#b45309',
                    800: '#92400e',
                    900: '#78350f',
                },
                carbon: {
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b',
                    600: '#475569',
                    700: '#334155',
                    800: '#1e293b',
                    900: '#0f172a', // Deep Navy
                    950: '#080c14',
                },
                success: '#22c55e',
                warning: '#f59e0b',
                error: '#ef4444',
                info: '#3b82f6',
            },
            fontFamily: {
                sans: ['System'],
            },
            borderRadius: {
                '4xl': '2rem',
            },
        },
    },
    plugins: [],
};
