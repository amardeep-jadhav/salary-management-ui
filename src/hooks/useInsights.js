import { useQuery } from '@tanstack/react-query'
import { getSalaryInsights } from '../api/insightsApi'

const INSIGHTS_KEY = 'insights'

export const useInsights = (params = {}) => {
  return useQuery({
    queryKey: [INSIGHTS_KEY, params],
    queryFn: () => getSalaryInsights(params),
    staleTime: 10 * 60 * 1000,
  })
}