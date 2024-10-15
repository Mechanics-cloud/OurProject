'use client'

import React, { ReactElement, ReactNode } from 'react'

import {
  Layout,
  LayoutWithSidebar,
  Paths,
  Tabs,
  TabsType,
  Typography,
} from '@/common'
import authStore from '@/features/auth/model/authStore'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import GeneralInfo from 'src/pages/general-info'

const tabsData: TabsType[] = [
  {
    content: <></> || <GeneralInfo />,
    id: 'tab1',
    title: 'General Information',
  },
  {
    content: <Typography variant={'reg16'}>Devices</Typography>,
    id: 'tab2',
    title: 'Devices',
  },
  {
    content: <Typography variant={'reg16'}>Account Management</Typography>,
    id: 'tab3',
    title: 'Account Management',
  },
  {
    content: <Typography variant={'reg16'}>My payments</Typography>,
    id: 'tab4',
    title: 'My payments',
  },
]

type NextPageWithLayout<P = {}, IP = P> = {
  getLayout?: (page: ReactElement) => ReactNode
} & NextPage<P, IP>

export const withProtection =
  <P extends object>(
    PageComponent: NextPageWithLayout<P>,
    isPublic: boolean = false,
    isWithTabs?: boolean
  ): NextPageWithLayout<P> =>
  (props) => {
    const router = useRouter()

    if (!authStore.profile && !isPublic) {
      router.push(Paths.signIn)
    }

    if (authStore.profile) {
      return (
        <LayoutWithSidebar>
          {isWithTabs && (
            <Tabs
              className={'mt-9'}
              tabsData={tabsData}
            />
          )}
          <PageComponent {...props} />
        </LayoutWithSidebar>
      )
    }

    if (isPublic && !authStore.profile) {
      return (
        <Layout>
          <div className={'mx-24'}>
            <PageComponent {...props} />
          </div>
        </Layout>
      )
    }

    return (
      <Layout>
        <></>
      </Layout>
    )
  }
