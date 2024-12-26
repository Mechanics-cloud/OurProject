import * as React from 'react'

import { Maximize, MaximizeOutline } from '@/assets/icons'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  useTranslation,
} from '@/common'
import {
  PhotoControllerButton,
  Slider,
  addPostStore,
  useScaleControllerPopover,
} from '@/features/createPost'
import { observer } from 'mobx-react-lite'

type Props = {
  id: string
}

export const ScaleControllerPopover = observer(({ id }: Props) => {
  const { t } = useTranslation()
  const { isOpen, onZoom, setIsOpen } = useScaleControllerPopover(id)

  return (
    <Popover
      onOpenChange={setIsOpen}
      open={isOpen}
    >
      <PopoverTrigger asChild>
        <PhotoControllerButton>
          <Tooltip title={t.createPost.cropping.zoom}>
            {isOpen ? (
              <Maximize className={'w-[28px] h-[28px] text-accent-500'} />
            ) : (
              <MaximizeOutline className={'w-[28px] h-[28px]'} />
            )}
          </Tooltip>
        </PhotoControllerButton>
      </PopoverTrigger>
      <PopoverContent
        align={'start'}
        className={'popoverOpacity w-48 py-5 px-3 border-0 bg-transparent'}
        side={'top'}
        sideOffset={2}
      >
        <Slider
          defaultValue={[
            addPostStore.images.getItemById(id)?.crop.getZoom() || 1,
          ]}
          max={3}
          min={1}
          onValueChange={onZoom}
          step={0.1}
        />
      </PopoverContent>
    </Popover>
  )
})
