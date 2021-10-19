import React, { ReactElement, ReactNode } from 'react'

import { ChakraProvider } from '@chakra-ui/react'
import { Global } from '@emotion/react'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Layout from 'src/components/Layout'
import { AuthProvider } from 'src/context/AuthContext'
import { NamesProvider } from 'src/context/NamesContext'

import theme, { scrollBarStyles } from '../styles/globals'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({
  Component,
  pageProps,
  router
}: AppPropsWithLayout): ReactNode => {
  if (router.pathname === '/') {
    return (
      <AuthProvider>
        <ChakraProvider resetCSS theme={theme}>
          <Global styles={scrollBarStyles} />
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthProvider>
    )
  }

  return (
    <AuthProvider>
      <NamesProvider>
        <ChakraProvider resetCSS theme={theme}>
          <Global styles={scrollBarStyles} />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </NamesProvider>
    </AuthProvider>
  )
}

export default MyApp
