import React, { useState } from 'react'
import { OptionTypeBase } from 'react-select'

import { Box, Heading, Stack } from '@chakra-ui/react'
import ChakraReactSelect from 'src/components/ChakraReactSelect'

import Input from '../components/FormInput'

const New: React.FC = () => {
  const [, setVendorValue] = useState({})

  const options: OptionTypeBase[] = [
    { value: 'camila', label: 'Camila' },
    { value: 'carlos', label: 'Carlos' },
    { value: 'thiago', label: 'Thiago' }
  ]

  const [stateOptions, setOptions] = useState(options)

  const handleChange = (newValue: OptionTypeBase, { action = '' }) => {
    newValue ? setVendorValue(newValue) : setVendorValue({})

    console.group('Value Changed')
    console.log(newValue)
    console.log(action)
    console.groupEnd()

    if (action === 'create-option') {
      setOptions([...stateOptions, newValue])
    }
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
      <Heading as="h1" fontWeight="medium" fontSize="x-large" mb="8">
        Cadastro de Pedidos
      </Heading>
      <Stack spacing="5" as="form">
        <Input placeholder="Nome do cliente" />
        <Input placeholder="Telefone" />
        <Input placeholder="Endereço" />
        <ChakraReactSelect
          placeholder="Vendedor"
          onChangeEvent={handleChange}
          options={stateOptions}
        />
        <ChakraReactSelect
          placeholder="Descrição"
          onChangeEvent={handleChange}
          options={stateOptions}
        />
        <Input placeholder="Valor" />
        <ChakraReactSelect
          placeholder="Forma de pagamento"
          onChangeEvent={handleChange}
          options={stateOptions}
        />
        <ChakraReactSelect
          placeholder="Forma de entrega"
          onChangeEvent={handleChange}
          options={stateOptions}
        />
      </Stack>
    </Box>
  )
}

export default New
