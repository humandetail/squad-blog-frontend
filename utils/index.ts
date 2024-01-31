export const copyCode = (oCopyBtn: HTMLElement) => {
  if (oCopyBtn.classList.contains('busy') || oCopyBtn.classList.contains('copied')) {
    return
  }

  try {
    const oCode = oCopyBtn.parentNode?.parentNode?.nextSibling as HTMLElement

    if (oCode) {
      oCopyBtn.classList.add('busy')
      const selection = window.getSelection()

      if (!selection) {
        throw new Error('浏览器不支持！')
      }

      const oldRange = selection.rangeCount > 0
        ? selection.getRangeAt(0)
        : null

      const range = document.createRange()
      selection.removeAllRanges() // 清除选中的文本
      range.selectNode(oCode)
      selection.addRange(range) // 添加选中的内容
      document.execCommand('copy') // 执行复制
      selection.removeAllRanges() // 清除复制选中的文本

      if (oldRange) {
        selection.addRange(oldRange)
      }


      oCopyBtn.classList.remove('busy')
      oCopyBtn.classList.add('copied')

      setTimeout(() => {
        oCopyBtn.classList.remove('copied')
      }, 3000)
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
  }
}

export const dateFormat = (date: string) => {
  const match = date.match(/^(\d{4})-(\d{2})-(\d{2}) \d{2}:\d{2}:\d{2}$/)

  if (match) {
    return `${match[1]}年${match[2]}月${match[3]}日`
  }

  return date
}

export const sendMessageToGiscus = <T extends { setConfig: any }>(message: T) => {
  const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame')
  if (!iframe?.contentWindow) return
  iframe.contentWindow.postMessage({ giscus: message }, 'https://giscus.app')
}
