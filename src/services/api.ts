import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import { setCookie } from 'nookies'

const api = axios.create({
  withCredentials: true
})

createAuthRefreshInterceptor(api, error =>
  api.get('/api/refreshToken').then(response => {
    if (api.defaults.headers.setCookie) {
      delete api.defaults.headers.setCookie
    }

    const { accessToken } = response.data

    const bearer = `Bearer ${accessToken}`

    if (!accessToken) {
      api.defaults.headers.setCookie =
        'JID=; Max-Age=-1; Path=/; HttpOnly; SameSite=Lax'

      return Promise.resolve()
    }

    api.defaults.headers.common.Authorization = bearer

    error.response.config.headers.Authorization = bearer

    setCookie({ res: error.response }, 'dashboard.access-token', accessToken, {
      maxAge: 60 * 15,
      path: '/'
    })

    return Promise.resolve()
  })
)

export { api }
