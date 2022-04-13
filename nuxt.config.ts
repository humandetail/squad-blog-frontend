import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  server: {
    port: 3000,
    host: '0.0.0.0'
  },

  modules: [
    '@nuxtjs/eslint-module',
    '@vueuse/nuxt'
  ],

  publicRuntimeConfig: {
    API_BASE_URL: 'http://localhost:7001/api/frontend-service'
  },

  meta: {
    link: [
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css' }
    ]
  },

  css: [
    '@/assets/styles/reset.scss',
    '@/assets/iconfont/iconfont.css'
  ]
})
