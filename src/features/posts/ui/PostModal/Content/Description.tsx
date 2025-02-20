import React from 'react'

import anonymous from '@/assets/images/user-avatar-placeholder.jpg'
import { TextUnfolding } from '@/common'
import { observer } from 'mobx-react-lite'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'

type Props = {
  avatarOwner: StaticImageData | string
  description: string | undefined
  href: string
  isAvatarHidden: boolean
  userName: string
}
export const Description = observer(
  ({ avatarOwner, description, href, isAvatarHidden, userName }: Props) => {
    return (
      <div
        className={
          'flex gap-3 items-start lg:mb-4 lg:border-b border-dark-100 box-border py-2'
        }
      >
        {!isAvatarHidden && (
          <Image
            alt={`Post owner avatar`}
            className={'rounded-full pr-0'}
            height={36}
            priority
            src={avatarOwner || anonymous}
            width={36}
          />
        )}
        <TextUnfolding
          className={'!pb-1'}
          link={
            <Link
              className={'font-bold leading-[24px] text-[14px]'}
              href={href}
            >
              {userName}
            </Link>
          }
        >
          {description || ''}
        </TextUnfolding>
      </div>
    )
  }
)
