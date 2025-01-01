import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  cn,
} from '@/common'
import { useAvatarDialog } from '@/features/profile/settings/avatarDialog/model'
import { AvatarDialogProps } from '@/features/profile/settings/avatarDialog/model/types'

import { ChooseFileButton } from './chooseFileButton/ChooseFileButton'
import { PhotoEditor } from './photoEditor/PhotoEditor'

export const AvatarDialog = ({
  onModalPhotoSave,
  triggerButton,
}: AvatarDialogProps) => {
  const {
    error,
    onModalOpenChange,
    onPhotoSave,
    photo,
    photoEditorRef,
    setError,
    setPhoto,
    t,
  } = useAvatarDialog(onModalPhotoSave)

  return (
    <Dialog onOpenChange={onModalOpenChange}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent
        aria-describedby={error ?? 'error-description'}
        className={'max-w-[494px] h-[580px] gap-0 flex flex-col'}
      >
        <DialogHeader>
          <DialogTitle className={'px-6'}>{t.avatarModal.title}</DialogTitle>
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
              <span className={'text-center text-balance'}>
                <strong>{t.basic.errors.unknown}</strong>
                {` ${error}`}
              </span>
            </div>
          )}
          <PhotoEditor
            photo={photo}
            ref={photoEditorRef}
          />
        </div>
        <DialogFooter
          className={cn(
            'flex items-center',
            photo ? 'justify-end' : 'justify-center mb-[100px]'
          )}
        >
          {photo ? (
            <DialogClose
              asChild
              className={'mr-6'}
            >
              <Button
                onClick={onPhotoSave}
                type={'button'}
              >
                {t.avatarModal.saveButton}
              </Button>
            </DialogClose>
          ) : (
            <ChooseFileButton
              onErrorChange={setError}
              onPhotoChange={setPhoto}
            />
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
