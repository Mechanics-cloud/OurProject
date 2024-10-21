import { Button } from '@/common'
import { ChooseFileButtonProps } from '@/features/profile/settings/avatarDialog/model'
import { useChooseFile } from '@/features/profile/settings/avatarDialog/model/chooseFileButton/useChooseFile'

export const ChooseFileButton = ({
  onErrorChange,
  onPhotoChange,
}: ChooseFileButtonProps) => {
  const { onPhotoChoose, t } = useChooseFile({ onErrorChange, onPhotoChange })

  return (
    <>
      <label htmlFor={'chooseFileInput'}>
        <Button
          asChild
          className={'cursor-pointer'}
        >
          <span>{t.avatarModal.chooseButton}</span>
        </Button>
      </label>
      <input
        accept={'image/*, .png, .jpg, .jpeg'}
        className={'opacity-0 h-0 w-0 leading-none hidden p-0 m-0'}
        id={'chooseFileInput'}
        onChange={onPhotoChoose}
        type={'file'}
      />
    </>
  )
}
