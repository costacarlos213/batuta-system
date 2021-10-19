import React, { useEffect } from 'react'
import { Search as SearchIcon } from 'react-feather'
import { useForm } from 'react-hook-form'

import { Box, Button, Heading, Icon, Stack, Text } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import { api } from 'src/services/api'

import { ISearchForm, UseFormType } from '../../../@types/pedidos'
import FieldsContainer from '../../components/FieldsContainer'
import Input from '../../components/FormInput'

const Search: React.FC = () => {
  const router = useRouter()

  const { register, handleSubmit, formState, control, watch } =
    useForm<UseFormType>({
      defaultValues: {
        pedidos: [
          {
            cod: undefined,
            file_: undefined,
            address: undefined,
            customerName: undefined,
            delivery: undefined,
            description: undefined,
            payment: undefined,
            phone: undefined,
            total: undefined,
            vendor: undefined,
            initialDate: undefined,
            finalDate: undefined
          }
        ]
      }
    })

  const onSubmit = handleSubmit(async data => {
    const order = data.pedidos[0]

    let queryObject = {}

    Object.keys(order).forEach(key => {
      if (order[key as keyof ISearchForm]) {
        queryObject = {
          ...queryObject,
          [key]: order[key as keyof ISearchForm]
        }
      }
    })

    if (Object.prototype.hasOwnProperty.call(queryObject, 'phone')) {
      router.push({
        pathname: '/search/query',
        query: {
          ...queryObject,
          phone: (queryObject as ISearchForm).phone.replace(/\D+/g, '')
        }
      })
    } else {
      router.push({
        pathname: '/search/query',
        query: queryObject
      })
    }
  })

  useEffect(() => {
    const pressedKeys: Record<string, boolean> = {}

    function handleKeyDown(event: KeyboardEvent) {
      pressedKeys[event.key] = true

      if (pressedKeys.Enter && pressedKeys.Control) {
        onSubmit()

        document.body.removeEventListener('keydown', handleKeyDown)
      }
    }

    function handleKeyUp(event: KeyboardEvent) {
      delete pressedKeys[event.key]

      document.body.addEventListener('keydown', handleKeyDown)
    }

    document.body.addEventListener('keydown', handleKeyDown)

    document.body.addEventListener('keyup', handleKeyUp)
  }, [])

  const phoneWatch = watch('pedidos.0.phone')
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
        <Heading as="header" fontWeight="medium" fontSize="x-large" mb="5">
          Buscar pedidos
        </Heading>
        <Input
          cursor={'not-allowed'}
          placeholder="Código"
          _disabled={{
            color: 'gray.200'
          }}
          width={['full', 'full', 'sm']}
          mb="4"
          {...register('pedidos.0.cod', {
            minLength: 4,
            required: false,
            pattern: /^[A-Z]\d+$/s
          })}
        />
        <FieldsContainer
          phoneWatch={phoneWatch}
          control={control}
          register={register}
          index={0}
          formState={formState}
          border={false}
        >
          <Stack
            direction={['column', 'column', 'row']}
            alignItems={['center', 'center', 'flex-end']}
            spacing={['2', '2', '5']}
            justifyContent={['center', 'flex-start']}
          >
            <Input
              placeholder="Data inicial"
              type="date"
              width={['full', 'full', '2xs']}
              {...register('pedidos.0.initialDate')}
            />
            <Text>Até</Text>
            <Input
              placeholder="Data Final"
              type="date"
              width={['full', 'full', '2xs']}
              {...register('pedidos.0.finalDate')}
            />
          </Stack>
        </FieldsContainer>
        <Button
          mb="6"
          type="button"
          fontWeight="semibold"
          onClick={onSubmit}
          fontSize="md"
          backgroundColor="whatsapp.500"
          px="5"
          color="white"
          _hover={{
            backgroundColor: 'whatsapp.400'
          }}
        >
          <Icon as={SearchIcon} strokeWidth="3" mr="2" />
          Pesquisar
        </Button>
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

export default Search
