import { resolve } from 'pathe'
import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
    srcDir: 'src/',

    alias: {
        'stores': resolve(__dirname, './src/stores')
    },

    buildModules: [
        '@pinia/nuxt'
    ],

    css: [
        '@/assets/css/main.less'
    ],

    meta: {
        title: 'Tests for everyone'
    },

    publicRuntimeConfig: {
        API_URL: process.env.API_URL
    },

    build: {
        transpile: [
            '@fortawesome/fontawesome-svg-core',
            '@fortawesome/free-solid-svg-icons'
        ]
    }
})
