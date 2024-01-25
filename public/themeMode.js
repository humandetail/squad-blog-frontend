const themeMode = localStorage.getItem('HUMANDETAIL_THEME')

if (themeMode) {
  document.documentElement.setAttribute('data-theme', themeMode)
}
