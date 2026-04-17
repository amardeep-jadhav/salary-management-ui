import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createElement } from 'react'
import { useEmployees, useEmployee, useCreateEmployee, useUpdateEmployee, useDeleteEmployee } from '../../hooks/useEmployees'
import * as employeesApi from '../../api/employeesApi'

vi.mock('../../api/employeesApi')

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
  return ({ children }) =>
    createElement(QueryClientProvider, { client: queryClient }, children)
}

describe('useEmployees', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches employees successfully', async () => {
    const mockData = {
      data: [{ id: '1', full_name: 'John Smith', salary: 85000 }],
      meta: { current_page: 1, total_pages: 1, total_count: 1 },
    }
    employeesApi.getEmployees.mockResolvedValue(mockData)

    const { result } = renderHook(() => useEmployees(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data.data).toHaveLength(1)
    expect(result.current.data.data[0].full_name).toBe('John Smith')
  })

  it('handles fetch error', async () => {
    employeesApi.getEmployees.mockRejectedValue(new Error('Network error'))

    const { result } = renderHook(() => useEmployees(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(result.current.error.message).toBe('Network error')
  })
})

describe('useCreateEmployee', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('creates employee successfully', async () => {
    const mockEmployee = { id: '1', full_name: 'Jane Doe' }
    employeesApi.createEmployee.mockResolvedValue(mockEmployee)

    const { result } = renderHook(() => useCreateEmployee(), {
      wrapper: createWrapper(),
    })

    result.current.mutate({ full_name: 'Jane Doe', salary: 90000 })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(employeesApi.createEmployee).toHaveBeenCalledTimes(1)
  })
})

describe('useDeleteEmployee', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deletes employee successfully', async () => {
    employeesApi.deleteEmployee.mockResolvedValue({ message: 'Employee deactivated successfully' })

    const { result } = renderHook(() => useDeleteEmployee(), {
      wrapper: createWrapper(),
    })

    result.current.mutate('1')

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(employeesApi.deleteEmployee).toHaveBeenCalledWith('1')
  })
})