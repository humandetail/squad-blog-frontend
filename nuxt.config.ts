import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxtjs/eslint-module'],

  publicRuntimeConfig: {
    API_BASE_URL: 'http://localhost:7001/api/frontend-service'
  },

  css: [
    '@/assets/styles/reset.scss'
  ]
})
