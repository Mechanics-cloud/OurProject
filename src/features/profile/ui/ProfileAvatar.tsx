import { LoadingComponent } from '@/features/profile/ui/LoadingComponent'
import { observer } from 'mobx-react-lite'
import Image, { StaticImageData } from 'next/image'

type Props = {
  isProfileLoading: boolean
  src?: StaticImageData | string
}
export const ProfileAvatar = observer(({ isProfileLoading, src }: Props) => {
  return (
    <LoadingComponent
      className={'rounded-full pr-0 min-w-[147px] min-h-[147px]'}
      isProfileLoading={isProfileLoading}
    >
      {src && (
        <Image
          alt={'avatar'}
          className={'rounded-full pr-0'}
          height={200}
          src={src}
          width={200}
        />
      )}
    </LoadingComponent>
  )
})
