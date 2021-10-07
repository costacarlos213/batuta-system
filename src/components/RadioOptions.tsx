import React, { useState, useEffect } from 'react'
import { Control, Controller, UseFormRegisterReturn } from 'react-hook-form'

import { Radio, RadioGroup, Stack } from '@chakra-ui/react'

import { UseFormType } from '../../@types/pedidos'

interface IRadioOptions {
  defaultValue?: 'green' | 'yellow'
  disabled?: boolean
  titleWatch: string
  width?: string | string[]
  /* eslint-disable */
  control?: Control<UseFormType, object>
  /* eslint-enable */
}

const RadioOptions: React.FC<IRadioOptions & UseFormRegisterReturn> = ({
  disabled,
  defaultValue,
  titleWatch,
  width = 'full',
  control,
  name
}) => {
  const [radioValue, setRadioValue] = useState<'green' | 'yellow' | undefined>()
  let onChangeFunction: (e: string) => void

  const handleChange = (value: 'green' | 'yellow') => {
    onChangeFunction(value)
    setRadioValue(value)
  }

  useEffect(() => {
    if (titleWatch === 'Kit Grande') {
      handleChange('green')
    } else if (titleWatch === 'Kit Pequeno') {
      handleChange('yellow')
    }
  }, [titleWatch])

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      /* eslint-disable */
      name={name as any}
      /* eslint-enable */
      render={({ field: { onChange, ...rest } }) => {
        onChangeFunction = onChange

        return (
          <RadioGroup
            colorScheme="whatsapp"
            defaultValue={defaultValue}
            w={width}
            onChange={e => {
              handleChange(e as 'green' | 'yellow')
            }}
            {...rest}
            value={radioValue}
          >
            <Stack direction="row" spacing="10" fontWeight="semibold">
              <Radio value="green" isDisabled={disabled}>
                Amarelo
              </Radio>
              <Radio value="yellow" isDisabled={disabled}>
                Cinza
              </Radio>
            </Stack>
          </RadioGroup>
        )
      }}
    />
  )
}

export default RadioOptions
