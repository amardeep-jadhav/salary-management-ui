import client from './client'

export const getCountries = async () => {
  const { data } = await client.get('/meta/countries')
  return data
}

export const getDepartments = async () => {
  const { data } = await client.get('/meta/departments')
  return data
}

export const getJobTitles = async () => {
  const { data } = await client.get('/meta/job_titles')
  return data
}