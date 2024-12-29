import React, { MouseEvent, Ref, forwardRef } from 'react'

import { Like, Nullable, Typography, cn } from '@/common'
import { Avatar } from '@/common/components/avatar/avatar'
import { StaticImageData } from 'next/image'
import Link from 'next/link'

type Props = {
  alt?: Nullable<string>
  className?: string
  href: string
  isLike?: Nullable<boolean>
  likes?: Nullable<string>
  name?: Nullable<string>
  onClick?: (e: MouseEvent<HTMLSpanElement>) => void
  onLike?: (e: MouseEvent<HTMLSpanElement>) => void
  src?: Nullable<StaticImageData | string>
  text?: Nullable<string>
  time?: Nullable<string>
}

const Template = (
  {
    alt,
    className,
    href,
    isLike,
    likes,
    name,
    onClick,
    onLike,
    src,
    text,
    time,
  }: Props,
  ref: Ref<HTMLDivElement>
) => {
  return (
    <div
      className={cn('flex gap-3 items-start', className)}
      ref={ref}
    >
      <Link href={href}>
        <Avatar
          alt={alt || `user ${name} photo`}
          className={'rounded-full mt-0'}
          priority={src !== undefined}
          size={36}
          src={src}
        />
      </Link>

      <div className={'flex-col'}>
        <p>
          <b className={'mr-2'}>{name}</b>
          {text}
        </p>
        <div className={'flex items-center gap-2'}>
          {time && (
            <Typography
              className={'text-light-900'}
              variant={'small'}
            >
              {time}
            </Typography>
          )}
          {likes && (
            <Typography
              className={'text-light-900'}
              variant={'small'}
            >
              {likes}
            </Typography>
          )}
          {onClick && (
            <Typography
              className={'text-light-900'}
              variant={'small'}
            >
              Answer
            </Typography>
          )}
        </div>
      </div>
      {isLike !== null && (
        <div
          className={'w-10 mt-4 ml-auto'}
          onClick={onLike}
        >
          <Like active={!!isLike} />
        </div>
      )}
    </div>
  )
}

export const CommentItem = forwardRef(Template)
