import { PhotoResult } from '@/common'

export const createFileForUpload = (photoData: PhotoResult) => {
  if (photoData.photoFile) {
    const mimeType = photoData.photoFile.type

    const filename = photoData.photoUrl?.split('/').pop() || 'avatar.jpg'

    return new File([photoData.photoFile], filename, { type: mimeType })
  }

  return null
}
