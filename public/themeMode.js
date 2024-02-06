let themeMode = localStorage.getItem('HUMANDETAIL_THEME')

if (!themeMode) {
  // 跟随系统
  const scheme = window.matchMedia(`(prefers-color-scheme: ${themeMode})`)
  
  if (!scheme.matches) {
    themeMode = themeMode === 'light' ? 'dark' : 'light'
  }
}

if (!['light', 'dark'].includes(themeMode)) {
  themeMode = 'light'
}

document.documentElement.setAttribute('data-theme', themeMode)
localStorage.setItem('HUMANDETAIL_THEME', themeMode)
