import { useQuery } from '@tanstack/react-query'
import { getCountries, getDepartments, getJobTitles } from '../api/metaApi'

export const useCountries = () => {
  return useQuery({
    queryKey: ['countries'],
    queryFn: getCountries,
    staleTime: 30 * 60 * 1000,
  })
}

export const useDepartments = () => {
  return useQuery({
    queryKey: ['departments'],
    queryFn: getDepartments,
    staleTime: 30 * 60 * 1000,
  })
}

export const useJobTitles = () => {
  return useQuery({
    queryKey: ['job_titles'],
    queryFn: getJobTitles,
    staleTime: 30 * 60 * 1000,
  })
}