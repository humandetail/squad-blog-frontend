// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      api: 'https://api.humandetail.com/api/frontend-service'
    }
  },

  routeRules: {
    '/api/*': { cache: { maxAge: 60 * 60 } }
  },

  css: [
    '@/assets/reset.scss',
    '@/assets/github.dark.scss',
    '@/assets/github.scss',
  ],

  app: {
    head: {
      htmlAttrs: { lang: 'zh-CN' },
      meta: [
        { name: 'charset', content: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }
      ],
      script: [
        { type: 'text/javascript', src: '/themeMode.js' },
        { type: 'text/javascript', src: '/iconfont.js' }
      ]
    }
  }
})
