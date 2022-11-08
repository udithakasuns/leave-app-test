module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        'react-native-reanimated/plugin',
        [
            'module-resolver',
            {
                /* If you changed here, make sure to do the related updates for the tsconfig.json as well */
                /* Then make sure kill the metro and clean the cache & then run the app agin */
                alias: {
                    src: './src',
                    assets: './src/assets',
                    screens: './src/screens',
                    components: './src/components',
                    navigators: './src/navigators',
                    services: './src/services',
                    utils: './src/utils',
                    store: './src/store',
                    configs: './src/configs',
                },
            },
        ],
    ],
};
