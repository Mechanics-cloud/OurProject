import { useEffect, useLayoutEffect, useState } from 'react'

import {
  Loader,
  TextArea,
  getLayoutWithSidebar,
  useTranslation,
} from '@/common'
import { withProtection } from '@/common/HOC/withProtection'
import { withRedirectForAuthorize } from '@/common/HOC/withRedirectForAuthorize'
import { Button } from '@/common/components/button'
import Slider from '@/common/components/slider/Slider'
import { Typography, typographyVariants } from '@/common/components/typography'
import authStore from '@/features/auth/model/authStore'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import third from 'src/assets/images/image1.jpg'
import second from 'src/assets/images/image2.jpg'
import first from 'src/assets/images/image3.jpg'
import four from 'src/assets/images/image4.jpg'

import AddCommentGroup from './AddCommentGroup'
import { AvatarGroupWithLikes } from './AvatarGroupWithLikes'
import { CustomHomePopover } from './CustomHomePopover'
import { LinkProfile } from './LinkProfile'
import { LinksGroup } from './LinksGroup'
import ViewAllCommentsButton from './ViewAllCommentsButton'
import { homeApi } from './home.api'
import { Item, RootInterface } from './home.types'
import { getAvatarImages } from './posts/getAvatarImages'
import { postsApi } from './posts/posts.api'
import { timeAgo } from './utilsDate'

const dataTest = [
  {
    avatarOwner: four,
    createdAt: '2024-10-07T13:37:28.059Z',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    id: 5,
    images: [
      {
        createdAt: '2024-10-07T13:37:27.351Z',
        fileSize: 300,
        height: 300,
        uploadId: 'string',
        url: first,
        width: 300,
      },
      {
        createdAt: '2024-10-07T13:37:27.351Z',
        fileSize: 300,
        height: 300,
        uploadId: 'string',
        url: four,
        width: 300,
      },
      {
        createdAt: '2024-10-07T13:37:27.351Z',
        fileSize: 300,
        height: 300,
        uploadId: 'string',
        url: second,
        width: 300,
      },
    ],
    isLiked: true,
    likesCount: 0,
    location: 'location',
    owner: {
      firstName: 'firstName',
      lastName: 'lastName',
    },
    ownerId: 1,
    updatedAt: '2024-10-07T13:37:28.059Z',
    userName: 'Alex',
  },
  {
    avatarOwner: four,
    createdAt: '2024-10-07T13:37:28.059Z',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    id: 2,
    images: [
      {
        createdAt: '2024-10-07T13:37:27.351Z',
        fileSize: 300,
        height: 300,
        uploadId: 'string',
        url: first,
        width: 300,
      },
      {
        createdAt: '2024-10-07T13:37:27.351Z',
        fileSize: 300,
        height: 300,
        uploadId: 'string',
        url: four,
        width: 300,
      },
      {
        createdAt: '2024-10-07T13:37:27.351Z',
        fileSize: 300,
        height: 300,
        uploadId: 'string',
        url: second,
        width: 300,
      },
    ],
    isLiked: false,
    likesCount: 0,
    location: 'location',
    owner: {
      firstName: 'firstName',
      lastName: 'lastName',
    },
    ownerId: 1,
    updatedAt: '2024-10-07T13:37:28.059Z',
    userName: 'Alex',
  },
]

function Home() {
  // const [state, setState] = useState<Item[]>(dataTest)
  const [state, setState] = useState<Item[]>([])
  const [loading, setLoading] = useState(false) //todo change on true

  const { t } = useTranslation()
  const router = useRouter()

  const isAuth = !!authStore.profile

  // TODO раскомментировать
  useEffect(() => {
    // homeApi
    // .publicationsFollowers({
    postsApi
      .publicPosts({
        endCursorPostId: 3,
        pageNumber: 0,
        pageSize: 3,
      })
      .then((data) => {
        if (data) {
          setState(data.items)
        }
      })
      .finally(() => setLoading(false))
  }, [])
  //TODO удалить консоль
  // console.log(state)

  if (loading) {
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
  // if (state.length === 0) {
  //   return (
  //     <div
  //       className={
  //         'w-[491px] h-40 border-b mt-[24px] ml-[10.9375rem] flex justify-center items-center bg-dark-100'
  //       }
  //     >
  //       На данный момент нет постов
  //     </div>
  //   )
  // }
  // добавить в slider адресс item.images

  return state.map((item) => {
    return (
      <div
        className={
          'w-[491px] h-[816px] border-b mt-[24px] ml-[8%] flex flex-col '
        }
        key={item.id}
      >
        <div className={'w-full h-9 mb-3 flex  items-center justify-between'}>
          <span className={'flex  items-center space-x-2'}>
            <Image
              alt={'Avatar'}
              className={'size-9 rounded-full'}
              height={36}
              src={item.avatarOwner}
              width={36}
            />
            <div className={'flex items-center space-x-2 pl-1'}>
              <LinkProfile userName={item.userName} />
              <span className={'w-1.5 h-1.5 bg-light-100 rounded-full'}></span>
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
        <LinksGroup
          id={item.id}
          isLiked={item.isLiked}
        />
        <div className={'w-full max-h-[72px] inline-flex gap-3'}>
          <Image
            alt={'Avatar'}
            className={'size-9 rounded-full mt-[5px]'}
            height={36}
            src={item.avatarOwner}
            width={36}
          />
          <Typography
            className={
              'flex-1 overflow-hidden text-justify line-clamp-3 leading-[24px]'
            }
            variant={'reg14'}
          >
            <LinkProfile userName={item.userName} />
            {item.description}
          </Typography>
        </div>
        <AvatarGroupWithLikes
          id={item.id}
          likesCount={item.likesCount}
        />
        {/* <div className={'w-full h-6 mb-3'}>
          <button type={'button'}>
            <span
              className={'text-[14px] font-bold  leading-[24px] text-light-900'}
            >
              View All Comments (114)
            </span>
          </button>
        </div> */}
        <ViewAllCommentsButton postId={item.id} />
        {/* <AddCommentGroup /> */}

        <div className={'w-full flex  justify-between'}>
          <input
            className={
              'placeholder-light-900 text-[14px] font-400  leading-[24px] w-full'
            }
            placeholder={'Add a Comments...'}
            type={'text'}
          ></input>
          <Button
            className={typographyVariants({ variant: 'h3' })}
            variant={'text'}
          >
            Publish
          </Button>
        </div>
      </div>
    )
  })
}

Home.getLayout = getLayoutWithSidebar
export default withProtection(Home)
