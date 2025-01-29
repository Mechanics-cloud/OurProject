import { PropsWithChildren, useEffect, useState } from 'react'

import {
  AsyncComponent,
  PathService,
  PublicPaths,
  getDeviceScreenWidth,
  withServerSide,
} from '@/common'
import { PostModal, PublicPostInfo, getPublicPostInfo } from '@/features/posts'
import {
  ProfileData,
  hydrateProfileStore,
  initializeStore,
  publicProfileAPi,
} from '@/features/profile'
import { Profile } from '@/features/profile/ui/Profile'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'

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
  const router = useRouter()
  const store = initializeStore({ postsData, userProfile })
  const [isClosePost, setIsClosePost] = useState<boolean>(false)

  useEffect(() => {
    hydrateProfileStore?.setNewData({ postsData, userProfile })
  }, [postsData, userProfile])

  const onClosePost = () => {
    setIsClosePost(true)
    router
      .push(
        PathService.generatePath(PublicPaths.userProfile, {
          userId: userProfile.id,
        })
      )
      .then(() => setIsClosePost(false))
  }

  return (
    <>
      <Profile
        screenSize={screenSize}
        store={store}
      />
      {post && (
        <PostModal
          comments={comments}
          onClose={onClosePost}
          post={post}
        />
      )}
      <AsyncComponent isLoading={isClosePost} />
    </>
  )
}

export default withServerSide(ProfilePage)
