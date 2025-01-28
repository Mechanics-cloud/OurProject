import { PropsWithChildren, useEffect } from 'react'

import { getDeviceScreenWidth, withServerSide } from '@/common'
import { PostModal, PublicPostInfo, getPublicPostInfo } from '@/features/posts'
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
    const userProfile = await publicProfileAPi.getPublicUser(params.id[0])
    const postsData = await publicProfileAPi.getPublicPosts(userProfile.id)
    const { comments, post } = await getPublicPostInfo(Number(params.id[1]))

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
      {post && (
        <PostModal
          comments={comments}
          post={post}
          userProfileId={userProfile.id}
        />
      )}
    </>
  )
}

export default withServerSide(ProfilePage)
