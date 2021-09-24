import React, { useState } from 'react'

import {
  Button,
  Flex,
  ModalBody,
  ModalCloseButton,
  ModalContent as ChakraModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Text,
  Stack
} from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import { IOrder } from 'src/pages/order/[id]'
import { api } from 'src/services/api'

interface IModalFunctions {
  checkedFields?: (IOrder | boolean)[]
  onClose: () => void
}

const ModalContent: React.FC<IModalFunctions> = ({
  onClose,
  checkedFields
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleMultipleDelete = () => {
    setIsLoading(true)

    const filteredIds: IOrder[] = checkedFields?.filter(
      item => typeof item !== 'boolean'
    ) as IOrder[]
    const onlyIds = filteredIds?.map(order => {
      return { id: order.id }
    })

    api
      .delete('/api/deleteOrders', {
        data: onlyIds
      })
      .then(() => {
        onClose()
        router.reload()
      })
      .catch(err => {
        if (err?.response?.status === 401) {
          router.push('/')
        } else {
          console.log(err)
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <>
      <ChakraModalContent zIndex="9999">
        <ModalHeader zIndex="9999">
          {isLoading ? (
            <Spinner position="absolute" right="4" top="3" />
          ) : (
            <ModalCloseButton onClose={onClose} />
          )}
        </ModalHeader>
        <ModalBody zIndex="9999">
          <Stack spacing="10" justifyContent="center" alignItems="center">
            <Text textAlign="center" fontWeight="bold" fontSize="xl">
              Você deseja mesmo apagar esse pedido?
            </Text>
            <Flex
              flexDirection="row"
              alignItems="center"
              justifyContent="space-evenly"
            >
              <Button
                mr="8"
                size="lg"
                _hover={{
                  backgroundColor: '#d9e8f8'
                }}
                onClick={handleMultipleDelete}
              >
                Sim
              </Button>
              <Button
                backgroundColor="red.300"
                size="lg"
                onClick={onClose}
                _hover={{
                  backgroundColor: 'red.400'
                }}
              >
                Não
              </Button>
            </Flex>
          </Stack>
        </ModalBody>
        <ModalFooter />
      </ChakraModalContent>
    </>
  )
}

export default ModalContent
