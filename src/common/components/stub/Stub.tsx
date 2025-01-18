import { cn } from '@/common/utils'
import Image from 'next/image'

import { Typography } from '../typography'
import noPostImage from '/src/assets/images/noUserPosts.svg'

type stubTypes = {
  alt: string
  className?: string
  imageClassName?: string
  src?: string
  textClassName?: string
  title: string
}

export const Stub = ({
  alt,
  className,
  imageClassName,
  src = noPostImage,
  textClassName,
  title,
}: stubTypes) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center h-full',
        className
      )}
    >
      <Image
        alt={alt}
        className={cn('w-full opacity-90', imageClassName)}
        src={src}
      />
      <Typography
        className={cn('text-light-900', textClassName)}
        variant={'small'}
      >
        {title}
      </Typography>
    </div>
  )
}
