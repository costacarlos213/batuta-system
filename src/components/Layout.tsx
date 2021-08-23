import React from 'react'

import { Flex } from '@chakra-ui/react'
import Navbar from 'src/components/Navbar'
import Sidebar from 'src/components/Sidebar'

const Layout: React.FC = ({ children }) => {
  return (
    <Flex h="100vh" w="100vw" flexDirection="column">
      <Navbar display={['none', 'none', 'fixed']} />
      <Flex
        flexDirection={['column', 'row']}
        w="full"
        h="auto"
        flexGrow={1}
        overflowX="hidden"
      >
        <Sidebar />
        {children}
      </Flex>
    </Flex>
  )
}

export default Layout
