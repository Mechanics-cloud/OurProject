import React, { MouseEvent, Ref, forwardRef } from 'react'

import { Avatar, Like, Nullable, TextUnfolding, Typography, cn } from '@/common'
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
          className={'mt-2'}
          priority={src !== undefined}
          size={36}
          src={src}
        />
      </Link>

      <div className={'flex-col w-[345px]'}>
        <TextUnfolding
          className={'!pb-1'}
          link={
            <Link
              className={'font-bold leading-[24px] text-[14px]'}
              href={href}
            >
              {name}
            </Link>
          }
        >
          {text as string}
        </TextUnfolding>

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
        <button
          className={'w-6 mt-4 ml-auto'}
          onClick={onLike}
          type={'button'}
        >
          <Like active={!!isLike} />
        </button>
      )}
    </div>
  )
}

export const CommentItem = forwardRef(Template)
