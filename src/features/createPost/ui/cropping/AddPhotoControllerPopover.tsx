import * as React from 'react'
import { ChangeEvent, useMemo, useState } from 'react'

import { Image, ImageOutline, PlusCircleOutline } from '@/assets/icons'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  useTranslation,
} from '@/common'
import { addPhotosCheck } from '@/features/createPost/model/addPhotosCheck'
import { addPostStore } from '@/features/createPost/model/addPostPhotoStore'
import { MaxPhotoCount } from '@/features/createPost/model/constants'
import { PhotoControllerButton } from '@/features/createPost/ui/components/photoControllerButton/PhotoControllerButton'
import { observer } from 'mobx-react-lite'

type Props = {
  id: string
}

export const AddPhotoControllerPopover = observer(({ id }: Props) => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const addPostPhoto = addPostStore.addPhoto
  const photos = addPostStore
  const totalCount = addPostStore.getCurrentPhotosCount()

  const onPhotoChoose = (inputEvent: ChangeEvent<HTMLInputElement>) => {
    const fileList = inputEvent.target.files

    if (fileList) {
      const files: File[] = Array.from(fileList)

      addPhotosCheck(files, totalCount, t, addPostPhoto)
    }
  }

  return (
    <Popover
      onOpenChange={setIsOpen}
      open={isOpen}
    >
      <PopoverTrigger asChild>
        <PhotoControllerButton className={'ml-auto'}>
          {isOpen ? (
            <Image
              className={'w-[28px] h-[28px]  self-start text-accent-500'}
            />
          ) : (
            <ImageOutline className={'w-[28px] h-[28px] self-start'} />
          )}
        </PhotoControllerButton>
      </PopoverTrigger>
      <PopoverContent
        align={'end'}
        className={
          'popoverOpacity py-5 px-3 border-0 bg-transparent flex justify-end'
        }
        side={'top'}
        sideOffset={2}
      >
        <label>
          <PlusCircleOutline className={'w-7 h-7'} />
          <input
            accept={'image/*, .png, .jpg, .jpeg'}
            className={'sr-only'}
            disabled={totalCount === MaxPhotoCount}
            onChange={onPhotoChoose}
            type={'file'}
          />
        </label>
      </PopoverContent>
    </Popover>
  )
})
