module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo', 'nativewind/babel'],
        plugins: [
            [
                'module-resolver',
                {
                    root: ['./'],
                    alias: {
                        '@src': './src',
                        '@components': './src/components',
                        '@features': './src/features',
                        '@hooks': './src/hooks',
                        '@services': './src/services',
                        '@navigation': './src/navigation',
                        '@store': './src/store',
                        '@utils': './src/utils',
                        '@appTypes': './src/types',
                    },
                },
            ],
            'react-native-reanimated/plugin',
        ],
    };
};
