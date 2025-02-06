import { CopyOutline, PersonRemoveOutline } from '@/assets/icons/outlineIcons'
import { UserHeaderPopover, useTranslation } from '@/common'
import Link from 'next/link'

export const CustomNewsFeedPopover = () => {
  const { t } = useTranslation()

  return (
    <UserHeaderPopover>
      <nav>
        <ul>
          <Link
            className={'flex items-center gap-2 mb-3  hover:text-accent-500'}
            href={'#'}
          >
            <PersonRemoveOutline className={'size-6'} />
            <span className={'text-sm'}>{t.menu.unfollow}</span>
          </Link>
          <Link
            className={'flex items-center gap-2  hover:text-accent-500'}
            href={'#'}
          >
            <CopyOutline className={'size-6 flex-shrink-0'} />
            <span className={'text-sm'}>{t.menu.copyLink}</span>
          </Link>
        </ul>
      </nav>
    </UserHeaderPopover>
  )
}
