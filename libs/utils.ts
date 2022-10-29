import { dark, light } from '~~/config/theme'
import { ThemeMode } from '~~/types'

/**
 * 格式化日期
 * @param { string } dateStr - 日期时间字符串 YYYY-MM-DD HH:mm:ss
 * @param { string } [format] - 格式
 */
export const formatDate = (dateStr: string, format = 'YYYY-MM-DD') => {
  // 注意：后端返回的日期格式一定是这样的，不会有其他格式
  const reg = /^(\d{4})-(\d{2})-(\d{2})\s{1}(\d{2}):(\d{2}):(\d{2})$/
  const match = dateStr.match(reg)
  if (!match) {
    return dateStr
  }

  const [, YYYY, MM, DD, HH, mm, ss] = match

  return format.replace('YYYY', YYYY)
    .replace('MM', MM)
    .replace('DD', DD)
    .replace('HH', HH)
    .replace('mm', mm)
    .replace('ss', ss)
}

/**
 * 设置 Theme
 */
export const setTheme = (mode: ThemeMode) => {
  const oHTML = document.documentElement

  const theme = mode === 'dark'
    ? dark
    : light

  const themeStr = Object.entries(theme).reduce((prev, [key, value]) => {
    return prev + `--${key}: ${value};`
  }, '')

  oHTML.className = mode
  oHTML.setAttribute('style', themeStr)
}
