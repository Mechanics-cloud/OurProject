import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

import { ReactElement, ReactNode } from 'react'

import { Environments, Loader } from '@/common'
import { useMe } from '@/common/hooks/useMe'
import { GoogleOAuthProvider } from '@react-oauth/google'

import '@/styles/globals.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import 'react-toastify/dist/ReactToastify.css'

export type NextPageWithLayout<P = {}, IP = P> = {
  getLayout?: (page: ReactElement) => ReactNode
} & NextPage<P, IP>

type AppPropsWithLayout = {
  Component: NextPageWithLayout
} & AppProps

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  const { loading } = useMe()

  if (loading) {
    return <Loader />
  }

  return getLayout(
    <GoogleOAuthProvider clientId={Environments.CLIENT_ID!}>
      <Component {...pageProps} />
    </GoogleOAuthProvider>
  )
}
