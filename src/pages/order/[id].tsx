import React, { useEffect, useState } from 'react'
import { Edit2, Save, Trash2 } from 'react-feather'
import { useForm } from 'react-hook-form'

import {
  Box,
  Flex,
  Heading,
  Spinner,
  Button,
  Icon,
  Modal,
  useDisclosure,
  ModalOverlay,
  Textarea,
  Stack
} from '@chakra-ui/react'
import axios from 'axios'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/dist/client/router'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import FieldsContainer from 'src/components/FieldsContainer'
import FileUpload from 'src/components/FileUpload'
import ModalContent from 'src/components/Modal'
import RadioOptions from 'src/components/RadioOptions'
import { api } from 'src/services/api'
import { validateFiles } from 'src/utils/validateFiles'

import { FormValues, UseFormType } from '../../../@types/pedidos'
import Input from '../../components/FormInput'

export interface IOrder {
  address: string
  cod: string
  color: 'green' | 'yellow'
  title: string
  comments: string
  customerName: string
  date: string
  delivery: string
  description: string
  fileNames: string[]
  id: string
  payment: string
  phone: string
  total: string
  vendor: string
}

const Order: React.FC = ({
  order
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [isDisabled, setIsDisabled] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const [files, setFiles] = useState<File[]>()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const router = useRouter()

  const { register, handleSubmit, control, watch, formState } =
    useForm<UseFormType>({
      defaultValues: {
        pedidos: [
          {
            cod: order.cod,
            address: order.address,
            customerName: order.customerName,
            delivery: order.delivery,
            description: order.description,
            file_: undefined,
            payment: order.payment,
            phone: order.phone,
            total: order.total,
            comments: order.comments,
            vendor: order.vendor,
            color: order.color,
            title: order.title,
            initialDate: order.date
          }
        ]
      }
    })
  const urlToFile = async (urls: string[]) => {
    const clipboard = new ClipboardEvent('').clipboardData || new DataTransfer()

    await urls.forEach(async url => {
      const response = await fetch(url, {
        mode: 'cors'
      })

      const blob = await response.blob()
      const file = new File([blob], url.split('%40')[1], { type: blob.type })

      clipboard.items.add(file)

      setFiles(Array.from(clipboard.files))
    })
  }
  useEffect(() => {
    urlToFile(order.fileKeys)
  }, [])

  const phoneWatch = watch('pedidos.0.phone')
  const titleWatch = watch('pedidos.0.title')

  const handleEdit = () => {
    setIsDisabled(false)
  }
  const handleUpdate = handleSubmit(async data => {
    const formData = data.pedidos[0]

    setIsLoading(true)
    setIsDisabled(true)

    const deletedFiles: string[] = []
    const insertedFiles: File[] = []

    await order.fileNames.forEach((fileName: string) => {
      const trimmedName = fileName.split('@')[1]

      const index = Array.from(formData.file_).findIndex(
        file => file.name === trimmedName
      )

      if (index === -1) {
        deletedFiles.push(fileName)
      }
    })

    await Array.from(formData.file_).forEach(file => {
      const index = order.fileNames.find((fileName: string) => {
        return fileName.split('@')[1] === file.name
      })

      if (!index) {
        insertedFiles.push(file)
      }
    })

    const apiData = new FormData()
    apiData.append('id', order.id)

    Object.keys(formData).forEach(key => {
      if (formData[key as keyof FormValues]) {
        if (key === 'file_') {
          for (let i = 0; i < insertedFiles.length; i++) {
            apiData.append(`insertedFiles_${i}`, insertedFiles[i])
          }

          apiData.append('deletedFiles', JSON.stringify(deletedFiles))
        } else if (key === 'phone') {
          apiData.append(
            'phone',
            (formData as any)[key].toString().replace(/\D+/g, '')
          )
        } else {
          apiData.append(key, (formData as any)[key].toString())
        }
      }
    })

    api
      .put('/api/updateOrder', apiData)
      .then(response => {
        console.log(response.data)
      })
      .catch(err => {
        if (err?.response?.status === 401) {
          router.push('/')
        } else {
          console.log(err)
        }
      })
      .finally(() => setIsLoading(false))
  })

  return (
    <Box
      as="main"
      ml={['0', '2']}
      bg="white"
      display="block"
      w="full"
      mt={['2', '0']}
      p={['3', '5']}
      overflowX={['scroll', 'hidden']}
    >
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        closeOnEsc
        closeOnOverlayClick
      >
        <ModalOverlay />
        <ModalContent onClose={onClose} checkedFields={[order]} />
      </Modal>
      <Flex
        flexDirection={['column', 'row']}
        width={['full', 'xl', 'xl', '2xl', '4xl']}
        alignItems={['center', 'flex-start']}
        justifyContent="space-between"
        mb="3"
      >
        <Heading as="header" fontWeight="medium" fontSize="x-large" mb="6">
          Dados do pedido
        </Heading>
        <Flex
          direction={['column-reverse', 'row']}
          alignItems="center"
          justifyContent="center"
        >
          <Spinner
            zIndex="9999"
            size="sm"
            mr={['0', '5']}
            visibility={isLoading ? 'visible' : 'hidden'}
            display="block"
          />
          <Stack
            spacing={5}
            direction="row"
            alignItems="center"
            mb={['6', '0']}
          >
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

      <Input
        cursor={'not-allowed'}
        placeholder="Código"
        isDisabled={isDisabled}
        _disabled={{
          color: 'gray.200'
        }}
        width={['full', 'sm']}
        defaultValue={order.cod}
        mb="3"
        {...register('pedidos.0.cod', {
          maxLength: 4,
          required: false,
          pattern: /^[A-Z]\d+$/s
        })}
      />
      <FieldsContainer
        disabled={isDisabled}
        defaultValues={order}
        index={0}
        register={register}
        phoneWatch={phoneWatch}
        titleWatch={titleWatch}
        control={control}
        formState={formState}
      >
        <Input
          placeholder="Data inicial"
          mr={['0', '6']}
          type="date"
          mb={['5', '0']}
          defaultValue={order.date.split('T')[0]}
          width="2xs"
          {...register('pedidos.0.initialDate')}
        />
        <Textarea
          placeholder="Observações"
          resize="none"
          defaultValue={order.comments}
          size="md"
          h={['unset', '32']}
          w={['full', 'xl']}
          _placeholder={{
            color: 'gray.200'
          }}
          borderColor="gray.500"
          _hover={{
            borderColor: '#B3B3B3'
          }}
          _focus={{
            shadow: 0
          }}
          {...register('pedidos.0.comments', {
            required: false,
            maxLength: 250
          })}
        />
        <FileUpload
          disabled={isDisabled}
          defaultValue={files}
          accept="image/*"
          register={register('pedidos.0.file_', {
            validate: validateFiles
          })}
          multiple
        />
      </FieldsContainer>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { 'dashboard.access-token': token, JID } = parseCookies(ctx)

  const bearer = `Bearer ${token}`

  api.defaults.headers.common.Authorization = bearer

  function formatPhone(value: string) {
    const parents = value.replace(/^(\d{2})(\d)/g, '($1) $2') // Coloca parênteses em volta dos dois primeiros dígitos
    const hifen = parents.replace(/(\d)(\d{4})$/, '$1-$2') // Coloca hífen entre o quarto e o quinto dígitos

    return hifen
  }

  return (await axios({
    method: 'GET',
    params: {
      id: ctx.params?.id
    },
    url: '/order',
    baseURL: 'http://54.85.180.1:3333',
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
          order: {
            ...response.data[0],
            phone: formatPhone(response.data[0].phone)
          }
        }
      }
    })
    .catch(async error => {
      if (error.response.status === 401) {
        try {
          const response = await axios.get('http://54.85.180.1:3333/token', {
            headers: {
              Cookie: `JID=${JID}`
            }
          })

          setCookie(
            { res: ctx.res },
            'dashboard.access-token',
            response.data.accessToken,
            {
              maxAge: 60 * 15,
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
            url: '/order',
            baseURL: 'http://54.85.180.1:3333',
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
              order: {
                ...newResponse.data[0],
                phone: formatPhone(newResponse.data[0].phone)
              }
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
      /* eslint-disable */
    })) as any
    /* eslint-enable */
}

export default Order
