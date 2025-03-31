import avatarPlaceholder from '@/assets/images/user-avatar-placeholder.jpg'
import { messengerStore } from '@/features/messenger/model/store/store'

export const usePartnerInfo = () => {
  const dialogPartnerInfo = messengerStore.dialogPartnerInfo
  const isChatLoading = messengerStore.isChatLoading

  const avatar =
    dialogPartnerInfo && dialogPartnerInfo.avatars.length !== 0
      ? dialogPartnerInfo.avatars[1].url
      : avatarPlaceholder

  return { avatar, dialogPartnerInfo, isChatLoading }
}
