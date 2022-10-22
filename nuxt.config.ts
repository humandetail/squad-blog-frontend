// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  server: {
    port: 3000,
    host: '0.0.0.0'
  },

  modules: ['@nuxtjs/eslint-module'],

  publicRuntimeConfig: {
    API_BASE_URL: 'http://localhost:7001/api/frontend-service'
  },

  css: [
    '@/assets/styles/variables.css',
    '@/assets/styles/reset.scss'
  ]
})
