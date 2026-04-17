export const formatSalary = (amount, currency = 'USD') => {
  if (amount === null || amount === undefined) return 'N/A'

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export const formatDate = (dateString) => {
  if (!dateString) return 'N/A'

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateString))
}

export const getInitials = (fullName) => {
  if (!fullName || fullName.trim() === '') return '??'

  return fullName
    .trim()
    .split(' ')
    .map((n) => n[0].toUpperCase())
    .slice(0, 2)
    .join('')
}

export const getEmploymentTypeBadge = (type) => {
  const config = {
    full_time: { label: 'Full Time', color: 'success' },
    part_time: { label: 'Part Time', color: 'info' },
    contract: { label: 'Contract', color: 'warning' },
  }
  return config[type] || { label: type, color: 'secondary' }
}