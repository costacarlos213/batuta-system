import React, { useState } from 'react'

import { Flex, Button, Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import { IOrder } from 'src/pages/order/[id]'
import { api } from 'src/services/api'

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
      const response = await api.post(
        '/api/print',
        {
          printArray: printData,
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
    }
  }

  const handleGenerateReportButton = async () => {
    setIsLoading(true)

    try {
      const filteredChecked = checkedFields.filter((item: IOrder | boolean) =>
        typeof item !== 'boolean' ? item : null
      )

      console.log(filteredChecked)

      const response = await api.post(
        '/api/print',
        {
          printArray:
            filteredChecked.length === 0 ? printData : filteredChecked,
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
    }
  }

  return (
    <Flex flexDirection="row" alignItems="center">
      <Button
        onClick={handlePrintButton}
        disabled={isLoading}
        px="5"
        mb="2"
        fontWeight="medium"
        fontSize="md"
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
        ml="6"
        mb="2"
        fontWeight="semibold"
        fontSize="md"
        backgroundColor="whatsapp.500"
        px="5"
        color="white"
        _hover={{
          backgroundColor: 'whatsapp.400'
        }}
      >
        Gerar Relatório
      </Button>
      <Button
        onClick={openModal}
        px="5"
        ml="5"
        mb="2"
        hidden={!checkedFields.find(item => typeof item !== 'boolean')}
        disabled={isLoading}
        fontWeight="semibold"
        fontSize="sm"
        color="white"
        backgroundColor="red.500"
        _hover={{
          backgroundColor: 'red.600'
        }}
      >
        Excluir
      </Button>
      <Spinner hidden={!isLoading} size="sm" mb="2" ml="5" />
    </Flex>
  )
}

export default ButtonGroup
