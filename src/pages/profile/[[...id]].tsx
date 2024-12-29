import { useEffect } from 'react'

import { getDeviceScreenWidth, withServerSide } from '@/common'
import {
  ProfileData,
  hydrateProfileStore,
  initializeStore,
  publicProfileAPi,
} from '@/features/profile'
import { Profile } from '@/features/profile/ui/Profile'
import { observer } from 'mobx-react-lite'
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

    return { props: { postsData, screenSize, userProfile } }
  } catch {
    return {
      notFound: true,
    }
  }
}

const ProfilePage = observer(
  ({
    postsData,
    screenSize,
    userProfile,
  }: { screenSize: number } & ProfileData) => {
    const store = initializeStore({ postsData, userProfile })

    useEffect(() => {
      hydrateProfileStore?.setNewData({ postsData, userProfile })
    }, [postsData, userProfile])

    return (
      <Profile
        screenSize={screenSize}
        store={store}
      />
    )
  }
)

export default withServerSide(ProfilePage)
