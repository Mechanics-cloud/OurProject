import * as React from 'react'
import { ComponentProps } from 'react'

import {
  BookmarkOutline,
  LogOut,
  MoreHorizontalOutline,
  SettingsOutline,
  TrendingUpOutline,
} from '@/assets/icons'
import {
  LinkWithIcon,
  Paths,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Typography,
  useModal,
  useTranslation,
} from '@/common'
import { LogOutModal } from '@/common/components/logOutModal'
import { logOut } from '@/common/utils/logOut'
import { generalStore } from '@/core/store'

export const MobilePopover = ({ className }: ComponentProps<'button'>) => {
  const { t } = useTranslation()

  const { onModalClose: onLogOutModalClose } = useModal(logOut)

  return (
    <Popover>
      <PopoverTrigger
        asChild
        className={className}
      >
        <button
          className={'block lg:hidden'}
          type={'button'}
        >
          <MoreHorizontalOutline
            aria-label={'Mobile menu'}
            className={'w-6 h-6 active:text-accent-500 focus:text-accent-500'}
          />
        </button>
      </PopoverTrigger>

      <PopoverContent className={'z-50 block lg:hidden mr-4 py-3 px-4'}>
        <nav>
          <ul className={'flex flex-col gap-3'}>
            <li>
              <LinkWithIcon
                DefaultIcon={SettingsOutline}
                className={'py-2'}
                href={Paths.profileSettings}
              >
                <Typography variant={'reg14'}>
                  {t.menu.profileSettings}
                </Typography>
              </LinkWithIcon>
            </li>

            <li>
              <LinkWithIcon
                DefaultIcon={TrendingUpOutline}
                className={'py-2'}
                href={Paths.statistics}
              >
                <Typography variant={'reg14'}>{t.menu.statistics}</Typography>
              </LinkWithIcon>
            </li>

            <li>
              <LinkWithIcon
                DefaultIcon={BookmarkOutline}
                className={'py-2'}
                href={Paths.favorites}
              >
                <Typography variant={'reg14'}>{t.menu.favorites}</Typography>
              </LinkWithIcon>
            </li>

            <li>
              <LogOutModal
                logOutModalHandler={onLogOutModalClose}
                triggerButton={
                  <LinkWithIcon
                    DefaultIcon={LogOut}
                    as={'button'}
                    className={'py-2'}
                  >
                    <Typography variant={'reg14'}>{t.basic.logOut}</Typography>
                  </LinkWithIcon>
                }
                userEmail={generalStore.user?.email ?? ''}
              />
            </li>
          </ul>
        </nav>
      </PopoverContent>
    </Popover>
  )
}
