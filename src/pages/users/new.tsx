import React, { useState, useEffect } from 'react'
import { Plus, Upload, X } from 'react-feather'
import { useFieldArray, useForm } from 'react-hook-form'

import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Icon,
  Spinner,
  Stack,
  Text
} from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import ChakraReactSelect from 'src/components/ChakraReactSelect'
import Input from 'src/components/FormInput'
import { api } from 'src/services/api'

import { IVendorFields } from '../../../@types/vendor'

const New: React.FC = () => {
  const [isDisabled, setDisabled] = useState(false)
  const [error, setError] = useState<null | string>(null)

  let fieldLength = 1

  const { register, handleSubmit, control } = useForm<IVendorFields>({
    defaultValues: {
      vendors: [
        {
          name: '',
          email: '',
          pixType: undefined,
          pixKey: ''
        }
      ]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'vendors',
    keyName: 'id'
  })

  const router = useRouter()

  const onSubmit = handleSubmit(async data => {
    setDisabled(true)

    api
      .post('/api/newVendor', data)
      .then(() => {
        window.location.pathname = '/users'
      })
      .catch(err => {
        if (err?.response?.status === 401) {
          router.replace('/')
        } else {
          const message = err?.response?.data.message

          if (message === 'Missing Name') {
            setError('Campo "Nome" inválido.')
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
      name: '',
      email: '',
      pixType: undefined,
      pixKey: ''
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
          Cadastro de Vendedores
        </Heading>

        {fields.map((field, index) => {
          return (
            <FormControl
              key={field.id}
              disabled={isDisabled}
              opacity={isDisabled ? 0.8 : 1}
              cursor={isDisabled ? 'not-allowed' : 'default'}
              as="fieldset"
              w="full"
              form="newForm"
              borderBottomWidth={index !== fields.length - 1 ? 'thin' : 'none'}
              marginBottom={index !== fields.length - 1 ? '4' : 0}
              borderColor="#dfdfdf"
              pb="6"
            >
              <Stack spacing="5" width={['full', 'full', '2xl', '4xl']}>
                {index !== 0 && (
                  <Flex
                    flexDirection="row"
                    w="full"
                    justifyContent={['center', 'flex-end']}
                    position={['relative', 'absolute']}
                    mb="-3"
                    alignItems="center"
                  >
                    <Button
                      onClick={() => removeFormSection(index)}
                      background="unset"
                      width="min-content"
                      height="min-content"
                      _hover={{
                        opacity: 0.8,
                        background: 'none'
                      }}
                    >
                      <Icon as={X} />
                    </Button>
                  </Flex>
                )}
                <Input
                  cursor={isDisabled ? 'not-allowed' : 'default'}
                  placeholder="Nome do Vendedor"
                  width={['full', 'full', '52', '2xs']}
                  mr={['0', '0', '16']}
                  {...register(`vendors.${index}.name`, {
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
                    placeholder="Tipos de Chave Pix"
                    {...register(`vendors.${index}.pixType`, {
                      maxLength: 250,
                      required: false
                    })}
                  />
                  <Input
                    cursor={isDisabled ? 'not-allowed' : 'default'}
                    placeholder="Chave Pix"
                    width="full"
                    {...register(`vendors.${index}.pixKey`, {
                      maxLength: 250,
                      required: false
                    })}
                  />
                </Stack>
                <Input
                  cursor={isDisabled ? 'not-allowed' : 'default'}
                  placeholder="Email"
                  {...register(`vendors.${index}.email`, {
                    maxLength: 250,
                    required: false
                  })}
                />
              </Stack>
            </FormControl>
          )
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
