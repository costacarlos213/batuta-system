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
import { AxiosResponse } from 'axios'
import { useRouter } from 'next/dist/client/router'

export interface IModalFunctionParams {
  checkedFields?: (Record<string, unknown> | boolean)[]
}

interface IModalFunctions {
  checkedFields?: (Record<string, unknown> | boolean)[]
  title: string
  deleteFunction: ({
    checkedFields
  }: IModalFunctionParams) => Promise<AxiosResponse>
  onClose: () => void
}

const ModalContent: React.FC<IModalFunctions> = ({
  onClose,
  deleteFunction,
  title,
  checkedFields
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleDelete = () => {
    setIsLoading(true)

    console.log(checkedFields)

    deleteFunction({ checkedFields })
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
              {title}
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
                onClick={handleDelete}
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
