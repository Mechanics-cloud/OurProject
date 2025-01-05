import { useEffect } from 'react'

import { withServerSide } from '@/common'
import { ScreenWidths } from '@/common/enums'
import {
  ProfileData,
  hydrateProfileStore,
  initializeStore,
} from '@/features/profile'
import { Profile } from '@/features/profile/ui/Profile'
import { observer } from 'mobx-react-lite'

const ProfilePage = observer(
  ({
    postsData,
    screenSize,
    userProfile,
  }: { screenSize?: ScreenWidths } & ProfileData) => {
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
