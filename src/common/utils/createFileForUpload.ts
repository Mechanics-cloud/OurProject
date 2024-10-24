import { PhotoResult } from '@/features/profile/settings/avatarDialog/model'

export const createFileForUpload = (photoData: PhotoResult) => {
  if (photoData.photoForServer) {
    const mimeType = photoData.photoForServer.type

    const filename = photoData.photo?.split('/').pop() || 'avatar.jpg'

    return new File([photoData.photoForServer], filename, { type: mimeType })
  }

  return null
}
