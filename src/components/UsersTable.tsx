import React, { useRef, createRef } from 'react'

import { Table, Tbody, Td, Th, Thead, Tr, Checkbox } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { Pix } from '../../@types/vendor'

export interface ITableRow {
  id: string
  name: string
  pixType: Pix
  pixKey: string
}

interface ITableContent {
  rows: ITableRow[]
  setChecked: React.Dispatch<React.SetStateAction<(ITableRow | boolean)[]>>
  checked: (ITableRow | boolean)[]
}

const UsersTable: React.FC<ITableContent> = ({ rows, setChecked, checked }) => {
  let checkedCheckboxes = checked
  const router = useRouter()
  const reverseRows = rows
  const checkboxRefs = useRef<{ current: HTMLInputElement }[]>([])
  checkboxRefs.current = reverseRows.map(
    (row, i) => checkboxRefs.current[i] ?? createRef()
  )

  const handleOnChange = (checkboxPos: number, order: ITableRow) => {
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
            Nome
          </Th>
          <Th display="table-cell" px="1" borderColor="gray.300">
            Tipo da Chave Pix
          </Th>
          <Th display="table-cell" px="1" borderColor="gray.300">
            Chave Pix
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {reverseRows.map((row, index) => {
          let pixType: string

          switch (row.pixType) {
            case 'cpf':
              pixType = 'Cpf'
              break

            case 'email':
              pixType = 'Email'
              break

            case 'phone':
              pixType = 'Telefone'
              break

            case 'randomKey':
              pixType = 'Chave Aleatória'
              break

            default:
              pixType = 'unset'
              break
          }

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
                onClick={() => router.push(`/users/${row.id}`)}
              >
                {row.name}
              </Td>
              <Td
                display="table-cell"
                px="2"
                width="min-content"
                borderColor="gray.300"
                onClick={() => router.push(`/users/${row.id}`)}
              >
                {pixType}
              </Td>
              <Td
                display="table-cell"
                px="2"
                width="min-content"
                borderColor="gray.300"
                onClick={() => router.push(`/users/${row.id}`)}
              >
                {row.pixKey}
              </Td>
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}

export default UsersTable
