const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    // ----
    productionSourceMap: process.env.NODE_ENV == "development", // True/False
    // ----
    devServer: {
        client: {
            overlay: {
                warnings: false,
                // errors: true
            }
        },
    },
    // ----
    css: {
        
        sourceMap: process.env.NODE_ENV == "development", // True/False
        
        loaderOptions: {
            css: {
                sourceMap: process.env.NODE_ENV == "development", // True/False
            },

            // sass: {},

            // scss: {
            //     additionalData: `
            //         @import "@/_scss/_extraConf/_mixins.scss";
            //         @import "@/_scss/_extraConf/__var.scss";
            //         `,
            // },
        }
    }
})
