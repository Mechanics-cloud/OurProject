import avatarPlaceholder from '@/assets/images/user-avatar-placeholder.jpg'

import { messengerStore } from './stores/messengerStore'

export const usePartnerInfo = () => {
  const isChatLoading = messengerStore.isChatLoading

  const dialogPartnerInfo = messengerStore.dialogPartnerInfo
  const avatar =
    dialogPartnerInfo && dialogPartnerInfo.avatars.length !== 0
      ? dialogPartnerInfo.avatars[1].url
      : avatarPlaceholder

  return { avatar, dialogPartnerInfo, isChatLoading }
}
