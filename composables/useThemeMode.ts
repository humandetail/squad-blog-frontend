/*!
 * 主题模式
 */

import { ThemeMode } from '~~/types'

export default () => useState<ThemeMode>('themeMode', () => 'dark')
