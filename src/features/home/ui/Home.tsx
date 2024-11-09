import { useEffect } from 'react'

import { Loader, TextUnfolding, useTranslation } from '@/common'
import Slider from '@/common/components/slider/Slider'
import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import { useRouter } from 'next/router'
import avatarPlaceholder from 'src/assets/images/user-avatar-placeholder.jpg'

import { calculateCharactersToShow } from '../model'
import homePageStore from '../model/homePageStore'
import { timeAgo } from '../model/utilsDate'
import { WrapperParentComponent } from '../model/wrapperParentComponent'
import { AvatarGroupWithLikes } from './AvatarGroupWithLikes'
import { CustomHomePopover } from './CustomHomePopover'
import { LinkProfile } from './LinkProfile'
import { LinksGroup } from './LinksGroup'

export const Home = observer(() => {
  const state = homePageStore.publicationsFollowers?.items
  const { t } = useTranslation()
  const router = useRouter()

  useEffect(() => {
    homePageStore.getPostsPublicationsFollowers()
  }, [])

  if (homePageStore.isLoadingHomePage) {
    return (
      <>
        <Loader />
        <div
          className={
            'w-[491px] h-[816px] border-b mt-[24px] ml-[10.9375rem] flex flex-col bg-dark-100 animate-pulse'
          }
        ></div>
      </>
    )
  }
  if (state?.length === 0 && !homePageStore.isLoadingHomePage) {
    return (
      <div
        className={
          'w-[491px] h-40 border-b mt-[24px] ml-[10.9375rem] flex justify-center items-center bg-dark-100'
        }
      >
        На данный момент нет постов
      </div>
    )
  }

  return state?.map((item) => {
    return (
      <div
        className={
          'w-[491px] min-h-[816px] border-b mt-[24px] ml-[8%] flex flex-col pb-2 justify-between'
        }
        key={item.id}
      >
        <div className={'w-full h-9 mb-3 flex  items-center justify-between'}>
          <span className={'flex  items-center space-x-2'}>
            <Image
              alt={'Avatar'}
              className={'size-9 rounded-full'}
              height={36}
              src={item.avatarOwner ? item.avatarOwner : avatarPlaceholder}
              width={36}
            />
            <div className={'flex items-center space-x-2 pl-1'}>
              <LinkProfile
                userId={item.ownerId}
                userName={item.userName}
              />
              <span className={'size-1.5 bg-light-100 rounded-full'}></span>
              <div className={'h-[20px] flex items-end'}>
                <span
                  className={
                    'font-normal leading-[16px] text-[12px] text-light-900'
                  }
                >
                  {timeAgo(item.updatedAt, router.locale)}
                </span>
              </div>
            </div>
          </span>
          <CustomHomePopover />
        </div>
        <section className={'h-[504px] mb-3'}>
          {item.images.length > 0 ? (
            <Slider images={item.images} />
          ) : (
            'Нет картинок для поста!'
          )}
        </section>
        <LinksGroup item={item} />
        <div className={'w-full inline-flex gap-3'}>
          <Image
            alt={'Avatar'}
            className={'size-9 rounded-full mt-[5px]'}
            height={36}
            src={item.avatarOwner ? item.avatarOwner : avatarPlaceholder}
            width={36}
          />
          <TextUnfolding
            charactersToShow={calculateCharactersToShow(
              item.description,
              item.userName
            )}
            className={'text-justify break-words'}
            link={
              <LinkProfile
                userId={item.ownerId}
                userName={item.userName}
              />
            }
          >
            {item.description}
          </TextUnfolding>
        </div>
        <AvatarGroupWithLikes item={item} />
        <WrapperParentComponent postId={item.id} />
      </div>
    )
  })
})
