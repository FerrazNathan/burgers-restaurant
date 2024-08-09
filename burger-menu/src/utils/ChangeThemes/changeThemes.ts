export function handleChangeContrast() {
  const storageThemeContrast = window.localStorage.getItem('theme')

  if (storageThemeContrast === 'contrast') {
    return true
  } else {
    return false
  }
}

export function handleChangeDarkMode() {
  const storageThemeDarkMode = window.localStorage.getItem('theme')

  if (storageThemeDarkMode === 'darkMode') {
    return true
  } else {
    return false
  }
}

export function handleChangeLightMode() {
  const storageThemeDarkMode = window.localStorage.getItem('theme')

  if (storageThemeDarkMode === 'lightMode') {
    return true
  } else {
    return false
  }
}