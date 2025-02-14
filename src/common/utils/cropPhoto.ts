import { Area } from 'react-easy-crop'

import { PhotoResult, createImage } from '@/common'

export async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area
): Promise<PhotoResult> {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return Promise.reject()
  }

  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )

  return new Promise((resolve, reject) => {
    canvas.toBlob((file) => {
      if (file) {
        resolve({
          photoFile: file,
          photoUrl: URL.createObjectURL(file),
        })
      } else {
        resolve({
          photoFile: null,
          photoUrl: null,
        })
        reject(new Error('Failed to create Blob from canvas'))
      }
    }, 'image/jpeg')
  })
}
