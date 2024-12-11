import { ComponentProps } from 'react'

import {
  Bookmark,
  Home,
  LogOut,
  MessageCircle,
  Person,
  PlusSquare,
  Search,
  TrendingUp,
} from '@/assets/icons/filledIcons'
import {
  BookmarkOutline,
  HomeOutline,
  MessageCircleOutline,
  PersonOutline,
  PlusSquareOutline,
  SearchOutline,
  TrendingUpOutline,
} from '@/assets/icons/outlineIcons'
import { LinkWithIcon, Paths, cn, useModal, useTranslation } from '@/common'
import { LogOutModal } from '@/common/components/logOutModal'
import { responseErrorHandler } from '@/common/utils/responseErrorHandler'
import { generalStore } from '@/core/store'
import { authStore } from '@/features/auth'
import { NewPostDialog } from '@/features/createPost/ui/NewPostDialog'
import { observer } from 'mobx-react-lite'
import Router from 'next/router'

type Props = ComponentProps<'aside'>

export const SideBar = observer(({ className }: Props) => {
  const { t } = useTranslation()
  const { isModalOpen: isLogOutModalOpen, onModalClose: onLogOutModalClose } =
    useModal(async () => {
      const isLoadingStore = generalStore

      isLoadingStore.turnOnLoading()
      try {
        await authStore.logout()
        await Router.push(Paths.signIn)
      } catch (error: unknown) {
        responseErrorHandler(error)
      } finally {
        isLoadingStore.turnOffLoading()
      }
    })

  const {
    isModalOpen: isNewPostModalOpen,
    onModalClose: onNewPostModalClose,
    openModal: openNewPostModal,
  } = useModal()

  const userId = generalStore.user?.userId

  return (
    <>
      <aside className={cn('min-w-56 h-full pr-2', className)}>
        <nav className={'pt-[72px]'}>
          <ul className={`mb-[60px] [&_li]:mb-4`}>
            <li>
              <LinkWithIcon
                ActiveIcon={Home}
                DefaultIcon={HomeOutline}
                className={'py-2'}
                href={Paths.home}
              >
                {t.menu.home}
              </LinkWithIcon>
            </li>

            <li>
              <LinkWithIcon
                ActiveIcon={PlusSquare}
                DefaultIcon={PlusSquareOutline}
                as={'button'}
                iconTrigger={isLogOutModalOpen}
                onClick={openNewPostModal}
              >
                {t.menu.create}
              </LinkWithIcon>
            </li>

            <li>
              <LinkWithIcon
                ActiveIcon={Person}
                DefaultIcon={PersonOutline}
                href={Paths.profileLink(userId)}
              >
                {t.menu.profile}
              </LinkWithIcon>
            </li>

            <li>
              <LinkWithIcon
                ActiveIcon={MessageCircle}
                DefaultIcon={MessageCircleOutline}
                href={Paths.messenger}
              >
                {t.menu.messenger}
              </LinkWithIcon>
            </li>

            <li>
              <LinkWithIcon
                ActiveIcon={Search}
                DefaultIcon={SearchOutline}
                href={Paths.search}
              >
                {t.menu.search}
              </LinkWithIcon>
            </li>
          </ul>

          <ul className={`mb-[180px] [&_li]:mb-6`}>
            <li>
              <LinkWithIcon
                ActiveIcon={TrendingUp}
                DefaultIcon={TrendingUpOutline}
                href={Paths.statistics}
              >
                {t.menu.statistics}
              </LinkWithIcon>
            </li>

            <li>
              <LinkWithIcon
                ActiveIcon={Bookmark}
                DefaultIcon={BookmarkOutline}
                href={Paths.favorites}
              >
                {t.menu.favorites}
              </LinkWithIcon>
            </li>
          </ul>

          <ul className={'mb-9'}>
            <LogOutModal
              logOutModalHandler={onLogOutModalClose}
              triggerButton={
                <li>
                  <LinkWithIcon
                    ActiveIcon={LogOut}
                    DefaultIcon={LogOut}
                    as={'button'}
                  >
                    {t.menu.logOut}
                  </LinkWithIcon>
                </li>
              }
              userEmail={generalStore.user?.email ?? ''}
            />
          </ul>
        </nav>
      </aside>
      <NewPostDialog
        onClose={onNewPostModalClose}
        onOpenChange={onNewPostModalClose}
        open={isNewPostModalOpen}
      />
    </>
  )
})
