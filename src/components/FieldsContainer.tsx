import React, { useEffect, useState, useContext } from 'react'
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
import { NamesContext } from 'src/context/NamesContext'
import useSWR from 'swr'

import { IOrder, UseFormType } from '../../@types/pedidos'
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
  descWatch?: string
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
  descWatch,
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
  const { users, fetchNames } = useContext(NamesContext)

  useSWR('/api/getNames', () => fetchNames(), { revalidateOnFocus: false })

  useEffect(() => {
    if (phoneWatch?.length > 14) {
      setMaskValue('(99) 99999-9999')
    } else {
      setMaskValue('(99) 9999-99999')
    }
  }, [phoneWatch])

  // const vendorOptions = [
  //   { label: 'Camilla', value: 'Camilla' },
  //   { label: 'Jéssica', value: 'Jessica' },
  //   { label: 'Renata', value: 'Renata' },
  //   { label: 'Laildon', value: 'Laildon' },
  //   { label: 'Ester', value: 'Ester' },
  //   { label: 'Geovane', value: 'Geovane' },
  //   { label: 'Dougllas', value: 'Dougllas' }
  // ]

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
      <Stack spacing="5" width={['full', 'full', '2xl', '4xl']}>
        <Flex
          flexDirection="row"
          w="full"
          justifyContent={['center', 'flex-end']}
          position={['relative', 'absolute']}
          mb="-2"
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
        <ChakraReactSelect
          mr={['0', '0', '6']}
          disabled={disabled}
          control={control}
          width={['full', 'full', 'xs', 'sm']}
          placeholder="Vendedor"
          defaultValue={defaultValues?.vendor.id}
          defaultLabel={defaultValues?.vendor.name}
          defaultOptions={users}
          {...register(`pedidos.${index}.vendorId`, {
            maxLength: 250,
            required: false
          })}
        />
        <Flex direction={['column', 'column', 'row']} width="full">
          <Input
            defaultValue={defaultValues?.customerName}
            isDisabled={disabled}
            cursor={disabled ? 'not-allowed' : 'default'}
            placeholder="Nome do cliente"
            width={['full', 'full', '3xl']}
            mr={['0', '0', '16']}
            mb={['5', '5', '0']}
            {...register(`pedidos.${index}.customerName`, {
              maxLength: 250,
              required: false
            })}
          />
          <Input
            defaultValue={defaultValues?.phone}
            cursor={disabled ? 'not-allowed' : 'default'}
            placeholder="(00) 00000-0000"
            isDisabled={disabled}
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
        </Flex>
        <ChakraReactSelect
          control={control}
          disabled={disabled}
          placeholder="Descrição do produto"
          width="full"
          defaultOptions={descOptions}
          defaultValue={defaultValues?.description}
          defaultLabel={defaultValues?.description}
          {...register(`pedidos.${index}.description`, {
            maxLength: 250,
            required: false
          })}
        />

        <Flex direction={['column', 'column', 'row']} alignItems="center">
          <InputGroup mr={['0', '0', '16']} width={['full', 'full', '3xl']}>
            <InputLeftElement pointerEvents="none" color="gray.200">
              R$
            </InputLeftElement>
            <ChakraInput
              sx={{
                '&:placeholder-shown': {
                  bgColor: '#d2d2d2'
                }
              }}
              isDisabled={disabled}
              _disabled={{
                border: '1px solid rgba(91, 91, 91, 1);',
                color: 'blackAlpha.700'
              }}
              defaultValue={defaultValues?.total}
              cursor={disabled ? 'not-allowed' : 'default'}
              placeholder="Valor"
              mb={['5', '5', '0']}
              variant="outline"
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
            defaultLabel={defaultValues?.payment}
            control={control}
            defaultOptions={paymentOptions}
            width="full"
            placeholder="Forma de pagamento"
            {...register(`pedidos.${index}.payment`, {
              required: false,
              maxLength: 250
            })}
          />
        </Flex>
        <ChakraReactSelect
          defaultValue={defaultValues?.title}
          defaultLabel={defaultValues?.title}
          defaultOptions={titleOptions}
          control={control}
          disabled={disabled}
          descWatch={descWatch}
          width={['full', 'full', 'xs', 'sm']}
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
          isDisabled={disabled}
          {...register(`pedidos.${index}.address`, {
            maxLength: 250,
            required: false
          })}
        />
        <ChakraReactSelect
          defaultValue={defaultValues?.delivery}
          defaultLabel={defaultValues?.delivery}
          disabled={disabled}
          defaultOptions={deliveryOptions}
          control={control}
          width={['full', 'full', 'xs', 'sm']}
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
