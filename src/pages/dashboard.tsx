import React from 'react'

import { Box } from '@chakra-ui/react'

import Table, { ITableRow } from '../components/Table'

const Dashboard: React.FC = () => {
  const tableContent: ITableRow[] = [
    {
      code: 'C000',
      date: '22/08/2021',
      delivery: 'Motoboy',
      description: '2 Kit grande 3 metros',
      name: 'Carlos Eduardo',
      vendor: 'Camila Lordelo',
      total: '257,90'
    },
    {
      code: 'C000',
      date: '22/08/2021',
      delivery: 'Motoboy',
      description: '2 Kit grande 3 metros',
      name: 'Carlos Eduardo',
      vendor: 'Camila Lordelo',
      total: '257,90'
    },
    {
      code: 'C000',
      date: '22/08/2021',
      delivery: 'Motoboy',
      description: '2 Kit grande 3 metros',
      name: 'Carlos Eduardo',
      vendor: 'Camila Lordelo',
      total: '257,90'
    },
    {
      code: 'C000',
      date: '22/08/2021',
      delivery: 'Motoboy',
      description: '2 Kit grande 3 metros',
      name: 'Carlos Eduardo',
      vendor: 'Camila Lordelo',
      total: '257,90'
    },
    {
      code: 'C000',
      date: '22/08/2021',
      delivery: 'Motoboy',
      description: '2 Kit grande 3 metros',
      name: 'Carlos Eduardo',
      vendor: 'Camila Lordelo',
      total: '257,90'
    },
    {
      code: 'C000',
      date: '22/08/2021',
      delivery: 'Motoboy',
      description: '2 Kit grande 3 metros',
      name: 'Carlos Eduardo',
      vendor: 'Camila Lordelo',
      total: '257,90'
    },
    {
      code: 'C000',
      date: '22/08/2021',
      delivery: 'Motoboy',
      description: '2 Kit grande 3 metros',
      name: 'Carlos Eduardo',
      vendor: 'Camila Lordelo',
      total: '257,90'
    },
    {
      code: 'C000',
      date: '22/08/2021',
      delivery: 'Motoboy',
      description: '2 Kit grande 3 metros',
      name: 'Carlos Eduardo',
      vendor: 'Camila Lordelo',
      total: '257,90'
    },
    {
      code: 'C000',
      date: '22/08/2021',
      delivery: 'Motoboy',
      description: '2 Kit grande 3 metros',
      name: 'Carlos Eduardo',
      vendor: 'Camila Lordelo',
      total: '257,90'
    },
    {
      code: 'C000',
      date: '22/08/2021',
      delivery: 'Motoboy',
      description: '2 Kit grande 3 metros',
      name: 'Carlos Eduardo',
      vendor: 'Camila Lordelo',
      total: '257,90'
    },
    {
      code: 'C000',
      date: '22/08/2021',
      delivery: 'Motoboy',
      description: '2 Kit grande 3 metros',
      name: 'Carlos Eduardo',
      vendor: 'Camila Lordelo',
      total: '257,90'
    },
    {
      code: 'C000',
      date: '22/08/2021',
      delivery: 'Motoboy',
      description: '2 Kit grande 3 metros',
      name: 'Carlos Eduardo',
      vendor: 'Camila Lordelo',
      total: '257,90'
    },
    {
      code: 'C000',
      date: '22/08/2021',
      delivery: 'Motoboy',
      description: '2 Kit grande 3 metros',
      name: 'Carlos Eduardo',
      vendor: 'Camila Lordelo',
      total: '257,90'
    },
    {
      code: 'C000',
      date: '22/08/2021',
      delivery: 'Motoboy',
      description: '2 Kit grande 3 metros',
      name: 'Carlos Eduardo',
      vendor: 'Camila Lordelo',
      total: '257,90'
    },
    {
      code: 'C000',
      date: '22/08/2021',
      delivery: 'Motoboy',
      description: '2 Kit grande 3 metros',
      name: 'Carlos Eduardo',
      vendor: 'Camila Lordelo',
      total: '257,90'
    },
    {
      code: 'C000',
      date: '22/08/2021',
      delivery: 'Motoboy',
      description: '2 Kit grande 3 metros',
      name: 'Carlos Eduardo',
      vendor: 'Camila Lordelo',
      total: '257,90'
    }
  ]

  return (
    <Box
      as="main"
      ml={['0', '2']}
      bg="white"
      display="block"
      w="full"
      mt={['2', '0']}
      p={['3', '5']}
      overflowX={['scroll', 'hidden']}
    >
      <Table rows={tableContent} />
    </Box>
  )
}

export default Dashboard
