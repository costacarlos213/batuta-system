import React, { useState } from 'react'

import { Flex, Button, Spinner } from '@chakra-ui/react'
import { IOrder } from 'src/pages/order/[id]'
import { api } from 'src/services/api'

interface IButtonGroup {
  printData: IOrder[]
  checkedFields: ({ id: string } | boolean)[]
  openModal: () => void
}

const ButtonGroup: React.FC<IButtonGroup> = ({
  printData,
  checkedFields,
  openModal
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const handlePrintButton = async () => {
    setIsLoading(true)
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
  }

  const handleGenerateReportButton = async () => {
    setIsLoading(true)
    const response = await api.post(
      '/api/print',
      {
        printArray: printData,
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
  }

  return (
    <Flex flexDirection="row" alignItems="center">
      <Button
        onClick={handlePrintButton}
        disabled={isLoading}
        bg="transparent"
        p="0"
        ml="3"
        mb="2"
        fontWeight="medium"
        fontSize="sm"
        _hover={{
          color: 'gray.500'
        }}
      >
        Imprimir
      </Button>
      <Button
        onClick={handleGenerateReportButton}
        disabled={isLoading}
        bg="transparent"
        p="0"
        ml="5"
        mb="2"
        fontWeight="semibold"
        fontSize="sm"
        color="whatsapp.500"
        _hover={{
          color: 'green.400'
        }}
      >
        Gerar Relatório
      </Button>
      <Button
        onClick={openModal}
        bg="transparent"
        p="0"
        ml="5"
        mb="2"
        hidden={!checkedFields.find(item => typeof item !== 'boolean')}
        disabled={isLoading}
        fontWeight="semibold"
        fontSize="sm"
        color="red.300"
        _hover={{
          color: 'red.400'
        }}
      >
        Excluir
      </Button>
      <Spinner hidden={!isLoading} size="sm" mb="2" ml="5" />
    </Flex>
  )
}

export default ButtonGroup
