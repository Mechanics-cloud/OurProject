import { Dispatch, ReactNode, SetStateAction } from 'react'

import { Nullable } from '@/common'

export type PhotoResult = {
  error: null | string
  photo: null | string
  photoForServer: Blob | null
}

export type ModalHandler = (item: PhotoResult) => void

export type AvatarDialogProps = {
  modalHandler: ModalHandler
  triggerButton: ReactNode
}

export type ChooseFileButtonProps = {
  setError: Dispatch<SetStateAction<string>>
  setPhoto: Dispatch<SetStateAction<null | string>>
}

export type PhotoEditorProps = {
  photo: Nullable<string>
}
