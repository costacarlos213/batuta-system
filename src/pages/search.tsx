import React from 'react'
import { Search as SearchIcon } from 'react-feather'
import { useForm } from 'react-hook-form'

import { Box, Button, Heading, Icon } from '@chakra-ui/react'
import FieldsContainer from 'src/components/FieldsContainer'

import { UseFormType } from '../../@types/pedidos'

const Search: React.FC = () => {
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

  const onSubmit = handleSubmit(data => console.log(data))

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
          Buscar pedidos
        </Heading>
        <FieldsContainer
          control={control}
          register={register}
          index={0}
          formState={formState}
          border={false}
        />
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
          <Icon as={SearchIcon} strokeWidth="3" mr="2" />
          Pesquisar
        </Button>
      </form>
    </Box>
  )
}

export default Search
