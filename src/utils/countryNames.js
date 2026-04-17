export const getCountryName = (code) => {
  if (!code) return '—'
  try {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(code) || code
  } catch {
    return code
  }
}