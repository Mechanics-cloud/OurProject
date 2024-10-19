import * as React from 'react'

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/common'
import { useAvatarDialog } from '@/features/profile/settings/avatarDialog/model'
import { AvatarDialogProps } from '@/features/profile/settings/avatarDialog/model/types'

import { ChooseFileButton } from './chooseFileButton/ChooseFileButton'
import { PhotoEditor } from './photoEditor/PhotoEditor'

export const AvatarDialog = ({
  modalHandler,
  triggerButton,
}: AvatarDialogProps) => {
  const { error, handleSave, photo, photoEditorRef, setError, setPhoto } =
    useAvatarDialog(modalHandler)

  return (
    <Dialog
      onOpenChange={() => {
        setPhoto(null)
        setError('')
      }}
    >
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent
        aria-describedby={error ? 'error-description' : undefined}
        className={'max-w-[494px] h-[580px] gap-0 flex flex-col'}
      >
        <DialogHeader>
          <DialogTitle className={'px-6'}>Add a Profile Photo</DialogTitle>
        </DialogHeader>
        <div
          className={
            'flex justify-center items-center flex-col h-full relative'
          }
        >
          {error && (
            <div
              className={
                'absolute top-4 border border-danger-500 bg-danger-900 w-full max-w-[440px] max-h-[60px] px-6 py-1.5 flex justify-center items-center'
              }
            >
              <span className={'text-center'}>
                <strong>Error!</strong> {error}
              </span>
            </div>
          )}
          <PhotoEditor
            photo={photo}
            ref={photoEditorRef}
          />
        </div>
        <DialogFooter
          className={`flex items-center ${
            photo ? 'justify-end' : 'justify-center mb-[100px]'
          }`}
        >
          {!photo ? (
            <ChooseFileButton
              setError={setError}
              setPhoto={setPhoto}
            />
          ) : (
            <DialogClose
              asChild
              className={'mr-6'}
            >
              <Button
                onClick={handleSave}
                type={'button'}
              >
                Save
              </Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
