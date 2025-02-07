import { PropsWithChildren, useEffect } from 'react'

import { getDeviceScreenWidth, withLoader } from '@/common'
import {
  ContentModal,
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

    return { props: { comments, post, postsData, screenSize, userProfile } }
  } catch {
    return {
      notFound: true,
    }
  }
}

type Props = { screenSize?: number } & ProfileData &
  PropsWithChildren &
  PublicPostInfo

const ProfilePage = ({
  comments,
  post,
  postsData,
  screenSize,
  userProfile,
}: Props) => {
  const store = initializeStore({ postsData, userProfile })

  useEffect(() => {
    hydrateProfileStore?.setNewData({ postsData, userProfile })
  }, [postsData, userProfile])

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
        userProfile={userProfile}
      />
    </>
  )
}

export default withLoader(ProfilePage)
