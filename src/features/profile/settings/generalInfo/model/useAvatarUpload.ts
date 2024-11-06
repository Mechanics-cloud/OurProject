import { useState } from 'react'

import { PhotoResult, profileStore } from '@/features/profile'

export const useAvatarUpload = () => {
  const currentPhoto = profileStore.userProfile?.avatars[0]?.url
  const [photoObj, setPhotoObj] = useState<PhotoResult>({
    photo: currentPhoto || null,
    photoForServer: null,
  })

  const [photoChanged, setPhotoChanged] = useState(false)

  const onModalPhotoSave = (photo: PhotoResult) => {
    setPhotoObj(photo)
    setPhotoChanged(true)
  }

  return {
    currentPhoto,
    onModalPhotoSave,
    photoChanged,
    photoObj,
    setPhotoChanged,
    setPhotoObj,
  }
}
