import React from 'react'

import {
  BasicPost,
  Paths,
  TextUnfolding,
  Typography,
  UserMiniLink,
  calculateCharactersToShow,
  timeAgo,
  useTranslation,
} from '@/common'
import { CustomSwiper } from '@/common/components/swiper'
import {
  AvatarGroupWithLikes,
  CustomNewsFeedPopover,
} from '@/features/newsFeed'
import Image from 'next/image'
import { NextRouter } from 'next/router'
import avatarPlaceholder from 'src/assets/images/user-avatar-placeholder.jpg'

import { WrapperParentComponent } from '../model/wrapperParentComponent'
import { LinkProfile } from './LinkProfile'
import { LinksGroup } from './LinksGroup'

type Props = {
  item: BasicPost
  router: NextRouter
}

const PostItem = ({ item, router }: Props) => {
  const { t } = useTranslation()

  return (
    <div
      className={
        'max-w-[491px] sm:min-h-[816px] border-b mt-[24px] sm:ml-[8%] mb-[56px] flex flex-col pb-2 justify-between'
      }
    >
      <div
        className={
          'w-full h-9 mb-3 flex  items-center justify-between relative'
        }
      >
        <span className={'flex  items-center space-x-2'}>
          <UserMiniLink
            href={`${Paths.profileLink(item.ownerId)}`}
            name={item.userName}
            src={item.avatarOwner ? item.avatarOwner : avatarPlaceholder}
          />
          <span
            className={'size-1 bg-light-100 rounded-full relative top-[1px]'}
          ></span>
          <Typography
            className={'text-light-900 h-[20px] flex items-end'}
            variant={'small'}
          >
            {timeAgo(item.updatedAt, router.locale)}
          </Typography>
        </span>
        <CustomNewsFeedPopover />
      </div>
      <section className={'sm:h-[504px] h-[324px] mb-3'}>
        {item.images.length > 0 ? (
          <CustomSwiper images={item.images} />
        ) : (
          t.basic.errors.emptySlider
        )}
      </section>
      <LinksGroup
        className={'mb-5'}
        item={item}
      />
      <div className={'w-full inline-flex gap-3 items-start'}>
        <div className={'min-w-[36px] flex items-center align-top -mt-1'}>
          <Image
            alt={'Avatar'}
            className={'size-9 rounded-full'}
            height={36}
            src={item.avatarOwner ? item.avatarOwner : avatarPlaceholder}
            width={36}
          />
        </div>
        <TextUnfolding
          charactersToShow={calculateCharactersToShow(170, item.userName)}
          className={'text-justify break-words'}
          link={
            <span className={'mr-2 inline-block'}>
              <LinkProfile
                userId={item.ownerId}
                userName={item.userName}
              />
            </span>
          }
        >
          {item.description}
        </TextUnfolding>
      </div>
      <AvatarGroupWithLikes item={item} />
      <WrapperParentComponent postId={item.id} />
    </div>
  )
}

export default PostItem
