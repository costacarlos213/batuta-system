import React from 'react'
import { Plus } from 'react-feather'
import { useFieldArray, useForm } from 'react-hook-form'

import { Box, Button, Heading, Icon } from '@chakra-ui/react'
import FieldsContainer from 'src/components/FieldsContainer'

import { UseFormType } from '../../@types/pedidos'

const New: React.FC = () => {
  const { register, handleSubmit, formState, control } = useForm<UseFormType>({
    defaultValues: {
      pedidos: [
        {
          code: undefined,
          address: undefined,
          customerName: undefined,
          delivery: undefined,
          description: undefined,
          file_: undefined,
          payment: undefined,
          phone: undefined,
          value: undefined,
          vendor: undefined
        }
      ]
    }
  })

  const { fields, append } = useFieldArray({
    control,
    name: 'pedidos',
    keyName: 'id'
  })

  const onSubmit = handleSubmit(data => console.log(data))

  function addNewFormSection() {
    append({
      code: undefined,
      address: undefined,
      customerName: undefined,
      delivery: undefined,
      description: undefined,
      file_: undefined,
      payment: undefined,
      phone: undefined,
      value: undefined,
      vendor: undefined
    })
  }
  return (
    <Box
      as="main"
      ml={['0', '2']}
      bg="white"
      display="flex"
      flexDirection="column"
      w="full"
      mt={['2', '0']}
      pt={['3', '5']}
      pl={['5', '10']}
      pr="5"
      justifyContent={['center', 'flex-start']}
      overflowX={['scroll', 'hidden']}
    >
      <form
        onSubmit={onSubmit}
        style={{
          height: '100%'
        }}
        id="newForm"
      >
        <Heading as="header" fontWeight="medium" fontSize="x-large" mb="8">
          Cadastro de pedidos
        </Heading>

        {fields.map((field, index) => {
          if (fields.length === index + 1) {
            return (
              <FieldsContainer
                control={control}
                key={field.id}
                register={register}
                index={index}
                formState={formState}
                border={false}
                withImages
              />
            )
          } else {
            return (
              <FieldsContainer
                index={index}
                key={field.id}
                register={register}
                formState={formState}
                border
                withImages
              />
            )
          }
        })}
        <Button
          onClick={addNewFormSection}
          bg="transparent"
          p="0"
          mr="5"
          _hover={{
            color: 'black'
          }}
        >
          <Icon as={Plus} mr="1" />
          Adicionar
        </Button>
        <Button
          type="submit"
          bg="transparent"
          p="0"
          mr="3"
          color="whatsapp.500"
          _hover={{
            color: 'green.400'
          }}
        >
          Enviar
        </Button>
      </form>
    </Box>
  )
}

export default New
