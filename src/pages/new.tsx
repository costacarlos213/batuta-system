import React, { useState } from 'react'
import { Plus, Upload } from 'react-feather'
import { useFieldArray, useForm } from 'react-hook-form'

import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Spinner,
  Textarea
} from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import RadioOptions from 'src/components/RadioOptions'
import { api } from 'src/services/api'
import { validateFiles } from 'src/utils/validateFiles'

import { UseFormType } from '../../@types/pedidos'
import FieldsContainer from '../components/FieldsContainer'
import FileUpload from '../components/FileUpload'

const New: React.FC = () => {
  const [isDisabled, setDisabled] = useState(false)

  const { register, handleSubmit, formState, control, watch } =
    useForm<UseFormType>({
      defaultValues: {
        pedidos: [
          {
            cod: undefined,
            address: undefined,
            customerName: undefined,
            delivery: undefined,
            description: undefined,
            file_: undefined,
            payment: undefined,
            phone: undefined,
            total: undefined,
            comments: undefined,
            color: undefined,
            title: undefined,
            vendor: undefined
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
      formData.append('orders[cod]', order.cod)
      formData.append('orders[address]', order.address)
      formData.append('orders[customerName]', order.customerName)
      formData.append('orders[description]', order.description)
      formData.append('orders[payment]', order.payment)
      formData.append('orders[phone]', order.phone.replace(/\D+/g, ''))
      formData.append('orders[total]', order.total.toString())
      formData.append('orders[vendor]', order.vendor)
      formData.append('orders[delivery]', order.delivery)
      formData.append('orders[comments]', order.comments)
      formData.append('orders[title]', order.title)
      formData.append('orders[color]', order.color)

      for (let i = 0; i < order.file_.length; i++) {
        formData.append(`orders[file_${index}_${i}]`, order.file_[i])
      }

      index++
    })

    api
      .post('/api/newOrder', formData)
      .then(() => {
        router.push('/dashboard')
      })
      .catch(err => {
        if (err?.response?.status === 401) {
          router.push('/')
        } else {
          console.log(err)
        }
      })
      .finally(() => {
        setDisabled(false)
      })
  })

  function removeFormSection(index: number) {
    remove(index)
  }

  function addNewFormSection() {
    append({
      cod: undefined,
      address: undefined,
      customerName: undefined,
      delivery: undefined,
      description: undefined,
      file_: undefined,
      payment: undefined,
      phone: undefined,
      total: undefined,
      vendor: undefined,
      color: undefined,
      title: undefined,
      comments: undefined
    })
  }

  return (
    <Box
      as="main"
      ml={['0', '2']}
      bg="white"
      display="flex"
      flexDirection="column"
      w="full"
      mt={['2', '0']}
      pt={['3', '5']}
      pl={['5', '10']}
      pr="5"
      justifyContent={['center', 'flex-start']}
      overflowX={['scroll', 'hidden']}
    >
      <form
        onSubmit={onSubmit}
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

          if (fields.length === index + 1) {
            return (
              <FieldsContainer
                titleWatch={titleWatch}
                handleRemove={index !== 0 ? removeFormSection : undefined}
                control={control}
                disabled={isDisabled}
                key={field.id}
                phoneWatch={phoneWatch}
                register={register}
                index={index}
                formState={formState}
                border={false}
              >
                <Textarea
                  placeholder="Observações"
                  resize="none"
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
                  {...register(`pedidos.${index}.comments`, {
                    required: false,
                    maxLength: 250
                  })}
                />
                <FileUpload
                  accept="image/*"
                  register={register(`pedidos.${index}.file_`, {
                    validate: validateFiles
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
                index={index}
                key={field.id}
                register={register}
                phoneWatch={phoneWatch}
                formState={formState}
                border
              >
                <Textarea
                  placeholder="Observações"
                  resize="none"
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
                  {...register(`pedidos.${index}.comments`, {
                    required: false,
                    maxLength: 250
                  })}
                />
                <FileUpload
                  accept="image/*"
                  register={register(`pedidos.${index}.file_`, {
                    validate: validateFiles,
                    required: true
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
        <Flex flexDirection="row" alignItems="center">
          <Button
            disabled={isDisabled}
            onClick={addNewFormSection}
            px="5"
            mb="6"
            mr="6"
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
            mb="6"
            disabled={isDisabled}
            type="submit"
            fontWeight="semibold"
            fontSize="md"
            backgroundColor="whatsapp.500"
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
            ml="1"
            display={isDisabled ? 'block' : 'none'}
          />
        </Flex>
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
