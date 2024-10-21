import { ReactNode } from 'react'

import { Nullable } from '@/common'

export type PhotoResult = {
  error: Nullable<string>
  photo: Nullable<string>
  photoForServer: Nullable<Blob>
}

export type ModalPhotoSaveHandler = (item: PhotoResult) => void

export type AvatarDialogProps = {
  onModalPhotoSave: ModalPhotoSaveHandler
  triggerButton: ReactNode
}

export type ChooseFileButtonProps = {
  onErrorChange: (error: string) => void
  onPhotoChange: (photo: Nullable<string>) => void
}

export type PhotoEditorProps = {
  photo: Nullable<string>
}
