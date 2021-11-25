import React, { useState, useEffect } from 'react'
import { Plus, Upload } from 'react-feather'
import { useFieldArray, useForm } from 'react-hook-form'

import {
  Box,
  Button,
  Heading,
  Icon,
  Spinner,
  Stack,
  Text,
  Textarea
} from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import { api } from 'src/services/api'
import { validateFiles } from 'src/utils/validateFiles'

import { FormValues, UseFormType } from '../../@types/pedidos'
import FieldsContainer from '../components/FieldsContainer'
import FileUpload from '../components/FileUpload'

const New: React.FC = () => {
  const [isDisabled, setDisabled] = useState(false)
  const [error, setError] = useState<null | string>(null)

  let fieldLength = 1

  const { register, handleSubmit, formState, control, watch } =
    useForm<UseFormType>({
      defaultValues: {
        pedidos: [
          {
            cod: '',
            address: '',
            customerName: '',
            delivery: '',
            description: '',
            file_: undefined,
            payment: '',
            phone: '',
            total: undefined,
            comments: '',
            color: 'green',
            title: '',
            vendorId: ''
          }
        ]
      }
    })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'pedidos',
    keyName: 'id'
  })

  const router = useRouter()

  const onSubmit = handleSubmit(async data => {
    setDisabled(true)

    let index = 0

    const formData = new FormData()
    data.pedidos.map(order => {
      Object.keys(order).forEach(key => {
        if (key === 'file_') {
          for (let i = 0; i < order.file_.length; i++) {
            formData.append(`orders[file_${index}_${i}]`, order.file_[i])
          }

          return
        }

        formData.append(
          `orders[${key}]`,
          order[key as keyof FormValues]?.toString()
        )
      })

      index++
    })

    api
      .post('/api/newOrder', formData)
      .then(() => {
        window.location.pathname = '/dashboard'
      })
      .catch(err => {
        if (err?.response?.status === 401) {
          router.replace('/')
        } else {
          const message = err?.response?.data.message

          if (message === 'Invalid Code') {
            setError('Campo "vendedor" inválido.')
          } else if (message === 'Invalid Phone') {
            setError('Campo "telefone" inválido.')
          }
        }
      })
      .finally(() => {
        setDisabled(false)
      })
  })

  function removeFormSection(index: number) {
    fieldLength--

    remove(index)
  }

  function addNewFormSection() {
    fieldLength++

    append({
      cod: '',
      address: '',
      customerName: '',
      delivery: '',
      description: '',
      file_: undefined,
      payment: '',
      phone: '',
      total: undefined,
      vendorId: undefined,
      color: 'green',
      title: '',
      comments: ''
    })
  }

  useEffect(() => {
    const pressedKeys: Record<string, boolean> = {}

    function handleKeyDown(event: KeyboardEvent) {
      pressedKeys[event.key] = true

      if (pressedKeys.Control && pressedKeys['[']) {
        addNewFormSection()

        fieldLength++

        document.body.removeEventListener('keydown', handleKeyDown)
      } else if (pressedKeys.Control && pressedKeys.Dead) {
        if (fieldLength > 1) {
          remove(fieldLength - 1)

          fieldLength--

          document.body.removeEventListener('keydown', handleKeyDown)
        }
      } else if (pressedKeys.Enter && pressedKeys.Control) {
        onSubmit()

        document.body.removeEventListener('keydown', handleKeyDown)
      }
    }

    function handleKeyUp(event: KeyboardEvent) {
      if (event.key === '=') {
        delete pressedKeys['§']
      } else {
        delete pressedKeys[event.key]
      }

      document.body.addEventListener('keydown', handleKeyDown)
    }

    document.body.addEventListener('keydown', handleKeyDown)

    document.body.addEventListener('keyup', handleKeyUp)
  }, [])

  return (
    <Box
      as="main"
      ml={['0', '0', '2']}
      bg="white"
      display="flex"
      flexDirection="column"
      w="full"
      mt={['2', '2', '0']}
      pt={['3', '3', '5']}
      pl={['5', '5', '10']}
      pr="5"
      justifyContent={['center', 'center', 'flex-start']}
      overflowX={['scroll', 'scroll', 'hidden']}
    >
      <form
        style={{
          height: '100%'
        }}
        id="newForm"
      >
        <Heading as="header" fontWeight="medium" fontSize="x-large" mb="6">
          Cadastro de pedidos
        </Heading>

        {fields.map((field, index) => {
          const phoneWatch = watch(`pedidos.${index}.phone`)
          const titleWatch = watch(`pedidos.${index}.title`)
          const descWatch = watch(`pedidos.${index}.description`)

          if (fields.length === index + 1) {
            return (
              <FieldsContainer
                titleWatch={titleWatch}
                handleRemove={index !== 0 ? removeFormSection : undefined}
                control={control}
                disabled={isDisabled}
                key={field.id}
                phoneWatch={phoneWatch}
                descWatch={descWatch}
                register={register}
                index={index}
                formState={formState}
                border={false}
              >
                <Textarea
                  cursor="text"
                  placeholder="Observações"
                  resize="none"
                  size="md"
                  h={['unset', 'unset', '32']}
                  w={['full', 'full', 'xl']}
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
                  sx={{
                    '&:placeholder-shown': {
                      bgColor: '#d2d2d2'
                    }
                  }}
                  {...register(`pedidos.${index}.comments`, {
                    required: false,
                    maxLength: 250
                  })}
                />
                <FileUpload
                  accept="image/*"
                  register={register(`pedidos.${index}.file_`, {
                    validate: validateFiles,
                    required: false
                  })}
                  multiple
                />
              </FieldsContainer>
            )
          } else {
            return (
              <FieldsContainer
                titleWatch={titleWatch}
                handleRemove={index !== 0 ? removeFormSection : undefined}
                control={control}
                disabled={isDisabled}
                descWatch={descWatch}
                index={index}
                key={field.id}
                register={register}
                phoneWatch={phoneWatch}
                formState={formState}
                border
              >
                <Textarea
                  cursor="text"
                  placeholder="Observações"
                  resize="none"
                  size="md"
                  h={['unset', 'unset', '32']}
                  w={['full', 'full', 'xl']}
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
                  sx={{
                    '&:placeholder-shown': {
                      bgColor: '#d2d2d2'
                    }
                  }}
                  {...register(`pedidos.${index}.comments`, {
                    required: false,
                    maxLength: 250
                  })}
                />
                <FileUpload
                  accept="image/*"
                  register={register(`pedidos.${index}.file_`, {
                    validate: validateFiles,
                    required: false
                  })}
                  multiple
                >
                  <Button
                    disabled={isDisabled}
                    bg="#dfdede"
                    w="36"
                    h="24"
                    _focus={{
                      boxShadow: 'none',
                      outline: 0,
                      border: 0
                    }}
                    _hover={{
                      backgroundColor: '#c2c2c2'
                    }}
                  >
                    <Icon as={Plus} boxSize="8" />
                  </Button>
                </FileUpload>
              </FieldsContainer>
            )
          }
        })}
        {error && (
          <Text mb="5" color="red" fontWeight="medium">
            {error}
          </Text>
        )}
        <Stack direction="row" alignItems="center" spacing="5" pb="6">
          <Button
            disabled={isDisabled}
            onClick={addNewFormSection}
            px="5"
            fontWeight="medium"
            fontSize="md"
            backgroundColor="gray.100"
            _hover={{
              backgroundColor: 'gray.300'
            }}
          >
            <Icon as={Plus} mr="1" />
            Adicionar
          </Button>
          <Button
            disabled={isDisabled}
            type="button"
            fontWeight="semibold"
            fontSize="md"
            backgroundColor="whatsapp.500"
            onClick={onSubmit}
            px="5"
            color="white"
            _hover={{
              backgroundColor: 'whatsapp.400'
            }}
          >
            <Icon as={Upload} mr="2" />
            Cadastrar Pedido
          </Button>
          <Spinner
            zIndex="9999"
            size="sm"
            display={isDisabled ? 'block' : 'none'}
          />
        </Stack>
      </form>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { 'dashboard.access-token': token, JID } = parseCookies(ctx)

  const bearer = `Bearer ${token}`

  api.defaults.headers.common.Authorization = bearer

  if (!JID) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
export default New
