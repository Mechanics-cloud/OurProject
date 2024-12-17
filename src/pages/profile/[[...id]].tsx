import { useEffect } from 'react'

import { withProtection } from '@/common/HOC/withProtection'
import {
  ProfileData,
  hydrateProfileStore,
  initializeStore,
  profileAPi,
} from '@/features/profile'
import { Profile } from '@/features/profile/ui/Profile'
import { observer } from 'mobx-react-lite'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { params } = context

  if (!params || !params.id) {
    return {
      notFound: true,
    }
  }
  try {
    const userProfile = await profileAPi.getPublicUser(params.id[0])
    const postsData = await profileAPi.getPublicPosts(userProfile.id)

    return { props: { postsData, userProfile } }
  } catch {
    return {
      notFound: true,
    }
  }
}

const ProfilePage = observer((props: ProfileData) => {
  const store = initializeStore(props)

  useEffect(() => {
    hydrateProfileStore?.setNewData(props)
  }, [props])

  return <Profile store={store} />
})

export default withProtection(ProfilePage, true)
