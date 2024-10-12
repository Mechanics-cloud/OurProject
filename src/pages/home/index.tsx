import { useEffect, useLayoutEffect, useState } from 'react'

import { generalStore } from '@/app/store'
import {
  BookmarkOutline,
  HeartOutline,
  MessageCircleOutline,
  MoreHorizontalOutline,
  PaperPlaneOutline,
} from '@/assets/icons/outlineIcons'
import { Loader, getLayoutWithSidebar, useTranslation } from '@/common'
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

import { CustomHomePopover } from './CustomHomePopover'
import { LinksGroup } from './LinksGroup'
import { homeApi } from './home.api'
import { Item, RootInterface } from './home.types'
import { timeAgo } from './utilsDate'

const dataTest = [
  {
    avatarOwner: four,
    createdAt: '2024-10-07T13:37:28.059Z',
    description: 'description',
    id: 1,
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
    likesCount: 1,
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
  const [state, setState] = useState<Item[]>(dataTest)
  const [loading, setLoading] = useState(false) //todo change on true

  const { t } = useTranslation()
  const router = useRouter()

  const isAuth = !!authStore.profile

  // TODO раскоментировать
  // useEffect(() => {
  //   homeApi
  //     .publicationsFollowers({
  //       endCursorPostId: 0,
  //       pageNumber: 1,
  //       pageSize: 12,
  //     })
  //     .then((data) => {
  //       if (data) {
  //         setState(data.items)
  //       }
  //     })
  //     .finally(() => setLoading(false))
  // }, [])

  if (loading) {
    return (
      <>
        <Loader />
        <div
          className={
            'w-[491px] h-[816px] border-b mt-[24px] ml-[395px] flex flex-col bg-dark-100 animate-pulse'
          }
        ></div>
      </>
    )
  }
  // добавить в slider адресс item.images

  return state.map((item) => {
    return (
      <div
        className={
          'w-[491px] h-[816px] border-b mt-[24px] ml-[395px] flex flex-col'
        }
        key={item.id}
      >
        <div className={'w-full h-9 mb-3 flex  items-center justify-between'}>
          <span className={'flex  items-center space-x-2'}>
            <Image
              alt={'Avatar'}
              className={'w-9 h-9 rounded-full'}
              // src={four}
              src={item.avatarOwner}
            />
            <div className={'flex items-center space-x-2 pl-1'}>
              <Link href={'/profile'}>{item.userName}</Link>
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
            'Нет картинок!'
          )}
        </section>
        <LinksGroup />
        <div className={'w-full h-[72px] flex gap-3'}>
          <Image
            alt={'Avatar'}
            className={'size-9 rounded-full mt-[5px]'}
            src={four}
          />
          <Typography
            className={
              'flex-1 overflow-hidden text-justify line-clamp-3 leading-[24px]'
            }
            variant={'reg14'}
          >
            <span className={'font-bold'}>URLProfiele</span> Lorem ipsum dolor
            sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </Typography>
        </div>
        <div className={'w-full h-6 flex gap-4 mt-3 mb-6'}>
          <div className={'flex'}>
            <Image
              alt={'Avatar'}
              className={'w-6 h-6 rounded-full'}
              src={four}
            />
            <Image
              alt={'Avatar'}
              className={'w-6 h-6 rounded-full -ml-2'}
              src={four}
            />
            <Image
              alt={'Avatar'}
              className={'w-6 h-6 rounded-full -ml-2'}
              src={four}
            />
          </div>
          <span className={'text-[14px] leading-[24px]'}>
            2243 &ldquo;<span className={'font-bold'}>Like</span>&rdquo;
          </span>
        </div>
        <div className={'w-full h-6 mb-3'}>
          <button type={'button'}>
            <span
              className={'text-[14px] font-bold  leading-[24px] text-light-900'}
            >
              View All Comments (114)
            </span>
          </button>
        </div>
        <div className={'w-full flex  justify-between'}>
          <input
            className={
              'placeholder-light-900 text-[14px] font-400  leading-[24px] '
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
export default Home
