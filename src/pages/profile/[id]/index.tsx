import React, { PropsWithChildren } from 'react'

import { getDeviceScreenWidth } from '@/common'
import { ProfileData, publicProfileAPi } from '@/features/profile'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import Layout from './layout'

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { params, req } = context

  const screenSize = getDeviceScreenWidth(req.headers['user-agent'] || '')

  if (!params || !params.id) {
    return {
      notFound: true,
    }
  }
  try {
    const userProfile = await publicProfileAPi.getPublicUser(params.id[0])
    const postsData = await publicProfileAPi.getPublicPosts(userProfile.id)

    return { props: { postsData, screenSize, userProfile } }
  } catch {
    return {
      notFound: true,
    }
  }
}

type Props = { screenSize?: number } & ProfileData & PropsWithChildren

const ProfilePage = ({ children, ...props }: Props) => (
  <Layout {...props}>{children}</Layout>
)

export default ProfilePage
