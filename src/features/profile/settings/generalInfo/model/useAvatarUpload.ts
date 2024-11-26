import { useState } from 'react'

import { PhotoResult } from '@/common'
import { profileStore } from '@/features/profile'

export const useAvatarUpload = () => {
  const currentPhoto = profileStore.userProfile?.avatars[0]?.url
  const [photoObj, setPhotoObj] = useState<PhotoResult>({
    photoFile: null,
    photoUrl: currentPhoto || null,
  })

  const [isPhotoChanged, setIsPhotoChanged] = useState(false)

  const onModalPhotoSave = (photo: PhotoResult) => {
    setPhotoObj(photo)
    setIsPhotoChanged(true)
  }

  return {
    isPhotoChanged,
    onModalPhotoSave,
    photoObj,
    setIsPhotoChanged,
    setPhotoObj,
  }
}
