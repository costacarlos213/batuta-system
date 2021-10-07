import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import { destroyCookie, setCookie } from 'nookies'

const api = axios.create({
  withCredentials: true,
  baseURL: 'https://biruta-wind-system.vercel.app'
})

createAuthRefreshInterceptor(api, error =>
  api.get('/api/refreshToken').then(response => {
    if (api.defaults.headers.setCookie) {
      delete api.defaults.headers.setCookie
    }

    const { accessToken } = response.data

    const bearer = `Bearer ${accessToken}`

    if (!accessToken) {
      console.log('responsed')

      api.defaults.headers.setCookie =
        'JID=; Max-Age=-1; Path=/; HttpOnly; SameSite=Lax'

      destroyCookie({ res: error.response }, 'dashboard.access-token', {
        path: '/'
      })

      return Promise.resolve()
    }

    api.defaults.headers.common.Authorization = bearer

    error.response.config.headers.Authorization = bearer

    setCookie({ res: error.response }, 'dashboard.access-token', accessToken, {
      maxAge: 60,
      path: '/'
    })

    return Promise.resolve()
  })
)

export { api }
