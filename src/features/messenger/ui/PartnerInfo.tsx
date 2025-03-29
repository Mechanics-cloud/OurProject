import { CircleLoader, PublicPaths, Typography } from '@/common'
import { usePartnerInfo } from '@/features/messenger/model/usePartnerInfo'
import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import Link from 'next/link'

export const PartnerInfo = observer(() => {
  const { avatar, dialogPartnerInfo, isChatLoading } = usePartnerInfo()

  if (isChatLoading) {
    return <CircleLoader className={'pt-0'} />
  }

  return dialogPartnerInfo ? (
    <Link
      className={'flex gap-3 items-center justify-start h-full'}
      href={PublicPaths.profileLink(dialogPartnerInfo.partnerId)}
    >
      <div
        className={'h-12 aspect-square relative rounded-full overflow-hidden'}
      >
        <Image
          alt={dialogPartnerInfo.userName || 'partners avatar'}
          height={48}
          src={avatar}
          width={48}
        />
      </div>
      <Typography
        className={'whitespace-nowrap overflow-hidden text-ellipsis'}
        variant={'reg14'}
      >
        {dialogPartnerInfo.userName || 'Dialog Partner'}
      </Typography>
    </Link>
  ) : null
})
