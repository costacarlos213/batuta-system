import React from 'react'

import Navbar from 'src/components/Navbar'
import Sidebar from 'src/components/Sidebar'

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Navbar display={['none', 'fixed']} />
      <Sidebar />
      {children}
    </>
  )
}

export default Layout
