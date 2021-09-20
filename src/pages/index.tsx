import React, { useContext } from 'react'
import { Mail, Lock } from 'react-feather'
import { useForm } from 'react-hook-form'

import {
  Heading,
  Center,
  Flex,
  InputGroup,
  Input,
  InputLeftElement,
  Stack,
  Text,
  Button
} from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { parseCookies, setCookie } from 'nookies'
import { AuthContext } from 'src/context/AuthContext'
import { api } from 'src/services/api'

interface ILoginForm {
  email: string
  password: string
}

function Home(): JSX.Element {
  const { register, handleSubmit } = useForm<ILoginForm>({
    defaultValues: {
      email: undefined,
      password: undefined
    }
  })

  const { isAuthenticated, signIn } = useContext(AuthContext)

  const onSubmit = handleSubmit(async ({ email, password }: ILoginForm) => {
    await signIn({
      email,
      password
    })
  })

  return (
    <Flex
      as="div"
      justifyContent="center"
      alignItems="center"
      w="100vw"
      h="100vh"
    >
      <Flex
        as="main"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Center as="header" flexDirection="column" mb="16">
          <Heading as="h1" size="xl" mb="3" textAlign="center">
            Bem-vindo de volta
          </Heading>
          <Heading
            as="h3"
            size="sm"
            color="gray.500"
            fontWeight="light"
            textAlign="center"
          >
            Entre para continuar
          </Heading>
        </Center>
        <Stack as="form" spacing={8} w={[300, 450]} onSubmit={onSubmit}>
          <InputGroup size="lg">
            <InputLeftElement pointerEvents="none" pt="2">
              <Mail strokeWidth={1} />
            </InputLeftElement>
            <Input
              h="14"
              isRequired
              _placeholder={{
                fontWeight: 'light',
                color: 'gray.200'
              }}
              placeholder="Email"
              boxShadow="lg"
              type="email"
              variant="filled"
              bg="white"
              _focus={{ _focus: 'none' }}
              _hover={{ bg: 'gray.100' }}
              {...register('email', {
                maxLength: 255
              })}
            />
          </InputGroup>
          <InputGroup size="lg">
            <InputLeftElement pointerEvents="none" pt="2">
              <Lock strokeWidth={1} />
            </InputLeftElement>
            <Input
              pt="1"
              h="14"
              _placeholder={{
                fontWeight: 'light',
                color: 'gray.200'
              }}
              isRequired
              placeholder="Senha"
              boxShadow="lg"
              type="password"
              variant="filled"
              bg="white"
              _focus={{ _focus: 'none' }}
              _hover={{ bg: 'gray.100' }}
              {...register('password', {
                maxLength: 255
              })}
            />
          </InputGroup>
          {isAuthenticated === false && (
            <Text color="red" fontWeight="light" mr="auto">
              Credenciais Inválidas
            </Text>
          )}
          <Button
            h="16"
            _focus={{ outline: 0 }}
            _active={{
              bg: 'green.400'
            }}
            type="submit"
            size="lg"
            color="white"
            bg="green.400"
            _hover={{ bg: '#0ea870' }}
            fontWeight="normal"
            fontFamily="Poppins"
          >
            Entrar
          </Button>
        </Stack>
      </Flex>
    </Flex>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { 'dashboard.access-token': token, JID } = parseCookies(ctx)

  if (token) {
    return {
      redirect: {
        permanent: false,
        destination: '/dashboard'
      }
    }
  }

  if (!token && JID) {
    const response = await api.get('/api/refreshToken', {
      headers: {
        Cookie: `JID=${JID}`
      }
    })

    if (response.data.accessToken) {
      setCookie(ctx, 'dashboard.access-token', response.data.accessToken, {
        maxAge: 60 * 15
      })

      return {
        redirect: {
          destination: '/dashboard',
          permanent: false
        }
      }
    }
  }

  return {
    props: {}
  }
}

export default Home
