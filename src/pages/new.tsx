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
import { useRouter } from 'next/dist/client/router'
import { parseCookies, setCookie } from 'nookies'
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
      .post('http://3.84.17.159:3333/order', formData)
      .then(() => {
        router.push('/dashboard')
      })
      .catch(error => {
        console.log(error)
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
        <Heading as="header" fontWeight="medium" fontSize="x-large" mb="2">
          Cadastro de pedidos
        </Heading>

        {fields.map((field, index) => {
          const phoneWatch = watch(`pedidos.${index}.phone`)
          const titleWatch = watch(`pedidos.${index}.title`)

          if (fields.length === index + 1) {
            return (
              <FieldsContainer
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
                <RadioOptions
                  titleWatch={titleWatch}
                  width="2xs"
                  control={control}
                  {...register(`pedidos.${index}.color`)}
                />
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
                <RadioOptions
                  width="2xs"
                  control={control}
                  titleWatch={titleWatch}
                  {...register(`pedidos.${index}.color`)}
                />
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
            mb="6"
            disabled={isDisabled}
            onClick={addNewFormSection}
            bg="transparent"
            p="0"
            mr="5"
            _hover={{
              color: 'black'
            }}
          >
            <Icon as={Plus} mr="1" />
            Adicionar
          </Button>
          <Button
            mb="6"
            disabled={isDisabled}
            type="submit"
            bg="transparent"
            p="0"
            mr="3"
            color="whatsapp.500"
            _hover={{
              color: 'green.400'
            }}
          >
            <Icon as={Upload} mr="1" />
            Enviar
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

      return {
        props: {}
      }
    }
  }

  if (!token) {
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
