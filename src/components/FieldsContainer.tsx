import React, { useState } from 'react'
import { Plus } from 'react-feather'
import { Control, FormState, UseFormRegister } from 'react-hook-form'
import { OptionTypeBase } from 'react-select'

import {
  InputGroup,
  InputLeftElement,
  Stack,
  Input as ChakraInput,
  Button,
  Flex,
  Icon,
  FormControl,
  FormErrorMessage
} from '@chakra-ui/react'
import ChakraReactSelect from 'src/components/ChakraReactSelect'
import FileUpload from 'src/components/FileUpload'

import { UseFormType } from '../../@types/pedidos'
import Input from '../components/FormInput'

interface IFieldsContainer {
  register: UseFormRegister<UseFormType>
  formState: FormState<UseFormType>
  border?: boolean
  index: number
  withImages?: boolean
  /* eslint-disable */
  control?: Control<UseFormType, object>
  /* eslint-enable */
}

const FieldsContainer: React.FC<IFieldsContainer> = ({
  register,
  formState,
  border = false,
  index,
  withImages = false,
  control
}) => {
  const { errors } = formState

  const options: OptionTypeBase[] = [
    { value: 'camila', label: 'Camila' },
    { value: 'carlos', label: 'Carlos' },
    { value: 'thiago', label: 'Thiago' }
  ]

  const [stateOptions, setOptions] = useState(options)

  const handleCreate = (inputValue: string) => {
    function capitalizeFirstLetter(value: string) {
      const lowerCase = value.toLowerCase()
      return lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1)
    }

    const newOption = {
      label: capitalizeFirstLetter(inputValue),
      value: inputValue.toLowerCase().replace(/\W/g, '-')
    }

    setOptions([...stateOptions, newOption])
  }

  function validateFiles(value: FileList) {
    if (value.length < 1) {
      return 'Files is required'
    }
    for (const file of Array.from(value)) {
      const fsMb = file.size / (1024 * 1024)
      const MAX_FILE_SIZE = 10
      if (fsMb > MAX_FILE_SIZE) {
        return 'Max file size 10mb'
      }
    }
    return true
  }

  return (
    <FormControl
      as="fieldset"
      form="newForm"
      isInvalid={!!errors?.pedidos?.[index]?.file_}
      isRequired={withImages}
      borderBottomWidth={border ? 'thin' : 'none'}
      borderColor="#dfdfdf"
      pb="4"
    >
      <Stack spacing="5" width={['full', 'xl', 'xl', '2xl', '4xl']}>
        <Input
          placeholder="Código"
          width="2xs"
          {...register(`pedidos.${index}.code`, {
            maxLength: 4
          })}
        />
        <Flex flexDirection={['column', 'row']}>
          <Input
            placeholder="Nome do cliente"
            width={['full', '8xl']}
            mr={['0', '6']}
            mb={['5', '0']}
            {...register(`pedidos.${index}.customerName`, {
              maxLength: 250
            })}
          />
          <Input
            placeholder="Telefone"
            type="tel"
            width="full"
            {...register(`pedidos.${index}.phone`, {
              minLength: 10,
              maxLength: 11
            })}
          />
        </Flex>
        <Input
          placeholder="Endereço"
          {...register(`pedidos.${index}.address`, {
            maxLength: 250
          })}
        />
        <ChakraReactSelect
          control={control}
          placeholder="Vendedor"
          onCreateEvent={handleCreate}
          options={stateOptions}
          width="2xs"
          {...register(`pedidos.${index}.vendor`, {
            maxLength: 250
          })}
        />
        <ChakraReactSelect
          control={control}
          placeholder="Descrição"
          onCreateEvent={handleCreate}
          options={stateOptions}
          {...register(`pedidos.${index}.description`, {
            maxLength: 250
          })}
        />
        <Flex alignItems="center" flexDirection={['column', 'row']}>
          <InputGroup mr={['0', '6']}>
            <InputLeftElement pointerEvents="none" color="gray.200">
              R$
            </InputLeftElement>
            <ChakraInput
              placeholder="Valor"
              mb={['5', '0']}
              variant="flushed"
              type="text"
              _placeholder={{
                color: 'gray.200'
              }}
              borderColor="gray.500"
              _hover={{
                borderColor: '#B3B3B3'
              }}
              _focus={{
                shadow: 0
              }}
              {...register(`pedidos.${index}.value`)}
            />
          </InputGroup>
          <ChakraReactSelect
            control={control}
            width={['full', '5xl']}
            placeholder="Forma de pagamento"
            onCreateEvent={handleCreate}
            options={stateOptions}
            {...register(`pedidos.${index}.payment`)}
          />
        </Flex>
        <ChakraReactSelect
          control={control}
          width="2xs"
          placeholder="Forma de entrega"
          onCreateEvent={handleCreate}
          options={stateOptions}
          {...register(`pedidos.${index}.delivery`)}
        />
        {withImages && (
          <FileUpload
            accept="image/*"
            register={register(`pedidos.${index}.file_`, {
              validate: validateFiles
            })}
            multiple
          >
            <Button
              bg="#dfdede"
              w="36"
              h="24"
              _focus={{
                boxShadow: 'none',
                outline: 0,
                border: 0
              }}
              _hover={{
                backgroundColor: '#c2c2c2'
              }}
            >
              <Icon as={Plus} boxSize="8" />
            </Button>
          </FileUpload>
        )}
        <FormErrorMessage>
          {errors?.pedidos?.[index]?.file_ &&
            errors?.pedidos?.[index]?.file_?.message}
        </FormErrorMessage>
      </Stack>
    </FormControl>
  )
}

export default FieldsContainer
