import React from 'react'
import { Plus } from 'react-feather'

import { Box, Flex, HStack, Icon, FlexProps } from '@chakra-ui/react'

import MenuItem from './MenuItem'

const Navbar: React.FC<FlexProps> = props => {
  return (
    <Flex
      bg="white"
      position="relative"
      shadow="md"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      h="max-content"
      py={['5', '5', '5', '5', '7']}
      px={['6', '6', '6', '6', '8']}
      {...props}
    >
      <HStack spacing="12" flexDirection="row" align="center" justify="center">
        <MenuItem
          to="/"
          fontWeight="bold"
          fontSize={['2xl', '2xl', '2xl', '2xl', '4xl']}
        >
          Dashboard
        </MenuItem>
        <MenuItem to="/" fontSize={['xl', 'xl', 'xl', 'xl', '3xl']}>
          Relatório
        </MenuItem>
        <MenuItem to="/" fontSize={['xl', 'xl', 'xl', 'xl', '3xl']}>
          Pesquisar
        </MenuItem>
      </HStack>
      <Box>
        <MenuItem
          to="/"
          fontWeight="medium"
          fontSize={['xl', 'xl', 'xl', 'xl', '3xl']}
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
