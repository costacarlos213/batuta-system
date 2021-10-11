import React from 'react'

import { Input, InputProps } from '@chakra-ui/react'

interface IFormInput extends InputProps {
  mask?: string
  maskChar?: string
}

const FormInput: React.FC<IFormInput> = ({ ...rest }) => {
  return (
    <Input
      cursor="text"
      variant="outline"
      _placeholder={{
        color: 'gray.200'
      }}
      borderColor="gray.500"
      paddingLeft="2"
      _hover={{
        borderColor: '#B3B3B3'
      }}
      _focus={{
        shadow: 0
      }}
      {...rest}
    />
  )
}

export default FormInput
