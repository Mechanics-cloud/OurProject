import {
  BookmarkOutline,
  HeartOutline,
  MessageCircleOutline,
  MoreHorizontalOutline,
  PaperPlaneOutline,
} from '@/assets/icons/outlineIcons'
import { Button } from '@/common/components/button'
import { getLayoutWithSidebar } from '@/common/components/layoutWithSidebar/LayoutWithSidebar'
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
        'w-[491px] h-[816px] ml-[175px] border-b mt-[24px] flex flex-col'
      }
    >
      <div className={'w-full h-12 flex  items-center justify-between'}>
        <span className={'flex  items-center space-x-2'}>
          <Image
            alt={'Avatar'}
            className={'w-6 h-6 rounded-full'}
            src={four}
          />

          <span>URLProfile</span>

          <span className={'w-1.5 h-1.5 bg-gray-500 rounded-full'}></span>
          <span>22 Minutes ago</span>
        </span>
        <button type={'button'}>
          <MoreHorizontalOutline
            aria-label={'вызов настроек'}
            className={'w-6 h-6 active:text-accent-500 focus:text-accent-500'}
          />
        </button>
      </div>
      <section className={'h-[504px]'}>
        {images.length > 0 ? <Slider images={images} /> : 'Нет картинок!'}
      </section>
      <div className={'w-full h-10 flex items-center justify-between'}>
        <div className={'flex items-center gap-4'}>
          <HeartOutline />
          <MessageCircleOutline />
          <PaperPlaneOutline />
        </div>
        <BookmarkOutline />
      </div>

      <div className={'w-full min-h-[72px] flex gap-3'}>
        <Image
          alt={'Avatar'}
          className={'w-6 h-6 rounded-full'}
          src={four}
        />
        <Typography
          className={''}
          variant={'reg14'}
        >
          URLProfiele Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
      </div>
      <div className={'w-full h-10 flex gap-4'}>
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
        <span>2243 &ldquo;Like&rdquo;</span>
      </div>
      <div className={'w-full h-10'}>
        <button type={'button'}>View All Comments ...</button>
      </div>
      <div className={'w-full h-10 flex  justify-between'}>
        <input
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
