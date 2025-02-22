import { ComponentProps, useState } from 'react'

import {
  BookmarkOutline,
  LogOut,
  MoreHorizontalOutline,
  SettingsOutline,
  TrendingUpOutline,
} from '@/assets/icons'
import {
  LinkWithIcon,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ProtectedPaths,
  Typography,
  useModal,
  useTranslation,
} from '@/common'
import { LogOutModal } from '@/common/components/logOutModal'
import { generalStore } from '@/core/store'

export const MobilePopover = ({ className }: ComponentProps<'button'>) => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const {
    isModalOpen: isLogOutModalOpen,
    onModalClose: onLogOutModalClose,
    openModal: openLogOutModal,
  } = useModal()

  const onLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <>
      <Popover
        onOpenChange={setIsOpen}
        open={isOpen}
      >
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
                  href={ProtectedPaths.profileSettings}
                  onClick={onLinkClick}
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
                  href={ProtectedPaths.statistics}
                >
                  <Typography variant={'reg14'}>{t.menu.statistics}</Typography>
                </LinkWithIcon>
              </li>

              <li>
                <LinkWithIcon
                  DefaultIcon={BookmarkOutline}
                  className={'py-2'}
                  href={ProtectedPaths.favorites}
                >
                  <Typography variant={'reg14'}>{t.menu.favorites}</Typography>
                </LinkWithIcon>
              </li>

              <li>
                <LinkWithIcon
                  ActiveIcon={LogOut}
                  DefaultIcon={LogOut}
                  as={'button'}
                  onClick={openLogOutModal}
                >
                  <Typography variant={'reg14'}>{t.basic.logOut}</Typography>
                </LinkWithIcon>
              </li>
            </ul>
          </nav>
        </PopoverContent>
      </Popover>
      <LogOutModal
        logOutModalHandler={onLogOutModalClose}
        onClose={onLogOutModalClose}
        open={isLogOutModalOpen}
        userEmail={generalStore.user?.email ?? ''}
      />
    </>
  )
}
