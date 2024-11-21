import { PhotoResult, createImage } from '@/common'

export async function applyFilters(
  imageBlob: Blob,
  style: string,
  isCssClass: boolean = false
): Promise<PhotoResult> {
  const objectURL = URL.createObjectURL(imageBlob)
  const photo = await createImage(objectURL)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = photo.width
  canvas.height = photo.height

  if (!ctx) {
    return Promise.reject()
  }

  isCssClass ? (photo.className = style) : (ctx.filter = style)
  console.log(photo.className)

  ctx.drawImage(photo, 0, 0)

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
