import { HttpStatusCode } from 'axios'
import { StaticImageData } from 'next/image'

export type Nullable<T> = T | null

export type ErrorMessage = {
  field: string
  message: string
}

export type ErrorResponse = {
  error: string
  messages: ErrorMessage[]
  statusCode: HttpStatusCode
}

export type PhotoResult = {
  photoFile: Nullable<Blob>
  photoUrl: Nullable<string>
}

export type PhotoFile = {
  createdAt: string
  fileSize: number
  height: number
  url: StaticImageData | string
  width: number
}
