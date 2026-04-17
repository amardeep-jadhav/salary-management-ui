import { describe, it, expect } from 'vitest'
import {
  formatSalary,
  formatDate,
  getInitials,
  getEmploymentTypeBadge
} from '../../utils/salaryFormatter'

describe('formatSalary', () => {
  it('formats a number as currency', () => {
    expect(formatSalary(85000, 'USD')).toBe('$85,000')
  })

  it('formats GBP correctly', () => {
    expect(formatSalary(50000, 'GBP')).toBe('£50,000')
  })

  it('returns N/A for null salary', () => {
    expect(formatSalary(null, 'USD')).toBe('N/A')
  })

  it('returns N/A for undefined salary', () => {
    expect(formatSalary(undefined, 'USD')).toBe('N/A')
  })
})

describe('formatDate', () => {
  it('formats a date string to readable format', () => {
    expect(formatDate('2022-01-15')).toBe('Jan 15, 2022')
  })

  it('returns N/A for null date', () => {
    expect(formatDate(null)).toBe('N/A')
  })
})

describe('getInitials', () => {
  it('returns initials from full name', () => {
    expect(getInitials('John Smith')).toBe('JS')
  })

  it('returns single initial for single name', () => {
    expect(getInitials('John')).toBe('J')
  })

  it('returns ?? for empty name', () => {
    expect(getInitials('')).toBe('??')
  })
})

describe('getEmploymentTypeBadge', () => {
  it('returns correct config for full_time', () => {
    const badge = getEmploymentTypeBadge('full_time')
    expect(badge.label).toBe('Full Time')
    expect(badge.color).toBe('success')
  })

  it('returns correct config for contract', () => {
    const badge = getEmploymentTypeBadge('contract')
    expect(badge.label).toBe('Contract')
    expect(badge.color).toBe('warning')
  })

  it('returns correct config for part_time', () => {
    const badge = getEmploymentTypeBadge('part_time')
    expect(badge.label).toBe('Part Time')
    expect(badge.color).toBe('info')
  })
})