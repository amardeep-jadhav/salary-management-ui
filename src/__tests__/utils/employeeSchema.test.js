import { describe, it, expect } from 'vitest'
import { employeeSchema } from '../../schemas/employeeSchema'

describe('employeeSchema', () => {
  const validEmployee = {
    full_name: 'John Smith',
    email: 'john@example.com',
    country: 'US',
    city: 'New York',
    department_id: '123e4567-e89b-12d3-a456-426614174000',
    job_title_id: '123e4567-e89b-12d3-a456-426614174001',
    employment_type: 'full_time',
    salary: 85000,
    currency: 'USD',
    hired_on: '2022-01-15',
  }

  it('passes with valid data', () => {
    const result = employeeSchema.safeParse(validEmployee)
    expect(result.success).toBe(true)
  })

  it('fails when full_name is empty', () => {
    const result = employeeSchema.safeParse({ ...validEmployee, full_name: '' })
    expect(result.success).toBe(false)
    expect(result.error.issues[0].message).toBe('Full name is required')
  })

  it('fails with invalid email', () => {
    const result = employeeSchema.safeParse({ ...validEmployee, email: 'not-an-email' })
    expect(result.success).toBe(false)
    expect(result.error.issues[0].message).toBe('Invalid email address')
  })

  it('fails when salary is zero', () => {
    const result = employeeSchema.safeParse({ ...validEmployee, salary: 0 })
    expect(result.success).toBe(false)
    expect(result.error.issues[0].message).toBe('Salary must be greater than 0')
  })

  it('fails when salary is negative', () => {
    const result = employeeSchema.safeParse({ ...validEmployee, salary: -100 })
    expect(result.success).toBe(false)
    expect(result.error.issues[0].message).toBe('Salary must be greater than 0')
  })

  it('fails when country is empty', () => {
    const result = employeeSchema.safeParse({ ...validEmployee, country: '' })
    expect(result.success).toBe(false)
    expect(result.error.issues[0].message).toBe('Country is required')
  })

  it('fails with invalid employment type', () => {
    const result = employeeSchema.safeParse({ ...validEmployee, employment_type: 'invalid' })
    expect(result.success).toBe(false)
  })

  it('fails when hired_on is empty', () => {
    const result = employeeSchema.safeParse({ ...validEmployee, hired_on: '' })
    expect(result.success).toBe(false)
    expect(result.error.issues[0].message).toBe('Hire date is required')
  })
})