import React from 'react'

import { Text, TextProps } from '@chakra-ui/react'
import Link from 'next/link'

interface IMenuItem extends TextProps {
  to: string
}

const MenuItem: React.FC<IMenuItem> = ({ children, to, ...rest }) => {
  return (
    <Link href={to}>
      <Text fontStyle="normal" {...rest} cursor="pointer">
        {children}
      </Text>
    </Link>
  )
}

export default MenuItem
