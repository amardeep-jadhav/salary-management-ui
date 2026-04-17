import client from './client'

export const getSalaryInsights = async (params = {}) => {
  const { data } = await client.get('/insights/salary', { params })
  return data
}