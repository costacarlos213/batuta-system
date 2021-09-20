import React from 'react'

import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Checkbox
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'

export interface ITableRow {
  id: string
  cod: string
  date: string
  customerName: string
  vendor: string
  description: string
  total: string
  delivery: string
}

interface ITableContent {
  rows: ITableRow[]
  setChecked: React.Dispatch<React.SetStateAction<({ id: string } | boolean)[]>>
  checked: ({ id: string } | boolean)[]
}

const DashboardTable: React.FC<ITableContent> = ({
  rows,
  setChecked,
  checked
}) => {
  const router = useRouter()

  const reverseRows = rows

  const handleOnChange = (position: number, id: string) => {
    const updatedCheckedState = checked.map((item, index) => {
      if (index === position) {
        if (item) {
          return false
        } else {
          return { id }
        }
      } else {
        return item
      }
    })

    setChecked(updatedCheckedState)

    console.log(updatedCheckedState)
  }

  return (
    <Table variant="simple" size="sm" mb="3">
      <Thead>
        <Tr>
          <Th
            display="table-cell"
            px="0.5"
            borderColor="gray.300"
            width="min-content"
          ></Th>
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
        {reverseRows.map((row, index) => {
          return (
            <Tr
              key={row.id}
              cursor="pointer"
              _hover={{
                backgroundColor: '#f3f3f3'
              }}
            >
              <Td
                display="table-cell"
                px="0.5"
                width="min-content"
                borderColor="gray.300"
              >
                <Checkbox
                  borderColor="gray.400"
                  onChange={() => handleOnChange(index, row.id)}
                />
              </Td>
              <Td
                display="table-cell"
                px="2"
                width="min-content"
                borderColor="gray.300"
                onClick={() => router.push(`/order/${row.id}`)}
              >
                {row.cod}
              </Td>
              <Td
                display="table-cell"
                px="2"
                width="min-content"
                borderColor="gray.300"
                onClick={() => router.push(`/order/${row.id}`)}
              >
                {dayjs(row.date).format('DD/MM/YYYY')}
              </Td>
              <Td
                display="table-cell"
                px="2"
                width="min-content"
                borderColor="gray.300"
                onClick={() => router.push(`/order/${row.id}`)}
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
                  {row.customerName}
                </Text>
              </Td>
              <Td
                display="table-cell"
                px="2"
                w="min-content"
                borderColor="gray.300"
                whiteSpace="nowrap"
                onClick={() => router.push(`/order/${row.id}`)}
              >
                {row.vendor}
              </Td>
              <Td
                px="2"
                borderColor="gray.300"
                onClick={() => router.push(`/order/${row.id}`)}
              >
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
                onClick={() => router.push(`/order/${row.id}`)}
              >
                {parseFloat(row.total).toFixed(2)}
              </Td>
              <Td
                display="table-cell"
                px="2"
                width="min-content"
                borderColor="gray.300"
                onClick={() => router.push(`/order/${row.id}`)}
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
