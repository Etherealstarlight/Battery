import axios from 'axios'

const hostUrl = import.meta.env.VITE_SERVER_URL || window.location.origin

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
  authInterceptor(config)
  return config
})

export { axiosClient }
