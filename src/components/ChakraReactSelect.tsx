import React from 'react'
import { Control, Controller, UseFormRegisterReturn } from 'react-hook-form'
import { OptionTypeBase } from 'react-select'
import Select from 'react-select/creatable'

import { Box } from '@chakra-ui/layout'
import { customStyles } from 'src/styles/select'

import { UseFormType } from '../../@types/pedidos'

interface IReactSelect {
  placeholder?: string
  width?: string | string[]
  options: OptionTypeBase[]
  /* eslint-disable */
  control?: Control<UseFormType, object>
  /* eslint-enable */
  onCreateEvent: (inputValue: string) => void
}

const ChakraReactSelect: React.FC<IReactSelect & UseFormRegisterReturn> = ({
  onCreateEvent,
  options,
  placeholder = '',
  width = 'full',
  control,
  name
}) => {
  return (
    <Controller
      control={control}
      /* eslint-disable */
      name={name as any}
      /* eslint-enable */
      render={({ field: { onChange, value, ...rest } }) => (
        <Box width={width}>
          <Select
            styles={customStyles}
            isClearable
            isSearchable
            onCreateOption={onCreateEvent}
            options={options}
            placeholder={placeholder}
            onChange={e => onChange(e?.value)}
            {...rest}
            value={options.find(c => c.value === value)}
          />
        </Box>
      )}
    />
  )
}

export default ChakraReactSelect
