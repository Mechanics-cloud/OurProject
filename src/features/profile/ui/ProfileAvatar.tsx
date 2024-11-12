import { Skeleton } from '@/common'
import Image, { StaticImageData } from 'next/image'

type Props = {
  isProfileLoading: boolean
  src: StaticImageData | string
}

export const ProfileAvatar = ({ isProfileLoading, src }: Props) => {
  return (
    <div className={'relative w-full max-w-[200px] aspect-square'}>
      {isProfileLoading && (
        <Skeleton className={'absolute inset-0 w-full h-full rounded-full'} />
      )}
      <Image
        alt={'avatar'}
        className={`rounded-full transition-opacity duration-300 ${
          isProfileLoading ? 'opacity-0' : 'opacity-100'
        }`}
        fill
        sizes={'200px'}
        src={src}
      />
    </div>
  )
}
