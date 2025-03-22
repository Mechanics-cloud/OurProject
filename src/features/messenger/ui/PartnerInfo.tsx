import React from 'react'

import avatarPlaceholder from '@/assets/images/user-avatar-placeholder.jpg'
import { Typography } from '@/common'
import { messengerStore } from '@/features/messenger/model/stores/messengerStore'
import { observer } from 'mobx-react-lite'
import Image from 'next/image'

export const PartnerInfo = observer(() => {
  const dialogPartnerInfo = messengerStore.dialogPartnerInfo
  const avatar =
    dialogPartnerInfo && dialogPartnerInfo?.avatars.length !== 0
      ? dialogPartnerInfo?.avatars[1].url
      : avatarPlaceholder

  return (
    <div
      className={'col-span-1 row-span-1 border-b border-dark-300 bg-dark-500 '}
    >
      <div className={'flex gap-3 items-center justify-start px-3 h-full'}>
        {dialogPartnerInfo ? (
          <>
            <div
              className={
                'h-[48px] aspect-square relative rounded-full overflow-hidden'
              }
            >
              <Image
                alt={dialogPartnerInfo?.userName || 'partners avatar'}
                height={48}
                src={avatar}
                width={48}
              />
            </div>
            <Typography
              className={'whitespace-nowrap overflow-hidden text-ellipsis'}
              variant={'reg14'}
            >
              {dialogPartnerInfo?.userName || 'Dialog Partner'}
            </Typography>
          </>
        ) : (
          <div>Empty</div>
        )}
      </div>
    </div>
  )
})
