import React, { ReactElement, ReactNode } from 'react'

import { ChakraProvider } from '@chakra-ui/react'
import { Global } from '@emotion/react'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Layout from 'src/components/Layout'

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
      <ChakraProvider resetCSS theme={theme}>
        <Global styles={scrollBarStyles} />
        <Component {...pageProps} />
      </ChakraProvider>
    )
  }

  return (
    <ChakraProvider resetCSS theme={theme}>
      <Global styles={scrollBarStyles} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}

export default MyApp
