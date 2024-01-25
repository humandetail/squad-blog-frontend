export default (el: globalThis.Ref<HTMLElement | null>, callback: (...args: unknown[]) => unknown) => {
  const handler = (e: MouseEvent) => {
    const target = e.target as HTMLElement

    if (!el.value?.contains(target)) {
      callback?.()
      return
    }
  }

  onMounted(() => {
    document.addEventListener('click', handler, false)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', handler, false)
  })
}
