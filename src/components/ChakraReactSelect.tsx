import React, { useState, useRef, useEffect } from 'react'
import { Control, Controller, UseFormRegisterReturn } from 'react-hook-form'
import Select, { OptionTypeBase } from 'react-select'
import CreatableSelect from 'react-select/creatable'

import { Box } from '@chakra-ui/layout'
import { customStyles } from 'src/styles/select'

interface IReactSelect {
  placeholder?: string
  mr?: string | string[]
  ml?: string | string[]
  defaultOptions: OptionTypeBase[]
  defaultValue?: string
  disabled?: boolean
  width?: string | string[]
  descWatch?: string
  creatable?: boolean
  /* eslint-disable */
  control?: Control<any, object>
  /* eslint-enable */
}

const ChakraReactSelect: React.FC<IReactSelect & UseFormRegisterReturn> = ({
  placeholder = '',
  disabled = false,
  creatable = true,
  defaultOptions,
  defaultValue,
  descWatch,
  ml,
  mr,
  width = 'full',
  control,
  name
}) => {
  let hasDefaultValue = false

  if (defaultValue) {
    hasDefaultValue = true
  }

  const boxRef = useRef<HTMLDivElement>(null)
  const [options, setOptions] = useState<OptionTypeBase[]>(defaultOptions || [])
  const [selectValue, setValue] = useState<OptionTypeBase | null>(
    hasDefaultValue === true
      ? { label: defaultValue, value: defaultValue }
      : null
  )

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
        label: capitalizeFirstLetter(placeholder),
        value: capitalizeFirstLetter(placeholder)
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

  useEffect(() => {
    if (descWatch) {
      boxRef.current?.click()
    }
  }, [descWatch])

  useEffect(() => {
    setOptions(defaultOptions)
  }, [defaultOptions])

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      /* eslint-disable */
      name={name as any}
      /* eslint-enable */
      render={({ field: { onChange, ...rest } }) => (
        <Box width={width} mr={mr} ml={ml}>
          <Box
            display="none"
            pointerEvents="none"
            ref={boxRef}
            onClick={() => {
              if (descWatch) {
                if (descWatch.endsWith('3 metros')) {
                  onChange('Kit Grande')
                  setValue({
                    label: 'Kit Grande',
                    value: 'Kit Grande'
                  })
                } else {
                  onChange('Kit Pequeno')
                  setValue({
                    label: 'Kit Pequeno',
                    value: 'Kit Pequeno'
                  })
                }
              }
            }}
          />
          {creatable ? (
            <CreatableSelect
              isDisabled={disabled}
              styles={customStyles}
              isClearable={!disabled}
              isSearchable
              onCreateOption={value => {
                const capitalizedValue = capitalizeFirstLetter(value)
                onChange(capitalizedValue)
                handleCreate(capitalizedValue)
              }}
              options={options}
              placeholder={placeholder}
              onChange={(value, actionMeta) => {
                onChange(value?.value || '')
                handleChange(value, actionMeta)
              }}
              {...rest}
              value={selectValue}
            />
          ) : (
            <Select
              isDisabled={disabled}
              styles={customStyles}
              isClearable={!disabled}
              isSearchable
              options={options}
              placeholder={placeholder}
              onChange={(value, actionMeta) => {
                onChange(value?.value || '')
                handleChange(value, actionMeta)
              }}
              {...rest}
              value={selectValue}
            />
          )}
        </Box>
      )}
    />
  )
}

export default ChakraReactSelect
