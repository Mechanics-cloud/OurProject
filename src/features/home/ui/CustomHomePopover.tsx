import { useState } from 'react'

import {
  CopyOutline,
  MoreHorizontalOutline,
  PersonRemoveOutline,
} from '@/assets/icons/outlineIcons'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  useTranslation,
} from '@/common'
import Link from 'next/link'

export const CustomHomePopover = () => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <Popover
      onOpenChange={setIsOpen}
      open={isOpen}
    >
      <PopoverTrigger asChild>
        <button
          title={'menu'}
          type={'button'}
        >
          <MoreHorizontalOutline
            aria-label={'вызов настроек'}
            className={`size-6 active:text-accent-500 hover:text-accent-500 ${
              isOpen ? 'text-accent-500' : ''
            }`}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className={'z-50 w-[144px] min-h-[85px] mr-[120px] px-2 py-3'}
        sideOffset={3}
      >
        <nav>
          <ul>
            <Link
              className={'flex items-center gap-2 mb-3  hover:text-accent-500'}
              href={'/'}
            >
              <PersonRemoveOutline className={'size-6'} />
              <span className={'text-sm'}>{t.menu.unfollow}</span>
            </Link>
            <Link
              className={'flex items-center gap-2  hover:text-accent-500'}
              href={'/'}
            >
              <CopyOutline className={'size-6 flex-shrink-0'} />
              <span className={'text-sm'}>{t.menu.copyLink}</span>
            </Link>
          </ul>
        </nav>
      </PopoverContent>
    </Popover>
  )
}
