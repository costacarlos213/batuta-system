import React from 'react'
import { Home, LogOut, Plus, Search, Users } from 'react-feather'

import { Box, Icon, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import { api } from 'src/services/api'

import MenuItem from '../components/MenuItem'

const Sidebar: React.FC = () => {
  const router = useRouter()

  function handleLogout() {
    api.delete('/api/logout').then(() => {
      router.replace('/')
    })
  }

  return (
    <Box
      py={[3, 3, 10]}
      px={[3, 3, 3, 3, 4]}
      bg="green.400"
      w={['full', 'full', 'fit-content']}
      h={['min', 'min', 'full']}
      as="aside"
      float="left"
      position="sticky"
      top="0"
      bottom="auto"
    >
      <Stack
        as="nav"
        spacing="10"
        alignItems="center"
        direction={['row', 'row', 'column']}
        justify={['center', 'center', 'flex-start']}
        w={['full', 'full', 'min-content']}
        h={['min-content', 'min-content', 'full']}
      >
        <MenuItem to="/new">
          <i>
            <Icon
              as={Plus}
              color="white"
              boxSize={['7', '7', '7', '7', '7', '10']}
            />
          </i>
        </MenuItem>
        <MenuItem to="/search">
          <i>
            <Icon
              as={Search}
              color="white"
              boxSize={['7', '7', '7', '7', '7', '10']}
            />
          </i>
        </MenuItem>
        <MenuItem to="/dashboard">
          <i>
            <Icon
              as={Home}
              color="white"
              boxSize={['7', '7', '7', '7', '7', '10']}
            />
          </i>
        </MenuItem>
        <MenuItem to="/users">
          <i>
            <Icon
              as={Users}
              boxSize={['7', '7', '7', '7', '7', '10']}
              color="white"
            />
          </i>
        </MenuItem>
        <MenuItem>
          <i onClick={handleLogout}>
            <Icon
              as={LogOut}
              boxSize={['7', '7', '7', '7', '7', '10']}
              color="white"
            />
          </i>
        </MenuItem>
      </Stack>
    </Box>
  )
}

export default Sidebar
