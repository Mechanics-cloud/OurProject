import React, { PropsWithChildren, useEffect } from 'react'

import { getDeviceScreenWidth, withLoader } from '@/common'
import { tabletWidth } from '@/common/constants'
import {
  ContentModal,
  MobilePost,
  PublicPostInfo,
  getPublicPostInfo,
} from '@/features/posts'
import {
  ProfileData,
  hydrateProfileStore,
  initializeStore,
  publicProfileAPi,
} from '@/features/profile'
import { Profile } from '@/features/profile/ui/Profile'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

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
    const [userProfile, postsData, postInfo] = await Promise.all([
      publicProfileAPi.getPublicUser(params.id[0]),
      publicProfileAPi.getPublicPosts(+params.id[0]),
      getPublicPostInfo(Number(params.id[1])),
    ])

    const { comments, post } = postInfo

    return {
      props: { comments, params, post, postsData, screenSize, userProfile },
    }
  } catch {
    return {
      notFound: true,
    }
  }
}

type Props = {
  params: { id?: string | string[] }
  screenSize?: number
} & ProfileData &
  PropsWithChildren &
  PublicPostInfo

const ProfilePage = ({
  comments,
  params,
  post,
  postsData,
  screenSize,
  userProfile,
}: Props) => {
  const store = initializeStore({ postsData, userProfile })

  useEffect(() => {
    hydrateProfileStore?.setNewData({ postsData, userProfile })
  }, [postsData, userProfile])

  const isTablet = screenSize && screenSize < tabletWidth

  if (params.id && params.id[1] && isTablet) {
    return (
      <MobilePost
        comments={comments}
        post={post}
        postsData={postsData}
        screenSize={screenSize}
        userProfile={userProfile}
      />
    )
  }

  return (
    <>
      <Profile
        screenSize={screenSize}
        store={store}
      />
      <ContentModal
        comments={comments}
        post={post}
        postsData={postsData}
        screenSize={screenSize}
        userProfile={userProfile}
      />
    </>
  )
}

export default withLoader(ProfilePage)
