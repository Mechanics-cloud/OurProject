export type UploadPhotoResponse = {
  images: UploadPhoto[]
}

type UploadPhoto = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}
