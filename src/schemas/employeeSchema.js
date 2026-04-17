import { z } from 'zod'

export const employeeSchema = z.object({
  full_name: z
    .string()
    .min(1, 'Full name is required'),

  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),

  phone: z
    .string()
    .optional(),

  gender: z
    .string()
    .optional(),

  country: z
    .string()
    .min(1, 'Country is required'),

  city: z
    .string()
    .optional(),

  department_id: z
    .string()
    .min(1, 'Department is required'),

  job_title_id: z
    .string()
    .min(1, 'Job title is required'),

  employment_type: z
    .enum(['full_time', 'part_time', 'contract'], {
      errorMap: () => ({ message: 'Invalid employment type' }),
    }),

  salary: z
    .number({
      invalid_type_error: 'Salary must be a number',
    })
    .gt(0, 'Salary must be greater than 0'),

  currency: z
    .string()
    .min(1, 'Currency is required'),

  hired_on: z
    .string()
    .min(1, 'Hire date is required'),

  date_of_birth: z
    .string()
    .optional(),
})