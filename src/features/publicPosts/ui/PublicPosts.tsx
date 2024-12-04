import { calculateCharactersToShow, timeAgo } from '@/common'
import {
  LinkProfile,
  PublicPostsDto,
  RegisteredUsersCounter,
  TextUnfolding,
  TimeAgo,
} from '@/features/publicPosts'
import Image from 'next/image'
import {
  EffectFade,
  HashNavigation,
  Navigation,
  Pagination,
} from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/swiper-bundle.css'

type Props = {
  posts: PublicPostsDto
}
export const PublicPosts = ({ posts }: Props) => {
  console.log(posts)

  return (
    <div
      className={
        'w-full flex flex-col justify-start items-center h-headCalc pt-6 gap-9'
      }
    >
      <RegisteredUsersCounter totalUsers={posts.totalUsers} />
      <div className={'flex justify-center gap-3'}>
        {posts.items.map((post, i) => {
          return (
            <div
              className={'flex flex-col gap-3'}
              key={i}
            >
              <div className={'relative w-60 h-60'}>
                <Swiper
                  allowTouchMove={false}
                  className={
                    'absolute w-full h-full top-0 left-0 m-0 shrink-0 bg-dark-500 mx-auto'
                  }
                  effect={'fade'}
                  grabCursor={false}
                  hashNavigation={{
                    watchState: true,
                  }}
                  keyboard={{
                    enabled: true,
                  }}
                  modules={[Navigation, Pagination, EffectFade, HashNavigation]}
                  navigation
                  noSwiping
                  noSwipingSelector={'button'}
                  pagination={{
                    clickable: true,
                  }}
                  simulateTouch={false}
                  spaceBetween={30}
                  touchStartPreventDefault={false}
                  watchSlidesProgress
                >
                  {post.images.map((post, i) => {
                    return (
                      <SwiperSlide
                        className={'w-full'}
                        key={i}
                      >
                        <Image
                          alt={'post photo'}
                          height={240}
                          src={post.url}
                          width={240}
                        />
                      </SwiperSlide>
                    )
                  })}
                </Swiper>
              </div>
              <div className={'w-60 flex flex-col gap-2'}>
                <LinkProfile
                  avatarOwner={post.avatarOwner}
                  userId={post.ownerId}
                  userName={post.userName}
                />
                <TimeAgo createdAt={post.createdAt} />
                <TextUnfolding
                  charactersToShow={calculateCharactersToShow(
                    post.description,
                    post.userName
                  )}
                >
                  {post.description}
                </TextUnfolding>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
