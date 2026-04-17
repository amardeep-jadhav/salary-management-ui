import axios from 'axios'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error.response?.data

    // Rails returns { errors: [...] } array or { error: "..." } string
    let message = 'Something went wrong'

    if (data?.errors && Array.isArray(data.errors)) {
      message = data.errors.join(', ')
    } else if (data?.error) {
      message = data.error
    } else if (data?.errors && typeof data.errors === 'string') {
      message = data.errors
    }

    return Promise.reject(new Error(message))
  }
)

export default client