import React, { useState } from 'react'

import { Box, ModalOverlay, Modal, useDisclosure } from '@chakra-ui/react'
import axios from 'axios'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import router from 'next/router'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
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
      const { 'dashboard.access-token': token } = parseCookies()

      return api
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          console.log('Response')

          if (response.data) {
            if (response.data.message === 'Invalid Session') {
              router.replace('/')
            }

            const newLength = response.data.length - numberOfOrders

            for (let i = 0; i < newLength; i++) {
              setChecked([...checked, false])
            }
          }

          return response.data
        })
        .catch(error => {
          if (error.response.status === 401) {
            router.replace('/')
          }
        })
    },
    {
      revalidateOnMount: true,
      shouldRetryOnError: false
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

  const bearer = `Bearer ${token}`

  api.defaults.headers.common.Authorization = bearer

  return (await axios
    .get(`${process.env.API_URL}/order/count`, {
      headers: {
        Authorization: bearer
      }
    })
    .then(resp => {
      return {
        props: {
          numberOfOrders: resp.data.quantity
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

          const numberOfOrders = await axios.get(
            `${process.env.API_URL}/order/count`,
            {
              headers: {
                Authorization: newbearer
              }
            }
          )

          return {
            props: {
              numberOfOrders: numberOfOrders.data.quantity
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

export default Dashboard
