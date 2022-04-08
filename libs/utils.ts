export const zeroFill = (value: string | number, length = 2) => (value + '').padStart(length, '0')

export const formatDate = (dateString?: string, format = 'YYYY-MM-DD') => {
  const date = new Date(dateString || '')

  const year = date.getFullYear()
  const month = zeroFill((date.getMonth() + 1))
  const d = zeroFill((date.getDate()))
  const hours = zeroFill(date.getHours())
  const minutes = zeroFill(date.getMinutes())
  const seconds = zeroFill(date.getSeconds())

  return format.replace(/YYYY/i, year + '')
    .replace(/MM/, month)
    .replace(/DD/i, d)
    .replace(/hh/i, hours)
    .replace(/mm/i, minutes)
    .replace(/ss/i, seconds)
}

export function setStyles (el: HTMLElement, styles: Record<string, any>) {
  el.setAttribute('style', Object.entries(styles).reduce((prev, [key, value]) => {
    return prev + `${key}: ${value};`
  }, ''))
}

export const renderCopySuccess = ({ x, y }: DOMRect) => {
  const oDiv = document.createElement('div')
  const styles: Record<string, any> = {
    display: 'inline-block',
    position: 'fixed',
    left: x + 'px',
    top: y - 20 + 'px',
    'z-index': 99999,
    'font-size': '16px',
    color: 'var(--success-color)',
    transition: 'all 1.9s ease-in-out'
  }
  oDiv.textContent = '复制成功'

  setStyles(oDiv, styles)

  document.body.appendChild(oDiv)

  setTimeout(() => {
    styles.transform = 'translate(30px, -30px)'
    styles.opacity = 0
    setStyles(oDiv, styles)
  }, 100)

  return oDiv
}
