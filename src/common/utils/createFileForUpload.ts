import { PhotoResult } from '@/common'

export const createFileForUpload = (photoData: PhotoResult) => {
  if (photoData.photoFile) {
    const mimeType = photoData.photoFile.type

    let filename = 'avatar.jpg'

    if (typeof photoData.photoUrl === 'string') {
      filename = photoData.photoUrl?.split('/').pop() ?? filename
    }

    return new File([photoData.photoFile], filename, { type: mimeType })
  }

  return null
}
