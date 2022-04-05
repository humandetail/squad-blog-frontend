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
