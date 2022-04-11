import { resolve } from 'pathe'
import { defineNuxtConfig } from 'nuxt3'

const description = '\
Здесь собрано множество тестов на самые различные темы. \
Проверяй себя, решай их или создавай свои. \
Хочешь опросить своих друзей, проверить знания учеников или просто изучить мнение посетителей сайта? \
Тогда тебе точно сюда!'


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

    publicRuntimeConfig: {
        API_URL: process.env.API_URL
    },

    build: {
        transpile: [
            '@fortawesome/fontawesome-svg-core',
            '@fortawesome/free-solid-svg-icons'
        ]
    },

    meta: {
        title: 'Tests for everyone',
        meta: [
            {name: 'description', content: description},
            {property: 'og:title', content: 'Tests for everyone'},
            {property: 'og:type', content: 'website'},
            {property: 'og:image', content: 'http://codeem.ru/favicon.svg'},
            {property: 'og:description', content: description}
        ],
        link: [
            {rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },  
        ],
        script: [
            {src: '/metrika.js'}
        ]
    }
})
