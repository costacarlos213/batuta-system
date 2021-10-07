import React, { createContext, useState } from 'react'

import axios from 'axios'
import { useRouter } from 'next/router'
import { setCookie } from 'nookies'

import { api } from '../services/api'

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
    try {
      const response = await axios.post(
        '/api/login',
        { email, password },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )

      const { accessToken } = response.data

      setCookie(undefined, 'dashboard.access-token', accessToken, {
        maxAge: 60,
        path: '/'
      })

      setIsAuthenticated(true)

      api.defaults.headers.Authorization = `Bearer ${accessToken}`

      router.push('/dashboard')
    } catch (error) {
      if (error?.response.status === 401) {
        setIsAuthenticated(false)
      } else {
        console.log(error?.response.data)
      }
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
