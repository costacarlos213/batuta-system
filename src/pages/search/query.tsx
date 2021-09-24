import React, { useState } from 'react'

import { Box, ModalOverlay, useDisclosure, Modal } from '@chakra-ui/react'
import axios from 'axios'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import ButtonGroup from 'src/components/ButtonGroup'
import ModalContent from 'src/components/Modal'
import Table from 'src/components/Table'
import { api } from 'src/services/api'

const Query: React.FC = ({
  orders
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [checked, setChecked] = useState(new Array(orders.length).fill(false))

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
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        closeOnEsc
        closeOnOverlayClick
      >
        <ModalOverlay />
        <ModalContent onClose={onClose} checkedFields={checked} />
      </Modal>
      <ButtonGroup
        openModal={onOpen}
        printData={orders}
        checkedFields={checked}
      />
      <Table rows={orders} checked={checked} setChecked={setChecked} />
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { 'dashboard.access-token': token, JID } = parseCookies(ctx)

  const bearer = `Bearer ${token}`

  api.defaults.headers.common.Authorization = bearer

  return (await axios({
    method: 'GET',
    params: ctx.query,
    url: '/order',
    baseURL: 'http://54.85.180.1:3333',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(resp => {
      const orders = resp.data

      return {
        props: {
          orders
        }
      }
    })
    .catch(async error => {
      if (error.response.status === 401) {
        try {
          const response = await axios.get('http://54.85.180.1:3333/token', {
            headers: {
              Cookie: `JID=${JID}`
            }
          })

          setCookie(
            { res: ctx.res },
            'dashboard.access-token',
            response.data.accessToken,
            {
              maxAge: 60 * 15,
              path: '/'
            }
          )

          const newbearer = `Bearer ${response.data.accessToken}`

          api.defaults.headers.common.Authorization = newbearer

          const getOrdersResponse = await axios({
            method: 'GET',
            params: ctx.query,
            url: '/order',
            baseURL: 'http://54.85.180.1:3333',
            headers: {
              Authorization: newbearer
            }
          })

          const orders = getOrdersResponse.data

          return {
            props: {
              orders
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
      }
      /* eslint-disable */
    })) as any
    /* eslint-enable */
}

export default Query
