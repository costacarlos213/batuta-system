import axios from 'axios'
import { serialize } from 'cookie'
import { parseCookies } from 'nookies'

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true
})

api.interceptors.request.use(config => {
  const { 'dashboard.access-token': token } = parseCookies({ req: config })

  if (token) {
    const bearer = `Bearer ${token}`

    api.defaults.headers.Authorization = bearer
    config.headers.Authorization = bearer
  }

  return config
})

api.interceptors.response.use(
  config => config,
  error => {
    if (
      error.response.status === 401 &&
      error.response.config &&
      !error.response.config.__isRetryRequest
    ) {
      console.log(error.response.status)

      return api
        .post('/api/refreshToken', undefined, {
          headers: error.config.headers
        })
        .then(response => {
          console.log('refresing...')

          if (api.defaults.headers['Set-Cookie']) {
            delete api.defaults.headers['Set-Cookie']
          }

          const { accessToken } = response.data
          if (!accessToken) {
            return api(error.response.config)
          }

          const bearer = `Bearer ${accessToken}`

          api.defaults.headers.Authorization = bearer

          api.defaults.headers['Set-Cookie'] = serialize(
            'dashboard.access-token',
            accessToken,
            {
              maxAge: 60 * 15
            }
          )

          error.response.config.headers['Set-Cookie'] = serialize(
            'dashboard.access-token',
            accessToken,
            {
              maxAge: 60 * 15
            }
          )
          error.response.config.headers.Authorization = bearer

          error.response.config.__isRetryRequest = true

          return api(error.response.config)
        })
    }

    return Promise.reject(error)
  }
)

export { api }
