import React from 'react'
import { Mail, Lock } from 'react-feather'

import {
  Heading,
  Center,
  Flex,
  InputGroup,
  Input,
  InputLeftElement,
  Stack,
  Button
} from '@chakra-ui/react'
import Link from 'next/link'

function Home(): JSX.Element {
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
            Bem-vindo de volta<span style={{ color: '#01BA76' }}>.</span>
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
        <Stack as="form" spacing={8} w={[300, 450]}>
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
            />
          </InputGroup>
          <Link href="/dashboard">
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
          </Link>
        </Stack>
      </Flex>
    </Flex>
  )
}

export default Home
