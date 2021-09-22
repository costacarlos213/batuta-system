import React, { useState } from 'react'

import { Box, ModalOverlay, Modal, useDisclosure } from '@chakra-ui/react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { parseCookies, setCookie } from 'nookies'
import ButtonGroup from 'src/components/ButtonGroup'
import ModalContent from 'src/components/Modal'
import { api } from 'src/services/api'
import useSWR from 'swr'

import Table from '../components/Table'

const Dashboard: React.FC = ({
  numberOfOrders
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [checked, setChecked] = useState(new Array(numberOfOrders).fill(false))
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { data, error } = useSWR(
    '/api/getOrders',
    async url => {
      const response = await api.get(url)

      if (response.data) {
        const newLength = response.data.length - numberOfOrders

        for (let i = 0; i < newLength; i++) {
          setChecked([...checked, false])
        }
      }

      return response.data.reverse()
    },
    {
      revalidateOnFocus: true,
      revalidateOnMount: true
    }
  )

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
        checkedFields={checked}
        printData={data}
        openModal={onOpen}
      />
      {!data && <Table rows={[]} checked={checked} setChecked={setChecked} />}
      {!data && !error && <p>carregando dados...</p>}
      {data && <Table rows={data} checked={checked} setChecked={setChecked} />}
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { 'dashboard.access-token': token, JID } = parseCookies(ctx)

  let accessToken: string = token

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

      return {
        props: {}
      }
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

  const numberOfOrders = await api({
    method: 'GET',
    url: '/order/count',
    baseURL: 'http://3.84.17.159:3333',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  return {
    props: {
      numberOfOrders: numberOfOrders.data.quantity
    }
  }
}

export default Dashboard
