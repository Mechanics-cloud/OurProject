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
import { generalStore } from '@/core/store'
import { PhotoEditorProvider } from '@/features/createPost/model/PhotoEditorProvider'
import { NewPostDialog } from '@/features/createPost/ui/NewPostDialog'
import { observer } from 'mobx-react-lite'

type Props = ComponentProps<'aside'>

export const SideBar = observer(({ className }: Props) => {
  const { isModalOpen, onModalClose, openModal } = useModal()
  const { t } = useTranslation()
  const userId = generalStore.user?.userId

  return (
    <>
      <aside className={cn('flex flex-col min-w-56 h-full', className)}>
        <nav className={'pt-[72px]'}>
          <ul className={`mb-[60px] [&_li]:mb-6`}>
            <li>
              <LinkWithIcon
                ActiveIcon={Home}
                DefaultIcon={HomeOutline}
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
                iconTrigger={isModalOpen}
                onClick={openModal}
              >
                {t.menu.create}
              </LinkWithIcon>
            </li>

            <li>
              <LinkWithIcon
                ActiveIcon={Person}
                DefaultIcon={PersonOutline}
                href={`${Paths.profile}/${userId}`}
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
              logOutModalHandler={onModalClose}
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
      <PhotoEditorProvider>
        <NewPostDialog
          onClose={onModalClose}
          onOpenChange={onModalClose}
          open={isModalOpen}
        />
      </PhotoEditorProvider>
    </>
  )
})
