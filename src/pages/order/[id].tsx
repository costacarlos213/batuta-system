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
  Textarea
} from '@chakra-ui/react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { parseCookies, setCookie } from 'nookies'
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
            title: order.title
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
        } else {
          apiData.append(key, (formData as any)[key].toString())
        }
      }
    })

    api
      .put('http://localhost:3333/order', apiData)
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.log(error.data)
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
        <ModalContent onClose={onClose} checkedFields={[{ id: order.id }]} />
      </Modal>
      <Flex
        flexDirection="row"
        width={['full', 'xl', 'xl', '2xl', '4xl']}
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Heading as="header" fontWeight="medium" fontSize="x-large" mb="8">
          Dados do pedido
        </Heading>
        <Button
          onClick={onOpen}
          backgroundColor="transparent"
          _hover={{
            backgroundColor: 'transparent',
            opacity: 0.8
          }}
        >
          <Icon as={Trash2} color="red" />
        </Button>
      </Flex>

      <Input
        cursor={'not-allowed'}
        placeholder="Código"
        isDisabled={isDisabled}
        width="2xs"
        defaultValue={order.cod}
        mb="-6"
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
        control={control}
        formState={formState}
      >
        <RadioOptions
          defaultValue={order.color}
          titleWatch={titleWatch}
          width="2xs"
          control={control}
          {...register('pedidos.0.color')}
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
      <Flex flexDirection="row" alignItems="center" mb="2">
        <Button
          disabled={isLoading}
          onClick={handleEdit}
          bg="transparent"
          p="0"
          mr="5"
          _hover={{
            color: 'black'
          }}
        >
          <Icon as={Edit2} mr="1" />
          Editar
        </Button>
        <Button
          disabled={isLoading}
          onClick={handleUpdate}
          type="submit"
          bg="transparent"
          p="0"
          mr="3"
          color="whatsapp.500"
          _hover={{
            color: 'green.400'
          }}
        >
          <Icon as={Save} mr="1" />
          Salvar
        </Button>
        <Spinner
          zIndex="9999"
          size="sm"
          ml="1"
          display={isLoading ? 'block' : 'none'}
        />
      </Flex>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { 'dashboard.access-token': token, JID } = parseCookies(ctx)

  let accessToken

  if (token) {
    accessToken = token
  }

  if (!token && JID) {
    const response = await api.get('/api/refreshToken', {
      headers: {
        Cookie: `JID=${JID}`
      }
    })

    if (response.data.accessToken) {
      setCookie(ctx, 'dashboard.access-token', response.data.accessToken, {
        maxAge: 60 * 15,
        path: '/'
      })

      accessToken = response.data.accessToken
    }
  }

  if (!accessToken) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const { params } = ctx

  let order: IOrder

  try {
    const response = await api({
      method: 'GET',
      params: {
        id: params?.id
      },
      url: '/order',
      baseURL: 'http://localhost:3333',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    if (!response.data || response.data.length === 0) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false
        }
      }
    }

    order = response.data[0]
  } catch (error) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false
      }
    }
  }

  function formatPhone(value: string) {
    const parents = value.replace(/^(\d{2})(\d)/g, '($1) $2') // Coloca parênteses em volta dos dois primeiros dígitos
    const hifen = parents.replace(/(\d)(\d{4})$/, '$1-$2') // Coloca hífen entre o quarto e o quinto dígitos

    return hifen
  }

  return {
    props: {
      order: {
        ...order,
        phone: formatPhone(order.phone)
      }
    }
  }
}

export default Order
