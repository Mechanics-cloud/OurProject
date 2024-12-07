import { withProtection } from '@/common/HOC/withProtection'
import { PublicProfile, profileAPi } from '@/features/profile'
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

    return { props: userProfile }
  } catch {
    return {
      notFound: true,
    }
  }
}

const ProfilePage = observer((userProfile: PublicProfile) => {
  return <Profile userProfile={userProfile} />
})

export default withProtection(ProfilePage, true)
