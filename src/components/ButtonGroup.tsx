import React, { useState } from 'react'

import { Button, Spinner, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import { api } from 'src/services/api'

import { IOrder } from '../../@types/pedidos'

interface IButtonGroup {
  printData: IOrder[]
  checkedFields: (IOrder | boolean)[]
  openModal: () => void
}

const ButtonGroup: React.FC<IButtonGroup> = ({
  printData,
  checkedFields,
  openModal
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handlePrintButton = async () => {
    setIsLoading(true)

    try {
      const filteredChecked = checkedFields.filter((item: IOrder | boolean) =>
        typeof item !== 'boolean' ? item : null
      )

      const response = await api.post(
        '/api/print',
        {
          printArray:
            filteredChecked.length === 0
              ? printData.reverse()
              : filteredChecked.reverse(),
          type: 'simple'
        },
        {
          responseType: 'arraybuffer',
          headers: {
            Accept: 'application/pdf'
          }
        }
      )

      const blob = new Blob([response.data], {
        type: 'application/pdf'
      })

      const url = window.URL.createObjectURL(blob)

      setIsLoading(false)
      window.open(url)
    } catch (err) {
      if (err?.response?.status === 401) {
        router.push('/')
      } else {
        console.log(err)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleGenerateReportButton = async () => {
    setIsLoading(true)

    try {
      const filteredChecked = checkedFields.filter((item: IOrder | boolean) =>
        typeof item !== 'boolean' ? item : null
      )

      const response = await api.post(
        '/api/print',
        {
          printArray:
            filteredChecked.length === 0
              ? printData.reverse()
              : filteredChecked.reverse(),
          type: 'full'
        },
        {
          responseType: 'arraybuffer',
          headers: {
            Accept: 'application/pdf'
          }
        }
      )

      const blob = new Blob([response.data], {
        type: 'application/pdf'
      })

      const url = window.URL.createObjectURL(blob)
      setIsLoading(false)

      window.open(url)
    } catch (err) {
      if (err?.response?.status === 401) {
        router.push('/')
      } else {
        console.log(err)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Stack direction="row" alignItems="center" spacing="3" mb="5" w="xl">
      <Button
        onClick={handlePrintButton}
        disabled={isLoading}
        px="3"
        fontWeight="medium"
        fontSize="sm"
        backgroundColor="gray.100"
        _hover={{
          backgroundColor: 'gray.300'
        }}
      >
        Imprimir Lista
      </Button>
      <Button
        onClick={handleGenerateReportButton}
        disabled={isLoading}
        fontWeight="semibold"
        fontSize="sm"
        backgroundColor="whatsapp.500"
        px="3"
        color="white"
        _hover={{
          backgroundColor: 'whatsapp.400'
        }}
      >
        Gerar Relatório
      </Button>
      <Button
        onClick={openModal}
        px="3"
        hidden={!checkedFields.find(item => typeof item !== 'boolean')}
        disabled={isLoading}
        fontWeight="semibold"
        fontSize="sm"
        color="white"
        backgroundColor="red.500"
        transition="ease-in-out"
        _hover={{
          backgroundColor: 'red.600'
        }}
      >
        Excluir
      </Button>
      <Spinner hidden={!isLoading} size="sm" ml="5" />
    </Stack>
  )
}

export default ButtonGroup
