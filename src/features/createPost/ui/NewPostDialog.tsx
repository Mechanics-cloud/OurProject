import * as React from 'react'
import { PropsWithChildren, useState } from 'react'

import { Dialog, Nullable } from '@/common'
import { AddPhotoModal } from '@/features/createPost/ui/AddPhotoModal'
import { CropPhotoModal } from '@/features/createPost/ui/CropPhotoModal'
import { DialogProps } from '@radix-ui/react-dialog'

type Props = DialogProps & PropsWithChildren

const MODAL_STATES = {
  ADDING: 'ADDING',
  CROPPING: 'CROPPING',
  FILTERING: 'FILTERING',
  PUBLICATION: 'PUBLICATION',
} as const

export const NewPostDialog = ({ onOpenChange, open, ...rest }: Props) => {
  const [currentState, setCurrentState] = useState<keyof typeof MODAL_STATES>(
    MODAL_STATES.ADDING
  )
  const [photo, setPhoto] = useState<Nullable<string>>(null)

  return (
    <>
      <Dialog
        onOpenChange={onOpenChange}
        open={open}
        {...rest}
      >
        {currentState === MODAL_STATES.ADDING && (
          <AddPhotoModal
            changeState={() => {
              setCurrentState(MODAL_STATES.CROPPING)
            }}
            setPhoto={setPhoto}
            title={'Add photo'}
          />
        )}

        {currentState === MODAL_STATES.CROPPING && photo && (
          <CropPhotoModal
            changeState={() => {
              setCurrentState(MODAL_STATES.PUBLICATION)
            }}
            photo={photo}
          />
        )}
      </Dialog>
    </>
  )
}
