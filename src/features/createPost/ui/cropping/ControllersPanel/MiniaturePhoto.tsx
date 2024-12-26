import * as React from 'react'
import { ComponentPropsWithoutRef } from 'react'

import { Close } from '@/assets/icons'
import { Tooltip, cn, useTranslation } from '@/common'
import { addPostStore } from '@/features/createPost'
import { observer } from 'mobx-react-lite'
import Image from 'next/image'

type Props = {
  id: string
  onClick: (index: number) => void
  src: string
} & ComponentPropsWithoutRef<'span'>

export const MiniaturePhoto = observer(
  ({ className, id, onClick, src }: Props) => {
    const { t } = useTranslation()
    // const deletePostPhoto = addPostStore.deletePhoto
    const totalCount = addPostStore.photos.count
    const isLastPhoto = totalCount === 1

    return (
      <span
        className={cn('relative shrink-0', className)}
        onClick={onClick}
      >
        <Image
          alt={'From gallery'}
          className={
            'h-20 w-20 object-cover object-center hover:opacity-60 transition'
          }
          height={80}
          src={src}
          width={80}
        />
        <Tooltip
          delayDuration={800}
          title={t.createPost.cropping.delete}
        >
          {!isLastPhoto && (
            <span
              className={cn(
                'absolute z-10 top-0.5 right-0.5 p-0.5]',
                'before:absolute before:bg-dark-500 before:top-0 before:bottom-0 before:left-0 before:right-0 before:rounded-sm before:-z-10 before:opacity-80'
              )}
              onClick={() => {
                addPostStore.photos.removeItem(id)
              }}
            >
              <Close className={'w-4 h-4 hover:text-accent-500 z-50'} />
            </span>
          )}
        </Tooltip>
      </span>
    )
  }
)
