import React from 'react'
import { Plus } from 'react-feather'

import { Box, Flex, HStack, Icon, FlexProps } from '@chakra-ui/react'

import MenuItem from './MenuItem'

const Navbar: React.FC<FlexProps> = props => {
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
      py={['5', '5', '5', '5', '5']}
      px={['6', '6', '6', '6', '8']}
      {...props}
    >
      <HStack spacing="12" flexDirection="row" align="center" justify="center">
        <MenuItem
          to="/dashboard"
          fontWeight="bold"
          fontSize={['xl', 'xl', 'xl', 'xl', '2xl', '4xl']}
        >
          Dashboard
        </MenuItem>
        <MenuItem to="/search" fontSize={['md', 'md', 'md', 'md', 'xl', '2xl']}>
          Pesquisar pedidos
        </MenuItem>
      </HStack>
      <Box>
        <MenuItem
          to="/new"
          fontWeight="medium"
          fontSize={['md', 'md', 'md', 'md', 'xl', '2xl']}
          color="green.400"
        >
          <span>
            <Icon as={Plus} color="green.400" boxSize="7" />
          </span>{' '}
          Novo
        </MenuItem>
      </Box>
    </Flex>
  )
}

export default Navbar
