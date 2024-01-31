export default (domRef: globalThis.Ref<HTMLElement | null>) => {
  const isLoaded = ref(false)
  const { themeMode } = useThemeMode()

  const options = computed(() => {
    return [
      ['src', 'https://giscus.app/client.js'],
      ['data-repo', 'humandetail/squad-blog-frontend'],
      ['data-repo-id', 'R_kgDOHGEN9A'],
      ['data-category', 'Announcements'],
      ['data-category-id', 'DIC_kwDOHGEN9M4CSU4h'],
      ['data-mapping', 'title'],
      ['data-strict', '0'],
      ['data-reactions-enabled', '1'],
      ['data-emit-metadata', '0'],
      ['data-input-position', 'top'],
      ['data-theme', themeMode.value],
      ['data-lang', 'zh-CN'],
      ['crossorigin', 'anonymous'],
      ['async', 'true']
    ] as [string, string][]
  })

  onMounted(async () => {
    if (isLoaded.value) {
      return
    }

    await nextTick()

    if (!domRef.value) {
      return
    }

    const oScript = document.createElement('script')
    options.value.forEach(([key, value]) => {
      oScript.setAttribute(key, value)
    })

    domRef.value.appendChild(oScript)

    isLoaded.value = true
  })
}