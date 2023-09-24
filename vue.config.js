const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    pluginOptions: {
        vuetify: {
            // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
        },
    },
    configureWebpack: {
        resolve: {
            fallback: {
                fs: false,
                os: false,
                path: require.resolve('path-browserify'),
            },
        },
    },
});
