function copy (el: Element) {
  const selection = window.getSelection()
  const range = document.createRange()
  selection.removeAllRanges() // 清除选中的文本
  range.selectNode(el)
  selection.addRange(range) // 添加选中的内容
  document.execCommand('copy') // 执行复制
  selection.removeAllRanges() // 清除复制选中的文本
}

function createSuccessMessage (rect: DOMRect) {
  const oDiv = document.createElement('div')
  oDiv.textContent = '复制成功'

  oDiv.style.cssText = `
    position: fixed;
    left: ${rect.left}px;
    top: ${rect.top}px;
    z-index: 10;
    padding: 4px 16px;
    color: #fff;
    border-radius: 4px;
    background-color: var(--success-color);
    opacity: 1;
    transform: translate(-100%, 0);
    transition: opacity linear 1s;
  `

  document.body.append(oDiv)
  setTimeout(() => {
    oDiv.style.opacity = '0'

    setTimeout(() => {
      document.body.removeChild(oDiv)
    }, 1000)
  })
}

export default () => {
  const handleClick = (e: Event) => {
    const target = e.target as HTMLElement
    let oBtn: HTMLElement | null = null

    if (target.classList.contains('copy-code-btn')) {
      oBtn = target
    } else if (target.parentNode && (target.parentNode as HTMLElement).classList.contains('copy-code-btn')) {
      oBtn = target.parentNode as HTMLElement
    }

    if (oBtn) {
      try {
        const oCode = ((oBtn.parentNode as HTMLElement).nextSibling as HTMLElement).querySelector('.hljs code')
        copy(oCode)
        createSuccessMessage(oBtn.getBoundingClientRect())
      } catch {
        // eslint-disable-next-line no-console
        console.error('复制失败')
      }
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClick, false)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClick, false)
  })
}
