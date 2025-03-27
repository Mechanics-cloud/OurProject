import React from 'react'

import avatarPlaceholder from '@/assets/images/user-avatar-placeholder.jpg'
import { CircleLoader, PublicPaths, Typography } from '@/common'
import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import Link from 'next/link'

import { messengerStore } from '../model/stores/messengerStore'

export const PartnerInfo = observer(() => {
  const isChatLoading = messengerStore.isChatLoading

  const dialogPartnerInfo = messengerStore.dialogPartnerInfo
  const avatar =
    dialogPartnerInfo && dialogPartnerInfo.avatars.length !== 0
      ? dialogPartnerInfo.avatars[1].url
      : avatarPlaceholder

  const InfoComponent = dialogPartnerInfo ? (
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
  ) : null

  return (
    <div
      className={
        'col-span-1 row-span-1 border-b border-dark-300 bg-dark-500 flex px-3 items-center'
      }
    >
      {isChatLoading ? <CircleLoader className={'pt-0'} /> : InfoComponent}
    </div>
  )
})
