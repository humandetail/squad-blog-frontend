export default () => {
  const themeMode = useThemeMode()

  const highlightCss = [
    'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.4.0/build/styles/github.min.css',
    'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.4.0/build/styles/github-dark.min.css'
  ]

  watch(themeMode, (newValue) => {
    if (!process.client) {
      return
    }
    nextTick(() => {
      let oLink = document.querySelector<HTMLLinkElement>('link#post__stylesheet')

      if (oLink) {
        oLink.href = highlightCss[newValue]
      } else {
        oLink = document.createElement('link')
        oLink.id = 'post__stylesheet'
        oLink.setAttribute('rel', 'stylesheet')
        oLink.href = highlightCss[newValue]
        document.head.appendChild(oLink)
      }
    })
  }, { immediate: true })
}
