import React from 'react'
import { OptionTypeBase } from 'react-select'
import Select from 'react-select/creatable'

import { Box } from '@chakra-ui/layout'
import { customStyles } from 'src/styles/select'

interface IReactSelect {
  placeholder?: string
  options: OptionTypeBase[]
  onChangeEvent: (
    newValue: OptionTypeBase,
    { action }: { action: string }
  ) => void
}

const ChakraReactSelect: React.FC<IReactSelect> = ({
  onChangeEvent,
  options,
  placeholder = ''
}) => {
  return (
    <Box
      as={Select}
      isClearable
      isSearchable
      options={options}
      placeholder={placeholder}
      styles={customStyles}
      /* eslint-disable */
      // @ts-ignore: Unreachable code error
      onChange={onChangeEvent}
      /* eslint-enable */
    />
  )
}

export default ChakraReactSelect
