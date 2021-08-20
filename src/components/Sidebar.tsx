import React from 'react'
import { Home, PlusCircle, Printer, Search } from 'react-feather'

import { Box, Icon, Stack } from '@chakra-ui/react'

import MenuItem from '../components/MenuItem'

const Sidebar: React.FC = () => {
  return (
    <Box
      py={[3, 10]}
      px={[3, 3, 3, 3, 4]}
      bg="green.400"
      w="fit-content"
      as="aside"
      float="left"
      position="sticky"
      top="0"
      bottom="auto"
    >
      <Stack
        as="nav"
        spacing={12}
        align={['center', 'flex-start']}
        direction={['row', 'column']}
        justify={['center', 'flex-start']}
        w={['100vw', 'min-content']}
        h={['min-content', '100vh']}
      >
        <MenuItem to="/" as="span">
          <Icon as={Home} color="white" boxSize={['7', '7', '7', '7', '10']} />
        </MenuItem>
        <MenuItem to="/search" as="span">
          <Icon
            as={Search}
            color="white"
            boxSize={['7', '7', '7', '7', '10']}
          />
        </MenuItem>
        <MenuItem to="/new" as="span">
          <Icon
            as={PlusCircle}
            color="white"
            boxSize={['7', '7', '7', '7', '10']}
          />
        </MenuItem>
        <MenuItem to="/print" as="span">
          <Icon
            as={Printer}
            color="white"
            boxSize={['7', '7', '7', '7', '10']}
          />
        </MenuItem>
      </Stack>
    </Box>
  )
}

export default Sidebar
