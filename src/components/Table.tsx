import React, { useRef, createRef } from 'react'

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
import tz from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { useRouter } from 'next/router'
import { IOrder } from 'src/pages/order/[id]'

dayjs.extend(utc)
dayjs.extend(tz)

interface ITableContent {
  rows: IOrder[]
  setChecked: React.Dispatch<React.SetStateAction<(IOrder | boolean)[]>>
  checked: (IOrder | boolean)[]
}

const DashboardTable: React.FC<ITableContent> = ({
  rows,
  setChecked,
  checked
}) => {
  let checkedCheckboxes = checked
  const router = useRouter()
  const reverseRows = rows
  const checkboxRefs = useRef<{ current: HTMLInputElement }[]>([])
  checkboxRefs.current = reverseRows.map(
    (row, i) => checkboxRefs.current[i] ?? createRef()
  )

  const handleOnChange = (checkboxPos: number, order: IOrder) => {
    const updatedCheckedState = checkedCheckboxes.map((item, index) => {
      if (index === checkboxPos) {
        if (item) {
          return false
        } else {
          return {
            ...order
          }
        }
      } else {
        return item
      }
    })

    checkedCheckboxes = updatedCheckedState
    setChecked(checkedCheckboxes)

    return updatedCheckedState
  }

  return (
    <Table variant="simple" size="sm" mb="3">
      <Thead>
        <Tr>
          <Th
            display="table-cell"
            px="0.5"
            width="min-content"
            borderColor="gray.300"
            cursor="pointer"
            onClick={() => {
              checkboxRefs.current.forEach(checkboxRef => {
                checkboxRef.current.click()
              })
            }}
          >
            <Checkbox borderColor="gray.400" pointerEvents="none" />
          </Th>
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
                cursor="pointer"
                onClick={() => {
                  checkboxRefs.current[index].current.click()
                }}
              >
                <Checkbox
                  borderColor="gray.400"
                  ref={checkboxRefs?.current[index]}
                  pointerEvents="none"
                  onChange={() => handleOnChange(index, row)}
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
                {dayjs.utc(row.date).format('DD/MM/YYYY')}
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
                {parseFloat(row.total || '0').toFixed(2)}
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
