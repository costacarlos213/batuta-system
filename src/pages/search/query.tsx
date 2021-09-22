import React, { useState } from 'react'

import { Box, ModalOverlay, useDisclosure, Modal } from '@chakra-ui/react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { parseCookies, setCookie } from 'nookies'
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

  let accessToken

  if (token) {
    accessToken = token
  }

  if (!token && JID) {
    const response = await api.get('/api/refreshToken', {
      headers: {
        Cookie: `JID=${JID}`
      }
    })

    if (response.data.accessToken) {
      setCookie(ctx, 'dashboard.access-token', response.data.accessToken, {
        maxAge: 60 * 15,
        path: '/'
      })

      accessToken = response.data.accessToken
    }
  }

  if (!accessToken) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const { query } = ctx

  const response = await api({
    method: 'GET',
    params: query,
    url: '/order',
    baseURL: 'http://3.84.17.159:3333',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  const orders = response.data.reverse()

  return {
    props: {
      orders
    }
  }
}

export default Query
