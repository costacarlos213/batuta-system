import React, { useState } from 'react'
import { Control, Controller, UseFormRegisterReturn } from 'react-hook-form'
import { OptionTypeBase } from 'react-select'
import Select from 'react-select/creatable'

import { Box } from '@chakra-ui/layout'
import { customStyles } from 'src/styles/select'

import { UseFormType } from '../../@types/pedidos'

interface IReactSelect {
  placeholder?: string
  mr?: string | string[]
  ml?: string | string[]
  defaultOptions?: OptionTypeBase[]
  defaultValue?: string
  disabled?: boolean
  width?: string | string[]
  /* eslint-disable */
  control?: Control<UseFormType, object>
  /* eslint-enable */
}

const ChakraReactSelect: React.FC<IReactSelect & UseFormRegisterReturn> = ({
  placeholder = '',
  disabled,
  defaultOptions,
  defaultValue,
  ml,
  mr,
  width = 'full',
  control,
  name
}) => {
  const [options, setOptions] = useState<OptionTypeBase[]>(defaultOptions || [])
  const [selectValue, setValue] = useState<OptionTypeBase>({
    label: defaultValue || placeholder,
    value: defaultValue || placeholder
  })

  function capitalizeFirstLetter(value: string) {
    const lowerCase = value.toLowerCase()
    return lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1)
  }

  const handleChange = (
    newValue: OptionTypeBase,
    actionMeta: {
      action: string
    }
  ) => {
    if (actionMeta.action === 'clear') {
      setValue({
        label: capitalizeFirstLetter(defaultValue || placeholder),
        value: capitalizeFirstLetter(defaultValue || placeholder)
      })
    } else if (actionMeta.action === 'select-option') {
      setValue({
        label: newValue.label,
        value: newValue.value
      })
    }
  }

  const handleCreate = (newValue: string) => {
    const newOption = {
      label: newValue,
      value: newValue
    }

    setValue(newOption)
    setOptions([...options, newOption])
  }

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      /* eslint-disable */
      name={name as any}
      /* eslint-enable */
      render={({ field: { onChange, ...rest } }) => (
        <Box width={width} mr={mr} ml={ml}>
          <Select
            isDisabled={disabled}
            styles={customStyles}
            isClearable
            isSearchable
            onCreateOption={value => {
              const capitalizedValue = capitalizeFirstLetter(value)
              onChange(capitalizedValue)
              handleCreate(capitalizedValue)
            }}
            options={options}
            placeholder={placeholder}
            onChange={(value, actionMeta) => {
              onChange(value?.value)
              handleChange(value, actionMeta)
            }}
            {...rest}
            value={selectValue}
          />
        </Box>
      )}
    />
  )
}

export default ChakraReactSelect
