import { CircleLoader, PublicPaths, Typography } from '@/common'
import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import Link from 'next/link'

import { usePartnerInfo } from '../model/usePartnerInfo'

export const PartnerInfo = observer(() => {
  const { avatar, dialogPartnerInfo, isChatLoading } = usePartnerInfo()

  const renderComponent = () => {
    if (isChatLoading) {
      return <CircleLoader className={'pt-0'} />
    }

    if (dialogPartnerInfo) {
      return (
        <Link
          className={'flex gap-3 items-center justify-start h-full'}
          href={PublicPaths.profileLink(dialogPartnerInfo.partnerId)}
        >
          <div
            className={
              'h-[48px] aspect-square relative rounded-full overflow-hidden'
            }
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
      )
    }
  }

  return (
    <div
      className={
        'col-span-1 row-span-1 border-b border-dark-300 bg-dark-500 flex px-3 items-center'
      }
    >
      {renderComponent()}
    </div>
  )
})
