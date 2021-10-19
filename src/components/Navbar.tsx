import React from 'react'
import { Plus } from 'react-feather'

import {
  Box,
  Flex,
  HStack,
  Icon,
  FlexProps,
  Stack,
  Text
} from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { api } from 'src/services/api'

import MenuItem from './MenuItem'

const Navbar: React.FC<FlexProps> = props => {
  const router = useRouter()

  function handleLogout() {
    api.delete('/api/logout').then(() => {
      router.replace('/')
    })
  }

  return (
    <Flex
      bg="white"
      zIndex="99"
      position="relative"
      shadow="md"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      h="max-content"
      py="2"
      px={['6', '6', '6', '6', '8']}
      {...props}
    >
      <HStack spacing="8" flexDirection="row" align="center" justify="center">
        <MenuItem to="/dashboard">
          <Box w="28" h="16" position="relative">
            <Image
              src="/logo.png"
              layout="fill"
              quality={100}
              priority
              objectFit="contain"
            />
          </Box>
        </MenuItem>
        <MenuItem to="/search">
          <Text fontSize={['md', 'md', 'md', 'md', 'xl', '2xl']}>
            Pesquisar pedidos
          </Text>
        </MenuItem>
      </HStack>
      <Stack direction="row-reverse" spacing="6" alignItems="center">
        <MenuItem to="/new">
          <Text
            fontWeight="medium"
            fontSize={['md', 'md', 'md', 'md', 'xl', '2xl']}
            color="green.400"
          >
            <i>
              <Icon as={Plus} color="green.400" boxSize="7" />
            </i>{' '}
            Novo Pedido
          </Text>
        </MenuItem>
        <MenuItem>
          <Text
            onClick={handleLogout}
            fontWeight="medium"
            fontSize={['md', 'md', 'md', 'md', 'xl', '2xl']}
            color="red.400"
            cursor="pointer"
          >
            Sair
          </Text>
        </MenuItem>
      </Stack>
    </Flex>
  )
}

export default Navbar
