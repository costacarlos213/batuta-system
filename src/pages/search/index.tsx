import React from 'react'
import { Search as SearchIcon } from 'react-feather'
import { useForm } from 'react-hook-form'

import { Box, Button, Flex, Heading, Icon } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { parseCookies, setCookie } from 'nookies'
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

  const phoneWatch = watch('pedidos.0.phone')
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
        <Heading as="header" fontWeight="medium" fontSize="x-large" mb="5">
          Buscar pedidos
        </Heading>
        <Input
          cursor={'not-allowed'}
          placeholder="Código"
          width="2xs"
          mb="-6"
          {...register('pedidos.0.cod', {
            maxLength: 4,
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
          <Flex flexDirection={['column', 'row']}>
            <Input
              placeholder="Data inicial"
              mr={['0', '6']}
              type="date"
              mb={['5', '0']}
              width="2xs"
              {...register('pedidos.0.initialDate')}
            />
            <Input
              placeholder="Data Final"
              type="date"
              width="2xs"
              {...register('pedidos.0.finalDate')}
            />
          </Flex>
        </FieldsContainer>
        <Button
          mb="6"
          type="submit"
          bg="transparent"
          p="0"
          mr="3"
          color="whatsapp.500"
          _hover={{
            color: 'green.400'
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

export default Search
