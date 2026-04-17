import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createElement } from 'react'
import { useInsights } from '../../hooks/useInsights'
import * as insightsApi from '../../api/insightsApi'

vi.mock('../../api/insightsApi')

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  })
  return ({ children }) =>
    createElement(QueryClientProvider, { client: queryClient }, children)
}

describe('useInsights', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches insights successfully', async () => {
    const mockData = {
      salary_by_country: [
        { country: 'US', min_salary: 50000, max_salary: 150000, avg_salary: 95000, headcount: 100 }
      ],
      salary_by_job_title: [
        { job_title: 'Software Engineer', avg_salary: 95000, headcount: 50 }
      ],
      headcount_by_department: [
        { department: 'Engineering', headcount: 200 }
      ],
      salary_distribution: [
        { range: '0-30k', count: 10 },
        { range: '30k-60k', count: 30 },
        { range: '60k-100k', count: 40 },
        { range: '100k+', count: 20 },
      ],
      top_paid_roles: [
        { job_title: 'CTO', avg_salary: 300000 }
      ],
      recent_hires: [
        { full_name: 'John Smith', hired_on: '2024-01-15' }
      ],
    }

    insightsApi.getSalaryInsights.mockResolvedValue(mockData)

    const { result } = renderHook(() => useInsights(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data.salary_by_country).toHaveLength(1)
    expect(result.current.data.headcount_by_department[0].department).toBe('Engineering')
    expect(result.current.data.top_paid_roles[0].job_title).toBe('CTO')
  })

  it('fetches insights with country filter', async () => {
    insightsApi.getSalaryInsights.mockResolvedValue({ salary_by_country: [] })

    const { result } = renderHook(() => useInsights({ country: 'US' }), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(insightsApi.getSalaryInsights).toHaveBeenCalledWith({ country: 'US' })
  })

  it('handles fetch error', async () => {
    insightsApi.getSalaryInsights.mockRejectedValue(new Error('Network error'))

    const { result } = renderHook(() => useInsights(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(result.current.error.message).toBe('Network error')
  })
})