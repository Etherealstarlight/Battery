import axios from 'axios'

let hostUrl = window.location.origin
const isProduction = process.env.NODE_ENV === 'production'

console.log(import.meta.env.VITE_SERVER_URL)

if (import.meta.env.VITE_SERVER_URL && !isProduction) {
  hostUrl = import.meta.env.VITE_SERVER_URL
}

const authInterceptor = (config) => {
  config.headers = {
    ...config.headers,
    authorization: `Bearer ${localStorage.getItem('token')}`,
  }
}

const axiosClient = axios.create({
  baseURL: hostUrl + '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosClient.interceptors.request.use((config) => {
  console.log(config)
  authInterceptor(config)
  return config
})

export { axiosClient }
