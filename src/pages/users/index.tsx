import React, { useState } from 'react'

import {
  Box,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react'
import axios from 'axios'
import {
  GetServerSideProps,
  GetServerSidePropsResult,
  InferGetServerSidePropsType
} from 'next'
import Link from 'next/link'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import UsersTable from 'src/components/UsersTable'
import { api } from 'src/services/api'
import { handleMultipleVendorDelete } from 'src/utils/deleteMultipleVendors'

import { IVendorFields } from '../../../@types/vendor'
import ModalContent from '../../components/ExcludeModal'

const AllUsers: React.FC = ({
  users
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [checked, setChecked] = useState(new Array(users.length).fill(false))
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box
      as="main"
      ml={['0', '0', '2']}
      bg="white"
      display="block"
      w="full"
      mt={['2', '2', '0']}
      p={['3', '3', '5']}
      overflowX={['scroll', 'scroll', 'hidden']}
    >
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        closeOnEsc
        closeOnOverlayClick
      >
        <ModalOverlay />
        <ModalContent
          deleteFunction={handleMultipleVendorDelete}
          onClose={onClose}
          checkedFields={checked}
          title="Você deseja mesmo apagar esse pedido?"
        />
      </Modal>
      <Flex flexDirection="row" alignItems="center">
        <Link href="/users/new">
          <Button
            mb="2"
            fontWeight="semibold"
            fontSize="md"
            backgroundColor="whatsapp.500"
            px="3"
            color="white"
            _hover={{
              backgroundColor: 'whatsapp.400'
            }}
          >
            Novo Vendedor
          </Button>
        </Link>
        <Button
          onClick={onOpen}
          px="5"
          ml="5"
          mb="2"
          hidden={!checked.find(item => typeof item !== 'boolean')}
          fontWeight="semibold"
          fontSize="sm"
          color="white"
          backgroundColor="red.500"
          _hover={{
            backgroundColor: 'red.600'
          }}
        >
          Excluir
        </Button>
      </Flex>
      <UsersTable rows={users} checked={checked} setChecked={setChecked} />
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { 'dashboard.access-token': token, JID } = parseCookies(ctx)

  const bearer = `Bearer ${token}`

  api.defaults.headers.common.Authorization = bearer

  return (await axios
    .get(`${process.env.API_URL}/user`, {
      headers: {
        Authorization: bearer
      }
    })
    .then(resp => {
      return {
        props: {
          users: resp.data
        }
      }
    })
    .catch(async error => {
      if (error.response.status === 401) {
        try {
          const response = await axios.get(`${process.env.API_URL}/token`, {
            headers: {
              Cookie: `JID=${JID}`
            }
          })

          setCookie(
            { res: ctx.res },
            'dashboard.access-token',
            response.data.accessToken,
            {
              maxAge: 60,
              path: '/'
            }
          )

          const newbearer = `Bearer ${response.data.accessToken}`

          api.defaults.headers.common.Authorization = newbearer

          const getUsersResponse = await axios.get(
            `${process.env.API_URL}/user`,
            {
              headers: {
                Authorization: newbearer
              }
            }
          )

          return {
            props: {
              users: getUsersResponse.data
            }
          }
        } catch (error) {
          destroyCookie({ res: ctx.res }, 'JID', {
            httpOnly: true,
            path: '/'
          })

          return {
            redirect: {
              destination: '/',
              permanent: false
            }
          }
        }
      } else {
        destroyCookie({ res: ctx.res }, 'JID', {
          httpOnly: true,
          path: '/'
        })

        return {
          redirect: {
            destination: '/',
            permanent: false
          }
        }
      }
    })) as GetServerSidePropsResult<IVendorFields>
}

export default AllUsers
