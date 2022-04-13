import { Theme } from '~~/config/constants'

export default () => useState<Theme>('themeMode', () => Theme.default)
