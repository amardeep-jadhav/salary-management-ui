import client from './client'

export const getEmployees = async (params = {}) => {
  const { data } = await client.get('/employees', { params })
  return data
}

export const getEmployee = async (id) => {
  const { data } = await client.get(`/employees/${id}`)
  return data
}

export const createEmployee = async (payload) => {
  const { data } = await client.post('/employees', { employee: payload })
  return data
}

export const updateEmployee = async ({ id, ...payload }) => {
  const { data } = await client.patch(`/employees/${id}`, { employee: payload })
  return data
}

export const deleteEmployee = async (id) => {
  const { data } = await client.delete(`/employees/${id}`)
  return data
}