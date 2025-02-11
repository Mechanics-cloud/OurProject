import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

import { ReactElement, ReactNode } from 'react'
import { toast } from 'react-toastify'

import { Environments, ProtectedLayout, useMe, useTranslation } from '@/common'
import { setTranslation } from '@/common/utils/setTranslation'
import { useNotificationsSocket } from '@/features/notifications/model'
import { GoogleOAuthProvider } from '@react-oauth/google'

import '@/common/components/swiper/customStylesForSwiper.css'
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

  return getLayout(
    <GoogleOAuthProvider clientId={Environments.CLIENT_ID!}>
      <ProtectedLayout>
        <Component {...pageProps} />
      </ProtectedLayout>
    </GoogleOAuthProvider>
  )
}
