import {
  BookmarkOutline,
  HeartOutline,
  MessageCircleOutline,
  PaperPlaneOutline,
} from '@/assets/icons/outlineIcons'
import { Tooltip } from '@/common'
import Link from 'next/link'

export const LinksGroup = () => {
  return (
    <div className={'w-full h-6 flex items-center justify-between mb-4'}>
      <div className={'flex items-center gap-5'}>
        <Link href={'/'}>
          <Tooltip title={'You did it!'}>
            <HeartOutline className={'size-6'} />
          </Tooltip>
        </Link>
        <MessageCircleOutline className={'size-6'} />
        <PaperPlaneOutline className={'size-6'} />
      </div>
      <BookmarkOutline className={'size-6'} />
    </div>
  )
}
