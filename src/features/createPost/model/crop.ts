import { Area } from 'react-easy-crop'

export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image()

    img.addEventListener('load', () => resolve(img))
    img.addEventListener('error', (error) => reject(error))
    // img.setAttribute('crossOrigin', 'anonymous')
    img.src = url
  })

export const getCroppedImg = async (src: string, croppedArea: Area) => {
  const image = await createImage(src)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return null
  }

  ctx.drawImage(image, 0, 0)

  const data = ctx.getImageData(
    croppedArea.x,
    croppedArea.y,
    croppedArea.width,
    croppedArea.height
  )

  canvas.width = croppedArea.width
  canvas.height = croppedArea.height

  ctx.putImageData(data, 0, 0)

  return new Promise((resolve, reject) => {
    canvas.toBlob((file) => {
      if (file) {
        resolve(URL.createObjectURL(file))
      } else {
        reject(new Error('Failed to create Blob from canvas'))
      }
    }, 'image/jpeg')
  })
}
