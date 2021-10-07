import React, { useEffect, useState } from 'react'
import { X } from 'react-feather'
import { Control, FormState, UseFormRegister } from 'react-hook-form'
import MaskInput from 'react-input-mask'

import {
  InputGroup,
  InputLeftElement,
  Stack,
  Input as ChakraInput,
  Flex,
  FormControl,
  Button,
  Icon,
  Text
} from '@chakra-ui/react'
import ChakraReactSelect from 'src/components/ChakraReactSelect'
import { IOrder } from 'src/pages/order/[id]'

import { UseFormType } from '../../@types/pedidos'
import Input from '../components/FormInput'
import RadioOptions from './RadioOptions'

interface IFieldsContainer {
  defaultValues?: IOrder
  register: UseFormRegister<UseFormType>
  handleRemove?: (index: number) => void
  formState: FormState<UseFormType>
  border?: boolean
  index: number
  disabled?: boolean
  phoneWatch: string
  titleWatch?: string
  /* eslint-disable */
  control?: Control<UseFormType, object>
  /* eslint-enable */
}

const FieldsContainer: React.FC<IFieldsContainer> = ({
  register,
  defaultValues,
  border = false,
  disabled = false,
  phoneWatch,
  titleWatch,
  index,
  control,
  handleRemove,
  children
}) => {
  let initialPhoneMask = '(99) 9999-9999?'

  if (defaultValues?.phone) {
    if (defaultValues.phone.length > 14) {
      initialPhoneMask = '(99) 99999-9999'
    } else {
      initialPhoneMask = '(99) 9999-99999'
    }
  }
  const [maskValue, setMaskValue] = useState(initialPhoneMask)

  useEffect(() => {
    if (phoneWatch?.length > 14) {
      setMaskValue('(99) 99999-9999')
    } else {
      setMaskValue('(99) 9999-99999')
    }
  }, [phoneWatch])

  const vendorOptions = [
    { label: 'Camilla', value: 'Camilla' },
    { label: 'Jéssica', value: 'Jessica' },
    { label: 'Renata', value: 'Renata' },
    { label: 'Laildon', value: 'Laildon' },
    { label: 'Ester', value: 'Ester' },
    { label: 'Geovane', value: 'Geovane' },
    { label: 'Dougllas', value: 'Dougllas' }
  ]

  const descOptions = [
    { label: 'Kit bandeira 2 metros', value: 'Kit bandeira 2 metros' },
    { label: 'Kit bandeira 3 metros', value: 'Kit bandeira 3 metros' },
    { label: '2 Kits bandeira 2 metros', value: '2 Kits bandeira 2 metros' },
    { label: '2 Kits bandeira 3 metros', value: '2 Kits bandeira 3 metros' },
    { label: '3 Kits bandeira 2 metros', value: '3 Kits bandeira 2 metros' },
    { label: '3 Kits bandeira 3 metros', value: '3 Kits bandeira 3 metros' }
  ]

  const titleOptions = [
    { label: 'Kit Grande', value: 'Kit Grande' },
    { label: 'Kit Pequeno', value: 'Kit Pequeno' }
  ]

  const deliveryOptions = [
    { label: 'Motoboy', value: 'Motoboy' },
    { label: 'Motoboy (Comercial)', value: 'Motoboy (Comercial)' },
    { label: 'Transportadora', value: 'Transportadora' },
    {
      label: 'Transportadora (Comercial)',
      value: 'Transportadora (Comercial)'
    },
    { label: 'Transportadora RJ', value: 'Transportadora RJ' },
    { label: 'Transportadora SP', value: 'Transportadora SP' },
    { label: 'Retirar', value: 'Retirar' },
    { label: 'Correio', value: 'Correio' }
  ]

  const paymentOptions = [
    { label: 'Dinheiro', value: 'Dinheiro' },
    { label: 'Crédito', value: 'Credito' },
    { label: 'Débito', value: 'Debito' },
    { label: 'Pix', value: 'Pix' },
    { label: 'Transferência', value: 'Transferencia' }
  ]

  return (
    <FormControl
      disabled={disabled}
      opacity={disabled ? 0.8 : 1}
      cursor={disabled ? 'not-allowed' : 'default'}
      as="fieldset"
      w="full"
      form="newForm"
      borderBottomWidth={border ? 'thin' : 'none'}
      marginBottom={border ? '4' : 0}
      borderColor="#dfdfdf"
      pb="6"
    >
      <ChakraReactSelect
        mr={['0', '6']}
        disabled={disabled}
        control={control}
        width={['full', 'sm']}
        placeholder="Vendedor"
        defaultValue={defaultValues?.vendor}
        defaultOptions={vendorOptions}
        {...register(`pedidos.${index}.vendor`, {
          maxLength: 250,
          required: false
        })}
      />
      <Stack spacing="5" width={['full', 'xl', 'xl', '2xl', '4xl']}>
        <Flex
          flexDirection="row"
          w="full"
          justifyContent="flex-end"
          position="absolute"
          alignItems="center"
        >
          {handleRemove && (
            <Button
              onClick={() => handleRemove(index)}
              background="unset"
              width="min-content"
              height="min-content"
              _hover={{
                opacity: 0.8,
                background: 'none'
              }}
            >
              <Icon as={X} />
            </Button>
          )}
        </Flex>
        <Stack
          alignItems="center"
          direction={['column', 'row']}
          spacing={['0', '10']}
        >
          <Input
            defaultValue={defaultValues?.customerName}
            cursor={disabled ? 'not-allowed' : 'default'}
            placeholder="Nome do cliente"
            width={['full', '3xl']}
            mr={['0', '6']}
            mb={['5', '0']}
            {...register(`pedidos.${index}.customerName`, {
              maxLength: 250,
              required: false
            })}
          />
          <Input
            defaultValue={defaultValues?.phone}
            cursor={disabled ? 'not-allowed' : 'default'}
            placeholder="(00) 00000-0000"
            type="tel"
            as={MaskInput}
            mask={maskValue}
            maskChar=""
            width="full"
            {...register(`pedidos.${index}.phone`, {
              minLength: 10,
              maxLength: 15,
              required: false,
              pattern: /(\(?\d{2}\)?\s)?(\d{4,5}-\d{4})/g
            })}
          />
        </Stack>
        <ChakraReactSelect
          control={control}
          disabled={disabled}
          placeholder="Descrição do produto"
          width={['full', '3xl']}
          defaultOptions={descOptions}
          defaultValue={defaultValues?.description}
          {...register(`pedidos.${index}.description`, {
            maxLength: 250,
            required: false
          })}
        />

        <Stack
          alignItems="center"
          direction={['column', 'row']}
          spacing={['0', '10']}
        >
          <InputGroup mr={['0', '6']}>
            <InputLeftElement pointerEvents="none" color="gray.200">
              R$
            </InputLeftElement>
            <ChakraInput
              defaultValue={defaultValues?.total}
              cursor={disabled ? 'not-allowed' : 'default'}
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
              {...register(`pedidos.${index}.total`, {
                required: false
              })}
            />
          </InputGroup>
          <ChakraReactSelect
            disabled={disabled}
            defaultValue={defaultValues?.payment}
            control={control}
            defaultOptions={paymentOptions}
            width={['full', '5xl']}
            placeholder="Forma de pagamento"
            {...register(`pedidos.${index}.payment`, {
              required: false,
              maxLength: 250
            })}
          />
        </Stack>
        <ChakraReactSelect
          defaultValue={defaultValues?.title}
          defaultOptions={titleOptions}
          control={control}
          disabled={disabled}
          width={['full', 'sm']}
          placeholder="Resumo do pedido"
          {...register(`pedidos.${index}.title`, {
            required: false,
            maxLength: 250
          })}
        />
        <Text fontSize="md">Selecione a cor destaque do pedido</Text>
        <RadioOptions
          defaultValue={defaultValues?.color}
          titleWatch={titleWatch || ''}
          width="2xs"
          control={control}
          {...register(`pedidos.${index}.color`)}
        />
        <Input
          defaultValue={defaultValues?.address}
          cursor={disabled ? 'not-allowed' : 'default'}
          placeholder="Endereço"
          {...register(`pedidos.${index}.address`, {
            maxLength: 250,
            required: false
          })}
        />
        <ChakraReactSelect
          defaultValue={defaultValues?.delivery}
          disabled={disabled}
          defaultOptions={deliveryOptions}
          control={control}
          width={['full', 'sm']}
          placeholder="Forma de entrega"
          {...register(`pedidos.${index}.delivery`, {
            required: false,
            maxLength: 250
          })}
        />
        {children}
      </Stack>
    </FormControl>
  )
}

export default FieldsContainer
