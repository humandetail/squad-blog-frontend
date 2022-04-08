import markdown from './markdown'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      markdownRender: (value = '') => markdown.render(value)
    }
  }
})
