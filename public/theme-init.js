;(() => {
  try {
    const stored = localStorage.getItem('theme')
    const dark =
      stored === 'dark' ||
      (stored !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    const theme = dark ? 'dark' : 'light'
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
  } catch {
    document.documentElement.dataset.theme = 'light'
  }
})()
