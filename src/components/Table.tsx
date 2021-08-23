import React from 'react'

import { Table, Tbody, Td, Th, Thead, Tr, Text } from '@chakra-ui/react'

export interface ITableRow {
  code: string
  date: string
  name: string
  vendor: string
  description: string
  total: string
  delivery: string
}

interface ITableContent {
  rows: ITableRow[]
}

const DashboardTable: React.FC<ITableContent> = ({ rows }) => {
  return (
    <Table variant="simple" size="sm" mb="3">
      <Thead>
        <Tr>
          <Th display="table-cell" px="1" borderColor="gray.300">
            Cód.
          </Th>
          <Th display="table-cell" px="1" borderColor="gray.300">
            Data
          </Th>
          <Th display="table-cell" px="1" borderColor="gray.300">
            Nome
          </Th>
          <Th display="table-cell" px="1" borderColor="gray.300">
            Vendedor
          </Th>
          <Th borderColor="gray.300" px="1">
            Descrição
          </Th>
          <Th display="table-cell" px="1" borderColor="gray.300">
            Total
          </Th>
          <Th display="table-cell" px="1" borderColor="gray.300">
            Entrega
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {rows.map(row => {
          return (
            <Tr key={row.code}>
              <Td
                display="table-cell"
                px="2"
                width="min-content"
                borderColor="gray.300"
              >
                {row.code}
              </Td>
              <Td
                display="table-cell"
                px="2"
                width="min-content"
                borderColor="gray.300"
              >
                {row.date}
              </Td>
              <Td
                display="table-cell"
                px="2"
                width="min-content"
                borderColor="gray.300"
              >
                <Text
                  sx={{
                    textOverflow: 'ellipsis !important',
                    whiteSpace: 'nowrap !important',
                    width: ['4.6rem !important', 'auto !important'],
                    textAlign: 'center',
                    overflow: 'hidden',
                    display: 'inline-block'
                  }}
                >
                  {row.name}
                </Text>
              </Td>
              <Td
                display="table-cell"
                px="2"
                w="min-content"
                borderColor="gray.300"
                whiteSpace="nowrap"
              >
                {row.vendor}
              </Td>
              <Td px="2" borderColor="gray.300">
                <Text
                  sx={{
                    textOverflow: 'ellipsis !important',
                    whiteSpace: 'nowrap !important',
                    width: ['6rem !important', 'auto !important'],
                    textAlign: 'center',
                    overflow: 'hidden',
                    display: 'inline-block'
                  }}
                >
                  {row.description}
                </Text>
              </Td>
              <Td
                display="table-cell"
                px="2"
                width="min-content"
                borderColor="gray.300"
                isNumeric
              >
                {row.total}
              </Td>
              <Td
                display="table-cell"
                px="2"
                width="min-content"
                borderColor="gray.300"
              >
                {row.delivery}
              </Td>
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}

export default DashboardTable
