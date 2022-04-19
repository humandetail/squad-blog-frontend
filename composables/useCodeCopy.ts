import { renderCopySuccess } from '~~/libs/utils'

export default () => {
  const { copy, copied, isSupported } = useClipboard()

  onMounted(() => {
    document.addEventListener('click', handleClick, false)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClick, false)
  })

  const handleClick = async (e: MouseEvent) => {
    const target = e.target as HTMLElement

    if (
      target.classList.contains('copy') &&
      target.getAttribute('data-source') &&
      !target.getAttribute('data-copied')
    ) {
      if (!isSupported) {
        alert('Your browser does not support Clipboard API.')
      }
      await copy(target.getAttribute('data-source'))
      if (copied) {
        const rect = target.getBoundingClientRect()
        const el = renderCopySuccess(rect)
        target.setAttribute('data-copied', '1')
        setTimeout(() => {
          target.setAttribute('data-copied', '')
          el.remove()
        }, 2000)
      }
    }
  }
}
