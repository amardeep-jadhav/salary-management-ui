import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../api/employeesApi'

const EMPLOYEES_KEY = 'employees'

export const useEmployees = (params = {}) => {
  return useQuery({
    queryKey: [EMPLOYEES_KEY, params],
    queryFn: () => getEmployees(params),
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
  })
}

export const useEmployee = (id) => {
  return useQuery({
    queryKey: [EMPLOYEES_KEY, id],
    queryFn: () => getEmployee(id),
    enabled: !!id,
  })
}

export const useCreateEmployee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EMPLOYEES_KEY] })
    },
  })
}

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EMPLOYEES_KEY] })
    },
  })
}

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EMPLOYEES_KEY] })
    },
  })
}