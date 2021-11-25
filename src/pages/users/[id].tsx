import React, { useState } from 'react'
import { Edit2, Save, Trash2 } from 'react-feather'
import { useForm } from 'react-hook-form'

import {
  Box,
  Heading,
  Text,
  useDisclosure,
  Stack,
  FormControl,
  Button,
  Flex,
  Icon,
  Spinner,
  Modal,
  ModalOverlay
} from '@chakra-ui/react'
import axios from 'axios'
import {
  GetServerSideProps,
  GetServerSidePropsResult,
  InferGetServerSidePropsType
} from 'next'
import { useRouter } from 'next/dist/client/router'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import ChakraReactSelect from 'src/components/ChakraReactSelect'
import ModalContent from 'src/components/ExcludeModal'
import { api } from 'src/services/api'
import { handleMultipleVendorDelete } from 'src/utils/deleteMultipleVendors'

import { IVendorFields } from '../../../@types/vendor'
import Input from '../../components/FormInput'

const Vendor: React.FC = ({
  vendor
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [isDisabled, setIsDisabled] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const { isOpen, onOpen, onClose } = useDisclosure()

  const router = useRouter()

  let pixLabel: string

  switch (vendor.pixType) {
    case 'cpf':
      pixLabel = 'Cpf'
      break

    case 'email':
      pixLabel = 'Email'
      break

    case 'phone':
      pixLabel = 'Telefone'
      break

    case 'randomKey':
      pixLabel = 'Chave Aleatória'
      break

    default:
      pixLabel = 'unset'
      break
  }

  const { register, handleSubmit, control } = useForm<IVendorFields>({
    defaultValues: {
      vendors: [
        {
          id: vendor.id,
          name: vendor.name,
          email: vendor.email,
          pixType: vendor.pixType,
          pixKey: vendor.pixKey
        }
      ]
    }
  })

  const handleEdit = () => {
    setIsDisabled(false)
  }

  const handleUpdate = handleSubmit(async data => {
    const formData = data.vendors[0]

    setIsLoading(true)
    setIsDisabled(true)
    api
      .put('/api/updateVendor', formData)
      .then(() => {
        setError('')
      })
      .catch(err => {
        if (err?.response?.status === 401) {
          router.push('/')
        } else {
          switch (err?.response?.data.message) {
            case "Email can't be null.":
              setError('"Email" não pode ser nulo.')
              break

            case "Name can't be null.":
              setError('"Nome" não pode ser nulo.')
              break

            default:
              setError('')
              break
          }
        }
      })
      .finally(() => setIsLoading(false))
  })

  const pixTypeOptions = [
    { label: 'Chave Aleatória', value: 'randomKey' },
    { label: 'Email', value: 'email' },
    { label: 'Telefone', value: 'phone' },
    { label: 'Cpf', value: 'cpf' }
  ]

  return (
    <Box
      as="main"
      ml={['0', '0', '2']}
      bg="white"
      display="flex"
      flexDirection="column"
      w="full"
      h="full"
      mt={['2', '2', '0']}
      pt={['3', '3', '5']}
      pl={['5', '5', '10']}
      pr="5"
      justifyContent={['center', 'center', 'flex-start']}
      overflowX={['scroll', 'scroll', 'hidden']}
    >
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        closeOnEsc
        closeOnOverlayClick
      >
        <ModalOverlay />
        <ModalContent
          deleteFunction={handleMultipleVendorDelete}
          onClose={onClose}
          checkedFields={[vendor]}
          title="Você deseja mesmo apagar esse pedido?"
        />
      </Modal>
      <form
        style={{
          height: '100%'
        }}
        id="newForm"
      >
        <Flex
          flexDirection={['column', 'row']}
          width={['full', 'xl', 'xl', '2xl', '4xl']}
          alignItems={['center', 'center', 'flex-start']}
          justifyContent="space-between"
          mb="3"
        >
          <Heading as="header" fontWeight="medium" fontSize="x-large" mb="6">
            Dados do vendedor
          </Heading>
          <Flex
            direction={['column-reverse', 'column-reverse', 'row']}
            alignItems="center"
            justifyContent="center"
          >
            <Spinner
              zIndex="9999"
              size="sm"
              mr={['0', '0', '5']}
              display={isLoading ? 'block' : 'none'}
            />
            <Stack
              spacing={5}
              direction="row"
              alignItems="center"
              mb={['6', '6', '0']}
            >
              {isDisabled && (
                <Button
                  disabled={isLoading}
                  onClick={handleEdit}
                  px="3"
                  backgroundColor="gray.100"
                  _hover={{
                    backgroundColor: 'gray.300'
                  }}
                >
                  <Icon as={Edit2} mr="2" />
                  Editar
                </Button>
              )}
              {!isDisabled && (
                <Button
                  disabled={isLoading}
                  onClick={handleUpdate}
                  type="submit"
                  backgroundColor="whatsapp.500"
                  px="3"
                  color="white"
                  _hover={{
                    backgroundColor: 'green.400'
                  }}
                >
                  <Icon as={Save} mr="2" />
                  Salvar
                </Button>
              )}
              <Button
                onClick={onOpen}
                isDisabled={isLoading}
                backgroundColor="red.500"
                _hover={{
                  backgroundColor: 'red.600'
                }}
              >
                <Icon as={Trash2} color="white" />
              </Button>
            </Stack>
          </Flex>
        </Flex>
        <FormControl
          disabled={isDisabled}
          opacity={isDisabled ? 0.8 : 1}
          cursor={isDisabled ? 'not-allowed' : 'default'}
          as="fieldset"
          w="full"
          form="newForm"
          borderColor="#dfdfdf"
          pb="6"
        >
          <Stack spacing="5" width={['full', 'full', '2xl', '4xl']}>
            <Input
              isDisabled={isDisabled}
              cursor={isDisabled ? 'not-allowed' : 'default'}
              placeholder="Nome do Vendedor"
              width={['full', 'full', '52', '2xs']}
              mr={['0', '0', '16']}
              defaultValue={vendor.name}
              {...register('vendors.0.name', {
                maxLength: 250,
                required: false
              })}
            />
            <Stack
              direction={['column', 'column', 'row']}
              width="full"
              spacing="5"
            >
              <ChakraReactSelect
                mr={['0', '0', '3']}
                disabled={isDisabled}
                control={control}
                creatable={false}
                width={['full', 'full', 'xs', 'sm']}
                defaultOptions={pixTypeOptions}
                defaultValue={vendor.pixType}
                defaultLabel={pixLabel}
                placeholder="Tipo de Chave Pix"
                {...register('vendors.0.pixType', {
                  maxLength: 250,
                  required: false
                })}
              />
              <Input
                cursor={isDisabled ? 'not-allowed' : 'default'}
                placeholder="Chave Pix"
                defaultValue={vendor.pixKey}
                isDisabled={isDisabled}
                width="full"
                {...register('vendors.0.pixKey', {
                  maxLength: 250,
                  required: false
                })}
              />
            </Stack>
            <Input
              cursor={isDisabled ? 'not-allowed' : 'default'}
              placeholder="Email"
              defaultValue={vendor.email}
              isDisabled={isDisabled}
              {...register('vendors.0.email', {
                maxLength: 250,
                required: false
              })}
            />
          </Stack>
        </FormControl>
        {error && (
          <Text mb="5" color="red" fontWeight="medium">
            {error}
          </Text>
        )}
      </form>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { 'dashboard.access-token': token, JID } = parseCookies(ctx)

  const bearer = `Bearer ${token}`

  api.defaults.headers.common.Authorization = bearer

  return (await axios({
    method: 'GET',
    params: {
      id: ctx.params?.id
    },
    url: '/user',
    baseURL: process.env.API_URL,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      if (!response.data || response.data.length === 0) {
        return {
          redirect: {
            destination: '/dashboard',
            permanent: false
          }
        }
      }

      return {
        props: {
          vendor: response.data[0]
        }
      }
    })
    .catch(async error => {
      if (error.response.status === 401) {
        try {
          const response = await axios.get(`${process.env.API_URL}/token`, {
            headers: {
              Cookie: `JID=${JID}`
            }
          })

          setCookie(
            { res: ctx.res },
            'dashboard.access-token',
            response.data.accessToken,
            {
              maxAge: 60,
              path: '/'
            }
          )

          const newbearer = `Bearer ${response.data.accessToken}`

          api.defaults.headers.common.Authorization = newbearer

          const newResponse = await axios({
            method: 'GET',
            params: {
              id: ctx.params?.id
            },
            url: '/user',
            baseURL: process.env.API_URL,
            headers: {
              Authorization: newbearer
            }
          })

          if (!newResponse.data || newResponse.data.length === 0) {
            return {
              redirect: {
                destination: '/dashboard',
                permanent: false
              }
            }
          }

          return {
            props: {
              vendor: newResponse.data[0]
            }
          }
        } catch (error) {
          destroyCookie({ res: ctx.res }, 'JID', {
            httpOnly: true,
            path: '/'
          })

          return {
            redirect: {
              destination: '/',
              permanent: false
            }
          }
        }
      }
    })) as GetServerSidePropsResult<IVendorFields>
}

export default Vendor
