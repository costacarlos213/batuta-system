import React from 'react'

import { Input, InputProps } from '@chakra-ui/react'

const FormInput: React.FC<InputProps> = ({ ...rest }) => {
  return (
    <Input
      type="text"
      variant="flushed"
      _placeholder={{
        color: 'gray.200'
      }}
      borderColor="gray.500"
      paddingLeft="1"
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
