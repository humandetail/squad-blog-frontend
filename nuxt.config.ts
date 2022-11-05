// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    pageTransition: false,
    layoutTransition: false
  },

  server: {
    port: 3000,
    host: '0.0.0.0'
  },

  modules: ['@nuxtjs/eslint-module'],

  publicRuntimeConfig: {
    API_BASE_URL: 'https://api.humandetail.com/api/frontend-service'
  },

  css: [
    '@/assets/styles/variables.css',
    '@/assets/styles/reset.scss'
  ],

  meta: {
    script: [
      { type: 'text/javascript', src: '/iconfont.js' }
    ]
  }
})
