import React, { createContext, useState } from 'react'

import { useRouter } from 'next/router'
import { setCookie } from 'nookies'
import { api } from 'src/services/api'

type LoginDataType = {
  email: string
  password: string
}

type AuthContextType = {
  isAuthenticated: boolean | undefined
  signIn: (data: LoginDataType) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export const AuthProvider: React.FC = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>()

  const router = useRouter()

  async function signIn({ email, password }: LoginDataType) {
    const response = await api.post(
      '/api/login',
      { email, password },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )

    console.log(response.status)

    if (response.status !== 200) {
      setIsAuthenticated(false)
      return
    }

    const { accessToken } = response.data

    setCookie(undefined, 'dashboard.access-token', accessToken, {
      maxAge: 60 * 15,
      path: '/'
    })

    setIsAuthenticated(true)

    api.defaults.headers.Authorization = `Bearer ${accessToken}`

    router.push('/dashboard')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
