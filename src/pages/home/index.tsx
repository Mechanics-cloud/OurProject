import {
  BookmarkOutline,
  HeartOutline,
  MessageCircleOutline,
  MoreHorizontalOutline,
  PaperPlaneOutline,
} from '@/assets/icons/outlineIcons'
import { getLayoutWithSidebar } from '@/common'
import { Button } from '@/common/components/button'
import Slider from '@/common/components/slider/Slider'
import { Typography, typographyVariants } from '@/common/components/typography'
import Image from 'next/image'
import Link from 'next/link'
import third from 'src/assets/images/image1.jpg'
import second from 'src/assets/images/image2.jpg'
import first from 'src/assets/images/image3.jpg'
import four from 'src/assets/images/image4.jpg'

const images = [
  {
    url: four,
  },
  {
    url: second,
  },
  {
    url: third,
  },
  {
    url: first,
  },
]

function Home() {
  return (
    <div
      className={
        'w-[491px] h-[816px] border-b mt-[24px] ml-[395px] flex flex-col'
      }
    >
      <div className={'w-full h-9 mb-3 flex  items-center justify-between'}>
        <span className={'flex  items-center space-x-2'}>
          <Image
            alt={'Avatar'}
            className={'w-9 h-9 rounded-full'}
            src={four}
          />
          <div className={'flex items-center space-x-2 pl-1'}>
            <span>URLProfile</span>
            <span className={'w-1.5 h-1.5 bg-light-100 rounded-full'}></span>
            <div className={'h-[20px] flex items-end'}>
              <span
                className={
                  'font-normal leading-[16px] text-[12px] text-light-900'
                }
              >
                22 Minutes ago
              </span>
            </div>
          </div>
        </span>
        <button type={'button'}>
          <MoreHorizontalOutline
            aria-label={'вызов настроек'}
            className={'w-6 h-6 active:text-accent-500 focus:text-accent-500'}
          />
        </button>
      </div>
      <section className={'h-[504px] mb-3'}>
        {images.length > 0 ? <Slider images={images} /> : 'Нет картинок!'}
      </section>
      <div className={'w-full h-6 flex items-center justify-between mb-4'}>
        <div className={'flex items-center gap-5'}>
          <HeartOutline className={'size-6'} />
          <MessageCircleOutline className={'size-6'} />
          <PaperPlaneOutline className={'size-6'} />
        </div>
        <BookmarkOutline className={'size-6'} />
      </div>
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
          <span className={'font-bold'}>URLProfiele</span> Lorem ipsum dolor sit
          amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua.
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
}

Home.getLayout = getLayoutWithSidebar
export default Home
