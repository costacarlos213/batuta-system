import React, { createContext, useState } from 'react'
import { OptionTypeBase } from 'react-select'

import { useRouter } from 'next/router'

import { IFormValues } from '../../@types/vendor'
import { api } from '../services/api'

type NamesContextType = {
  users: OptionTypeBase[]
  fetchNames: () => Promise<void>
}

export const NamesContext = createContext({} as NamesContextType)

export const NamesProvider: React.FC = ({ children }) => {
  const [names, setNames] = useState<OptionTypeBase[]>([])

  const router = useRouter()

  async function fetchNames() {
    try {
      const { data } = await api.get('/api/getNames')

      const users: OptionTypeBase[] = []

      data.forEach(({ name, id }: IFormValues) => {
        users.push({
          label: name,
          value: id
        })
      })

      setNames(users)
    } catch (error) {
      if (error?.response.status === 401) {
        router.replace('/')
      } else {
        console.log(error?.response.data)
      }
    }
  }

  return (
    <NamesContext.Provider value={{ users: names, fetchNames }}>
      {children}
    </NamesContext.Provider>
  )
}
