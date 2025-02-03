import React from 'react'

import { MoreHorizontalOutline } from '@/assets/icons'
import { Popover, PopoverContent, PopoverTrigger } from '@/common'
import { MappedData } from '@/features/posts'
import { observer } from 'mobx-react-lite'

type Props = {
  data: MappedData[]
  open: boolean
  setOpen: (open: boolean) => void
}
export const PostHeaderPopover = observer(({ data, open, setOpen }: Props) => {
  return (
    <Popover
      onOpenChange={setOpen}
      open={open}
    >
      <PopoverTrigger asChild>
        <button
          className={'ml-auto'}
          title={'menu'}
          type={'button'}
        >
          <MoreHorizontalOutline
            aria-label={'Call settings'}
            className={`size-6 active:text-accent-500 hover:text-accent-500 cursor-pointer ${
              open ? 'text-accent-500' : ''
            }`}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className={'absolute z-50 min-w-max min-h-[85px] -right-3 p-3'}
        sideOffset={3}
      >
        <nav>
          <ul className={'flex flex-col gap-3'}>
            {data.map(
              (item) =>
                item.display && (
                  <button
                    className={`flex items-center gap-2 hover:text-accent-500`}
                    key={item.id}
                    onClick={item.onClick}
                    type={'button'}
                  >
                    {item.icon}
                    <span className={'text-sm'}>{item.text}</span>
                  </button>
                )
            )}
          </ul>
        </nav>
      </PopoverContent>
    </Popover>
  )
})
