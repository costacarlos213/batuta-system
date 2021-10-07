import React from 'react'

import { Text } from '@chakra-ui/react'
import Link from 'next/link'

interface IMenuItem {
  to?: string
}

const MenuItem: React.FC<IMenuItem> = ({ children, to = '#' }) => {
  return (
    <Link href={to}>
      <Text cursor="pointer">{children}</Text>
    </Link>
  )
}

export default MenuItem
