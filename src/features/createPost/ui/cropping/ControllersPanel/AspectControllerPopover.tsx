import * as React from 'react'
import { useState } from 'react'

import { Expand } from '@/assets/icons'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  cn,
  useTranslation,
} from '@/common'
import {
  AspectControllerButtons,
  ControllerButton,
} from '@/features/createPost'

type Props = {
  id: string
}

export const AspectControllerPopover = ({ id }: Props) => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover
      onOpenChange={setIsOpen}
      open={isOpen}
    >
      <PopoverTrigger asChild>
        <ControllerButton>
          <Tooltip title={t.createPost.cropping.crop}>
            <Expand
              className={cn(
                'w-[28px] h-[28px]',
                isOpen ? 'text-accent-500' : ''
              )}
            />
          </Tooltip>
        </ControllerButton>
      </PopoverTrigger>
      <PopoverContent
        align={'start'}
        className={
          'p-3 flex gap-3 flex-col border-0 bg-transparent popoverOpacity'
        }
        side={'top'}
        sideOffset={2}
      >
        <AspectControllerButtons id={id} />
      </PopoverContent>
    </Popover>
  )
}
