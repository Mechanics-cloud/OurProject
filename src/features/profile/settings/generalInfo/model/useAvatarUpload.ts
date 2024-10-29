import { useState } from 'react'

import { PhotoResult } from '@/features/profile/settings/avatarDialog/model'
import ProfileStore from '@/features/profile/settings/generalInfo/model/profileStore'

export const useAvatarUpload = () => {
  const currentPhoto = ProfileStore.userProfile?.avatars[0]?.url
  const [photoObj, setPhotoObj] = useState<PhotoResult>({
    photo: currentPhoto || null,
    photoForServer: null,
  })

  const [dirty, setDirty] = useState(false)

  const onModalPhotoSave = (photo: PhotoResult) => {
    setPhotoObj(photo)
    setDirty(true)
  }

  return {
    currentPhoto,
    dirty,
    onModalPhotoSave,
    photoObj,
    setDirty,
  }
}
